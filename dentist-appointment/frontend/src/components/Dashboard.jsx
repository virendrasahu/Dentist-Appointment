import React, { useState, useEffect, useCallback } from 'react';
import api from '../utils/api';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import 'sweetalert2/dist/sweetalert2.min.css';

const MySwal = withReactContent(Swal);

const Dashboard = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch appointments (extracted so we can retry on demand)
    const fetchAppointments = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.get('/appointments');
            setAppointments(response.data);
            setLoading(false);
        } catch (err) {
            const message = err.response?.data?.message || err.message || 'Failed to fetch appointments';
            setError(message);
            toast.error(message);
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchAppointments();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleStatusChange = async (id, newStatus) => {
        try {
            await api.put(`/appointments/${id}/status`, { status: newStatus });
            setAppointments(prev => prev.map(app => app._id === id ? { ...app, status: newStatus } : app));
            toast.success(`Status updated to ${newStatus}`);
        } catch (err) {
            const message = err.response?.data?.message || 'Failed to update status';
            toast.error(message);
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

            {error && (
                <div className="mb-4 p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 flex items-center justify-between">
                    <div>{error}</div>
                    <button onClick={fetchAppointments} className="ml-4 bg-red-600 text-white px-3 py-1 rounded-md text-sm">Retry</button>
                </div>
            )}

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
                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {appointments.length > 0 ? appointments.map((appointment) => {
                                const statusClass = appointment.status === 'Booked'
                                    ? 'bg-blue-100 text-blue-700 focus:ring-blue-500'
                                    : appointment.status === 'Completed'
                                        ? 'bg-green-100 text-green-700 focus:ring-green-500'
                                        : appointment.status === 'Cancel'
                                            ? 'bg-red-100 text-red-700 focus:ring-red-500'
                                            : 'bg-yellow-100 text-yellow-700 focus:ring-yellow-500';

                                return (
                                    <tr key={appointment._id} className="hover:bg-blue-50/30 transition-colors">
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                                                    {(appointment.patientName && appointment.patientName.charAt(0).toUpperCase()) || '?'}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-gray-900">{appointment.patientName || 'Unknown'}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <p className="font-medium text-gray-700 text-sm">
                                                {appointment.age ?? '-'} yrs
                                            </p>
                                            <p className="text-xs text-gray-500 mt-0.5">
                                                {appointment.gender}
                                            </p>
                                        </td>
                                        <td className="px-6 py-5">
                                            <p className="font-semibold text-gray-700">
                                                {appointment.date || '-'}
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
                                                disabled={appointment.status === 'Completed'}
                                                className={`px-3 py-1.5 rounded-full text-xs font-bold border-0 ${appointment.status === 'Completed' ? 'cursor-not-allowed opacity-80' : 'cursor-pointer'} outline-none shadow-sm focus:ring-2 focus:ring-opacity-50 transition-colors ${statusClass}`}
                                            >
                                                <option value="Booked" className="text-gray-900 bg-white">Booked</option>
                                                <option value="Completed" className="text-gray-900 bg-white">Completed</option>
                                            </select>
                                        </td>
                                        <td className="px-6 py-5">
                                            <button
                                                onClick={async () => {
                                                    const result = await MySwal.fire({
                                                        title: 'Delete appointment?',
                                                        text: 'This action cannot be undone.',
                                                        icon: 'warning',
                                                        showCancelButton: true,
                                                        confirmButtonColor: '#e11d48',
                                                        cancelButtonColor: '#94a3b8',
                                                        confirmButtonText: 'Delete',
                                                        cancelButtonText: 'Cancel',
                                                        reverseButtons: true,
                                                        focusCancel: true,
                                                    });

                                                    if (!result.isConfirmed) return;

                                                    try {
                                                        await api.delete(`/appointments/${appointment._id}`);
                                                        setAppointments(prev => prev.filter(a => a._id !== appointment._id));
                                                        toast.success('Appointment deleted');
                                                    } catch (err) {
                                                        toast.error(err.response?.data?.message || 'Failed to delete appointment');
                                                    }
                                                }}
                                                className="px-3 py-1.5 bg-red-50 text-red-700 rounded-md text-xs font-semibold hover:bg-red-100"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                );
                            }) : (
                                <tr>
                                    <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                                        No appointments found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div >
    );
};

export default Dashboard;
