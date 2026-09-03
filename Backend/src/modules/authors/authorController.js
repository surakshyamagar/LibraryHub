const prisma = require("../../config/prisma");

const createAuthor = async(req, res) => {
    try{
        const {name, bio} = req.body;

        const author = await prisma.author.create({
            data: {
                name,
                bio,
            },
        });

        res.status(201).json({
            success: true,
            message: "Author created succesfully!",
            data: author,
        })
    } catch (error){
        res.status(500).json({
            success: false,
            message: error.message,
        });
    };
};

// GET all
const getAuthors = async (req, res) => {
    try{
        const authors = await prisma.author.findMany();
        res.status(200).json({
            success: true,
            message: "Authors fetched successfully!",
            data: authors,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// GET id
const getAuthorById = async(req, res) => {
    try{
        const id = parseInt(req.params.id);

        const existingAuthor = await prisma.author.findUnique({
            where: {
                id,
            },
        });

        if (!existingAuthor) {
            return res.status(404).json({
                success: false,
                message: "Author not found!",
            });
        }

        res.status(200).json({
            success: true,
            message: "Author found successfully!",
            data: existingAuthor,
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// PUT
const updateAuthor = async(req, res) => {
    try{
        const id = parseInt(req.params.id);

        const {name, bio} = req.body;

          // Check if author exists
        const existingAuthor = await prisma.author.findUnique({
            where: {
                id,
            }
        });

        if (!existingAuthor) {
            return res.status(404).json({
                success: false,
                message: "Author not found!",
            });
        };

        // Update author
        const putAuthor = await prisma.author.update({
            where: {
                id,
            },
            data: {
                name,
                bio,
            },
        });

        res.status(200).json({
            success: true,
            message: "Author updated succesfully",
            data: putAuthor,
        })
    } catch (error){
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Delete (not implemented in frontend)
const deleteAuthor = async (req, res) => {
    try{
        const id = parseInt(req.params.id);

        const existingAuthor = await prisma.author.findUnique({
            where: {
                id,
            },
        })

        if (!existingAuthor) {
            return res.status(404).json({
                success: false,
                message: "Author not found!",
            });
        }

        // delete authr
        const deletedAuthor = await prisma.author.delete({
            where: {
                id,
            },
        });

        res.status(200).json({
            success: true,
            message: "Author deleted successfully!",
        })
    } catch (error) {
         res.status(500).json({
            success: false,
            message: error.message,
         });
    }
};

module.exports = {
    createAuthor,
    getAuthors,
    getAuthorById,
    updateAuthor,
    deleteAuthor,
};