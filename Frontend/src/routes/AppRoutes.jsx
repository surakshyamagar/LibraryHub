

import { Routes, Route, Navigate} from "react-router-dom";
import Home from "../pages/public/Home";
import Unauthorized from "../pages/public/Unauthorized";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import MainLayout from "../components/layouts/MainLayout";
import ProtectedRoute from "../components/authentication/ProtectedRoute";
import RoleBasedRoute from "../components/authentication/RoleBasedRoute";
import Dashboard from "../pages/dashboard/Dashboard";
import Books from "../pages/books/Books";
import CreateBook from "../pages/books/AddBook";
import BookDetails from "../pages/books/BookDetails";
import EditBook from "../pages/books/EditBook";
import Authors from "../pages/authors/Authors";
import AddAuthor from "../pages/authors/AddAuthor";
import EditAuthor from "../pages/authors/EditAuthor";
import Categories from "../pages/categories/Categories";
import AddCategory from "../pages/categories/AddCategory";
import EditCategory from "../pages/categories/EditCategory";
import Borrowings from "../pages/borrowings/Borrowings";
import AddBorrowing from "../pages/borrowings/AddBorrowing";
import EditBorrowing from "../pages/borrowings/EditBorrowing";
import MyBorrowings from "../pages/borrowings/MyBorrowings";


function AppRoutes() {
  return (
    <Routes>

      {/* =====================================================
          PUBLIC PAGES
      ===================================================== */}

      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      <Route
        path="/unauthorized"
        element={<Unauthorized />}
      />


      {/* =====================================================
          PROTECTED ROUTES
          Only logged-in users can access these
      ===================================================== */}

      <Route element={<ProtectedRoute />}>


        {/* =================================================
            ALL LOGGED-IN USERS
            MEMBER + STAFF + ADMIN
        ================================================= */}

        <Route element={<MainLayout />}>

          {/* Dashboard */}

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />


          {/* Books */}

          <Route
            path="/books"
            element={<Books />}
          />


          {/* Member's own borrowings */}

          <Route
            path="/my-borrowings"
            element={<MyBorrowings />}
          />

        </Route>


        {/* =================================================
            STAFF + ADMIN ONLY
        ================================================= */}

        <Route
          element={
            <RoleBasedRoute
              allowedRoles={["ADMIN", "STAFF"]}
            />
          }
        >

          <Route element={<MainLayout />}>


            {/* =============================================
                AUTHOR MANAGEMENT
            ============================================= */}

            <Route
              path="/authors"
              element={<Authors />}
            />

            <Route
              path="/authors/add"
              element={<AddAuthor />}
            />

            <Route
              path="/authors/edit/:id"
              element={<EditAuthor />}
            />


            {/* =============================================
                CATEGORY MANAGEMENT
            ============================================= */}

            <Route
              path="/categories"
              element={<Categories />}
            />

            <Route
              path="/categories/add"
              element={<AddCategory />}
            />

            <Route
              path="/categories/edit/:id"
              element={<EditCategory />}
            />


            {/* =============================================
                BOOK MANAGEMENT
            ============================================= */}

            <Route
              path="/books/add"
              element={<CreateBook />}
            />

            <Route
              path="/books/edit/:id"
              element={<EditBook />}
            />

            <Route
              path="/books/:id"
              element={<BookDetails />}
            />


            {/* =============================================
                BORROWING MANAGEMENT
                STAFF + ADMIN ONLY
            ============================================= */}

            <Route
              path="/borrowings"
              element={<Borrowings />}
            />

            <Route
              path="/borrowings/add"
              element={<AddBorrowing />}
            />

            <Route
              path="/borrowings/edit/:id"
              element={<EditBorrowing />}
            />

          </Route>

        </Route>

      {/* ANY UNKNOWN URL → HOME */}
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

        </Route>
    </Routes>
  );
}

export default AppRoutes;