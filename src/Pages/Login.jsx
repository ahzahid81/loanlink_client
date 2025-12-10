import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router';
import { FaGoogle } from 'react-icons/fa';

const Login = () => {
    const [error, setError] = useState("");
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const { loginUser, googleLogin } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/";

    const buttonText = from === "/" ? "Go to Dashboard" : "Continue";

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
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate(from, { replace: true });
                }
            });
        } catch (err) {
            console.error(err);
            setError(err.message || "Login failed");
        }
    };

    const handleGoogleLogin = async () => {
        setError("");
        try {
            await googleLogin();

            Swal.fire({
                icon: "success",
                title: "Login Successful!",
                text: "Welcome back to LoanLink 🎉",
                confirmButtonText: buttonText,
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate(from, { replace: true });
                }
            });
        } catch (err) {
            console.error(err);
            setError(err.message || "Google Login failed");
        }
    }

    return (
        <div>
            <div className='min-h-screen flex items-center justify-center bg-base-200 px-4'>
                <div className='w-full max-w-md bg-base-100 p-8 rounded-xl shadow-lg'>
                    <h2 className='text-3xl font-bold text-center mb-6'>Login</h2>

                    {error && (
                        <p className="text-red-500 text-sm text-center mb-4">{error}</p>
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

                        {/* Login Button */}
                        <button type="submit" className="btn btn-primary w-full">
                            Login
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="divider">OR</div>

                    {/* Google Login */}
                    <button
                        onClick={handleGoogleLogin}
                        className="btn btn-outline w-full"
                    ><FaGoogle></FaGoogle>
                          Continue with Google
                    </button>
                </div>
            </div>
        </div >
    );
};

export default Login;