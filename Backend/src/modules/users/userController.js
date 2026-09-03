const prisma = require("../../config/prisma");
const bcrypt = require("bcrypt");

// POST (POST /api/users)
const createUser = async(req, res) => {
    try{
        // Read data sent by client from req.body (using destruction, we extract value)
        const {name, email, password} = req.body;

        // Hash pw before saving
        // Hash the password 10 times internally to make it harder to crack.
        const hashedPassword = await bcrypt.hash(password, 10);

        // POST/Save user into Postgres
        // like; insert new row into table User using given data
        // prisma creates new row in User table
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });

        res.status(201).json({
            success: true,
            message: "User created succesfully!",
            data: user,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// GET users (GET /api/users)
const getUsers = async (req, res) => {
    try{
         // Get all users from PostgreSQL
        const users = await prisma.user.findMany({
            // "Only give me these fields." becasue no send hased pw to client
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
                updatedAt: true,
            },
        });

        res.status(200).json({
            success: true,
            message: "Users fetched successfully!",
            data: users,
        });
    } catch (error) {
        res.status(500).json({
            succcess: false,
            message: error.message,
        });
    }
};

// GET user Id (GET /api/users/:id)
const getUserById = async (req, res) => {
    try{
        // express give ("5") and it converts to number int
        const id = parseInt(req.params.id);

        const user = await prisma.user.findUnique({
            where: {
                id,
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
                updatedAt: true,
            },
        });

        // User not found
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });;
        }

        // User found
        res.status(200).json({
            success: true,
            message: "User fetched successfully",
            data: user
        })
    } catch (error) {
         res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

// Update user Id
const updateUser = async (req, res) => {
    try {
    // get id param
    const { id } = req.params;
    // covert id -> number
    const userId = Number(id)

    // get updated info req from clinet
    const {name, email} = req.body;

    // is there user with this Id (update garnaa khojeko id)
    const existingUser = await prisma.user.findUnique({
        where: {
            id: userId,
        },
    });

    // If user does not exist
        if (!existingUser) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // if user exist then, we reach here & can update
        // Update user
        const updatedUser = await prisma.user.update({
            // update garne user ko id
            where: {
                id: userId,
            },
            // their data
            data: {
                name,
                email,
            },
            select:{
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
                updatedAt: true,
            },
        });

        // Send response
        res.status(200).json({
            success: true,
            message: "User updated successfully!",
            data: updatedUser,
        });

         } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
     
};

// UPDATE USER ROLE
// PATCH /api/users/:id/role
const updateUserRole = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        // Get the new role from request body
        // "What new role does the ADMIN want to assign?"
        const { role } = req.body;


        // "Is the requested role one of the roles we support (admin, staff, member?"
        if (!["ADMIN", "STAFF", "MEMBER"].includes(role)) {
            return res.status(400).json({
                success: false,
                message: "Invalid role. Role must be ADMIN, STAFF, or MEMBER.",
            });
        }


        // Check if the user we want to update exists
        // Example:
        // If id = 5, Prisma searches for User with id = 5
        const existingUser = await prisma.user.findUnique({
            where: {
                id,
            },
        });


        // If user does not exist
        // Stop execution and return 404
        if (!existingUser) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }


        // Update the user's role in the database
        //
        // IMPORTANT:
        // This only updates the "role" field.
        // It does NOT change name, email, or password.
        //
        // The ADMIN can change:
        // MEMBER → STAFF
        // STAFF → MEMBER
        // MEMBER → ADMIN
        // STAFF → ADMIN
        // etc.
        const updatedUser = await prisma.user.update({
            where: {
                id,
            },

            // "Update this user's role in the database."
            data: {
                role,
            },

            // Return only safe fields
            // Never return the user's hashed password
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
                updatedAt: true,
            },
        });


        // Send successful response
        res.status(200).json({
            success: true,
            message: "User role updated successfully!",
            data: updatedUser,
        });


    } catch (error) {

        // Handle unexpected server/database errors
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// DELETE Id
const deleteUser = async(req, res) => {
   try{
    const id = parseInt(req.params.id)

    const existingUser = await prisma.user.findUnique({
        where: {
            id,
        },
    });

    if (!existingUser) {
        return res.status(404).json ({
            success: false,
            message: "User not found!",
        })
    }

    // DELETE user
    await prisma.user.delete({
        where: {
            id,
        },
    });

    res.status(200).json({
        success: true,
        message: "User deleted successfully!",
    })
   } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
    })
   }

}
module.exports = {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
    updateUserRole,
};