import React from 'react';

const DentistCard = ({ dentist, onBook }) => {
    return (
        <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 overflow-hidden flex flex-col h-full text-left">
            <div className="w-full h-[240px] overflow-hidden rounded-t-xl shrink-0">
                <img 
                    src={dentist.photo} 
                    alt={dentist.name} 
                    className="w-full h-full object-cover object-top"
                />
            </div>
            
            <div className="p-5 flex flex-col flex-grow">
                <div className="mb-3">
                    <h3 className="text-lg font-bold text-gray-900">{dentist.name}</h3>
                    <p className="text-xs text-blue-500 font-medium tracking-tight uppercase">{dentist.qualification}</p>
                </div>
                
                <div className="space-y-2 mb-6 flex-grow">
                    <div className="flex items-center gap-2 text-gray-500">
                        <svg className="w-4 h-4 text-[#009688]/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span className="text-sm font-medium">{dentist.experience}+ Years Experience</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-gray-500">
                        <svg className="w-4 h-4 text-[#009688]/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        <span className="text-sm font-medium">{dentist.clinicName}</span>
                    </div>
                    
                    <div className="flex items-start gap-2 text-gray-400">
                        <svg className="w-4 h-4 text-[#009688]/70 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="text-xs leading-tight">{dentist.address}, {dentist.location}</span>
                    </div>
                </div>
                
                <button 
                    onClick={() => onBook(dentist)}
                    className="w-full py-2.5 px-4 bg-[#26a69a] hover:bg-[#00897b] text-white font-bold rounded-lg transition-all duration-300 transform active:scale-[0.98] text-sm"
                >
                    Book Appointment
                </button>
            </div>
        </div>
    );
};

export default DentistCard;
