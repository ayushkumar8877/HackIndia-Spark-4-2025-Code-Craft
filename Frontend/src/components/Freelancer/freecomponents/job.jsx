import React, { useState } from 'react';

const RecentWorkPage = () => {
  // Sample data for recent work/gigs
  const [jobs, setJobs] = useState([
    { id: 1, title: 'Website Redesign', client: 'ABC Company', status: 'In Progress', lastUpdate: '2025-03-08', dueDate: '2025-03-20', payment: '$2,500' },
    { id: 2, title: 'Logo Design', client: 'XYZ Corp', status: 'Completed', lastUpdate: '2025-03-05', dueDate: '2025-03-05', payment: '$800' },
    { id: 3, title: 'Mobile App UI', client: 'Tech Startup', status: 'Pending', lastUpdate: '2025-03-09', dueDate: '2025-03-30', payment: '$3,200' },
    { id: 4, title: 'SEO Optimization', client: 'Local Business', status: 'Not Started', lastUpdate: '2025-03-07', dueDate: '2025-04-10', payment: '$1,500' },
  ]);

  // State for filters
  const [statusFilter, setStatusFilter] = useState('All');
  
  // State for update form
  const [selectedJob, setSelectedJob] = useState(null);
  const [updateStatus, setUpdateStatus] = useState('');
  const [updateNotes, setUpdateNotes] = useState('');

  // Handle filtering
  const filteredJobs = statusFilter === 'All' 
    ? jobs 
    : jobs.filter(job => job.status === statusFilter);

  // Handle job selection for updates
  const handleSelectJob = (job) => {
    setSelectedJob(job);
    setUpdateStatus(job.status);
  };

  // Handle job update
  const handleUpdateJob = (e) => {
    e.preventDefault();
    if (!selectedJob) return;
    
    const updatedJobs = jobs.map(job => {
      if (job.id === selectedJob.id) {
        return {
          ...job,
          status: updateStatus,
          lastUpdate: new Date().toISOString().split('T')[0]
        };
      }
      return job;
    });
    
    setJobs(updatedJobs);
    setSelectedJob(null);
    setUpdateNotes('');
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header Section */}
      <div className="flex justify-between items-center p-4 bg-gray-900 text-white">
        <h1 className="text-xl font-bold">Recent Work</h1>
        <div className="flex items-center">
          {/* Filter Dropdown */}
          <div className="mr-4">
            <select 
              className="bg-red-600 text-white p-2 rounded"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="Not Started">Not Started</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          
          {/* Status Display */}
          <div className="bg-white text-black p-2 rounded">
            <span>Active Jobs: {jobs.filter(job => job.status !== 'Completed').length}</span>
          </div>
        </div>
      </div>
      
      {/* Content Section */}
      <div className="flex flex-col md:flex-row h-full p-4 gap-4">
        {/* Job List Section */}
        <div className="w-full md:w-2/3 bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-4">Job List</h2>
          <div className="overflow-auto max-h-96">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredJobs.map((job) => (
                  <tr key={job.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">{job.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{job.client}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${job.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                          job.status === 'In Progress' ? 'bg-blue-100 text-blue-800' : 
                          job.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-gray-100 text-gray-800'}`}>
                        {job.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{job.dueDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button 
                        onClick={() => handleSelectJob(job)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Update Section */}
        <div className="w-full md:w-1/3 bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-4">Update Job Status</h2>
          {selectedJob ? (
            <form onSubmit={handleUpdateJob}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Selected Job: {selectedJob.title}
                </label>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Status
                </label>
                <select 
                  className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={updateStatus}
                  onChange={(e) => setUpdateStatus(e.target.value)}
                >
                  <option value="Not Started">Not Started</option>
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Update Notes
                </label>
                <textarea
                  className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  rows="4"
                  value={updateNotes}
                  onChange={(e) => setUpdateNotes(e.target.value)}
                  placeholder="Enter notes about this update..."
                ></textarea>
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Update Job
                </button>
                <button
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={() => setSelectedJob(null)}
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="text-gray-500 italic">
              Select a job from the list to update its status
            </div>
          )}
        </div>
          </div>
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
};

export default RecentWorkPage;