import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">

      {/* ================= NAVBAR ================= */}
      <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-xl text-white shadow-sm">
              📚
            </div>

            <div>
              <h1 className="text-lg font-bold leading-none text-gray-900">
                LibraryHub
              </h1>

              <p className="mt-1 text-xs text-gray-500">
                Library Management System
              </p>
            </div>
          </Link>


          {/* Navigation */}
          <div className="flex items-center gap-3">

            <Link
              to="/"
              className="hidden px-4 py-2 text-sm font-medium text-gray-600 transition hover:text-emerald-600 sm:block"
            >
              Home
            </Link>

            <Link
              to="/login"
              className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
            >
              Register
            </Link>

          </div>

        </div>
      </nav>


      {/* ================= HERO SECTION ================= */}
      <section className="relative overflow-hidden">

        {/* Background decoration */}
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-emerald-100 opacity-60 blur-3xl" />

        <div className="absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-emerald-50 opacity-70 blur-3xl" />


        <div className="relative mx-auto max-w-7xl px-6 py-20 lg:py-28">

          <div className="grid items-center gap-16 lg:grid-cols-2">


            {/* LEFT CONTENT */}
            <div>

              {/* Badge */}
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700">
                <span className="h-2 w-2 rounded-full bg-emerald-600" />
                Modern Library Management System
              </div>


              {/* Heading */}
              <h1 className="max-w-2xl text-4xl font-bold leading-tight tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">

                Manage Your Library

                <span className="block text-emerald-600">
                  Smarter & Simpler
                </span>

              </h1>


              {/* Description */}
              <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600">
                Organise books, authors, categories and borrowing
                records in one powerful and easy-to-use library
                management system.
              </p>


              {/* Buttons */}
              <div className="mt-8 flex flex-wrap gap-4">

                <Link
                  to="/register"
                  className="rounded-lg bg-emerald-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700"
                >
                  Get Started
                </Link>

                <Link
                  to="/login"
                  className="rounded-lg border border-gray-300 bg-white px-6 py-3.5 font-semibold text-gray-700 transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-600"
                >
                  Sign In
                </Link>

              </div>


              {/* Small trust text */}
              <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-gray-500">

                <div className="flex items-center gap-2">
                  <span className="text-emerald-500">✓</span>
                  Easy to use
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-emerald-500">✓</span>
                  Organised
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-emerald-500">✓</span>
                  Secure access
                </div>

              </div>

            </div>


            {/* RIGHT DASHBOARD PREVIEW */}
            <div className="relative">

              {/* Main card */}
              <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-2xl shadow-gray-200/70">

                {/* Fake dashboard header */}
                <div className="flex items-center justify-between border-b border-gray-100 pb-5">

                  <div>
                    <p className="text-xs font-medium text-gray-400">
                      LIBRARY DASHBOARD
                    </p>

                    <h2 className="mt-1 text-xl font-bold text-gray-800">
                      Overview
                    </h2>
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-lg">
                    📊
                  </div>

                </div>


                {/* Stats */}
                <div className="mt-5 grid grid-cols-2 gap-4">

                  <div className="rounded-xl bg-emerald-50 p-4">
                    <p className="text-sm text-gray-500">
                      Total Books
                    </p>

                    <p className="mt-2 text-2xl font-bold text-emerald-600">
                      1,248
                    </p>
                  </div>


                  <div className="rounded-xl bg-gray-50 p-4">
                    <p className="text-sm text-gray-500">
                      Authors
                    </p>

                    <p className="mt-2 text-2xl font-bold text-gray-800">
                      186
                    </p>
                  </div>


                  <div className="rounded-xl bg-gray-50 p-4">
                    <p className="text-sm text-gray-500">
                      Categories
                    </p>

                    <p className="mt-2 text-2xl font-bold text-gray-800">
                      24
                    </p>
                  </div>


                  <div className="rounded-xl bg-emerald-50 p-4">
                    <p className="text-sm text-gray-500">
                      Borrowed
                    </p>

                    <p className="mt-2 text-2xl font-bold text-emerald-600">
                      64
                    </p>
                  </div>

                </div>


                {/* Recent activity */}
                <div className="mt-5 rounded-xl border border-gray-100 p-4">

                  <div className="flex items-center justify-between">

                    <p className="font-semibold text-gray-800">
                      Recent Activity
                    </p>

                    <span className="text-xs text-emerald-600">
                      View all
                    </span>

                  </div>


                  <div className="mt-4 space-y-3">

                    <div className="flex items-center gap-3">

                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50">
                        📖
                      </div>

                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-700">
                          New book added
                        </p>

                        <p className="text-xs text-gray-400">
                          Recently
                        </p>
                      </div>

                    </div>


                    <div className="flex items-center gap-3">

                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-50">
                        ✓
                      </div>

                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-700">
                          Book returned
                        </p>

                        <p className="text-xs text-gray-400">
                          Recently
                        </p>
                      </div>

                    </div>

                  </div>

                </div>

              </div>


              {/* Floating card */}
              <div className="absolute -bottom-6 -left-6 hidden rounded-xl border border-gray-100 bg-white p-4 shadow-xl sm:block">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                    ✓
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">
                      System Status
                    </p>

                    <p className="text-sm font-semibold text-gray-800">
                      All systems operational
                    </p>
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ================= FEATURES ================= */}
      <section className="border-y border-gray-100 bg-white py-20">

        <div className="mx-auto max-w-7xl px-6">

          {/* Section heading */}
          <div className="mx-auto max-w-2xl text-center">

            <p className="text-sm font-semibold uppercase tracking-wider text-emerald-600">
              Powerful Features
            </p>

            <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
              Everything You Need to Manage Your Library
            </h2>

            <p className="mt-4 leading-7 text-gray-500">
              Keep your library organised with simple tools designed
              to manage every part of your collection.
            </p>

          </div>


          {/* Feature cards */}
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">


            {/* Books */}
            <div className="group rounded-2xl border border-gray-200 bg-white p-6 transition hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-2xl transition group-hover:bg-emerald-600">
                📚
              </div>

              <h3 className="mt-5 text-lg font-bold text-gray-800">
                Book Management
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                Add, update, view and manage your complete library
                collection in one place.
              </p>

            </div>


            {/* Authors */}
            <div className="group rounded-2xl border border-gray-200 bg-white p-6 transition hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-2xl transition group-hover:bg-emerald-600">
                ✍️
              </div>

              <h3 className="mt-5 text-lg font-bold text-gray-800">
                Author Management
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                Organise authors and easily manage the relationship
                between authors and their books.
              </p>

            </div>


            {/* Categories */}
            <div className="group rounded-2xl border border-gray-200 bg-white p-6 transition hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-2xl transition group-hover:bg-emerald-600">
                🏷️
              </div>

              <h3 className="mt-5 text-lg font-bold text-gray-800">
                Categories
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                Organise books into categories and keep your
                collection structured and easy to explore.
              </p>

            </div>


            {/* Borrowing */}
            <div className="group rounded-2xl border border-gray-200 bg-white p-6 transition hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-2xl transition group-hover:bg-emerald-600">
                🔄
              </div>

              <h3 className="mt-5 text-lg font-bold text-gray-800">
                Borrowing Management
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                Track borrowed books, due dates and returned
                books with ease.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* ================= STATS ================= */}
      <section className="bg-gray-50 py-16">

        <div className="mx-auto max-w-7xl px-6">

          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">

            <div className="text-center">
              <p className="text-3xl font-bold text-emerald-600">
                1,000+
              </p>

              <p className="mt-2 text-sm text-gray-500">
                Books Managed
              </p>
            </div>


            <div className="text-center">
              <p className="text-3xl font-bold text-emerald-600">
                100+
              </p>

              <p className="mt-2 text-sm text-gray-500">
                Authors
              </p>
            </div>


            <div className="text-center">
              <p className="text-3xl font-bold text-emerald-600">
                20+
              </p>

              <p className="mt-2 text-sm text-gray-500">
                Categories
              </p>
            </div>


            <div className="text-center">
              <p className="text-3xl font-bold text-emerald-600">
                24/7
              </p>

              <p className="mt-2 text-sm text-gray-500">
                Accessible
              </p>
            </div>

          </div>

        </div>

      </section>


      {/* ================= CTA ================= */}
      <section className="px-6 py-20">

        <div className="mx-auto max-w-5xl rounded-3xl bg-emerald-600 px-8 py-16 text-center shadow-xl shadow-emerald-600/20">

          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Ready to Manage Your Library?
          </h2>

          <p className="mx-auto mt-4 max-w-xl leading-7 text-emerald-100">
            Create an account and start managing your books,
            authors, categories and borrowing records today.
          </p>

          <div className="mt-8 flex justify-center gap-4">

            <Link
              to="/register"
              className="rounded-lg bg-white px-6 py-3 font-semibold text-emerald-600 transition hover:bg-gray-100"
            >
              Create Account
            </Link>

            <Link
              to="/login"
              className="rounded-lg border border-emerald-400 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700"
            >
              Sign In
            </Link>

          </div>

        </div>

      </section>


      {/* ================= FOOTER ================= */}
      <footer className="border-t border-gray-200 bg-white">

        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">

          <div className="flex items-center gap-2">

            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-600 text-white">
              📚
            </div>

            <div>
              <p className="font-bold text-gray-800">
                LibraryHub
              </p>

              <p className="text-xs text-gray-500">
                Library Management System
              </p>
            </div>

          </div>


          <p className="text-sm text-gray-500">
            © 2026 LibraryHub. All rights reserved.
          </p>

        </div>

      </footer>

    </div>
  );
}

export default Home;