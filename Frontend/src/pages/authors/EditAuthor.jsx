/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  getAuthorById,
  updateAuthor,
} from "../../services/authorService";

function EditAuthor() {
  const navigate = useNavigate();
  const { id } = useParams();

  // ==============================
  // STATE
  // ==============================

  const [formData, setFormData] = useState({
    name: "",
    bio: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // ==============================
  // FETCH AUTHOR
  // ==============================

  const fetchAuthor = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getAuthorById(id);

      console.log(
        "Author response:",
        response.data
      );

      const author =
        response.data.data || response.data;

      // Put author data into form
      setFormData({
        name: author.name || "",
        bio: author.bio || "",
      });
    } catch (error) {
      console.error(
        "Error fetching author:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Failed to load author."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==============================
  // FETCH AUTHOR WHEN ID CHANGES
  // ==============================

  useEffect(() => {
    fetchAuthor();
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
  // UPDATE AUTHOR
  // ==============================

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous error
    setError("");

    try {
      setSaving(true);

      // Update author
      await updateAuthor(id, formData);

      // Go back to Authors page
      navigate("/authors");
    } catch (error) {
      console.error(
        "Error updating author:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Failed to update author."
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
          Loading author...
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
          Edit Author
        </h1>

        <p className="mt-2 text-gray-500">
          Update the author's information.
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

          {/* SAVE */}

          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-emerald-600 px-5 py-2.5 font-medium text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saving
              ? "Saving..."
              : "Save Changes"}
          </button>

        </div>
      </form>
    </div>
  );
}

export default EditAuthor;

