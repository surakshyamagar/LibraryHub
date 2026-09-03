library-management-api/
│
├── prisma/
│   ├── schema.prisma
│   └── migrations/
│
├── src/
│   │
│   ├── config/
│   │   └── prisma.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── userController.js
│   │   ├── authorController.js
│   │   ├── categoryController.js
│   │   ├── bookController.js
│   │   └── borrowController.js
│   │
│   ├── middleware/
│   │   ├── validateUser.js
│   │   ├── authMiddleware.js
│   │   ├── roleMiddleware.js
│   │   └── errorMiddleware.js
│   │
│   ├── routes/
│   │   ├── index.js
│   │   ├── authRoutes.js
│   │   ├── userRoutes.js
│   │   ├── authorRoutes.js
│   │   ├── categoryRoutes.js
│   │   ├── bookRoutes.js
│   │   └── borrowRoutes.js
│   │
│   ├── services/             ← Later
│   │   ├── authService.js
│   │   ├── userService.js
│   │   ├── bookService.js
│   │   └── borrowService.js
│   │
│   ├── app.js
│   └── server.js
│
├── .env
├── prisma.config.ts
├── package.json
└── README.md


| Phase                    | Status     |
| ------------------------ | ---------- |
| Node/Express Setup       | ✅ Complete |
| PostgreSQL Setup         | ✅ Complete |
| Prisma 7 Setup           | ✅ Complete |
| Prisma Migration         | ✅ Complete |
| Prisma Client            | ✅ Complete |
| Express Middleware       | ✅ Complete |
| Database Connection      | ✅ Complete |
| User Registration        | ✅ Complete |
| Zod Validation           | ✅ Complete |
| Password Hashing         | ✅ Complete |
| Login                    | ✅ Complete |
| JWT                      | ✅ Complete |
| Auth Middleware          | ✅ Complete |
| Get All Users            | ✅  |
| Get User by ID           | ✅      |
| Update User              | ✅          |
| Delete User              | ✅          |
| User CRUD Complete       | ✅          |
| Role Authorization       | ✅          |
| Author CRUD              | ✅          |
| Category CRUD            | ✅          |
| Book CRUD                | ✅          |
| Search/Filter/Pagination | ⏳          |
| Borrow System              ✅
  Borrow Validation        | ⏳          |
| Return Book              | ⏳          |
| Refresh Tokens           | ⏳          |
| Global Error Handling    | ⏳          |
| Service Layer            | ⏳          |
| Repository Layer         | ⏳          |
| Postman Documentation    | ⏳          |
| README                   | ⏳          |
| Deployment               | ⏳          |

ADMIN
│
├── View all users              ✅
├── View user by ID             ✅
├── Update users                ✅
├── Change roles                ✅
└── Delete users                ✅


STAFF
│
├── View all users              ✅
├── View user by ID             ✅
├── Update MEMBER               ✅
├── Update STAFF                ✅
├── Update ADMIN                ❌
├── Change roles                ❌
└── Delete users                ❌


MEMBER
│
├── View all users              ❌
├── View user by ID             ❌
├── Update other users          ❌
├── Change roles                ❌
└── Delete users                ❌

Author
  │
  │ 1
  │
  │
  │ many
  ▼
Book
  ▲
  │ many
  │
  │ 1
  │
Category

Library Management System
│
├── Backend
│   ├── Node.js
│   ├── Express
│   ├── Prisma
│   └── PostgreSQL
│
└── Frontend
    ├── React
    ├── Vite
    ├── React Router
    ├── Axios
    └── Tailwind CSS