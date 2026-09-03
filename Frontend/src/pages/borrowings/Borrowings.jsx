import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  returnBorrowing,
  searchBorrowings,
  paginateBorrowings,
} from "../../services/borrowingService";

function Borrowings() {
  const navigate = useNavigate();

  // ==========================================
  // BORROWINGS
  // ==========================================

  const [borrowings, setBorrowings] = useState([]);

  // ==========================================
  // LOADING & ERROR
  // ==========================================

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==========================================
  // SEARCH
  // ==========================================

  const [search, setSearch] = useState("");

  // ==========================================
  // PAGINATION
  // ==========================================

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);

  // Number of records shown per page
  const recordsPerPage = 10;

  // ==========================================
  // LOAD BORROWINGS WHEN PAGE OPENS
  // ==========================================

  useEffect(() => {
    fetchBorrowings(1);
  }, []);

  // ==========================================
  // FETCH PAGINATED BORROWINGS
  // ==========================================

  const fetchBorrowings = async (page = 1) => {
    try {
      setLoading(true);
      setError("");

      const response = await paginateBorrowings(
        page,
        recordsPerPage
      );

      console.log(
        "Pagination response:",
        response.data
      );

      // Set borrowing records
      setBorrowings(
        response.data.data || []
      );

      // Set current page
      setCurrentPage(
        response.data.pagination.currentPage
      );

      // Set total pages
      setTotalPages(
        response.data.pagination.totalPages
      );

      // Set total records
      setTotalRecords(
        response.data.pagination.totalRecords
      );
    } catch (error) {
      console.error(
        "Error fetching borrowings:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Failed to load borrowings."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // SEARCH BORROWINGS
  // ==========================================

  const handleSearch = async () => {
    // If search box is empty,
    // load paginated borrowings again
    if (!search.trim()) {
      fetchBorrowings(1);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await searchBorrowings(
        search
      );

      console.log(
        "Search response:",
        response.data
      );

      // Show search results
      setBorrowings(
        response.data.data || []
      );

      // Search endpoint is not paginated
      setCurrentPage(1);
      setTotalPages(1);

      setTotalRecords(
        response.data.count ||
          response.data.data?.length ||
          0
      );
    } catch (error) {
      console.error(
        "Search error:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Failed to search borrowings."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // CLEAR SEARCH
  // ==========================================

  const handleClearSearch = () => {
    setSearch("");

    // Load first page again
    fetchBorrowings(1);
  };

  // ==========================================
  // RETURN BOOK
  // ==========================================

  const handleReturn = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to return this book?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await returnBorrowing(id);

      // Reload current page
      fetchBorrowings(currentPage);
    } catch (error) {
      console.error(
        "Error returning book:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to return book."
      );
    }
  };

  // ==========================================
  // LOADING STATE
  // ==========================================

  if (loading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <p className="text-gray-600">
          Loading borrowings...
        </p>
      </div>
    );
  }

  // ==========================================
  // ERROR STATE
  // ==========================================

  if (error) {
    return (
      <div className="rounded-xl border border-red-100 bg-red-50 p-6">
        <p className="text-red-600">
          {error}
        </p>

        <button
          onClick={() =>
            fetchBorrowings(currentPage)
          }
          className="mt-4 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  // ==========================================
  // MAIN PAGE
  // ==========================================

  return (
    <div>

      {/* ==========================================
          HEADER
      ========================================== */}

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Borrowings
          </h1>

          <p className="mt-2 text-gray-500">
            Manage all book borrowing records.
          </p>
        </div>

        {/* ADD BORROWING */}

        <button
          onClick={() =>
            navigate("/borrowings/add")
          }
          className="rounded-lg bg-emerald-600 px-5 py-2.5 font-medium text-white transition hover:bg-emerald-700"
        >
          + New Borrowing
        </button>
      </div>

      {/* ==========================================
          SEARCH
      ========================================== */}

      <div className="mb-6 flex flex-col gap-3 sm:flex-row">

        {/* SEARCH INPUT */}

        <input
          type="text"
          placeholder="Search by user name, email, or book title..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
          className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-800 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
        />

        {/* SEARCH BUTTON */}

        <button
          onClick={handleSearch}
          className="rounded-lg bg-emerald-600 px-6 py-3 font-medium text-white transition hover:bg-emerald-700"
        >
          Search
        </button>

        {/* CLEAR BUTTON */}

        <button
          onClick={handleClearSearch}
          className="rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-700 transition hover:bg-gray-50"
        >
          Clear
        </button>
      </div>

      {/* ==========================================
          TOTAL BORROWINGS
      ========================================== */}

      <div className="mb-6">
        <p className="text-sm text-gray-500">
          Total Borrowings:{" "}
          <span className="font-semibold text-gray-900">
            {totalRecords}
          </span>
        </p>
      </div>

      {/* ==========================================
          EMPTY STATE
      ========================================== */}

      {borrowings.length === 0 ? (

        <div className="rounded-xl border border-gray-100 bg-white p-10 text-center shadow-sm">

          <div className="mb-4 text-5xl">
            📚
          </div>

          <h2 className="text-xl font-semibold text-gray-900">
            No Borrowings Found
          </h2>

          <p className="mt-2 text-gray-500">
            There are currently no borrowing records.
          </p>

          <button
            onClick={() =>
              navigate("/borrowings/add")
            }
            className="mt-6 rounded-lg bg-emerald-600 px-5 py-2.5 font-medium text-white transition hover:bg-emerald-700"
          >
            Create First Borrowing
          </button>
        </div>

      ) : (

        <>

          {/* ==========================================
              BORROWINGS TABLE
          ========================================== */}

          <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">

            <div className="overflow-x-auto">

              <table className="w-full min-w-[900px]">

                {/* TABLE HEADER */}

                <thead className="bg-gray-50">

                  <tr>

                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                      ID
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                      User
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                      Book
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                      Borrowed At
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                      Due Date
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                      Status
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                      Actions
                    </th>

                  </tr>

                </thead>

                {/* TABLE BODY */}

                <tbody>

                  {borrowings.map(
                    (borrowing) => (

                      <tr
                        key={borrowing.id}
                        className="border-t border-gray-100 transition hover:bg-gray-50"
                      >

                        {/* ID */}

                        <td className="px-6 py-4 text-sm text-gray-600">
                          #{borrowing.id}
                        </td>

                        {/* USER */}

                        <td className="px-6 py-4">

                          <p className="font-medium text-gray-800">
                            {borrowing.user?.name ||
                              `User #${borrowing.userId}`}
                          </p>

                          <p className="text-xs text-gray-500">
                            {borrowing.user?.email}
                          </p>

                        </td>

                        {/* BOOK */}

                        <td className="px-6 py-4">

                          <p className="font-medium text-gray-800">
                            {borrowing.book?.title ||
                              `Book #${borrowing.bookId}`}
                          </p>

                          <p className="text-xs text-gray-500">
                            ISBN:{" "}
                            {borrowing.book?.isbn}
                          </p>

                        </td>

                        {/* BORROWED DATE */}

                        <td className="px-6 py-4 text-sm text-gray-600">

                          {new Date(
                            borrowing.borrowedAt
                          ).toLocaleDateString()}

                        </td>

                        {/* DUE DATE */}

                        <td className="px-6 py-4 text-sm text-gray-600">

                          {new Date(
                            borrowing.dueDate
                          ).toLocaleDateString()}

                        </td>

                        {/* STATUS */}

                        <td className="px-6 py-4">

                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${
                              borrowing.status ===
                              "RETURNED"
                                ? "bg-emerald-100 text-emerald-700"
                                : borrowing.status ===
                                  "OVERDUE"
                                ? "bg-red-100 text-red-700"
                                : "bg-amber-100 text-amber-700"
                            }`}
                          >
                            {borrowing.status}
                          </span>

                        </td>

                        {/* ACTIONS */}

                        <td className="px-6 py-4">

                          <div className="flex flex-wrap gap-2">

                            {/* EDIT BUTTON */}

                            {borrowing.status !==
                              "RETURNED" && (

                              <button
                                onClick={() =>
                                  navigate(
                                    `/borrowings/edit/${borrowing.id}`
                                  )
                                }
                                className="rounded-lg border border-emerald-200 px-3 py-1.5 text-sm font-medium text-emerald-600 transition hover:bg-emerald-50"
                              >
                                Edit
                              </button>

                            )}

                            {/* RETURN BUTTON */}

                            {borrowing.status !==
                              "RETURNED" && (

                              <button
                                onClick={() =>
                                  handleReturn(
                                    borrowing.id
                                  )
                                }
                                className="rounded-lg border border-emerald-200 px-3 py-1.5 text-sm font-medium text-emerald-700 transition hover:bg-emerald-50"
                              >
                                Return
                              </button>

                            )}

                          </div>

                        </td>

                      </tr>

                    )
                  )}

                </tbody>

              </table>

            </div>

          </div>

          {/* ==========================================
              PAGINATION
          ========================================== */}

          {totalPages > 1 && (

            <div className="mt-6 flex flex-col gap-4 rounded-xl border border-gray-100 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">

              {/* PAGE INFORMATION */}

              <p className="text-sm text-gray-500">

                Page{" "}

                <span className="font-semibold text-gray-900">
                  {currentPage}
                </span>

                {" "}of{" "}

                <span className="font-semibold text-gray-900">
                  {totalPages}
                </span>

              </p>

              {/* PAGINATION BUTTONS */}

              <div className="flex gap-2">

                {/* PREVIOUS BUTTON */}

                <button
                  onClick={() =>
                    fetchBorrowings(
                      currentPage - 1
                    )
                  }
                  disabled={
                    currentPage === 1
                  }
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-gray-300 disabled:hover:bg-transparent disabled:hover:text-gray-700"
                >
                  Previous
                </button>

                {/* NEXT BUTTON */}

                <button
                  onClick={() =>
                    fetchBorrowings(
                      currentPage + 1
                    )
                  }
                  disabled={
                    currentPage ===
                    totalPages
                  }
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-gray-300 disabled:hover:bg-transparent disabled:hover:text-gray-700"
                >
                  Next
                </button>

              </div>

            </div>

          )}

        </>

      )}

    </div>
  );
}

export default Borrowings;

