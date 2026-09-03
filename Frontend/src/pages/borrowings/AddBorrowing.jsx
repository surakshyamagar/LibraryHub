
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { createBorrowing } from "../../services/borrowingService";
import { getUsers } from "../../services/userService";
import { getBooks } from "../../services/bookService";

function AddBorrowing() {
  const navigate = useNavigate();

  // ==============================
  // STATE
  // ==============================

  const [users, setUsers] = useState([]);
  const [books, setBooks] = useState([]);

  const [formData, setFormData] = useState({
    userId: "",
    bookId: "",
    dueDate: "",
  });

  const [loading, setLoading] = useState(false);
  const [fetchingData, setFetchingData] = useState(true);
  const [error, setError] = useState("");

  // ==============================
  // FETCH USERS AND BOOKS
  // ==============================

  const fetchFormData = async () => {
    try {
      setFetchingData(true);
      setError("");

      // Fetch users and books at the same time
      const [usersResponse, booksResponse] = await Promise.all([
        getUsers(),
        getBooks(),
      ]);

      console.log("Users response:", usersResponse.data);
      console.log("Books response:", booksResponse.data);

      // Save users in state
      setUsers(usersResponse.data.data || usersResponse.data);

      // Save books in state
      setBooks(booksResponse.data.data || booksResponse.data);
    } catch (error) {
      console.error("Error fetching form data:", error);

      setError(
        error.response?.data?.message ||
          "Failed to load users and books."
      );
    } finally {
      setFetchingData(false);
    }
  };

  // Run when page first loads
  useEffect(() => {
    fetchFormData();
  }, []);

  // ==============================
  // HANDLE INPUT CHANGE
  // ==============================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  // ==============================
  // HANDLE FORM SUBMIT
  // ==============================

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous error
    setError("");

    // Basic frontend validation
    if (
      !formData.userId ||
      !formData.bookId ||
      !formData.dueDate
    ) {
      setError(
        "Please select a user, book, and due date."
      );

      return;
    }

    try {
      setLoading(true);

      // Convert userId and bookId
      // from strings to numbers
      const borrowingData = {
        userId: Number(formData.userId),
        bookId: Number(formData.bookId),
        dueDate: formData.dueDate,
      };

      console.log(
        "Creating borrowing:",
        borrowingData
      );

      // Create borrowing
      await createBorrowing(borrowingData);

      // Show success message
      alert("Book borrowed successfully!");

      // Go back to borrowings page
      navigate("/borrowings");
    } catch (error) {
      console.error(
        "Error creating borrowing:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Failed to create borrowing."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==============================
  // LOADING USERS AND BOOKS
  // ==============================

  if (fetchingData) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <p className="text-gray-600">
          Loading users and books...
        </p>
      </div>
    );
  }

  // ==============================
  // PAGE
  // ==============================

  return (
    <div className="mx-auto max-w-3xl">

      {/* ==============================
          HEADER
      ============================== */}

      <div className="mb-8">
        <button
          type="button"
          onClick={() => navigate("/borrowings")}
          className="mb-4 text-sm font-medium text-emerald-600 transition hover:text-emerald-700 hover:underline"
        >
          ← Back to Borrowings
        </button>

        <h1 className="text-3xl font-bold text-gray-900">
          Create New Borrowing
        </h1>

        <p className="mt-2 text-gray-500">
          Select a user and book to create a new borrowing record.
        </p>
      </div>

      {/* ==============================
          ERROR MESSAGE
      ============================== */}

      {error && (
        <div className="mb-6 rounded-lg border border-red-100 bg-red-50 p-4">
          <p className="text-sm text-red-600">
            {error}
          </p>
        </div>
      )}

      {/* ==============================
          FORM
      ============================== */}

      <form
        onSubmit={handleSubmit}
        className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8"
      >

        {/* ==============================
            SELECT USER
        ============================== */}

        <div className="mb-6">
          <label
            htmlFor="userId"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Select User
          </label>

          <select
            id="userId"
            name="userId"
            value={formData.userId}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-800 outline-none transition focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
          >
            <option value="">
              Select a user
            </option>

            {users.map((user) => (
              <option
                key={user.id}
                value={user.id}
              >
                {user.name} ({user.email})
              </option>
            ))}
          </select>
        </div>

        {/* ==============================
            SELECT BOOK
        ============================== */}

        <div className="mb-6">
          <label
            htmlFor="bookId"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Select Book
          </label>

          <select
            id="bookId"
            name="bookId"
            value={formData.bookId}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-800 outline-none transition focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
          >
            <option value="">
              Select a book
            </option>

            {books.map((book) => (
              <option
                key={book.id}
                value={book.id}
                disabled={book.available <= 0}
              >
                {book.title} — Available: {book.available}
                {book.available <= 0
                  ? " (Not Available)"
                  : ""}
              </option>
            ))}
          </select>
        </div>

        {/* ==============================
            DUE DATE
        ============================== */}

        <div className="mb-8">
          <label
            htmlFor="dueDate"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Due Date
          </label>

          <input
            id="dueDate"
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            min={
              new Date()
                .toISOString()
                .split("T")[0]
            }
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-800 outline-none transition focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
          />

          <p className="mt-2 text-xs text-gray-500">
            Select the date when the book should be returned.
          </p>
        </div>

        {/* ==============================
            BUTTONS
        ============================== */}

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

          {/* Cancel */}
          <button
            type="button"
            onClick={() => navigate("/borrowings")}
            className="rounded-lg border border-gray-300 px-5 py-2.5 font-medium text-gray-700 transition hover:bg-gray-50"
          >
            Cancel
          </button>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-emerald-600 px-5 py-2.5 font-medium text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? "Creating..."
              : "Create Borrowing"}
          </button>

        </div>
      </form>
    </div>
  );
}

export default AddBorrowing;

