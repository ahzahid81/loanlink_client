import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaMoon, FaSun } from 'react-icons/fa';

const Navbar = () => {

    const { user, loading, role, logoutUser } = useAuth();
    const [theme, setTheme] = useState('light');

    useEffect( () => {
        const savedTheme = localStorage.getItem("theme") || "light";
        setTheme(savedTheme);
        document.documentElement.setAttribute("data-theme", savedTheme);
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
        document.documentElement.setAttribute("data-theme", newTheme)
    };

    const navLinks = (
        <>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/all-loans">All Loans</NavLink></li>
            <li><NavLink to="/about">About</NavLink></li>
            <li><NavLink to="/contact">Contact</NavLink></li>
            {user && <li><NavLink to="/dashboard">Dashboard</NavLink></li>}
        </>
    );

    return (
        <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg sticky top-0 z-50">
            <div className="navbar max-w-7xl mx-auto text-white">

                {/* LEFT LOGO */}
                <div className='navbar-start'>
                    <div className='dropdown lg:hidden'>
                        <label tabIndex={0} className="btn btn-ghost text-white">
                            ☰
                        </label>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 text-black rounded-box w-52"
                        >
                            {navLinks}
                        </ul>
                    </div>

                    <Link to="/" className='text-2xl font-extrabold tracking-wide'>Loan <span className="text-yellow-300">Link</span></Link>
                </div>

                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 font-semibold">
                        {navLinks}
                    </ul>
                </div>
                <div className="navbar-end space-x-3">
                    <button onClick={toggleTheme} className='btn btn-circle bg-white text-black hover:bg-yellow-300'>
                        {theme === "light" ? <FaMoon></FaMoon> : <FaSun></FaSun>}
                    </button>

                    {loading ? (
                        <span className="loading loading-spinner loading-sm"></span>
                    ) : user ? (
                        <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full ring ring-yellow-400 ring-offset-base-100 ring-offset-2">
                                    <img
                                        src={user?.photoURL || "https://i.ibb.co/ZYW3VTp/brown-brim.png"}
                                        alt="user"
                                    />
                                </div>
                            </label>

                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 text-black rounded-box w-52"
                            >
                                <li>
                                    <span className="font-bold">
                                        {user?.displayName || "User"}
                                    </span>
                                </li>
                                <li>
                                    <span className="text-xs text-gray-500">{role}</span>
                                </li>
                                <li><NavLink to="/dashboard/profile">Profile</NavLink></li>
                                <li>
                                    <button onClick={logoutUser} className="text-red-500">
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        </div>
                    ) : (
                        <>
                            <NavLink to="/login" className="btn btn-outline text-white border-white hover:bg-white hover:text-black">
                                Login
                            </NavLink>
                            <NavLink to="/register" className="btn bg-yellow-400 text-black hover:bg-yellow-500">
                                Register
                            </NavLink>
                        </>
                    )}

                </div>
            </div>
        </div>
    );
};

export default Navbar;