const prisma = require("../../config/prisma");

const createBook = async(req, res) => {
    try{
        const {title, isbn, publishedYear, totalCopies, authorId, categoryId} = req.body;

        // Check if author exists
        const existingAuthor = await prisma.author.findUnique({
            where: {
                id: authorId
            }
        });

        if (!existingAuthor) {
            return res.status(404).json({
                success: false,
                message: "Author not found!",
            });
        }

         // Check if category exists
        const existingCategory = await prisma.category.findUnique({
            where: {
                id: categoryId,
            },
        });

        if (!existingCategory) {
            return res.status(404).json({
                success: false,
                message: "Category not found!",
            });
        }

        // CREATe book
        const book = await prisma.book.create({
            data: {
                title,
                isbn,
                publishedYear,
                totalCopies,
                available: totalCopies,
                authorId,
                categoryId,
            },
        });

        res.status(201).json({
            success: true,
            message: "Book created successfully!",
            data: book,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// GET
const getBooks = async (req, res) => {
    try{

        const books = await prisma.book.findMany({
            include: {
                author: {
                    select: {
                        name: true,
                    },
                },
                category: {
                    select: {
                        name: true,
                    },
                },
            },
        });

        res.status(200).json({
            success: true,
            message: "Books fetched succesfully!",
            data: books,
        });
    }catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Get Id
const getBookById = async(req, res) => {
    try{
        const id = parseInt(req.params.id);

        const book = await prisma.book.findUnique({
            where: {
                id
            },
            include: {
                author: true,
                category: true,
            }
        });

        if (!book){
            return res.status(404).json({
                success: false,
                message: "Book not found!",
            });
        }

         res.status(201).json({
            success: true,
            message: "Book found!",
            data: book,
        });

    } catch (error){
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// UPDATE BOOK
const updateBook = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        const {
            title,
            isbn,
            publishedYear,
            totalCopies,
            authorId,
            categoryId,
        } = req.body;

        // Check if book exists
        const existingBook = await prisma.book.findUnique({
            where: {
                id,
            },
        });

        if (!existingBook) {
            return res.status(404).json({
                success: false,
                message: "Book not found!",
            });
        }

        // Check if author exists
        const existingAuthor = await prisma.author.findUnique({
            where: {
                id: authorId,
            },
        });

        if (!existingAuthor) {
            return res.status(404).json({
                success: false,
                message: "Author not found!",
            });
        }

        // Check if category exists
        const existingCategory = await prisma.category.findUnique({
            where: {
                id: categoryId,
            },
        });

        if (!existingCategory) {
            return res.status(404).json({
                success: false,
                message: "Category not found!",
            });
        }

        // Update book
        const updatedBook = await prisma.book.update({
            where: {
                id,
            },
            data: {
                title,
                isbn,
                publishedYear,
                totalCopies,
                authorId,
                categoryId,
            },
        });

        res.status(200).json({
            success: true,
            message: "Book updated successfully!",
            data: updatedBook,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// DELETE (not implemented in frontend) but there is
const deleteBook = async(req, res) => {
    try{
        const id = parseInt(req.params.id);

        const existingBook = await prisma.book.findUnique({
            where: {
                id,
            },
        });

        if(!existingBook) {
            return res.status(404).json({
                success: false,
                message: "Book not found!",
            });
        }

        // delete
        const deletedBook = await prisma.book.delete({
            where: {
                id,
            }
        });

         res.status(200).json({
            success: true,
            message: "Book deleted successfully!",
        });

    } catch (error) {
         res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    createBook,
    getBooks,
    getBookById,
    updateBook,
    deleteBook,
};