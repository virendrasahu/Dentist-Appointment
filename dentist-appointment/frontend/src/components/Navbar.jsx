import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Navbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('adminToken');
    const isAuthenticated = !!token;

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        toast.info('Logged out successfully');
        navigate('/login');
    };

    return (
        <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Brand */}
                    <Link to="/" className="flex items-center gap-2 cursor-pointer transition-transform hover:scale-105 active:scale-95">
                        <img
                            src="https://res.cloudinary.com/doyvz7zrp/image/upload/v1773809692/Gemini_Generated_Image_cv7xxwcv7xxwcv7x_ciwief.png"
                            alt="Oroglee Logo"
                            className="h-12 object-contain"
                        />
                    </Link>

                    {/* Navigation */}
                    <div className="flex items-center gap-2">
                        <Link
                            to="/"
                            className="px-4 py-1.5 rounded-md text-sm font-medium transition-all text-gray-600 hover:bg-gray-50 hover:text-[#00796b]"
                        >
                            Dentists
                        </Link>
                        {isAuthenticated ? (
                            <>
                                <Link
                                    to="/dashboard"
                                    className="px-4 py-1.5 rounded-md text-sm font-medium transition-all text-gray-600 hover:bg-gray-50 hover:text-[#00796b]"
                                >
                                    Dashboard
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-1.5 px-4 py-1.5 text-sm font-medium text-gray-600 hover:text-red-600 transition-all ml-4 border-l border-gray-200"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                    </svg>
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="px-4 py-1.5 rounded-md text-sm font-medium transition-all text-gray-600 hover:bg-gray-50 hover:text-[#00796b]"
                                >
                                    Admin Login
                                </Link>
                                <Link
                                    to="/signup"
                                    className="px-4 py-1.5 rounded-md text-sm font-bold transition-all bg-[#e0f2f1] text-[#00796b] hover:bg-[#b2dfdb]"
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
