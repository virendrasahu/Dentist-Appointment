import React, { useState } from 'react';
import api from '../utils/api';
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await api.post('/auth/register', credentials);
            toast.success('Signup successful! Please login.');
            setLoading(false);
            navigate('/login');
        } catch (err) {
            const errorMessage = err.response?.data?.message || err.response?.data?.errors?.map(e => e.msg).join(', ') || 'Failed to signup';
            toast.error(errorMessage);
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center py-20 animate-in fade-in duration-500">
            <div className="bg-white p-10 rounded-3xl shadow-xl shadow-blue-100 border border-blue-50 w-full max-w-md">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h2>
                    <p className="text-gray-500 text-sm">Join DentalFlow today.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Username</label>
                        <input
                            required
                            type="text"
                            name="username"
                            value={credentials.username}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            placeholder="Enter modern username"
                            minLength={3}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
                        <input
                            required
                            type="password"
                            name="password"
                            value={credentials.password}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            placeholder="••••••••"
                            minLength={6}
                        />
                    </div>

                    <button
                        disabled={loading}
                        type="submit"
                        className="w-full py-4 bg-teal-600 hover:bg-teal-700 disabled:bg-teal-400 text-white font-bold rounded-2xl shadow-xl shadow-teal-100 transition-all duration-300 transform active:scale-[0.98]"
                    >
                        {loading ? (
                            <div className="flex items-center justify-center gap-2">
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                <span>Registering...</span>
                            </div>
                        ) : 'Sign Up'}
                    </button>
                    
                    <div className="text-center mt-4">
                        <p className="text-sm text-gray-600">
                            Already have an account? <Link to="/login" className="text-teal-600 font-semibold hover:underline">Log in</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;
