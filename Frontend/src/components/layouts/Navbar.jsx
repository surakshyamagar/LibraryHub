import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Navbar({ onMenuClick }) {

  const navigate = useNavigate();

  // Get current logged-in user and logout function
  const { user, logout } = useAuth();

  const handleLogout = () => {

    // Remove token and clear user from AuthContext
    logout();

    // Go to login page
    navigate("/login", {
      replace: true,
    });
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 shadow-sm sm:px-6">

      {/* ================= LEFT SIDE ================= */}
      <div className="flex items-center gap-4">

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={onMenuClick}
          className="rounded-lg p-2 text-gray-600 transition hover:bg-gray-100 lg:hidden"
          aria-label="Open navigation menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>

        {/* Page Title */}
        <div>

          <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
            Library Management
          </p>

          <h2 className="text-lg font-bold text-gray-800">
            Dashboard
          </h2>

        </div>

      </div>


      {/* ================= RIGHT SIDE ================= */}
      <div className="flex items-center gap-4">

        {/* Notification */}
        <button
          type="button"
          className="relative rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-blue-600"
        >
          🔔

          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-blue-600" />
        </button>


        {/* Divider */}
        <div className="hidden h-8 w-px bg-gray-200 sm:block" />


        {/* User Information */}
        <div className="hidden text-right sm:block">

          <p className="text-sm font-semibold text-gray-800">
            {user?.name || "User"}
          </p>

          <p className="text-xs uppercase text-gray-500">
            {user?.role || "USER"}
          </p>

        </div>


        {/* User Avatar */}
       <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600 font-semibold text-white">
          {user?.name?.charAt(0)?.toUpperCase() || "U"}
        </div>


        {/* Logout */}
        <button
          type="button"
          onClick={handleLogout}
          className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
        >
          Logout
        </button>

      </div>

    </header>
  );
}

export default Navbar;