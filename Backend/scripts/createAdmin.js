const prisma = require("../src/config/prisma");
const bcrypt = require("bcrypt");

const createAdmin = async () => {
    try {
        // Check if ADMIN already exists
        const existingAdmin = await prisma.user.findUnique({
            where: {
                email: "admin@library.com",
            },
        });

        // If ADMIN already exists, stop
        if (existingAdmin) {
            console.log("Admin already exists!");
            return;
        }

        // Hash ADMIN password
        const hashedPassword = await bcrypt.hash(
            "Admin@123",
            10
        );

        // Create ADMIN
        const admin = await prisma.user.create({
            data: {
                name: "Library Admin",
                email: "admin@library.com",
                password: hashedPassword,
                role: "ADMIN",
            },
        });

        console.log("Admin created successfully!");

        console.log({
            id: admin.id,
            name: admin.name,
            email: admin.email,
            role: admin.role,
        });

    } catch (error) {
        console.error("Error creating admin:", error);

    } finally {
        await prisma.$disconnect();
    }
};

createAdmin();