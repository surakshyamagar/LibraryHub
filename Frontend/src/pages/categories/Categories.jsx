import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getCategories } from "../../services/categoryService";

function Categories() {
  const navigate = useNavigate();

  // ==============================
  // STATE
  // ==============================

  const [categories, setCategories] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==============================
  // FETCH CATEGORIES
  // ==============================

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getCategories();

      console.log(
        "Categories response:",
        response.data
      );

      const categoriesData =
        response.data.data || response.data;

      setCategories(categoriesData);
    } catch (error) {
      console.error(
        "Error fetching categories:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Failed to load categories."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==============================
  // FETCH WHEN PAGE LOADS
  // ==============================

  useEffect(() => {
    fetchCategories();
  }, []);

  // ==============================
  // HANDLE SEARCH
  // ==============================

  const handleSearch = () => {
    setSearchQuery(searchTerm);
  };

  // ==============================
  // CLEAR SEARCH
  // ==============================

  const handleClearSearch = () => {
    setSearchTerm("");
    setSearchQuery("");
  };

  // ==============================
  // FILTER CATEGORIES BY NAME
  // ==============================

  const filteredCategories = categories.filter(
    (category) =>
      category.name
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase())
  );

  // ==============================
  // LOADING
  // ==============================

  if (loading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <p className="text-gray-600">
          Loading categories...
        </p>
      </div>
    );
  }

  // ==============================
  // ERROR
  // ==============================

  if (error) {
    return (
      <div className="rounded-xl border border-red-100 bg-red-50 p-6">
        <p className="text-red-600">
          {error}
        </p>

        <button
          type="button"
          onClick={fetchCategories}
          className="mt-4 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-700"
        >
          Try Again
        </button>
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
          <h1 className="text-3xl font-bold text-gray-900">
            Categories
          </h1>

          <p className="mt-2 text-gray-500">
            Manage all book categories in the library.
          </p>
        </div>

        {/* ADD CATEGORY BUTTON */}

        <button
          type="button"
          onClick={() =>
            navigate("/categories/add")
          }
          className="rounded-lg bg-emerald-600 px-5 py-2.5 font-medium text-white transition hover:bg-emerald-700"
        >
          + Add New Category
        </button>

      </div>

      {/* ==============================
          SEARCH
      ============================== */}

      <div className="mb-6 flex flex-col gap-3 sm:flex-row">

        <input
          type="text"
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(e.target.value)
          }
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
          placeholder="Search category by name..."
          className="w-full max-w-md rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-800 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
        />

        <button
          type="button"
          onClick={handleSearch}
          className="rounded-lg bg-emerald-600 px-6 py-3 font-medium text-white transition hover:bg-emerald-700"
        >
          Search
        </button>

        {searchQuery && (
          <button
            type="button"
            onClick={handleClearSearch}
            className="rounded-lg border border-gray-300 bg-white px-6 py-3 font-medium text-gray-600 transition hover:bg-gray-50"
          >
            Clear
          </button>
        )}

      </div>

      {/* ==============================
          CATEGORY COUNT
      ============================== */}

      <div className="mb-6">
        <p className="text-sm text-gray-500">

          Showing{" "}

          <span className="font-semibold text-gray-900">
            {filteredCategories.length}
          </span>

          {" "}of{" "}

          <span className="font-semibold text-gray-900">
            {categories.length}
          </span>

          {" "}categories

        </p>
      </div>

      {/* ==============================
          EMPTY / NO SEARCH RESULTS
      ============================== */}

      {filteredCategories.length === 0 ? (

        <div className="rounded-xl border border-gray-100 bg-white p-10 text-center shadow-sm">

          <div className="mb-4 text-5xl">
            🏷️
          </div>

          <h2 className="text-xl font-semibold text-gray-900">

            {categories.length === 0
              ? "No Categories Found"
              : "No Matching Categories"}

          </h2>

          <p className="mt-2 text-gray-500">

            {categories.length === 0
              ? "There are currently no categories in the library."
              : "Try searching with a different category name."}

          </p>

          {categories.length === 0 && (
            <button
              type="button"
              onClick={() =>
                navigate("/categories/add")
              }
              className="mt-6 rounded-lg bg-emerald-600 px-5 py-2.5 font-medium text-white transition hover:bg-emerald-700"
            >
              Add Your First Category
            </button>
          )}

        </div>

      ) : (

        /* ==============================
           CATEGORY TABLE
        ============================== */

        <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">

          <div className="overflow-x-auto">

            <table className="w-full min-w-[600px]">

              {/* TABLE HEADER */}

              <thead className="bg-gray-50">

                <tr>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    ID
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Category Name
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Actions
                  </th>

                </tr>

              </thead>

              {/* TABLE BODY */}

              <tbody>

                {filteredCategories.map(
                  (category) => (

                    <tr
                      key={category.id}
                      className="border-t border-gray-100 transition hover:bg-gray-50"
                    >

                      {/* ID */}

                      <td className="px-6 py-4 text-sm text-gray-600">
                        {category.id}
                      </td>

                      {/* CATEGORY NAME */}

                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-800">
                          {category.name}
                        </div>
                      </td>

                      {/* ACTIONS */}

                      <td className="px-6 py-4">

                        <button
                          type="button"
                          onClick={() =>
                            navigate(
                              `/categories/edit/${category.id}`
                            )
                          }
                          className="rounded-lg border border-emerald-200 px-3 py-1.5 text-sm font-medium text-emerald-600 transition hover:bg-emerald-50"
                        >
                          Edit
                        </button>

                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        </div>

      )}

    </div>
  );
}

export default Categories;

