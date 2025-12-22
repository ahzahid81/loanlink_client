// src/pages/Login.jsx
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import PageTitle from "../Component/PageTitle";

const Login = () => {
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { loginUser, googleLogin, user, loading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/dashboard";
  const buttonText = from === "/" ? "Go to Dashboard" : "Continue";

  /* ✅ AUTO REDIRECT IF ALREADY LOGGED IN */
  useEffect(() => {
    if (!loading && user) {
      navigate(from, { replace: true });
    }
  }, [user, loading, navigate, from]);

  /* ✅ EMAIL & PASSWORD LOGIN */
  const handleLogin = async (data) => {
    setError("");
    const { email, password } = data;

    try {
      await loginUser(email, password);

      Swal.fire({
        icon: "success",
        title: "Login Successful!",
        text: "Welcome back to LoanLink 🎉",
        confirmButtonText: buttonText,
      }).then(() => {
        navigate(from, { replace: true });
      });
    } catch (err) {
      console.error(err);
      setError("Invalid email or password");
    }
  };

  /* ✅ GOOGLE LOGIN */
  const handleGoogleLogin = async () => {
    setError("");
    try {
      await googleLogin();

      Swal.fire({
        icon: "success",
        title: "Login Successful!",
        text: "Welcome back to LoanLink 🎉",
        confirmButtonText: buttonText,
      }).then(() => {
        navigate(from, { replace: true });
      });
    } catch (err) {
      console.error(err);
      setError("Google login failed");
    }
  };

  /* ✅ LOADING STATE */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <PageTitle title={"Login"}></PageTitle>
      <div className="w-full max-w-md bg-base-100 p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6">Login</h2>

        {error && (
          <p className="text-red-500 text-sm text-center mb-4">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            className="input input-bordered w-full"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">Email is required</p>
          )}

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            className="input input-bordered w-full"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">Password is required</p>
          )}

          <button type="submit" className="btn btn-primary w-full">
            Login
          </button>
        </form>

        <div className="divider">OR</div>

        <button
          onClick={handleGoogleLogin}
          className="btn btn-outline w-full flex items-center justify-center gap-2"
        >
          <FaGoogle />
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
