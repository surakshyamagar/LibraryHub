
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getBookById, updateBook } from "../../services/bookService";
import { getAuthors } from "../../services/authorService";
import { getCategories } from "../../services/categoryService";

function EditBook() {
  const { id } = useParams();
  const navigate = useNavigate();

  // =========================
  // FORM DATA
  // =========================

  const [formData, setFormData] = useState({
    title: "",
    isbn: "",
    publishedYear: "",
    totalCopies: "",
    authorId: "",
    categoryId: "",
  });

  // =========================
  // AUTHORS & CATEGORIES
  // =========================

  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);

  // =========================
  // UI STATES
  // =========================

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // =========================
  // FETCH BOOK + AUTHORS + CATEGORIES
  // =========================

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");

        const [
          bookResponse,
          authorsResponse,
          categoriesResponse,
        ] = await Promise.all([
          getBookById(id),
          getAuthors(),
          getCategories(),
        ]);

        const book =
          bookResponse.data.data ||
          bookResponse.data;

        const authorsData =
          authorsResponse.data.data ||
          authorsResponse.data;

        const categoriesData =
          categoriesResponse.data.data ||
          categoriesResponse.data;

        setFormData({
          title: book.title || "",
          isbn: book.isbn || "",
          publishedYear: book.publishedYear || "",
          totalCopies: book.totalCopies || "",
          authorId:
            book.authorId ||
            book.author?.id ||
            "",
          categoryId:
            book.categoryId ||
            book.category?.id ||
            "",
        });

        setAuthors(authorsData);
        setCategories(categoriesData);

      } catch (error) {
        console.error(
          "Error loading edit book data:",
          error
        );

        setError(
          error.response?.data?.message ||
          "Failed to load book data."
        );

      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // =========================
  // HANDLE INPUT
  // =========================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  // =========================
  // UPDATE BOOK
  // =========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");
    setSaving(true);

    try {
      const bookData = {
        title: formData.title,
        isbn: formData.isbn,
        publishedYear: formData.publishedYear
          ? Number(formData.publishedYear)
          : undefined,
        totalCopies: Number(formData.totalCopies),
        authorId: Number(formData.authorId),
        categoryId: Number(formData.categoryId),
      };

      console.log(
        "Updating book:",
        bookData
      );

      await updateBook(id, bookData);

      // Show success message
      setSuccess(
        "Book updated successfully! Redirecting to books..."
      );

      // Wait 1.5 seconds, then go to Books page
      setTimeout(() => {
        navigate("/books");
      }, 1500);

    } catch (error) {
      console.error(
        "Error updating book:",
        error
      );

      setError(
        error.response?.data?.message ||
        "Failed to update book."
      );

    } finally {
      setSaving(false);
    }
  };

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div className="rounded-xl border border-gray-100 bg-white p-8 shadow-sm">
        <p className="text-gray-500">
          Loading book...
        </p>
      </div>
    );
  }

  // =========================
  // PAGE
  // =========================

  return (
    <div>

      {/* =========================
          HEADER
      ========================= */}

      <div className="mb-8">

        <h1 className="text-3xl font-bold text-gray-800">
          Edit Book
        </h1>

        <p className="mt-2 text-gray-500">
          Update the book information below.
        </p>

      </div>


      {/* =========================
          SUCCESS MESSAGE
      ========================= */}

      {success && (
        <div className="mb-6 flex items-center gap-3 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-emerald-700">

          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600 text-sm font-bold text-white">
            ✓
          </div>

          <p className="font-medium">
            {success}
          </p>

        </div>
      )}


      {/* =========================
          ERROR MESSAGE
      ========================= */}

      {error && (
        <div className="mb-6 flex items-center gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-red-600">

          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-sm font-bold text-white">
            !
          </div>

          <p className="font-medium">
            {error}
          </p>

        </div>
      )}


      {/* =========================
          FORM CARD
      ========================= */}

      <div className="rounded-xl border border-gray-100 bg-white p-8 shadow-sm">

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          {/* =========================
              TITLE
          ========================= */}

          <div>

            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Book Title
            </label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-800 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
            />

          </div>


          {/* =========================
              ISBN
          ========================= */}

          <div>

            <label className="mb-2 block text-sm font-semibold text-gray-700">
              ISBN
            </label>

            <input
              type="text"
              name="isbn"
              value={formData.isbn}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-800 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
            />

          </div>


          {/* =========================
              PUBLISHED YEAR
          ========================= */}

          <div>

            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Published Year
            </label>

            <input
              type="number"
              name="publishedYear"
              value={formData.publishedYear}
              onChange={handleChange}
              placeholder="e.g. 2025"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-800 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
            />

          </div>


          {/* =========================
              TOTAL COPIES
          ========================= */}

          <div>

            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Total Copies
            </label>

            <input
              type="number"
              name="totalCopies"
              min="1"
              value={formData.totalCopies}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-800 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
            />

          </div>


          {/* =========================
              AUTHOR
          ========================= */}

          <div>

            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Author
            </label>

            <select
              name="authorId"
              value={formData.authorId}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-800 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
            >

              <option value="">
                Select an author
              </option>

              {authors.map((author) => (
                <option
                  key={author.id}
                  value={author.id}
                >
                  {author.name}
                </option>
              ))}

            </select>

          </div>


          {/* =========================
              CATEGORY
          ========================= */}

          <div>

            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Category
            </label>

            <select
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-800 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
            >

              <option value="">
                Select a category
              </option>

              {categories.map((category) => (
                <option
                  key={category.id}
                  value={category.id}
                >
                  {category.name}
                </option>
              ))}

            </select>

          </div>


          {/* =========================
              BUTTONS
          ========================= */}

          <div className="flex gap-4 border-t border-gray-100 pt-6">

            {/* Cancel */}

            <button
              type="button"
              onClick={() => navigate("/books")}
              className="rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-600 transition hover:bg-gray-50 hover:text-gray-800"
            >
              Cancel
            </button>


            {/* Update */}

            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-emerald-600 px-6 py-3 font-medium text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving
                ? "Saving..."
                : "Update Book"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default EditBook;

