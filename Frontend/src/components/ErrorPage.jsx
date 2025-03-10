import React from 'react';
import { AlertTriangle } from 'lucide-react';

const ModernErrorPage = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
            <div className="max-w-md w-full bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="bg-red-600 p-6 flex justify-center">
                    <AlertTriangle size={64} color="white" />
                </div>

                <div className="p-6 text-center">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Oops! Something went wrong</h1>
                    <p className="text-gray-600 mb-6">We couldn't find the page you were looking for or an unexpected error occurred.</p>

                    <div className="space-y-4">
                        <button
                            onClick={() => window.location.href = '/'}
                            className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 rounded-md transition duration-200"
                        >
                            Return Home
                        </button>

                        <button
                            onClick={() => window.location.reload()}
                            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-4 rounded-md transition duration-200"
                        >
                            Try Again
                        </button>
                    </div>
                </div>

                <div className="bg-gray-100 p-4 border-t border-gray-200">
                    <p className="text-gray-600 text-sm text-center">
                        If the problem persists, please contact <span className="font-medium">support@mindlancer.com</span>
                    </p>
                </div>
            </div>

            <div className="mt-8 text-center">
                <p className="text-gray-500 text-sm">Error Code: 404</p>
                <p className="text-gray-500 text-sm mt-1">
                    {new Date().toLocaleString()}
                </p>
            </div>
        </div>
    );
};

export default ModernErrorPage;