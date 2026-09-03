const { default: z } = require("zod");

const authorValidationSchema = z. object({
    name: z .string() .trim() .min(1, "Author name is required"),
    bio: z .string() .trim() .optional()
});

const validateAuthor = (req, res, next) => {
    try{
        authorValidationSchema.parse(req.body);
        next();
    } catch (error) {
        return res.status(400).json({
            success: false,
            message:"Author validation failed",
            errors: error.issues.map((issue)=>({
                field: issue.path[0],
                message: issue.message,
            })),
        });
    }
};

module.exports = validateAuthor;