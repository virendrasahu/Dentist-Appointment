import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { toast } from 'react-toastify';

const Dashboard = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await api.get('/appointments');
                setAppointments(response.data);
                setLoading(false);
            } catch (err) {
                toast.error('Failed to fetch appointments. Please Login again if session expired.');
                setLoading(false);
            }
        };

        fetchAppointments();
    }, []);

    const handleStatusChange = async (id, newStatus) => {
        try {
            await api.put(`/appointments/${id}/status`, { status: newStatus });
            setAppointments(appointments.map(app =>
                app._id === id ? { ...app, status: newStatus } : app
            ));
            toast.success(`Status updated to ${newStatus}`);
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to update status');
        }
    };

    if (loading) return (
        <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
    );

    return (
        <div className="py-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mb-8">
                <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Admin Dashboard</h2>
                <p className="text-gray-500 mt-2">Manage and view all patient appointments in one place.</p>
            </div>

            <div className="bg-white rounded-3xl shadow-xl shadow-gray-100 border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-100">
                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Patient Name</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Age & Gender</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Doctor & Clinic</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {appointments.length > 0 ? appointments.map((appointment) => (
                                <tr key={appointment._id} className="hover:bg-blue-50/30 transition-colors">
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                                                {appointment.patientName.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-900">{appointment.patientName}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <p className="font-medium text-gray-700 text-sm">
                                            {appointment.age} yrs
                                        </p>
                                        <p className="text-xs text-gray-500 mt-0.5">
                                            {appointment.gender}
                                        </p>
                                    </td>
                                    <td className="px-6 py-5">
                                        <p className="font-semibold text-gray-700">
                                            {appointment.date}
                                        </p>
                                        <p className="text-xs text-gray-500 font-medium mt-0.5">
                                            {appointment.time}
                                        </p>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div>
                                            <p className="font-bold text-blue-600">{appointment.dentistId?.name || 'Unknown Dentist'}</p>
                                            <p className="text-xs text-gray-500">{appointment.dentistId?.clinicName || 'Unknown Clinic'}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <select
                                            value={appointment.status}
                                            onChange={(e) => handleStatusChange(appointment._id, e.target.value)}
                                            className={`px-3 py-1.5 rounded-full text-xs font-bold border-0 cursor-pointer outline-none shadow-sm focus:ring-2 focus:ring-opacity-50 transition-colors ${appointment.status === 'Booked' ? 'bg-blue-100 text-blue-700 focus:ring-blue-500' :
                                                    appointment.status === 'Completed' ? 'bg-green-100 text-green-700 focus:ring-green-500' :
                                                        appointment.status === 'Cancel' ? 'bg-red-100 text-red-700 focus:ring-red-500' :
                                                            'bg-yellow-100 text-yellow-700 focus:ring-yellow-500'
                                                }`}
                                        >
                                            <option value="Booked" className="text-gray-900 bg-white">Booked</option>
                                            <option value="Completed" className="text-gray-900 bg-white">Completed</option>
                                        </select>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                                        No appointments found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
