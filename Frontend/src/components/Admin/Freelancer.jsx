import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

// Sample freelancer data - in a real app, this would come from an API
const initialFreelancers = [
  {
    id: 1,
    name: "Alex Johnson",
    specialization: "Web Development",
    hourlyRate: 45,
    completedProjects: 87,
    rating: 4.8,
    totalEarnings: 28500,
    onTimeDelivery: 96,
    clientSatisfaction: 92,
    activeProjects: 3,
    joinedDate: "2022-05-12"
  },
  {
    id: 2,
    name: "Sarah Williams",
    specialization: "Graphic Design",
    hourlyRate: 38,
    completedProjects: 64,
    rating: 4.6,
    totalEarnings: 19200,
    onTimeDelivery: 94,
    clientSatisfaction: 89,
    activeProjects: 2,
    joinedDate: "2023-01-18"
  },
  {
    id: 3,
    name: "Michael Chen",
    specialization: "Mobile Development",
    hourlyRate: 52,
    completedProjects: 41,
    rating: 4.9,
    totalEarnings: 31450,
    onTimeDelivery: 98,
    clientSatisfaction: 95,
    activeProjects: 4,
    joinedDate: "2022-08-30"
  },
  {
    id: 4,
    name: "Emily Rodriguez",
    specialization: "Content Writing",
    hourlyRate: 32,
    completedProjects: 102,
    rating: 4.7,
    totalEarnings: 18600,
    onTimeDelivery: 92,
    clientSatisfaction: 90,
    activeProjects: 1,
    joinedDate: "2021-11-05"
  },
  {
    id: 5,
    name: "David Thompson",
    specialization: "UI/UX Design",
    hourlyRate: 48,
    completedProjects: 56,
    rating: 4.8,
    totalEarnings: 24800,
    onTimeDelivery: 95,
    clientSatisfaction: 93,
    activeProjects: 2,
    joinedDate: "2022-03-22"
  }
];

// Calculate overall statistics
const calculateOverallStats = (freelancers) => {
  return {
    totalFreelancers: freelancers.length,
    averageRating: freelancers.reduce((sum, freelancer) => sum + freelancer.rating, 0) / freelancers.length,
    totalProjects: freelancers.reduce((sum, freelancer) => sum + freelancer.completedProjects, 0),
    averageHourlyRate: freelancers.reduce((sum, freelancer) => sum + freelancer.hourlyRate, 0) / freelancers.length,
    totalEarnings: freelancers.reduce((sum, freelancer) => sum + freelancer.totalEarnings, 0),
    averageOnTimeDelivery: freelancers.reduce((sum, freelancer) => sum + freelancer.onTimeDelivery, 0) / freelancers.length,
    averageClientSatisfaction: freelancers.reduce((sum, freelancer) => sum + freelancer.clientSatisfaction, 0) / freelancers.length,
  };
};

// Freelancer distribution by specialization
const calculateSpecializationStats = (freelancers) => {
  const specializationCounts = {};
  freelancers.forEach(freelancer => {
    specializationCounts[freelancer.specialization] = (specializationCounts[freelancer.specialization] || 0) + 1;
  });
  return specializationCounts;
};

const FreelancerStatsDashboard = () => {
  const [freelancers, setFreelancers] = useState(initialFreelancers);
  const [filteredFreelancers, setFilteredFreelancers] = useState(initialFreelancers);
  const [searchQuery, setSearchQuery] = useState('');
  const [specializationFilter, setSpecializationFilter] = useState('All');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  
  // Stats
  const [overallStats, setOverallStats] = useState({});
  const [specializationStats, setSpecializationStats] = useState({});
  
  // Calculate stats when freelancers change
  useEffect(() => {
    setOverallStats(calculateOverallStats(filteredFreelancers));
    setSpecializationStats(calculateSpecializationStats(filteredFreelancers));
  }, [filteredFreelancers]);
  
  // Handle search
  useEffect(() => {
    const filtered = freelancers.filter(freelancer => {
      const matchesSearch = freelancer.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          freelancer.specialization.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesSpecialization = specializationFilter === 'All' || 
                                  freelancer.specialization === specializationFilter;
      
      return matchesSearch && matchesSpecialization;
    });
    
    setFilteredFreelancers(filtered);
  }, [searchQuery, specializationFilter, freelancers]);
  
  // Get unique specializations for filter dropdown
  const specializations = ['All', ...new Set(freelancers.map(f => f.specialization))];
  
  // Sorting functionality
  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
    
    setFilteredFreelancers(prevFreelancers => {
      return [...prevFreelancers].sort((a, b) => {
        if (a[key] < b[key]) {
          return direction === 'ascending' ? -1 : 1;
        }
        if (a[key] > b[key]) {
          return direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    });
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gray-900 shadow-lg">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-white">Freelancer Statistics Dashboard</h1>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Search and Filter Section */}
        <div className="mb-6 bg-white p-4 rounded-lg shadow">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search freelancers by name or specialization..."
                className="pl-10 block w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="min-w-fit">
              <select
                className="block w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={specializationFilter}
                onChange={(e) => setSpecializationFilter(e.target.value)}
              >
                {specializations.map(spec => (
                  <option key={spec} value={spec}>{spec}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        {/* Statistics Overview Cards */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">Total Freelancers</h3>
            <p className="mt-2 text-3xl font-semibold text-gray-900">{overallStats.totalFreelancers || 0}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">Average Rating</h3>
            <p className="mt-2 text-3xl font-semibold text-gray-900">{(overallStats.averageRating || 0).toFixed(1)}/5.0</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">Total Projects Completed</h3>
            <p className="mt-2 text-3xl font-semibold text-gray-900">{overallStats.totalProjects || 0}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">Average Hourly Rate</h3>
            <p className="mt-2 text-3xl font-semibold text-gray-900">${(overallStats.averageHourlyRate || 0).toFixed(2)}</p>
          </div>
        </div>
        
        {/* Detailed Stats Cards */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* On-Time Delivery & Client Satisfaction */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Performance Metrics</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500">On-Time Delivery</h4>
                <p className="text-2xl font-semibold text-green-600">{(overallStats.averageOnTimeDelivery || 0).toFixed(1)}%</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Client Satisfaction</h4>
                <p className="text-2xl font-semibold text-indigo-600">{(overallStats.averageClientSatisfaction || 0).toFixed(1)}%</p>
              </div>
            </div>
          </div>
          
          {/* Specialization Distribution */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Specialization Distribution</h3>
            <div className="space-y-2">
              {Object.entries(specializationStats).map(([specialization, count]) => (
                <div key={specialization} className="flex items-center">
                  <span className="text-sm text-gray-600 w-40 truncate">{specialization}</span>
                  <div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-indigo-500" 
                      style={{ width: `${(count / overallStats.totalFreelancers) * 100}%` }}
                    />
                  </div>
                  <span className="ml-2 text-sm font-medium text-gray-600">{count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Freelancers Data Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
            <h3 className="text-lg font-medium text-gray-900">Freelancer Details</h3>
            <p className="mt-1 text-sm text-gray-500">
              Showing {filteredFreelancers.length} of {freelancers.length} freelancers
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => requestSort('name')}
                  >
                    Name {sortConfig.key === 'name' && (
                      sortConfig.direction === 'ascending' ? '↑' : '↓'
                    )}
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => requestSort('specialization')}
                  >
                    Specialization {sortConfig.key === 'specialization' && (
                      sortConfig.direction === 'ascending' ? '↑' : '↓'
                    )}
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => requestSort('hourlyRate')}
                  >
                    Hourly Rate {sortConfig.key === 'hourlyRate' && (
                      sortConfig.direction === 'ascending' ? '↑' : '↓'
                    )}
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => requestSort('rating')}
                  >
                    Rating {sortConfig.key === 'rating' && (
                      sortConfig.direction === 'ascending' ? '↑' : '↓'
                    )}
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => requestSort('completedProjects')}
                  >
                    Projects {sortConfig.key === 'completedProjects' && (
                      sortConfig.direction === 'ascending' ? '↑' : '↓'
                    )}
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => requestSort('onTimeDelivery')}
                  >
                    On-Time {sortConfig.key === 'onTimeDelivery' && (
                      sortConfig.direction === 'ascending' ? '↑' : '↓'
                    )}
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => requestSort('activeProjects')}
                  >
                    Active {sortConfig.key === 'activeProjects' && (
                      sortConfig.direction === 'ascending' ? '↑' : '↓'
                    )}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredFreelancers.map(freelancer => (
                  <tr key={freelancer.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{freelancer.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                        {freelancer.specialization}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      ${freelancer.hourlyRate}/hr
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="text-yellow-500 mr-1">★</span>
                        <span className="text-gray-900">{freelancer.rating.toFixed(1)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {freelancer.completedProjects}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-${freelancer.onTimeDelivery >= 95 ? 'green' : freelancer.onTimeDelivery >= 90 ? 'yellow' : 'red'}-600`}>
                        {freelancer.onTimeDelivery}%
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {freelancer.activeProjects}
                    </td>
                  </tr>
                ))}
                {filteredFreelancers.length === 0 && (
                  <tr>
                    <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                      No freelancers found matching your search criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FreelancerStatsDashboard;