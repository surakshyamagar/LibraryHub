// ==========================================
// ADMIN AUTHORIZATION
// Only ADMIN can access


// ==========================================
const authorizeAdmin = (req, res, next) => {

    // Check if user is logged in
    if (!req.user) {
        return res.status(401).json({
            success: false,
            message: "Please login first",
        });
    }

    // Check if user is ADMIN
    if (req.user.role !== "ADMIN") {
        return res.status(403).json({
            success: false,
            message: "Admin access required",
        });
    }

    // User is ADMIN
    next();
};


// ==========================================
// STAFF AUTHORIZATION
// ADMIN or STAFF can access
// ==========================================
const authorizeStaff = (req, res, next) => {

    // Check if user is logged in
    if (!req.user) {
        return res.status(401).json({
            success: false,
            message: "Please login first",
        });
    }

    // Allow ADMIN and STAFF
    // Check if user is ADMIN or STAFF
    if (
        req.user.role !== "ADMIN" &&
        req.user.role !== "STAFF"
    ) {
        return res.status(403).json({
            success: false,
            message: "Admin or Staff access required",
        });
    }

    // User is ADMIN or STAFF
    next();
};


module.exports = {
    authorizeAdmin,
    authorizeStaff,
};

// req.user (from authmiddleware) have;
// {
//     id: 1,
//     email: "admin@gmail.com",
//     role: "ADMIN"
// }