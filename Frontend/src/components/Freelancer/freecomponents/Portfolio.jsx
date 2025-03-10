// portfolio.jsx - Portfolio Page
import React from 'react';

function PortfolioPage() {
  return (
    <div className="w-full min-h-screen bg-white">
  
      
      {/* Portfolio Content */}
      <main className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Portfolio</h1>
            <button className="bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800">Add Project</button>
          </div>
          
          {/* Filter Options */}
          <div className="mb-6">
            <div className="flex space-x-2">
              <button className="bg-gray-900 text-white px-3 py-1 rounded-md">All</button>
              <button className="bg-gray-200 text-gray-800 px-3 py-1 rounded-md hover:bg-gray-300">Web Design</button>
              <button className="bg-gray-200 text-gray-800 px-3 py-1 rounded-md hover:bg-gray-300">Graphic Design</button>
              <button className="bg-gray-200 text-gray-800 px-3 py-1 rounded-md hover:bg-gray-300">UI/UX</button>
              <button className="bg-gray-200 text-gray-800 px-3 py-1 rounded-md hover:bg-gray-300">Development</button>
            </div>
          </div>
          
          {/* Portfolio Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Project 1 */}
            <div className="rounded-lg overflow-hidden shadow-md">
              <div className="h-48 bg-gray-300"></div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900">E-commerce Website</h3>
                <div className="flex space-x-2 mb-2">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">Web Development</span>
                  <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs">UI/UX</span>
                </div>
                <p className="text-sm text-gray-500">A complete e-commerce solution with payment integration and inventory management.</p>
                <div className="mt-4 flex justify-between">
                  <button className="text-blue-600 hover:text-blue-800">View Details</button>
                  <button className="text-gray-600 hover:text-gray-800">Edit</button>
                </div>
              </div>
            </div>
            
            {/* Project 2 */}
            <div className="rounded-lg overflow-hidden shadow-md">
              <div className="h-48 bg-gray-300"></div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900">Brand Identity</h3>
                <div className="flex space-x-2 mb-2">
                  <span className="bg-pink-100 text-pink-800 px-2 py-1 rounded-full text-xs">Branding</span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Graphic Design</span>
                </div>
                <p className="text-sm text-gray-500">Complete brand identity including logo, color palette, and style guide.</p>
                <div className="mt-4 flex justify-between">
                  <button className="text-blue-600 hover:text-blue-800">View Details</button>
                  <button className="text-gray-600 hover:text-gray-800">Edit</button>
                </div>
              </div>
            </div>
            
            {/* Project 3 */}
            <div className="rounded-lg overflow-hidden shadow-md">
              <div className="h-48 bg-gray-300"></div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900">Mobile App</h3>
                <div className="flex space-x-2 mb-2">
                  <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs">Mobile Development</span>
                  <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs">UI Design</span>
                </div>
                <p className="text-sm text-gray-500">Fitness tracking app with social features and progress analytics.</p>
                <div className="mt-4 flex justify-between">
                  <button className="text-blue-600 hover:text-blue-800">View Details</button>
                  <button className="text-gray-600 hover:text-gray-800">Edit</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="w-full bg-gray-900 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex justify-between">
            <div>© 2025 FreelanceHub. All rights reserved.</div>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-gray-300">Terms</a>
              <a href="#" className="hover:text-gray-300">Privacy</a>
              <a href="#" className="hover:text-gray-300">Help</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default PortfolioPage;