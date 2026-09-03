const {z} = require("zod");

// create constant varibale (userSchmea) and store Zod schema (object) inside it
// zod validation schema/blueprint for an object
const userValidationSchema = z.object({
        name: z.string(),

        email: z.string().email("Invalid email address"),

        password: z
            .string()
            .min(6, "Password must be at least 6 characters")
            .regex(/[0-9]/, "Password must contain at one number")
            .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character"),
    });

    // constant function
    const validateUser = (req, res, next) => {
        try{
            // validate data sent by client(req.body) using userValidationSchema
            // "Take this data, check it against my schema, and if it's valid, return the parsed/validated data. If it's invalid, throw an error."
            userValidationSchema.parse(req.body);

            next(); // Continue to controller or middleware
        } catch (error){
            res.status(400).json({
                success: false,
                errors: error.issues,
            });

        }
    };

    module.exports = validateUser;

