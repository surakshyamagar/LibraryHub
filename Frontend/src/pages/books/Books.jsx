
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getBooks,
  deleteBook,
} from "../../services/bookService";

import { useAuth } from "../../context/AuthContext";


function Books() {
  const navigate = useNavigate();

  // Get logged-in user
  const { user } = useAuth();

  // Get user role
  const role = user?.role?.toUpperCase();

  // ADMIN and STAFF can manage books
  const canManageBooks =
    role === "ADMIN" || role === "STAFF";


  // ==============================
  // STATE
  // ==============================

  const [books, setBooks] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const [deletingId, setDeletingId] = useState(null);

  // Search
  const [searchTerm, setSearchTerm] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);

  const booksPerPage = 5;


  // ==============================
  // FETCH BOOKS
  // ==============================

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getBooks();

        console.log("Books response:", response.data);

        setBooks(
          response.data.data ||
          response.data ||
          []
        );

      } catch (error) {
        console.error(
          "Error fetching books:",
          error
        );

        setError(
          error.response?.data?.message ||
          "Failed to load books."
        );

      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);


  // ==============================
  // SEARCH
  // ==============================

  const filteredBooks = useMemo(() => {
    const search = searchTerm
      .toLowerCase()
      .trim();

    if (!search) {
      return books;
    }

    return books.filter((book) => {

      const title =
        book.title?.toLowerCase() || "";

      const isbn =
        book.isbn?.toLowerCase() || "";

      const authorName =
        book.author?.name?.toLowerCase() || "";

      const categoryName =
        book.category?.name?.toLowerCase() || "";

      return (
        title.includes(search) ||
        isbn.includes(search) ||
        authorName.includes(search) ||
        categoryName.includes(search)
      );
    });

  }, [books, searchTerm]);


  // ==============================
  // PAGINATION
  // ==============================

  const totalPages = Math.ceil(
    filteredBooks.length / booksPerPage
  );

  const startIndex =
    (currentPage - 1) *
    booksPerPage;

  const endIndex =
    startIndex + booksPerPage;

  const currentBooks =
    filteredBooks.slice(
      startIndex,
      endIndex
    );


  // ==============================
  // SEARCH CHANGE
  // ==============================

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);

    // Go back to first page
    // when searching
    setCurrentPage(1);
  };


  // ==============================
  // DELETE BOOK
  // ==============================

  const handleDelete = async (
    id,
    title
  ) => {

    const confirmed = window.confirm(
      `Are you sure you want to delete "${title}"?`
    );

    if (!confirmed) {
      return;
    }

    try {

      setDeletingId(id);

      setError("");

      setSuccess("");

      await deleteBook(id);

      // Remove deleted book
      // from current state
      setBooks((previousBooks) =>
        previousBooks.filter(
          (book) =>
            book.id !== id
        )
      );

      setSuccess(
        "Book deleted successfully."
      );

      // Hide success message
      // after 3 seconds
      setTimeout(() => {
        setSuccess("");
      }, 3000);

    } catch (error) {

      console.error(
        "Error deleting book:",
        error
      );

      setError(
        error.response?.data?.message ||
        "Failed to delete book."
      );

    } finally {

      setDeletingId(null);

    }
  };


  // ==============================
  // LOADING
  // ==============================

  if (loading) {

    return (
      <div className="flex min-h-[400px] items-center justify-center">

        <div className="text-center">

          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-emerald-600" />

          <p className="text-gray-500">
            Loading books...
          </p>

        </div>

      </div>
    );
  }


  // ==============================
  // PAGE
  // ==============================

  return (

    <div className="space-y-6">


      {/* ================================= */}
      {/* PAGE HEADER */}
      {/* ================================= */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>

          <h1 className="text-3xl font-bold text-gray-800">
            Books
          </h1>

          <p className="mt-2 text-gray-500">
            Browse and manage books in the library.
          </p>

        </div>


        {/* Add Book */}

        {canManageBooks && (

          <button
            onClick={() =>
              navigate("/books/add")
            }
            className="rounded-lg bg-emerald-600 px-5 py-3 font-medium text-white shadow-sm transition hover:bg-emerald-700"
          >
            + Add New Book
          </button>

        )}

      </div>


      {/* ================================= */}
      {/* SUCCESS MESSAGE */}
      {/* ================================= */}

      {success && (

        <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-700">

          {success}

        </div>

      )}


      {/* ================================= */}
      {/* ERROR MESSAGE */}
      {/* ================================= */}

      {error && (

        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">

          {error}

        </div>

      )}


      {/* ================================= */}
      {/* SEARCH */}
      {/* ================================= */}

      <div className="rounded-xl bg-white p-4 shadow-sm">

        <div className="relative">

          {/* Search Icon */}

          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">

            🔍

          </span>


          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search by title, ISBN, author or category..."
            className="w-full rounded-lg border border-gray-300 py-3 pl-11 pr-4 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
          />

        </div>


        {/* Search Result Count */}

        <div className="mt-3 text-sm text-gray-500">

          {searchTerm ? (

            <>
              Showing{" "}
              <span className="font-semibold text-gray-700">
                {filteredBooks.length}
              </span>{" "}
              result
              {filteredBooks.length !== 1 &&
                "s"}{" "}
              for "{searchTerm}"
            </>

          ) : (

            <>
              Total books:{" "}
              <span className="font-semibold text-gray-700">
                {books.length}
              </span>
            </>

          )}

        </div>

      </div>


      {/* ================================= */}
      {/* DESKTOP TABLE */}
      {/* ================================= */}

      <div className="hidden overflow-hidden rounded-xl bg-white shadow-sm md:block">

        {currentBooks.length === 0 ? (

          <div className="p-12 text-center">

            <div className="mb-4 text-5xl">
              📚
            </div>

            <h3 className="text-lg font-semibold text-gray-800">
              No books found
            </h3>

            <p className="mt-2 text-gray-500">
              {searchTerm
                ? "Try a different search term."
                : "There are no books in the library yet."
              }
            </p>

          </div>

        ) : (

          <div className="overflow-x-auto">

            <table className="w-full min-w-[800px]">

              {/* TABLE HEADER */}

              <thead className="border-b bg-gray-50">

                <tr>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                    ID
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Book
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                    ISBN
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Author
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Category
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Availability
                  </th>

                  {canManageBooks && (

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Actions
                    </th>

                  )}

                </tr>

              </thead>


              {/* TABLE BODY */}

              <tbody className="divide-y divide-gray-100">

                {currentBooks.map((book) => (

                  <tr
                    key={book.id}
                    className="transition hover:bg-emerald-50/40"
                  >

                    {/* ID */}

                    <td className="px-6 py-4 text-sm text-gray-500">
                      #{book.id}
                    </td>


                    {/* BOOK */}

                    <td className="px-6 py-4">

                      <div>

                        <p className="font-semibold text-gray-800">
                          {book.title}
                        </p>

                        {book.publishedYear && (

                          <p className="mt-1 text-xs text-gray-400">
                            Published:{" "}
                            {book.publishedYear}
                          </p>

                        )}

                      </div>

                    </td>


                    {/* ISBN */}

                    <td className="px-6 py-4 text-sm text-gray-600">
                      {book.isbn || "-"}
                    </td>


                    {/* AUTHOR */}

                    <td className="px-6 py-4 text-sm text-gray-600">
                      {book.author?.name || "-"}
                    </td>


                    {/* CATEGORY */}

                    <td className="px-6 py-4 text-sm text-gray-600">
                      {book.category?.name || "-"}
                    </td>


                    {/* AVAILABILITY */}

                    <td className="px-6 py-4">

                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                          book.available > 0
                            ? "bg-green-50 text-green-700"
                            : "bg-red-50 text-red-700"
                        }`}
                      >

                        {book.available > 0
                          ? `${book.available} Available`
                          : "Unavailable"
                        }

                      </span>

                    </td>


                    {/* ACTIONS */}

                    {canManageBooks && (

                      <td className="px-6 py-4">

                        <div className="flex gap-2">

                          {/* EDIT */}

                          <button
                            onClick={() =>
                              navigate(
                                `/books/edit/${book.id}`
                              )
                            }
                            className="rounded-lg bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-600 transition hover:bg-emerald-100"
                          >
                            Edit
                          </button>


                          {/* DELETE */}

                          <button
                            onClick={() =>
                              handleDelete(
                                book.id,
                                book.title
                              )
                            }
                            disabled={
                              deletingId === book.id
                            }
                            className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
                          >

                            {deletingId === book.id
                              ? "Deleting..."
                              : "Delete"
                            }

                          </button>

                        </div>

                      </td>

                    )}

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>


      {/* ================================= */}
      {/* MOBILE BOOK CARDS */}
      {/* ================================= */}

      <div className="space-y-4 md:hidden">

        {currentBooks.length === 0 ? (

          <div className="rounded-xl bg-white p-10 text-center shadow-sm">

            <div className="mb-4 text-5xl">
              📚
            </div>

            <h3 className="font-semibold text-gray-800">
              No books found
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              {searchTerm
                ? "Try a different search term."
                : "There are no books in the library yet."
              }
            </p>

          </div>

        ) : (

          currentBooks.map((book) => (

            <div
              key={book.id}
              className="rounded-xl bg-white p-5 shadow-sm transition hover:shadow-md"
            >

              {/* BOOK HEADER */}

              <div className="flex items-start justify-between gap-4">

                <div>

                  <h3 className="font-semibold text-gray-800">
                    {book.title}
                  </h3>

                  <p className="mt-1 text-xs text-gray-400">
                    Book ID: #{book.id}
                  </p>

                </div>


                <span
                  className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
                    book.available > 0
                      ? "bg-green-50 text-green-700"
                      : "bg-red-50 text-red-700"
                  }`}
                >

                  {book.available > 0
                    ? `${book.available} Available`
                    : "Unavailable"
                  }

                </span>

              </div>


              {/* BOOK DETAILS */}

              <div className="mt-5 space-y-3 border-t pt-4">

                <div className="flex justify-between gap-4">

                  <span className="text-sm text-gray-500">
                    ISBN
                  </span>

                  <span className="text-right text-sm font-medium text-gray-700">
                    {book.isbn || "-"}
                  </span>

                </div>


                <div className="flex justify-between gap-4">

                  <span className="text-sm text-gray-500">
                    Author
                  </span>

                  <span className="text-right text-sm font-medium text-gray-700">
                    {book.author?.name || "-"}
                  </span>

                </div>


                <div className="flex justify-between gap-4">

                  <span className="text-sm text-gray-500">
                    Category
                  </span>

                  <span className="text-right text-sm font-medium text-gray-700">
                    {book.category?.name || "-"}
                  </span>

                </div>


                {book.publishedYear && (

                  <div className="flex justify-between gap-4">

                    <span className="text-sm text-gray-500">
                      Published
                    </span>

                    <span className="text-sm font-medium text-gray-700">
                      {book.publishedYear}
                    </span>

                  </div>

                )}

              </div>


              {/* MOBILE ACTIONS */}

              {canManageBooks && (

                <div className="mt-5 flex gap-3 border-t pt-4">

                  <button
                    onClick={() =>
                      navigate(
                        `/books/edit/${book.id}`
                      )
                    }
                    className="flex-1 rounded-lg bg-emerald-50 px-4 py-2.5 text-sm font-medium text-emerald-600 transition hover:bg-emerald-100"
                  >
                    Edit
                  </button>


                  <button
                    onClick={() =>
                      handleDelete(
                        book.id,
                        book.title
                      )
                    }
                    disabled={
                      deletingId === book.id
                    }
                    className="flex-1 rounded-lg bg-red-50 px-4 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-100 disabled:opacity-50"
                  >
                    {deletingId === book.id
                      ? "Deleting..."
                      : "Delete"
                    }
                  </button>

                </div>

              )}

            </div>

          ))

        )}

      </div>


      {/* ================================= */}
      {/* PAGINATION */}
      {/* ================================= */}

      {totalPages > 1 && (

        <div className="flex flex-col gap-4 rounded-xl bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">

          {/* RESULT INFO */}

          <p className="text-sm text-gray-500">

            Showing{" "}

            <span className="font-semibold text-gray-700">
              {startIndex + 1}
            </span>

            {" "}to{" "}

            <span className="font-semibold text-gray-700">
              {Math.min(
                endIndex,
                filteredBooks.length
              )}
            </span>

            {" "}of{" "}

            <span className="font-semibold text-gray-700">
              {filteredBooks.length}
            </span>

            {" "}books

          </p>


          {/* PAGINATION BUTTONS */}

          <div className="flex items-center gap-2">

            {/* PREVIOUS */}

            <button
              onClick={() =>
                setCurrentPage(
                  (previousPage) =>
                    previousPage - 1
                )
              }
              disabled={currentPage === 1}
              className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-600 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Previous
            </button>


            {/* PAGE NUMBERS */}

            <div className="hidden items-center gap-1 sm:flex">

              {Array.from(
                { length: totalPages },
                (_, index) => index + 1
              ).map((page) => (

                <button
                  key={page}
                  onClick={() =>
                    setCurrentPage(page)
                  }
                  className={`h-9 w-9 rounded-lg text-sm font-medium transition ${
                    currentPage === page
                      ? "bg-emerald-600 text-white"
                      : "text-gray-600 hover:bg-emerald-50 hover:text-emerald-600"
                  }`}
                >
                  {page}
                </button>

              ))}

            </div>


            {/* MOBILE PAGE INDICATOR */}

            <span className="text-sm text-gray-600 sm:hidden">

              {currentPage} / {totalPages}

            </span>


            {/* NEXT */}

            <button
              onClick={() =>
                setCurrentPage(
                  (previousPage) =>
                    previousPage + 1
                )
              }
              disabled={
                currentPage === totalPages
              }
              className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-600 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
            </button>

          </div>

        </div>

      )}

    </div>
  );
}


export default Books;

