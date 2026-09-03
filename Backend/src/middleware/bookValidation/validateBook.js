const { default: z } = require("zod");

const bookValidationSchema = z.object({
    title: z
        .string()
        .trim()
        .min(1, "Book title is required"),

    isbn: z
        .string()
        .trim()
        .regex(/^\d{13}$/, "ISBN must contain exactly 13 digits"),

    publishedYear: z
                .number()
                .int("Published year must be an integer")
                .positive("Published year must be positive")
                .optional(),

    totalCopies: z
                .number()
                .int("Total copies must be an integer")
                .min (1, "Total copies must be at least 1"),

    authorId: z
            .number()
            .int("Auther ID must be an integer")
            .positive("Auther ID must be positive"),

    categoryId: z
            .number()
            .int("Category ID must be an integer")
            .positive("Category ID must be positive"),
});

const validateBook = (req, res, next) => {
    try{
        // request body by client = check and validate (if it matches the schema) = bookVlaidationschema
        bookValidationSchema.parse(req.body);
        next();
    } catch (error){
        return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors: error.issues.map((issue) => ({
                field: issue.path[0],
                message: issue.message,
            })),
        });
    }
};

module.exports = validateBook;