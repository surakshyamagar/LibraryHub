
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  getBorrowingById,
  updateBorrowing,
} from "../../services/borrowingService";

function EditBorrowing() {
  const navigate = useNavigate();
  const { id } = useParams();

  // ==============================
  // STATE
  // ==============================

  const [borrowing, setBorrowing] = useState(null);
  const [dueDate, setDueDate] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // ==============================
  // FETCH BORROWING
  // ==============================

  const fetchBorrowing = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getBorrowingById(id);

      console.log(
        "Borrowing response:",
        response.data
      );

      const borrowingData =
        response.data.data || response.data;

      // Save borrowing data
      setBorrowing(borrowingData);

      // Convert backend date to YYYY-MM-DD
      if (borrowingData.dueDate) {
        const date = new Date(
          borrowingData.dueDate
        );

        const formattedDate =
          date.toISOString().split("T")[0];

        setDueDate(formattedDate);
      }
    } catch (error) {
      console.error(
        "Error fetching borrowing:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Failed to load borrowing record."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==============================
  // FETCH WHEN ID CHANGES
  // ==============================

  useEffect(() => {
    fetchBorrowing();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // ==============================
  // UPDATE BORROWING
  // ==============================

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous error
    setError("");

    // Check due date
    if (!dueDate) {
      setError("Please select a due date.");
      return;
    }

    try {
      setSaving(true);

      // Update borrowing
      await updateBorrowing(id, {
        dueDate,
      });

      alert(
        "Borrowing updated successfully!"
      );

      // Go back to borrowings page
      navigate("/borrowings");
    } catch (error) {
      console.error(
        "Error updating borrowing:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Failed to update borrowing."
      );
    } finally {
      setSaving(false);
    }
  };

  // ==============================
  // LOADING
  // ==============================

  if (loading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <p className="text-gray-600">
          Loading borrowing record...
        </p>
      </div>
    );
  }

  // ==============================
  // ERROR / NOT FOUND
  // ==============================

  if (error && !borrowing) {
    return (
      <div className="rounded-xl border border-red-100 bg-red-50 p-6">
        <p className="text-red-600">
          {error}
        </p>

        <button
          type="button"
          onClick={() =>
            navigate("/borrowings")
          }
          className="mt-4 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-700"
        >
          Back to Borrowings
        </button>
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
          onClick={() =>
            navigate("/borrowings")
          }
          className="mb-4 text-sm font-medium text-emerald-600 transition hover:text-emerald-700 hover:underline"
        >
          ← Back to Borrowings
        </button>

        <h1 className="text-3xl font-bold text-gray-900">
          Edit Borrowing
        </h1>

        <p className="mt-2 text-gray-500">
          Update the due date for this borrowing.
        </p>
      </div>

      {/* ==============================
          FORM
      ============================== */}

      <form
        onSubmit={handleSubmit}
        className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8"
      >

        {/* ERROR */}

        {error && (
          <div className="mb-6 rounded-lg border border-red-100 bg-red-50 p-4">
            <p className="text-sm text-red-600">
              {error}
            </p>
          </div>
        )}

        {/* ==============================
            USER INFORMATION
        ============================== */}

        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Borrowed By
          </label>

          <div className="rounded-lg border border-gray-100 bg-gray-50 px-4 py-3">
            <p className="font-medium text-gray-800">
              {borrowing?.user?.name ||
                `User #${borrowing?.userId}`}
            </p>

            {borrowing?.user?.email && (
              <p className="mt-1 text-sm text-gray-500">
                {borrowing.user.email}
              </p>
            )}
          </div>
        </div>

        {/* ==============================
            BOOK INFORMATION
        ============================== */}

        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Book
          </label>

          <div className="rounded-lg border border-gray-100 bg-gray-50 px-4 py-3">
            <p className="font-medium text-gray-800">
              {borrowing?.book?.title ||
                `Book #${borrowing?.bookId}`}
            </p>

            {borrowing?.book?.isbn && (
              <p className="mt-1 text-sm text-gray-500">
                ISBN: {borrowing.book.isbn}
              </p>
            )}
          </div>
        </div>

        {/* ==============================
            STATUS
        ============================== */}

        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Current Status
          </label>

          <div>
            <span
              className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                borrowing?.status === "RETURNED"
                  ? "bg-emerald-100 text-emerald-700"
                  : borrowing?.status === "OVERDUE"
                  ? "bg-red-100 text-red-700"
                  : "bg-amber-100 text-amber-700"
              }`}
            >
              {borrowing?.status}
            </span>
          </div>
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
            value={dueDate}
            onChange={(e) =>
              setDueDate(e.target.value)
            }
            disabled={
              borrowing?.status === "RETURNED"
            }
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-800 outline-none transition focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 disabled:cursor-not-allowed disabled:bg-gray-100"
          />

          <p className="mt-2 text-xs text-gray-500">
            You can change the due date while the book is still borrowed.
          </p>
        </div>

        {/* ==============================
            BUTTONS
        ============================== */}

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

          {/* Cancel */}

          <button
            type="button"
            onClick={() =>
              navigate("/borrowings")
            }
            className="rounded-lg border border-gray-300 px-5 py-2.5 font-medium text-gray-700 transition hover:bg-gray-50"
          >
            Cancel
          </button>

          {/* Update */}

          <button
            type="submit"
            disabled={
              saving ||
              borrowing?.status === "RETURNED"
            }
            className="rounded-lg bg-emerald-600 px-5 py-2.5 font-medium text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saving
              ? "Saving..."
              : "Update Borrowing"}
          </button>

        </div>
      </form>
    </div>
  );
}

export default EditBorrowing;

