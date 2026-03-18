import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import DentistCard from './DentistCard';

const DentistList = ({ onBook, searchTerm, selectedLocation }) => {
    const [dentists, setDentists] = useState([]);
    const [filteredDentists, setFilteredDentists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDentists = async () => {
            try {
                const response = await api.get('/dentists');
                setDentists(response.data);
                setFilteredDentists(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to load dentists. Please try again later.');
                setLoading(false);
            }
        };

        fetchDentists();
    }, []);

    // Local Filtering Logic
    useEffect(() => {
        let results = dentists;

        // Search Filter
        if (searchTerm) {
            const lowSearch = searchTerm.toLowerCase();
            results = results.filter(d => 
                (d.name || "").toLowerCase().includes(lowSearch) ||
                (d.clinicName || "").toLowerCase().includes(lowSearch) ||
                (d.qualification || "").toLowerCase().includes(lowSearch)
            );
        }

        // Location Filter
        if (selectedLocation && selectedLocation !== 'All Locations') {
            results = results.filter(d => 
                (d.location || "").toLowerCase().includes(selectedLocation.toLowerCase()) ||
                (d.address || "").toLowerCase().includes(selectedLocation.toLowerCase())
            );
        }

        setFilteredDentists(results);
    }, [searchTerm, selectedLocation, dentists]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#009688]"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center p-8 bg-red-50 rounded-xl border border-red-200">
                <p className="text-red-600 font-medium">{error}</p>
            </div>
        );
    }

    if (filteredDentists.length === 0) {
        return (
            <div className="text-center py-20 px-4">
                <div className="mb-4 inline-flex items-center justify-center p-4 bg-gray-50 rounded-full text-gray-400">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No dentists found</h3>
                <p className="text-gray-500">Try adjusting your search filters to find what you're looking for.</p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-4">
            {filteredDentists.map(dentist => (
                <DentistCard key={dentist._id} dentist={dentist} onBook={onBook} />
            ))}
        </div>
    );
};

export default DentistList;
