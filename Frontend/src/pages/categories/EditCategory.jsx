
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  getCategoryById,
  updateCategory,
} from "../../services/categoryService";

function EditCategory() {
  const navigate = useNavigate();
  const { id } = useParams();

  // ==============================
  // STATE
  // ==============================

  const [formData, setFormData] = useState({
    name: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // ==============================
  // FETCH CATEGORY
  // ==============================

  const fetchCategory = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getCategoryById(id);

      console.log(
        "Category response:",
        response.data
      );

      const category =
        response.data.data || response.data;

      // Put category data into form
      setFormData({
        name: category.name || "",
      });
    } catch (error) {
      console.error(
        "Error fetching category:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Failed to load category."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==============================
  // FETCH CATEGORY WHEN ID CHANGES
  // ==============================

  useEffect(() => {
    fetchCategory();
  }, [id]);

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
  // UPDATE CATEGORY
  // ==============================

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous error
    setError("");

    try {
      setSaving(true);

      // Update category
      await updateCategory(id, formData);

      // Go back to Categories page
      navigate("/categories");
    } catch (error) {
      console.error(
        "Error updating category:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Failed to update category."
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
          Loading category...
        </p>
      </div>
    );
  }

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
          Edit Category
        </h1>

        <p className="mt-2 text-gray-500">
          Update the category information.
        </p>
      </div>

      {/* ==============================
          FORM CARD
      ============================== */}

      <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">

        {/* ERROR MESSAGE */}

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
          className="space-y-6"
        >

          {/* CATEGORY NAME */}

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

            {/* UPDATE */}

            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-emerald-600 px-5 py-2.5 font-medium text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving
                ? "Updating..."
                : "Update Category"}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}

export default EditCategory;

