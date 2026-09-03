const prisma = require("../config/prisma");

const authorizeUserUpdate = async (req, res, next) => {
    try {
        // Logged-in user's information
        const loggedInUser = req.user;

        // Get the ID of the user we want to update
        const targetUserId = Number(req.params.id);

        // Find the target user in database
        const targetUser = await prisma.user.findUnique({
            where: {
                id: targetUserId,
            },
            select: {
                id: true,
                role: true,
            },
        });

        // Target user does not exist
        if (!targetUser) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // ADMIN can update anyone
        if (loggedInUser.role === "ADMIN") {
            return next();
        }

        // STAFF cannot update ADMIN
        if (
            loggedInUser.role === "STAFF" &&
            targetUser.role === "ADMIN"
        ) {
            return res.status(403).json({
                success: false,
                message: "Staff cannot update an Admin",
            });
        }

        // STAFF can update MEMBER and STAFF
        if (loggedInUser.role === "STAFF") {
            return next();
        }

        // Everyone else is denied
        return res.status(403).json({
            success: false,
            message: "You do not have permission to update this user",
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = authorizeUserUpdate;