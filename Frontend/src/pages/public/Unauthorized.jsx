import { Link } from "react-router-dom";

function Unauthorized() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">

      <div className="w-full max-w-md rounded-2xl bg-white p-10 text-center shadow-lg">

        <div className="mb-4 text-6xl">
          🚫
        </div>

        <h1 className="text-3xl font-bold text-gray-800">
          Access Denied
        </h1>

        <p className="mt-3 text-gray-500">
          You do not have permission to access this page.
        </p>

        <Link
          to="/dashboard"
          className="mt-6 inline-block rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
        >
          Back to Dashboard
        </Link>

      </div>

    </div>
  );
}

export default Unauthorized;