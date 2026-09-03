import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { loginUser } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  // ==============================
  // FORM DATA
  // ==============================

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // ==============================
  // UI STATES
  // ==============================

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
  // HANDLE LOGIN
  // ==============================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await loginUser(formData);

      console.log("Login response:", response.data);

      const token = response.data.token;

      // Save token in AuthContext
      login(token);

      // Redirect to dashboard
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);

      setError(
        error.response?.data?.message ||
          "Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==============================
  // PAGE
  // ==============================

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">

      {/* Login Card */}

      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">

        {/* Header */}

        <div className="mb-8 text-center">

          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-600 text-2xl shadow-lg shadow-emerald-900/30">
            📖
          </div>

          <h1 className="text-3xl font-bold text-slate-900">
            Welcome Back
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Login to your LibraryHub account
          </p>

        </div>


        {/* Error Message */}

        {error && (
          <div className="mb-5 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
            {error}
          </div>
        )}


        {/* Login Form */}

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* Email */}

          <div>

            <label
              htmlFor="email"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Email Address
            </label>

            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              autoComplete="email"
              required
              className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100"
            />

          </div>


          {/* Password */}

          <div>

            <label
              htmlFor="password"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              autoComplete="current-password"
              required
              className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100"
            />

          </div>


          {/* Login Button */}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-emerald-600 px-5 py-3 font-semibold text-white shadow-lg shadow-emerald-900/20 transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>


        {/* Register Link */}

        <p className="mt-6 text-center text-sm text-slate-600">

          Don't have an account?{" "}

          <Link
            to="/register"
            className="font-semibold text-emerald-600 transition hover:text-emerald-700 hover:underline"
          >
            Create an account
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Login;