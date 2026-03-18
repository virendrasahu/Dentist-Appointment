import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import DentistList from './components/DentistList';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Signup from './components/Signup';
import ProtectedRoute from './components/ProtectedRoute';
import BookAppointmentModal from './components/BookAppointmentModal';
import SuccessNotification from './components/SuccessNotification';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Home component to extract Dentists list logic
const Home = ({ searchTerm, setSearchTerm, selectedLocation, setSelectedLocation, handleBook }) => (
  <>
    {/* Hero Section */}
    <div className="py-12 text-left">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">
        Expert dental care, scheduled in seconds.
      </h1>
      <p className="text-lg text-gray-500">
        Browse our trusted dentists and book your appointment today.
      </p>
    </div>

    {/* Search and Filter Row */}
    <div className="flex flex-col md:flex-row gap-4 mb-8">
      <div className="relative flex-grow">
        <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </span>
        <input
          type="text"
          placeholder="Search by name, clinic, or qualification..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-[#009688]/20 focus:border-[#009688] transition-all text-sm outline-none"
        />
      </div>
      <div className="w-full md:w-64">
        <select
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          className="block w-full pl-3 pr-10 py-2.5 border border-gray-200 rounded-lg bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-[#009688]/20 focus:border-[#009688] transition-all text-sm outline-none appearance-none cursor-pointer"
        >
          <option>All Locations</option>
          <option>Atlanta, GA</option>
          <option>Houston, TX</option>
          <option>Los Angeles, CA</option>
          <option>San Francisco, CA</option>
          <option>Chicago, IL</option>
          <option>New York, NY</option>
        </select>
      </div>
    </div>

    <section>
      <DentistList
        onBook={handleBook}
        searchTerm={searchTerm}
        selectedLocation={selectedLocation}
      />
    </section>
  </>
);


function App() {
  const [selectedDentist, setSelectedDentist] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Search and Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');

  const handleBook = (dentist) => {
    setSelectedDentist(dentist);
    setIsModalOpen(true);
  };

  const handleSuccess = () => {
    setShowSuccess(true);
  };

  return (
    <Router>
      <div className="min-h-screen bg-white font-sans text-gray-900">
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
        <Navbar />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <Routes>
            <Route path="/" element={
              <Home
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                selectedLocation={selectedLocation}
                setSelectedLocation={setSelectedLocation}
                handleBook={handleBook}
              />
            } />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
          </Routes>
        </main>

        <BookAppointmentModal
          dentist={selectedDentist}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onShowSuccess={handleSuccess}
        />

        {showSuccess && (
          <SuccessNotification
            message="Your appointment has been successfully booked."
            onClose={() => setShowSuccess(false)}
          />
        )}

        <footer className="py-8 bg-white border-t border-gray-100 mt-auto">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-gray-400 text-sm">© 2026 DentiBook. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
