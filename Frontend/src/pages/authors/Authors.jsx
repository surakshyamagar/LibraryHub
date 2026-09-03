import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getAuthors } from "../../services/authorService";

function Authors() {
  const navigate = useNavigate();

  // ==============================
  // STATE
  // ==============================

  const [authors, setAuthors] = useState([]);

  // Text currently typed in search input
  const [searchInput, setSearchInput] = useState("");

  // Actual search value used for filtering
  const [searchTerm, setSearchTerm] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==============================
  // FETCH AUTHORS
  // ==============================

  const fetchAuthors = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getAuthors();

      console.log(
        "Authors response:",
        response.data
      );

      setAuthors(
        response.data.data || response.data
      );
    } catch (error) {
      console.error(
        "Error fetching authors:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Failed to load authors."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==============================
  // FETCH AUTHORS WHEN PAGE LOADS
  // ==============================

  useEffect(() => {
    fetchAuthors();
  }, []);

  // ==============================
  // HANDLE SEARCH
  // ==============================

  const handleSearch = (e) => {
    e.preventDefault();

    setSearchTerm(searchInput.trim());
  };

  // ==============================
  // CLEAR SEARCH
  // ==============================

  const handleClearSearch = () => {
    setSearchInput("");
    setSearchTerm("");
  };

  // ==============================
  // FILTER AUTHORS BY NAME ONLY
  // ==============================

  const filteredAuthors = authors.filter((author) => {
    return author.name
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
  });

  // ==============================
  // LOADING
  // ==============================

  if (loading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <p className="text-gray-600">
          Loading authors...
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
          onClick={fetchAuthors}
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
            Authors
          </h1>

          <p className="mt-2 text-gray-500">
            Manage all authors in the library.
          </p>
        </div>

        {/* ADD AUTHOR */}

        <button
          type="button"
          onClick={() =>
            navigate("/authors/add")
          }
          className="rounded-lg bg-emerald-600 px-5 py-2.5 font-medium text-white transition hover:bg-emerald-700"
        >
          + Add New Author
        </button>

      </div>

      {/* ==============================
          SEARCH
      ============================== */}

      <form
        onSubmit={handleSearch}
        className="mb-6 flex flex-col gap-3 sm:flex-row"
      >

        {/* SEARCH INPUT */}

        <input
          type="text"
          value={searchInput}
          onChange={(e) =>
            setSearchInput(e.target.value)
          }
          placeholder="Search author by name..."
          className="w-full max-w-md rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-800 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
        />

        {/* SEARCH BUTTON */}

        <button
          type="submit"
          className="rounded-lg bg-emerald-600 px-6 py-3 font-medium text-white transition hover:bg-emerald-700"
        >
          Search
        </button>

        {/* CLEAR BUTTON */}

        {searchTerm && (
          <button
            type="button"
            onClick={handleClearSearch}
            className="rounded-lg border border-gray-300 bg-white px-6 py-3 font-medium text-gray-600 transition hover:bg-gray-50"
          >
            Clear
          </button>
        )}

      </form>

      {/* ==============================
          AUTHOR COUNT
      ============================== */}

      <div className="mb-6">

        <p className="text-sm text-gray-500">

          {searchTerm ? (
            <>
              Showing{" "}
              <span className="font-semibold text-gray-900">
                {filteredAuthors.length}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-gray-900">
                {authors.length}
              </span>{" "}
              authors
            </>
          ) : (
            <>
              Total Authors:{" "}
              <span className="font-semibold text-gray-900">
                {authors.length}
              </span>
            </>
          )}

        </p>

      </div>

      {/* ==============================
          NO AUTHORS / NO SEARCH RESULTS
      ============================== */}

      {filteredAuthors.length === 0 ? (

        <div className="rounded-xl border border-gray-100 bg-white p-10 text-center shadow-sm">

          <div className="mb-4 text-5xl">
            ✍️
          </div>

          <h2 className="text-xl font-semibold text-gray-900">

            {authors.length === 0
              ? "No Authors Found"
              : "No Matching Authors"}

          </h2>

          <p className="mt-2 text-gray-500">

            {authors.length === 0
              ? "There are currently no authors in the library."
              : "No author found with that name. Try searching again."}

          </p>

          {/* ADD FIRST AUTHOR */}

          {authors.length === 0 && (
            <button
              type="button"
              onClick={() =>
                navigate("/authors/add")
              }
              className="mt-6 rounded-lg bg-emerald-600 px-5 py-2.5 font-medium text-white transition hover:bg-emerald-700"
            >
              Add Your First Author
            </button>
          )}

          {/* CLEAR SEARCH */}

          {authors.length > 0 && searchTerm && (
            <button
              type="button"
              onClick={handleClearSearch}
              className="mt-6 rounded-lg border border-gray-300 px-5 py-2.5 font-medium text-gray-600 transition hover:bg-gray-50"
            >
              Clear Search
            </button>
          )}

        </div>

      ) : (

        /* ==============================
           AUTHORS TABLE
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
                    Author Name
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Biography
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Actions
                  </th>

                </tr>

              </thead>

              {/* TABLE BODY */}

              <tbody>

                {filteredAuthors.map((author) => (

                  <tr
                    key={author.id}
                    className="border-t border-gray-100 transition hover:bg-gray-50"
                  >

                    {/* ID */}

                    <td className="px-6 py-4 text-sm text-gray-600">
                      {author.id}
                    </td>

                    {/* AUTHOR NAME */}

                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-800">
                        {author.name}
                      </div>
                    </td>

                    {/* BIOGRAPHY */}

                    <td className="max-w-md px-6 py-4 text-sm text-gray-500">
                      {author.bio ||
                        "No biography available"}
                    </td>

                    {/* ACTIONS */}

                    <td className="px-6 py-4">

                      <button
                        type="button"
                        onClick={() =>
                          navigate(
                            `/authors/edit/${author.id}`
                          )
                        }
                        className="rounded-lg border border-emerald-200 px-3 py-1.5 text-sm font-medium text-emerald-600 transition hover:bg-emerald-50"
                      >
                        Edit
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      )}

    </div>
  );
}

export default Authors;

