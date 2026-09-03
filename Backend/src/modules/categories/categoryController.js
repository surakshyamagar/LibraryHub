const prisma = require("../../config/prisma");

// CREATE
const createCategory = async (req, res) => {
   try{
    const {name} = req.body;

    const catogories = await prisma.category.create({
        data: {
            name,
        },
    });

    res.status(200).json({
        success: true,
        message: "Category created successfully!",
    })
   } catch (error) {
    res.status(500).json({
            success: false,
            message: error.message,
        });
   };
};

// GET
const getCategories = async(req, res) => {
    try {
        const categories = await prisma.category.findMany();

        res.status(200).json({
            success: true,
            message: "Categories fetched succesfully!",
            data: categories,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// GET by Id
const getCategoryById = async(req, res) => {
    try{
        const id = parseInt(req.params.id);

        const existingCategory = await prisma.category.findUnique({
            where: {
                id,
            },
        });

        if (!existingCategory) {
            return res.status(404).json({
                success: false,
                message: "Category not found!",
            });
        };

        res.status(200).json({
            success: true,
            message: "Category fetched successfully!",
            data: existingCategory,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// PUt
const putCategory = async(req, res) => {
    try{
        const id = parseInt(req.params.id);

        const {name} = req.body;

        const existingCategory = await prisma.category.findUnique({
            where: {
                id,
            }
        });

        if (!existingCategory) {
            return res.status(404).json({
                success: false,
                message: "Category not found!",
            });
        };

        // Update Category
        const updatedCategory = await prisma.category.update({
            where: {
                id,
            },
            data: {
                name,
            }
        });

        
        res.status(200).json({
            success: true,
            message: "Category updated succesfully",
            data: updatedCategory,
        })
    } catch (error){
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// DELETE (not implemented in frontend)
const deleteCategory = async(req, res) => {
    try{
        const {id} = req.params;
        const cid = parseInt(id);

        const existingCategory = await prisma.category.findUnique({
            where:{
                id: cid,
            },
        });

        if(!existingCategory){
            return res.status(404).json({
                success: false,
                message: "Category not found!",
            });
        }

        // Delete
        const DeleteCategory = await prisma.category.delete({
            where: {
                id: cid,
            }
        });

        res.status(200).json({
            success: true,
            message: "Category deleted successfully!",
        })
    } catch (error){
        res.status(500).json({
            success: false,
            message: error.message,
         });
    }
};

module.exports = {
    createCategory,
    getCategories,
    getCategoryById,
    putCategory,
    deleteCategory,
}