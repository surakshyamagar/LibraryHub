const prisma = require ("../../config/prisma");

const createBorrowing = async(req, res) => {
    try{
        const {userId, bookId, dueDate} = req.body;

         // Check if user exists
        const existingUser = await prisma.user.findUnique({
            where: {
                id: userId,
            },
        });

        if (!existingUser) {
            return res.status(404).json({
                success: false,
                message: "User not found!",
            });
        }

          // Check if book exists
        const existingBook = await prisma.book.findUnique({
            where: {
                id: bookId,
            },
        });

        if (!existingBook) {
            return res.status(404).json({
                success: false,
                message: "Book not found!",
            });
        }

        // Check if book is available
        if (existingBook.available <= 0) {
            return res.status(400).json({
                success: false,
                message: "Book is currently not available!",
            });
        }

        // CREATE borrowing
        const borrowing = await prisma.borrowing.create({
            data: {
                userId,
                bookId,
                dueDate: new Date(dueDate), // built-in Date oject (chnage tring from client to js date object)
            }
        });

        await prisma.book.update({
            where: {
                id: bookId,
            },
            data: {
                available: {
                    decrement: 1,
                },
            },
        });

        res.status(201).json({
            success: true,
            message: "Book borrowed successfully!",
            data: borrowing,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// GET
// const getBorrowings = async(req, res) => {
//     try{
//         const borrowings = await prisma.borrowing.findMany({
//             // get user and book details ; userId, biikId, duedate
//             include: {
//                 user: true,
//                 book: true
//             },
//             orderBy: {
//                 id: "desc",
//             }
//         });
//          return res.status(200).json({
//             success: true,
//             message: "Borrowings fetched successfully!",
//             count: borrowings.length,
//             data: borrowings,
//         });

//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             message: error.message,
//         });
//     }
// };

// GET ALL BORROWINGS
const getBorrowings = async (req, res) => {
    try {

        const { status } = req.query;

        // Current date and time
        const now = new Date();

        // Find all BORROWED records
        const activeBorrowings = await prisma.borrowing.findMany({
            where: {
                status: "BORROWED",
            },
        });

        // Find overdue borrowings
        const overdueBorrowings = activeBorrowings.filter(
            (borrowing) =>
                new Date(borrowing.dueDate) < now
        );

        // Update them to OVERDUE
        if (overdueBorrowings.length > 0) {

            await prisma.borrowing.updateMany({
                where: {
                    id: {
                        in: overdueBorrowings.map(
                            (borrowing) => borrowing.id
                        ),
                    },
                },
                data: {
                    status: "OVERDUE",
                },
            });

        }

        // Build status filter
        const where = {};

        if (status) {
            where.status = status;
        }

        // Fetch final results
        const borrowings = await prisma.borrowing.findMany({
            where,
            include: {
                user: true,
                book: true,
            },
            orderBy: {
                id: "desc",
            },
        });

        return res.status(200).json({
            success: true,
            message: "Borrowings fetched successfully!",
            count: borrowings.length,
            data: borrowings,
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

// GET by ID
const getBorrowingById = async (req, res) => {
    try{
        const id = parseInt(req.params.id);

        const borrowing = await prisma.borrowing.findUnique({
            where: {
                id,
            },
            include: {
                user: true,
                book: true,
            },
        });

        if (!borrowing) {
            return res.status(404).json({
                success: false,
                message: "Borrowing record not found!",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Borrowing fetched successfully!",
            data: borrowing,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// GET MY BORROWINGS
const getMyBorrowings = async (req, res) => {
try {


    // Get logged-in user's ID from JWT
    const userId = req.user.userId;

    console.log("Logged-in user ID:", userId);

    // Find only borrowings belonging to this user
    const borrowings = await prisma.borrowing.findMany({
        where: {
            userId: userId,
        },
        include: {
            book: true,
        },
        orderBy: {
            id: "desc",
        },
    });

    return res.status(200).json({
        success: true,
        message: "Your borrowings fetched successfully!",
        count: borrowings.length,
        data: borrowings,
    });

} catch (error) {

    console.error("Get my borrowings error:", error);

    return res.status(500).json({
        success: false,
        message: error.message,
    });

}


};


// SEARCH BORROWINGS
const searchBorrowings = async (req, res) => {
    try {
        const { search } = req.query;

        if (!search) {
            return res.status(400).json({
                success: false,
                message: "Search query is required!",
            });
        }

        const borrowings = await prisma.borrowing.findMany({
            where: {
                OR: [
                    {
                        user: {
                            name: {
                                contains: search,
                                mode: "insensitive",
                            },
                        },
                    },
                    {
                        user: {
                            email: {
                                contains: search,
                                mode: "insensitive",
                            },
                        },
                    },
                    {
                        book: {
                            title: {
                                contains: search,
                                mode: "insensitive",
                            },
                        },
                    },
                ],
            },

            include: {
                user: true,
                book: true,
            },

            orderBy: {
                id: "desc",
            },
        });

        return res.status(200).json({
            success: true,
            message: "Search results fetched successfully!",
            count: borrowings.length,
            data: borrowings,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// PAGINATION
const paginateBorrowings = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const skip = (page - 1) * limit;

        const totalBorrowings = await prisma.borrowing.count();

        const borrowings = await prisma.borrowing.findMany({
            skip,
            take: limit,

            include: {
                user: true,
                book: true,
            },

            orderBy: {
                id: "desc",
            },
        });

        const totalPages = Math.ceil(
            totalBorrowings / limit
        );

        return res.status(200).json({
            success: true,
            message: "Borrowings fetched successfully!",
            data: borrowings,

            pagination: {
                currentPage: page,
                totalPages,
                totalRecords: totalBorrowings,
                recordsPerPage: limit,
            },
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Update
const updateBorrowing = async (req, res) => {
    try{
        const id = parseInt(req.params.id);

        const {dueDate} = req.body;

        const existingBorrowing = await prisma.borrowing.findUnique({
            where: {
                id,
            }
        });

        if (!existingBorrowing) {
            return res.status(404).json({
                success: false,
                message: "Borrowing not found!",
            });
        };

        // Convert due date from frontend string to JavaScript Date
        const newDueDate = new Date(dueDate);

       // Keep current status by default
        let newStatus = existingBorrowing.status;

        // If borrowing was overdue but new due date
        // is in the future, change it back to BORROWED
        if (
            existingBorrowing.status === "OVERDUE" &&
            newDueDate  >= new Date()
        ) {
            newStatus = "BORROWED";
        }

        // 

        // Updateed
        const updatedBorrowing = await prisma.borrowing.update({
            where: {
                id,
            },
            
            data: {
                dueDate: newDueDate,
                status: newStatus,
            }
        });

        res.status(200).json({
            success: true,
            message: "Borrowing updated succesfully",
            data: updatedBorrowing,
        });

    } catch (error){
        console.error("Update borrowing error:", error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// DELETE (not implemented in frontend)
const deleteBorrowing = async (req, res)=> {
    try{
        const id = parseInt(req.params.id);

        const existingBorrowing = await prisma.borrowing.findUnique({
            where: {
                id, // shows all; userid, bookid
            },
        });


        if (!existingBorrowing){
            return res.status(404).json({
                success: false,
                message: "Borrowing record not found!",
            });
        }

        // Delete Borrow
        const deletedBorrowing = await prisma.borrowing.delete({
            where: {
                id,
            }
        });

         // Increase available book count
        await prisma.book.update({
            where: {
                id: existingBorrowing.bookId,
            },
            data: {
                available: {
                    increment: 1,
                }
            }
        });

        res.status(200).json({
            success: true,
            message: "Borrowing deleted succesfully!",
        })
    } catch (error){
         return res.status(500).json({
        success: false,
        message: error.message,
    });
    }
};

// RETURN BOOK
const returnBorrowing = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        // Find borrowing
        const existingBorrowing = await prisma.borrowing.findUnique({
            where: {
                id,
            },
        });

        // Check if borrowing exists
        if (!existingBorrowing) {
            return res.status(404).json({
                success: false,
                message: "Borrowing record not found!",
            });
        }

        // Check if book is already returned
        if (existingBorrowing.status === "RETURNED") {
            return res.status(400).json({
                success: false,
                message: "Book has already been returned!",
            });
        }

        // Update borrowing status
        const returnedBorrowing = await prisma.borrowing.update({
            where: {
                id,
            },
            data: {
                status: "RETURNED",
                returnedAt: new Date(),
            },
        });

        // Increase available book count
        await prisma.book.update({
            where: {
                id: existingBorrowing.bookId,
            },
            data: {
                available: {
                    increment: 1,
                },
            },
        });

        return res.status(200).json({
            success: true,
            message: "Book returned successfully!",
            data: returnedBorrowing,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};




module.exports = {
    createBorrowing,
    getBorrowings,
    getBorrowingById,
    searchBorrowings,
    paginateBorrowings,
    updateBorrowing,
    deleteBorrowing,
    returnBorrowing,
    getMyBorrowings,
};