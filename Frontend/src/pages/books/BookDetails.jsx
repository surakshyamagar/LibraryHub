import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getBookById } from "../../services/bookService";

function BookDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  // ==============================
  // STATE
  // ==============================

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==============================
  // FETCH BOOK DETAILS
  // ==============================

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getBookById(id);

        console.log(
          "Book details:",
          response.data
        );

        const bookData =
          response.data.data || response.data;

        setBook(bookData);

      } catch (error) {
        console.error(
          "Error fetching book:",
          error
        );

        setError(
          error.response?.data?.message ||
          "Failed to load book details."
        );

      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  // ==============================
  // LOADING
  // ==============================

  if (loading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <p className="text-gray-500">
          Loading book details...
        </p>
      </div>
    );
  }

  // ==============================
  // ERROR
  // ==============================

  if (error) {
    return (
      <div>

        <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-600">
          {error}
        </div>

        <button
          type="button"
          onClick={() => navigate("/books")}
          className="mt-4 rounded-lg bg-emerald-600 px-5 py-2.5 font-medium text-white transition hover:bg-emerald-700"
        >
          Back to Books
        </button>

      </div>
    );
  }

  // ==============================
  // BOOK NOT FOUND
  // ==============================

  if (!book) {
    return (
      <div className="rounded-xl border border-gray-100 bg-white p-8 shadow-sm">
        <p className="text-gray-500">
          Book not found.
        </p>
      </div>
    );
  }

  // ==============================
  // PAGE
  // ==============================

  return (
    <div>

      {/* ==============================
          HEADER
      ============================== */}

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>

          <h1 className="text-3xl font-bold text-gray-800">
            Book Details
          </h1>

          <p className="mt-2 text-gray-500">
            View detailed information about this book.
          </p>

        </div>


        {/* Back Button */}

        <button
          type="button"
          onClick={() => navigate("/books")}
          className="rounded-lg border border-gray-300 px-5 py-2.5 font-medium text-gray-600 transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700"
        >
          ← Back to Books
        </button>

      </div>


      {/* ==============================
          BOOK DETAILS CARD
      ============================== */}

      <div className="rounded-xl border border-gray-100 bg-white p-8 shadow-sm">

        {/* Card Header */}

        <div className="mb-8 border-b border-gray-100 pb-6">

          <p className="text-sm font-medium uppercase tracking-wide text-emerald-600">
            Library Book
          </p>

          <h2 className="mt-2 text-2xl font-bold text-gray-800">
            {book.title}
          </h2>

        </div>


        {/* Book Information */}

        <div className="grid gap-x-8 gap-y-8 md:grid-cols-2">

          {/* ==============================
              BOOK TITLE
          ============================== */}

          <div>

            <p className="text-sm font-medium text-gray-500">
              Title
            </p>

            <p className="mt-2 text-xl font-semibold text-gray-800">
              {book.title}
            </p>

          </div>


          {/* ==============================
              ISBN
          ============================== */}

          <div>

            <p className="text-sm font-medium text-gray-500">
              ISBN
            </p>

            <p className="mt-2 text-lg text-gray-800">
              {book.isbn}
            </p>

          </div>


          {/* ==============================
              PUBLISHED YEAR
          ============================== */}

          <div>

            <p className="text-sm font-medium text-gray-500">
              Published Year
            </p>

            <p className="mt-2 text-lg text-gray-800">
              {book.publishedYear || "N/A"}
            </p>

          </div>


          {/* ==============================
              TOTAL COPIES
          ============================== */}

          <div>

            <p className="text-sm font-medium text-gray-500">
              Total Copies
            </p>

            <p className="mt-2 text-lg text-gray-800">
              {book.totalCopies}
            </p>

          </div>


          {/* ==============================
              AVAILABLE COPIES
          ============================== */}

          <div>

            <p className="text-sm font-medium text-gray-500">
              Available Copies
            </p>

            <p className="mt-2 text-lg font-semibold text-emerald-600">
              {book.available}
            </p>

          </div>


          {/* ==============================
              AUTHOR
          ============================== */}

          <div>

            <p className="text-sm font-medium text-gray-500">
              Author
            </p>

            <p className="mt-2 text-lg text-gray-800">
              {book.author?.name || "N/A"}
            </p>

          </div>


          {/* ==============================
              CATEGORY
          ============================== */}

          <div>

            <p className="text-sm font-medium text-gray-500">
              Category
            </p>

            <p className="mt-2 text-lg text-gray-800">
              {book.category?.name || "N/A"}
            </p>

          </div>


          {/* ==============================
              BOOK ID
          ============================== */}

          <div>

            <p className="text-sm font-medium text-gray-500">
              Book ID
            </p>

            <p className="mt-2 text-lg text-gray-800">
              #{book.id}
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default BookDetails;

