import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { createAuthor } from "../../services/authorService";

function AddAuthor() {
  const navigate = useNavigate();

  // ==============================
  // STATE
  // ==============================

  const [formData, setFormData] = useState({
    name: "",
    bio: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
  // CREATE AUTHOR
  // ==============================

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous error
    setError("");

    try {
      setLoading(true);

      // Create new author
      await createAuthor(formData);

      // Go back to Authors page
      navigate("/authors");
    } catch (error) {
      console.error(
        "Error creating author:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Failed to create author."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==============================
  // PAGE
  // ==============================

  return (
    <div className="mx-auto max-w-2xl">

      {/* ==============================
          HEADER
      ============================== */}

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Add New Author
        </h1>

        <p className="mt-2 text-gray-500">
          Add a new author to the library.
        </p>
      </div>

      {/* ==============================
          ERROR MESSAGE
      ============================== */}

      {error && (
        <div className="mb-6 rounded-lg border border-red-100 bg-red-50 p-4 text-sm text-red-600">
          {error}
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
            AUTHOR NAME
        ============================== */}

        <div className="mb-6">
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Author Name
          </label>

          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter author name"
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-800 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
          />
        </div>

        {/* ==============================
            BIOGRAPHY
        ============================== */}

        <div className="mb-8">
          <label
            htmlFor="bio"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Biography
          </label>

          <textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            placeholder="Enter author biography"
            rows={5}
            className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 text-gray-800 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
          />
        </div>

        {/* ==============================
            BUTTONS
        ============================== */}

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

          {/* CANCEL */}

          <button
            type="button"
            onClick={() =>
              navigate("/authors")
            }
            className="rounded-lg border border-gray-300 px-5 py-2.5 font-medium text-gray-700 transition hover:bg-gray-50"
          >
            Cancel
          </button>

          {/* CREATE */}

          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-emerald-600 px-5 py-2.5 font-medium text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? "Creating..."
              : "Create Author"}
          </button>

        </div>

      </form>
    </div>
  );
}

export default AddAuthor;

