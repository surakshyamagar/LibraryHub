import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { createCategory } from "../../services/categoryService";

function AddCategory() {
  const navigate = useNavigate();

  // ==============================
  // STATE
  // ==============================

  const [formData, setFormData] = useState({
    name: "",
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
  // CREATE CATEGORY
  // ==============================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    try {
      setLoading(true);

      // Create category
      await createCategory(formData);

      // Show success message
      alert("Category created successfully!");

      // Go back to Categories page
      navigate("/categories");
    } catch (error) {
      console.error(
        "Error creating category:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Failed to create category."
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
          Add New Category
        </h1>

        <p className="mt-2 text-gray-500">
          Create a new category for the library.
        </p>
      </div>

      {/* ==============================
          FORM
      ============================== */}

      <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">

        {/* Error Message */}

        {error && (
          <div className="mb-6 rounded-lg border border-red-100 bg-red-50 p-4 text-sm text-red-600">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          {/* ==============================
              CATEGORY NAME
          ============================== */}

          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Category Name
            </label>

            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter category name"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-800 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
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
                navigate("/categories")
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
                : "Create Category"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default AddCategory;

