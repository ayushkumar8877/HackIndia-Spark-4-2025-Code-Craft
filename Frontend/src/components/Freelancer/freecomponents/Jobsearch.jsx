import React, { useState, useEffect } from 'react';
import { Search, X, Filter } from 'lucide-react';

function JobSearchModal({ isOpen, onClose, onApply }) {
  const [jobType, setJobType] = useState('');
  const [minSalary, setMinSalary] = useState('');
  const [maxSalary, setMaxSalary] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Mock job data - in a real application, this would come from an API
  const mockJobs = [
    { id: 1, title: 'Frontend Developer', company: 'Tech Solutions', type: 'Web Development', salary: 4500, description: 'Building responsive web interfaces using React and Tailwind CSS.' },
    { id: 2, title: 'Mobile App Designer', company: 'AppWorks', type: 'Mobile Development', salary: 5200, description: 'Creating UI/UX designs for iOS and Android applications.' },
    { id: 3, title: 'WordPress Developer', company: 'WebAgency', type: 'Web Development', salary: 3800, description: 'Customizing WordPress themes and developing plugins.' },
    { id: 4, title: 'Graphic Designer', company: 'Creative Studios', type: 'Design', salary: 4000, description: 'Creating branding materials and marketing assets.' },
    { id: 5, title: 'Backend Developer', company: 'DataSystems', type: 'Web Development', salary: 6000, description: 'Building APIs and database architecture using Node.js.' },
  ];

  // Reset form when modal is opened
  useEffect(() => {
    if (isOpen) {
      setJobType('');
      setMinSalary('');
      setMaxSalary('');
      setSearchResults([]);
    }
  }, [isOpen]);

  const handleSearch = () => {
    setIsLoading(true);
    
    // Simulate API call with setTimeout
    setTimeout(() => {
      const results = mockJobs.filter(job => {
        const matchesType = !jobType || job.type.toLowerCase().includes(jobType.toLowerCase());
        const matchesMinSalary = !minSalary || job.salary >= parseInt(minSalary);
        const matchesMaxSalary = !maxSalary || job.salary <= parseInt(maxSalary);
        
        return matchesType && matchesMinSalary && matchesMaxSalary;
      });
      
      setSearchResults(results);
      setIsLoading(false);
    }, 800);
  };

  const handleApply = (jobId) => {
    const selectedJob = searchResults.find(job => job.id === jobId);
    if (selectedJob && onApply) {
      onApply(selectedJob);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Find Jobs</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6 border-b border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Job Type</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="e.g. Web Development"
                value={jobType}
                onChange={(e) => setJobType(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Min Salary ($)</label>
              <input
                type="number"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="3000"
                value={minSalary}
                onChange={(e) => setMinSalary(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Max Salary ($)</label>
              <input
                type="number"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="10000"
                value={maxSalary}
                onChange={(e) => setMaxSalary(e.target.value)}
              />
            </div>
          </div>
          <button
            className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center"
            onClick={handleSearch}
          >
            <Search className="w-4 h-4 mr-2" />
            Search Jobs
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6">
          {isLoading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            </div>
          ) : searchResults.length > 0 ? (
            <div className="space-y-4">
              {searchResults.map(job => (
                <div key={job.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg">{job.title}</h3>
                      <p className="text-sm text-gray-600">{job.company}</p>
                      <p className="mt-2 text-sm">{job.description}</p>
                      <div className="mt-2 flex items-center">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                          {job.type}
                        </span>
                        <span className="ml-2 text-sm text-gray-700">${job.salary}/month</span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleApply(job.id)}
                      className="px-3 py-1.5 bg-primary-600 text-white text-sm rounded-lg hover:bg-primary-700 transition-colors"
                    >
                      Apply Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : searchResults.length === 0 && !isLoading && (jobType || minSalary || maxSalary) ? (
            <div className="text-center py-10">
              <p className="text-gray-500">No jobs found matching your criteria.</p>
            </div>
          ) : (
            <div className="text-center py-10">
              <Filter className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Use the filters above to find jobs that match your skills and preferences.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default JobSearchModal;