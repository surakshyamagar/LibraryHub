const { PrismaClient } = require("@prisma/client");

// create prisma object from class PrismaClient
    // later, prisma. = act as messenger btween js code and DB
    //  prisma = reads (prisma.schema)
        //      = knows url
        //       = models.tables
        //       = methods (find many, create, update)  
const prisma = new PrismaClient();

module.exports = prisma;