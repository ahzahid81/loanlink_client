import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import axiosSecure from '../services/axiosSecure';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Register = () => {
    const [error, setError] = useState("");

    const { createUser } = useAuth();

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();


    const handleSubmitButton = async (data) => {
        setError("");

        const { name, email, photoURL, role, password } = data;

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
        if (!passwordRegex.test(password)) {
            return setError("Password must have 1 uppercase, 1 lowercase and at least 6 characters."
            );
        }

        try {
            await createUser(email, password, name, photoURL);

            await axiosSecure.post("/users", {
                name,
                email,
                photoURL,
                role,
                status: "active",
            });

            Swal.fire({
                icon: "success",
                title: "Registration Successful!",
                text: "Your account has been created 🎉",
                confirmButtonText: "Go to Login",
            }).then((result) => {
                if(result.isConfirmed){
                    navigate("/login");
                }
            });



        } catch (err) {
            setError(err.message || "Registration failed")
        }
    };

    return (
        <div>
            <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
                <div className="w-full max-w-md bg-base-100 p-8 rounded-xl shadow-lg">
                    <h2 className="text-3xl font-bold text-center mb-6">Create Account</h2>
                    {error && (
                        <p className="text-red-500 text-sm text-center mb-4">{error}</p>
                    )}

                    <form onSubmit={handleSubmit(handleSubmitButton)} className='space-y-4'>

                        <input type="text" placeholder='Full Name' className='input input-bordered w-full' {...register("name", { required: true })} />

                        {errors.name && <p className='text-red-500 text-sm'>Name is required</p>}

                        <input type="email" placeholder='Email' className='input input-bordered w-full' {...register("email", { required: true })} />
                        {errors.email && <p className="text-red-500 text-sm">Email is required</p>}

                        <input type="text" placeholder='Photo URL' className='input input-bordered w-full' {...register("photoURL")} />

                        <select className='select select-bordered w-full' name='Select Role' {...register("role", { required: true })}>
                            <option value="">Select Role</option>
                            <option value="borrower">Borrower</option>
                            <option value="manager">Manager</option>
                        </select>
                        {errors.role && <p className='text-red-500 text-sm'>Role is required</p>}

                        <input type="password" placeholder='Password' className='input input-bordered w-full' {...register("password", { required: true })} />
                        {errors.password && <p className='text-red-500 text-sm'>Password is required</p>}

                        <button type='submit' className='btn btn-primary w-full'>Register</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;