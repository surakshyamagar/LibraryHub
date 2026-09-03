
// import { useEffect, useState } from "react";
// import { getDashboardStats } from "../../services/dashboardService";
// import { useAuth } from "../../context/AuthContext";

// function Dashboard() {
//   const { user } = useAuth();

//   console.log("Current user:", user);

//   const [stats, setStats] = useState({
//     books: 0,
//     authors: 0,
//     categories: 0,
//     borrowings: 0,
//   });

//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   // Check user role
//   const isMember = user?.role?.toUpperCase() === "MEMBER";
//   const isAdminOrStaff =
//     user?.role?.toUpperCase() === "ADMIN" ||
//     user?.role?.toUpperCase() === "STAFF";

//   useEffect(() => {
//     // Only fetch statistics for Admin and Staff
//     if (isMember) {
//       setLoading(false);
//       return;
//     }

//     const fetchDashboardStats = async () => {
//       try {
//         setLoading(true);
//         setError("");

//         const data = await getDashboardStats();

//         console.log("Dashboard data:", data);

//         setStats({
//           books: data.books.data?.length || 0,
//           authors: data.authors.data?.length || 0,
//           categories: data.categories.data?.length || 0,
//           borrowings: data.borrowings.data?.length || 0,
//         });
//       } catch (error) {
//         console.error(
//           "Failed to fetch dashboard statistics:",
//           error
//         );

//         setError(
//           error.response?.data?.message ||
//             "Failed to load dashboard statistics."
//         );
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDashboardStats();
//   }, [isMember]);

//   // ==============================
//   // MEMBER DASHBOARD
//   // ==============================
//   if (isMember) {
//     return (
//       <div>
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-800">
//             Welcome, {user?.name || "Member"} 👋
//           </h1>

//           <p className="mt-2 text-gray-500">
//             Welcome to your Library Management System.
//           </p>
//         </div>

//         {/* Member Cards */}
//         <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

//           {/* Browse Books */}
//           <div className="rounded-xl bg-white p-6 shadow-sm transition hover:shadow-md">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-500">
//                   Browse Books
//                 </p>

//                 <h2 className="mt-2 text-lg font-bold text-gray-800">
//                   Find your next book
//                 </h2>
//               </div>

//               <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-2xl">
//                 📚
//               </div>
//             </div>
//           </div>

//           {/* My Borrowings */}
//           <div className="rounded-xl bg-white p-6 shadow-sm transition hover:shadow-md">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-500">
//                   My Borrowings
//                 </p>

//                 <h2 className="mt-2 text-lg font-bold text-gray-800">
//                   View borrowed books
//                 </h2>
//               </div>

//               <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-2xl">
//                 📖
//               </div>
//             </div>
//           </div>

//           {/* My Profile */}
//           <div className="rounded-xl bg-white p-6 shadow-sm transition hover:shadow-md">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-500">
//                   My Profile
//                 </p>

//                 <h2 className="mt-2 text-lg font-bold text-gray-800">
//                   Manage your account
//                 </h2>
//               </div>

//               <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 text-2xl">
//                 👤
//               </div>
//             </div>
//           </div>

//         </div>

//         {/* Member Welcome Card */}
//         <div className="mt-8 rounded-xl bg-white p-8 shadow-sm">
//           <h2 className="text-xl font-bold text-gray-800">
//             Welcome to LibraryHub 📚
//           </h2>

//           <p className="mt-3 leading-7 text-gray-500">
//             You can browse available books, manage your borrowed
//             books, and view your account information from the sidebar.
//           </p>
//         </div>
//       </div>
//     );
//   }

//   // ==============================
//   // ADMIN & STAFF DASHBOARD
//   // ==============================

//   return (
//     <div>
//       {/* Header */}
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold text-gray-800">
//           Dashboard
//         </h1>

//         <p className="mt-2 text-gray-500">
//           Welcome to your Library Management System.
//         </p>
//       </div>

//       {/* Error */}
//       {error && (
//         <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
//           {error}
//         </div>
//       )}

//       {/* Statistics */}
//       <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

//         {/* Books */}
//         <div className="rounded-xl bg-white p-6 shadow-sm transition hover:shadow-md">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-gray-500">
//                 Total Books
//               </p>

//               <h2 className="mt-2 text-3xl font-bold text-gray-800">
//                 {loading ? "..." : stats.books}
//               </h2>
//             </div>

//             <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-2xl">
//               📚
//             </div>
//           </div>
//         </div>

//         {/* Authors */}
//         <div className="rounded-xl bg-white p-6 shadow-sm transition hover:shadow-md">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-gray-500">
//                 Authors
//               </p>

//               <h2 className="mt-2 text-3xl font-bold text-gray-800">
//                 {loading ? "..." : stats.authors}
//               </h2>
//             </div>

//             <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-2xl">
//               ✍️
//             </div>
//           </div>
//         </div>

//         {/* Categories */}
//         <div className="rounded-xl bg-white p-6 shadow-sm transition hover:shadow-md">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-gray-500">
//                 Categories
//               </p>

//               <h2 className="mt-2 text-3xl font-bold text-gray-800">
//                 {loading ? "..." : stats.categories}
//               </h2>
//             </div>

//             <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-50 text-2xl">
//               🏷️
//             </div>
//           </div>
//         </div>

//         {/* Borrowings */}
//         <div className="rounded-xl bg-white p-6 shadow-sm transition hover:shadow-md">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-gray-500">
//                 Total Borrowings
//               </p>

//               <h2 className="mt-2 text-3xl font-bold text-gray-800">
//                 {loading ? "..." : stats.borrowings}
//               </h2>
//             </div>

//             <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 text-2xl">
//               🔄
//             </div>
//           </div>
//         </div>

//       </div>

//       {/* Welcome Card */}
//       <div className="mt-8 rounded-xl bg-white p-8 shadow-sm">
//         <h2 className="text-xl font-bold text-gray-800">
//           Welcome to LibraryHub
//         </h2>

//         <p className="mt-3 leading-7 text-gray-500">
//           Use the sidebar to manage books, authors, categories
//           and borrowing records.
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Dashboard;




import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getDashboardStats } from "../../services/dashboardService";
import { useAuth } from "../../context/AuthContext";

function Dashboard() {
const navigate = useNavigate();
const { user } = useAuth();

// ==========================================
// USER ROLE
// ==========================================

const userRole = user?.role?.toUpperCase();

const isMember = userRole === "MEMBER";

const isAdminOrStaff =
userRole === "ADMIN" || userRole === "STAFF";

// ==========================================
// DASHBOARD STATISTICS
// ==========================================

const [stats, setStats] = useState({
books: 0,
authors: 0,
categories: 0,
borrowings: 0,
});

// ==========================================
// LOADING & ERROR
// ==========================================

const [loading, setLoading] = useState(true);
const [error, setError] = useState("");

// ==========================================
// FETCH DASHBOARD STATISTICS
// ==========================================

useEffect(() => {
// Only Admin and Staff need dashboard statistics
if (!isAdminOrStaff) {
setLoading(false);
return;
}
const fetchDashboardStats = async () => {
  try {
    setLoading(true);
    setError("");

    const data = await getDashboardStats();

    console.log("Dashboard data:", data);

    setStats({
      books: data.books?.data?.length || 0,
      authors: data.authors?.data?.length || 0,
      categories: data.categories?.data?.length || 0,
      borrowings: data.borrowings?.data?.length || 0,
    });
  } catch (error) {
    console.error(
      "Failed to fetch dashboard statistics:",
      error
    );

    setError(
      error.response?.data?.message ||
        "Failed to load dashboard statistics."
    );
  } finally {
    setLoading(false);
  }
};

fetchDashboardStats();
}, [isAdminOrStaff]);

// ==========================================
// MEMBER DASHBOARD CARDS
// ==========================================

const memberCards = [
{
title: "Browse Books",
description: "Find your next book",
icon: "📚",
path: "/books",
iconBackground: "bg-blue-50",
},
{
title: "My Borrowings",
description: "View your borrowed books",
icon: "📖",
path: "/my-borrowings",
iconBackground: "bg-green-50",
},
{
title: "My Profile",
description: "Manage your account",
icon: "👤",
path: "/profile",
iconBackground: "bg-purple-50",
},
];

// ==========================================
// ADMIN / STAFF STATISTIC CARDS
// ==========================================

const statisticCards = [
{
title: "Total Books",
value: stats.books,
icon: "📚",
iconBackground: "bg-blue-50",
},
{
title: "Authors",
value: stats.authors,
icon: "✍️",
iconBackground: "bg-green-50",
},
{
title: "Categories",
value: stats.categories,
icon: "🏷️",
iconBackground: "bg-yellow-50",
},
{
title: "Total Borrowings",
value: stats.borrowings,
icon: "🔄",
iconBackground: "bg-purple-50",
},
];

// ==========================================
// MEMBER DASHBOARD
// ==========================================

if (isMember) {
return ( <div>
    {/* ==========================================
        HEADER
    ========================================== */}

    <div className="mb-8">
      <h1 className="text-3xl font-bold text-gray-800">
        Welcome, {user?.name || "Member"} 👋
      </h1>

      <p className="mt-2 text-gray-500">
        Welcome to your Library Management System.
      </p>
    </div>

    {/* ==========================================
        MEMBER QUICK ACTIONS
    ========================================== */}

    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

      {memberCards.map((card) => (
        <button
          key={card.title}
          type="button"
          onClick={() => navigate(card.path)}
          className="rounded-xl bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md"
        >
          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm font-medium text-gray-500">
                {card.title}
              </p>

              <h2 className="mt-2 text-lg font-bold text-gray-800">
                {card.description}
              </h2>
            </div>

            <div
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-2xl ${card.iconBackground}`}
            >
              {card.icon}
            </div>

          </div>
        </button>
      ))}

    </div>

    {/* ==========================================
        MEMBER INFORMATION CARD
    ========================================== */}

    <div className="mt-8 rounded-xl bg-white p-8 shadow-sm">

      <h2 className="text-xl font-bold text-gray-800">
        Welcome to LibraryHub 📚
      </h2>

      <p className="mt-3 leading-7 text-gray-500">
        You can browse available books, view your borrowed
        books, and manage your account using the options
        available in the sidebar.
      </p>

    </div>

  </div>
);
}

// ==========================================
// ADMIN / STAFF DASHBOARD
// ==========================================

return ( <div>
  {/* ==========================================
      HEADER
  ========================================== */}

  <div className="mb-8">

    <h1 className="text-3xl font-bold text-gray-800">
      Dashboard
    </h1>

    <p className="mt-2 text-gray-500">
      Welcome back, {user?.name || "User"}.
      Manage your library from one place.
    </p>

  </div>

  {/* ==========================================
      ERROR MESSAGE
  ========================================== */}

  {error && (
    <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4">
      <p className="text-sm text-red-600">
        {error}
      </p>
    </div>
  )}

  {/* ==========================================
      STATISTICS
  ========================================== */}

  <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

    {statisticCards.map((card) => (
      <div
        key={card.title}
        className="rounded-xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
      >
        <div className="flex items-center justify-between">

          <div>

            <p className="text-sm font-medium text-gray-500">
              {card.title}
            </p>

            <h2 className="mt-2 text-3xl font-bold text-gray-800">
              {loading ? "..." : card.value}
            </h2>

          </div>

          <div
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-2xl ${card.iconBackground}`}
          >
            {card.icon}
          </div>

        </div>
      </div>
    ))}

  </div>

  {/* ==========================================
      WELCOME CARD
  ========================================== */}

  <div className="mt-8 rounded-xl bg-white p-8 shadow-sm">

    <h2 className="text-xl font-bold text-gray-800">
      Welcome to LibraryHub 📚
    </h2>

    <p className="mt-3 leading-7 text-gray-500">
      Use the sidebar to manage books, authors, categories,
      and borrowing records.
    </p>

  </div>

</div>
);
}

export default Dashboard;


