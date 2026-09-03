const { default: z } = require("zod");

const categoryValidationSchema = z.object({
    name: z .string() .trim() .min(1, "Name is required")
});

const validateCategory = (req, res,next) => {
    try{
        categoryValidationSchema.parse(req.body);
        next();
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Category validation failed!",
            errors: error.issues.map((issue)=> ({
                field: issue.path[0],
                message: issue.message,
            })),
        });
    }
};

module.exports = validateCategory;