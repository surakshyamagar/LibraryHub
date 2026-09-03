
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { createBook } from "../../services/bookService";
import { getAuthors } from "../../services/authorService";
import { getCategories } from "../../services/categoryService";

function CreateBook() {
  const navigate = useNavigate();

  // =========================
  // FORM DATA
  // =========================

  const [formData, setFormData] = useState({
    title: "",
    isbn: "",
    publishedYear: "",
    totalCopies: 1,
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

  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [error, setError] = useState("");

  // =========================
  // FETCH AUTHORS & CATEGORIES
  // =========================

  useEffect(() => {
    const fetchFormData = async () => {
      try {
        setLoadingData(true);

        const [authorsResponse, categoriesResponse] =
          await Promise.all([
            getAuthors(),
            getCategories(),
          ]);

        console.log("Authors:", authorsResponse.data);
        console.log("Categories:", categoriesResponse.data);

        setAuthors(
          authorsResponse.data.data ||
          authorsResponse.data
        );

        setCategories(
          categoriesResponse.data.data ||
          categoriesResponse.data
        );

      } catch (error) {
        console.error(
          "Error loading form data:",
          error
        );

        setError(
          "Failed to load authors and categories."
        );

      } finally {
        setLoadingData(false);
      }
    };

    fetchFormData();
  }, []);

  // =========================
  // HANDLE INPUT CHANGE
  // =========================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  // =========================
  // HANDLE FORM SUBMIT
  // =========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

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

      console.log("Creating book:", bookData);

      await createBook(bookData);

      alert("Book created successfully!");

      navigate("/books");

    } catch (error) {
      console.error(
        "Error creating book:",
        error
      );

      setError(
        error.response?.data?.message ||
        "Failed to create book."
      );

    } finally {
      setLoading(false);
    }
  };

  // =========================
  // LOADING
  // =========================

  if (loadingData) {
    return (
      <div className="rounded-xl border border-gray-100 bg-white p-8 shadow-sm">
        <p className="text-gray-500">
          Loading form data...
        </p>
      </div>
    );
  }

  // =========================
  // PAGE
  // =========================

  return (
    <div>

      {/* Header */}

      <div className="mb-8">

        <h1 className="text-3xl font-bold text-gray-800">
          Add New Book
        </h1>

        <p className="mt-2 text-gray-500">
          Add a new book to the library.
        </p>

      </div>


      {/* Error */}

      {error && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}


      {/* Form */}

      <div className="rounded-xl border border-gray-100 bg-white p-8 shadow-sm">

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          {/* Title */}

          <div>

            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Book Title
            </label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter book title"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-800 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
            />

          </div>


          {/* ISBN */}

          <div>

            <label className="mb-2 block text-sm font-semibold text-gray-700">
              ISBN
            </label>

            <input
              type="text"
              name="isbn"
              value={formData.isbn}
              onChange={handleChange}
              placeholder="Enter ISBN"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-800 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
            />

          </div>


          {/* Published Year */}

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


          {/* Total Copies */}

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


          {/* Author */}

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


          {/* Category */}

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


          {/* Buttons */}

          <div className="flex gap-4 border-t border-gray-100 pt-6">

            {/* Cancel */}

            <button
              type="button"
              onClick={() => navigate("/books")}
              className="rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-600 transition hover:bg-gray-50 hover:text-gray-800"
            >
              Cancel
            </button>


            {/* Create */}

            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-emerald-600 px-6 py-3 font-medium text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading
                ? "Creating..."
                : "Create Book"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default CreateBook;

