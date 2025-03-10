// payments.jsx - Payments Page
import React from 'react';

function PaymentsPage() {
  return (
    <div className="w-full min-h-screen bg-white">
      {/* Header */}
     
      
      {/* Payments Content */}
      <main className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Payments</h1>
          
          {/* Payment Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-900 text-white p-4 rounded-lg">
              <p className="text-sm">Total Earnings</p>
              <p className="text-2xl font-bold">$12,450.00</p>
            </div>
            <div className="bg-gray-900 text-white p-4 rounded-lg">
              <p className="text-sm">Pending</p>
              <p className="text-2xl font-bold">$2,350.00</p>
            </div>
            <div className="bg-gray-900 text-white p-4 rounded-lg">
              <p className="text-sm">Available for Withdrawal</p>
              <p className="text-2xl font-bold">$8,250.00</p>
            </div>
          </div>
          
          {/* Withdrawal Button */}
          <div className="mb-6">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">Withdraw Funds</button>
          </div>
          
          {/* Transactions Table */}
          <div className="overflow-x-auto">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Transactions</h2>
            <table className="min-w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-4 text-left">Date</th>
                  <th className="py-3 px-4 text-left">Client</th>
                  <th className="py-3 px-4 text-left">Project</th>
                  <th className="py-3 px-4 text-right">Amount</th>
                  <th className="py-3 px-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="py-3 px-4">Mar 08, 2025</td>
                  <td className="py-3 px-4">TechCorp Inc.</td>
                  <td className="py-3 px-4">Website Redesign</td>
                  <td className="py-3 px-4 text-right">$1,200.00</td>
                  <td className="py-3 px-4 text-center"><span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Paid</span></td>
                </tr>
                <tr>
                  <td className="py-3 px-4">Mar 05, 2025</td>
                  <td className="py-3 px-4">MarketBoost</td>
                  <td className="py-3 px-4">SEO Optimization</td>
                  <td className="py-3 px-4 text-right">$850.00</td>
                  <td className="py-3 px-4 text-center"><span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">Pending</span></td>
                </tr>
                <tr>
                  <td className="py-3 px-4">Feb 28, 2025</td>
                  <td className="py-3 px-4">Artisan Designs</td>
                  <td className="py-3 px-4">Logo Creation</td>
                  <td className="py-3 px-4 text-right">$450.00</td>
                  <td className="py-3 px-4 text-center"><span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Paid</span></td>
                </tr>
              </tbody>
            </table>
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

export default PaymentsPage;