import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import {
  LayoutDashboard,
  BookOpen,
  Users,
  FolderOpen,
  BookMarked,
  UserRound,
  X,
} from "lucide-react";

function Sidebar({ isOpen, onClose }) {
  const { user } = useAuth();

  // Get current user's role
  const role = user?.role?.toUpperCase();

  console.log("========== SIDEBAR ==========");
  console.log("User:", user);
  console.log("Role:", role);

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      roles: ["ADMIN", "STAFF", "MEMBER"],
      icon: LayoutDashboard,
    },
    {
      name: "Books",
      path: "/books",
      roles: ["ADMIN", "STAFF", "MEMBER"],
      icon: BookOpen,
    },
    {
      name: "Authors",
      path: "/authors",
      roles: ["ADMIN", "STAFF"],
      icon: Users,
    },
    {
      name: "Categories",
      path: "/categories",
      roles: ["ADMIN", "STAFF"],
      icon: FolderOpen,
    },
    {
      name: "Borrowings",
      path: "/borrowings",
      roles: ["ADMIN", "STAFF"],
      icon: BookMarked,
    },
    {
      name: "My Borrowings",
      path: "/my-borrowings",
      roles: ["MEMBER"],
      icon: BookMarked,
    },
    {
      name: "Users",
      path: "/users",
      roles: ["ADMIN"],
      icon: UserRound,
    },
  ];

  // Filter menu according to user's role
  const visibleMenuItems = menuItems.filter((item) =>
    item.roles.includes(role)
  );

  console.log(
    "Visible menu:",
    visibleMenuItems.map((item) => item.name)
  );

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed left-0 top-0 z-50
          flex h-screen w-64 flex-col
          border-r border-slate-800
          bg-slate-950
          text-slate-300
          shadow-xl
          transition-transform duration-300
          lg:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >

        {/* Logo / Header */}
        <div className="flex h-20 items-center justify-between border-b border-slate-800 px-6">

          <div className="flex items-center gap-3">

            {/* Logo Icon */}
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-lg shadow-emerald-900/30">
              <BookOpen size={22} />
            </div>

            {/* Logo Text */}
            <div>
              <h1 className="text-lg font-bold tracking-tight text-white">
                LibraryHub
              </h1>

              <p className="text-xs text-slate-500">
                Management System
              </p>
            </div>

          </div>

          {/* Mobile Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white lg:hidden"
            aria-label="Close navigation menu"
          >
            <X size={20} />
          </button>

        </div>


        {/* User Role */}
        <div className="border-b border-slate-800 px-6 py-5">

          <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
            Logged in as
          </p>

          <div className="mt-2 flex items-center gap-2">

            <div className="h-2 w-2 rounded-full bg-emerald-500" />

            <p className="text-sm font-semibold text-emerald-400">
              {role || "USER"}
            </p>

          </div>

        </div>


        {/* Navigation */}
        <nav className="flex-1 space-y-2 overflow-y-auto p-4">

          {visibleMenuItems.map((item) => {

            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-emerald-600 text-white shadow-lg shadow-emerald-900/20"
                      : "text-slate-400 hover:bg-slate-800 hover:text-white"
                  }`
                }
              >

                <Icon
                  size={20}
                  strokeWidth={2}
                  className="transition-transform duration-200 group-hover:scale-105"
                />

                <span>
                  {item.name}
                </span>

              </NavLink>
            );

          })}

        </nav>


        {/* Sidebar Footer */}
        <div className="border-t border-slate-800 p-4">

          <div className="rounded-xl bg-slate-900 p-3">

            <p className="text-xs font-medium text-slate-400">
              LibraryHub
            </p>

            <p className="mt-1 text-xs text-slate-600">
              Library Management System
            </p>

          </div>

        </div>

      </aside>
    </>
  );
}

export default Sidebar;