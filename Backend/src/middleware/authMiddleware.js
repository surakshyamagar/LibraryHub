// when user log ins nad gets and paste token & try to acces its data

// check if user is logged in before calling getUser() function from app,js
const jwt = require("jsonwebtoken");

// req: header, body, params
const authenticateUser = (req, res, next) => {

    try{
        // req.header.autho => Bearer abc123
        const authHeader = req.headers.authorization;

        // Check if token exists
        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: "Authorization header missing",
            });
        }
        //   eg: Bearer abc.xyz.123
        // split; ["Bearer", "abc.xyz.123"]
          const token = authHeader.split(" ")[1];
          
           // checks: Is this token genuine?, Has someone modified it?, has it expired?
            //  and if it is, open it and return the user information stored inside.
           const decoded = jwt.verify(
                token,
                process.env.JWT_SECRET
            );
            
            // Save the logged-in user's information inside the request.
            // makes req = {
            //     body: {...},
            //     headers: {...},

            //     user: {
            //         id: 1,
            //         email: "renu@gmail.com",
            //         iat: 1750000000,
            //         exp: 1750003600
            //     }
            // }
            // if vrify vaid
            req.user = decoded;

            // Authentication Passed -> got to controller (getUser), another middleware -> DB -> return users
            next();

    // if verfy not valid
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token",
        });
    }

};

module.exports = authenticateUser;