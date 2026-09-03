const prisma = require("../../config/prisma");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginUser = async(req, res) => {
    try {
        // Read email and password from request
        const {email, password} = req.body;

         // Find user by email
        const user = await prisma.User.findUnique({
            where: {
                email,
            },
        });

        // Check if user exists
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

         // Compare entered password with hashed password
        const isPasswordMatch = await bcrypt.compare(
            password,
            user.password
        );

        // Password incorrect
        if(!isPasswordMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentiala",
            });
        }

        // Generate  JWT & Creates a Signed JWT
        // sign() => create & digitally sign jwt
        const token = jwt.sign(
            // 1st argument : payload (info i want to put inside token)
            {
                userId: user.id,
                name: user.name,
                role: user.role,
            },
            // 2nd Argument
            // used by server to sign the token , not go inside token
            // process.env => look for (jwt) inside env
            process.env.JWT_SECRET,
            // 3rd argument
            // tells jwt: expire in 1h
            {
                expiresIn: process.env.JWT_EXPIRES_IN,
            }
        );

        // Login sucessfull (Return token) Send token to client
        res.status(200).json({
            success: true,
            message: "Login Successful",
            token,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};
module.exports = {
    loginUser,
};