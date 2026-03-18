import React, { useEffect } from 'react';

const SuccessNotification = ({ message, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, 5000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="fixed top-20 right-4 z-[100] animate-in slide-in-from-right-8 duration-500">
            <div className="bg-white rounded-2xl shadow-2xl border border-green-100 p-4 flex items-center gap-4 max-w-sm">
                <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-green-100">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <div>
                    <h4 className="font-bold text-gray-900">Success!</h4>
                    <p className="text-sm text-gray-500">{message}</p>
                </div>
                <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg text-gray-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default SuccessNotification;
