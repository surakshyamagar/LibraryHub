import { useCallback, useEffect, useState } from "react";
import { getMyBorrowings } from "../../services/borrowingService";

function MyBorrowings() {
// ==============================
// STATE
// ==============================

const [borrowings, setBorrowings] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");

// ==============================
// FETCH MY BORROWINGS
// ==============================

const fetchMyBorrowings = useCallback(async () => {
try {
setLoading(true);
setError("");


  const response = await getMyBorrowings();

  console.log("My borrowings response:", response.data);

  setBorrowings(response.data.data || []);
} catch (error) {
  console.error("Error fetching my borrowings:", error);

  setError(
    error.response?.data?.message ||
      "Failed to load your borrowings."
  );
} finally {
  setLoading(false);
}


}, []);

// ==============================
// FETCH WHEN PAGE LOADS
// ==============================

useEffect(() => {
fetchMyBorrowings();
}, [fetchMyBorrowings]);

// ==============================
// LOADING
// ==============================

if (loading) {
return ( <div className="flex min-h-[300px] items-center justify-center"> <p className="text-gray-600">
Loading your borrowings... </p> </div>
);
}

// ==============================
// ERROR
// ==============================

if (error) {
return ( <div className="rounded-xl bg-red-50 p-6"> <p className="text-red-600">
{error} </p>


    <button
      onClick={fetchMyBorrowings}
      className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
    >
      Try Again
    </button>
  </div>
);


}

// ==============================
// MAIN UI
// ==============================

return ( <div>
{/* HEADER */} <div className="mb-8"> <h1 className="text-3xl font-bold text-gray-800">
My Borrowings </h1>


    <p className="mt-2 text-gray-500">
      View your borrowed books and their current status.
    </p>
  </div>

  {/* COUNT */}
  <div className="mb-6">
    <p className="text-sm text-gray-500">
      Total Borrowings:{" "}
      <span className="font-semibold text-gray-800">
        {borrowings.length}
      </span>
    </p>
  </div>

  {/* EMPTY STATE */}
  {borrowings.length === 0 ? (
    <div className="rounded-xl bg-white p-10 text-center shadow-sm">
      <div className="mb-4 text-5xl">
        📚
      </div>

      <h2 className="text-xl font-semibold text-gray-800">
        No Borrowings Found
      </h2>

      <p className="mt-2 text-gray-500">
        You have not borrowed any books yet.
      </p>
    </div>
  ) : (
    /* TABLE */
    <div className="overflow-hidden rounded-xl bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px]">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                ID
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                Book
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                Borrowed At
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                Due Date
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {borrowings.map((borrowing) => (
              <tr
                key={borrowing.id}
                className="border-t border-gray-100 hover:bg-gray-50"
              >
                {/* ID */}
                <td className="px-6 py-4 text-sm text-gray-600">
                  #{borrowing.id}
                </td>

                {/* BOOK */}
                <td className="px-6 py-4">
                  <p className="font-medium text-gray-800">
                    {borrowing.book?.title ||
                      `Book #${borrowing.bookId}`}
                  </p>

                  <p className="text-xs text-gray-500">
                    ISBN: {borrowing.book?.isbn || "N/A"}
                  </p>
                </td>

                {/* BORROWED DATE */}
                <td className="px-6 py-4 text-sm text-gray-600">
                  {new Date(
                    borrowing.borrowedAt
                  ).toLocaleDateString()}
                </td>

                {/* DUE DATE */}
                <td className="px-6 py-4 text-sm text-gray-600">
                  {new Date(
                    borrowing.dueDate
                  ).toLocaleDateString()}
                </td>

                {/* STATUS */}
                <td className="px-6 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      borrowing.status === "RETURNED"
                        ? "bg-green-100 text-green-700"
                        : borrowing.status === "OVERDUE"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {borrowing.status}
                  </span>
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

export default MyBorrowings;
