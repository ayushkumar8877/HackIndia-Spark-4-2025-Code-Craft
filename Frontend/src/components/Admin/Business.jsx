import React, { useState, useEffect } from 'react';
import { Search, Download, BarChart, PieChart, TrendingUp, Users, Building, DollarSign } from 'lucide-react';
import { LineChart, Line, BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell } from 'recharts';

const CompanyStatisticsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState('last30days');
  const [companyData, setCompanyData] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // Colors for charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
  
  // Mock data for demonstration
  const mockCompanies = [
    { id: 1, name: 'Tech Solutions Inc.', email: 'contact@techsolutions.com', industry: 'Software Development' },
    { id: 2, name: 'Design Masters', email: 'info@designmasters.com', industry: 'Graphic Design' },
    { id: 3, name: 'Global Services', email: 'support@globalservices.com', industry: 'Consulting' },
    { id: 4, name: 'InnovateNow', email: 'hello@innovatenow.com', industry: 'Technology' },
  ];
  
  // Generate mock statistics for a selected company
  const generateMockStats = (companyId) => {
    const mockRevenueData = [
      { month: 'Jan', revenue: Math.floor(Math.random() * 50000) + 10000 },
      { month: 'Feb', revenue: Math.floor(Math.random() * 50000) + 10000 },
      { month: 'Mar', revenue: Math.floor(Math.random() * 50000) + 10000 },
      { month: 'Apr', revenue: Math.floor(Math.random() * 50000) + 10000 },
      { month: 'May', revenue: Math.floor(Math.random() * 50000) + 10000 },
      { month: 'Jun', revenue: Math.floor(Math.random() * 50000) + 10000 },
    ];
    
    const mockContractData = [
      { name: 'Completed', value: Math.floor(Math.random() * 30) + 10 },
      { name: 'In Progress', value: Math.floor(Math.random() * 20) + 5 },
      { name: 'Cancelled', value: Math.floor(Math.random() * 10) },
    ];
    
    const mockProjectTypes = [
      { name: 'Web Development', value: Math.floor(Math.random() * 40) + 20 },
      { name: 'Mobile Apps', value: Math.floor(Math.random() * 30) + 10 },
      { name: 'UI/UX Design', value: Math.floor(Math.random() * 25) + 5 },
      { name: 'Content Creation', value: Math.floor(Math.random() * 20) },
      { name: 'Other', value: Math.floor(Math.random() * 15) },
    ];
    
    const mockFreelancerHiring = [
      { month: 'Jan', count: Math.floor(Math.random() * 15) + 5 },
      { month: 'Feb', count: Math.floor(Math.random() * 15) + 5 },
      { month: 'Mar', count: Math.floor(Math.random() * 15) + 5 },
      { month: 'Apr', count: Math.floor(Math.random() * 15) + 5 },
      { month: 'May', count: Math.floor(Math.random() * 15) + 5 },
      { month: 'Jun', count: Math.floor(Math.random() * 15) + 5 },
    ];
    
    return {
      id: companyId,
      company: mockCompanies.find(c => c.id === companyId),
      summary: {
        totalProjects: Math.floor(Math.random() * 100) + 20,
        activeProjects: Math.floor(Math.random() * 30) + 5,
        totalSpent: Math.floor(Math.random() * 500000) + 50000,
        totalFreelancers: Math.floor(Math.random() * 50) + 10,
        avgRating: (Math.random() * 2 + 3).toFixed(1),
        avgProjectCost: Math.floor(Math.random() * 10000) + 1000,
        memberSince: new Date(2020 + Math.floor(Math.random() * 3), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toLocaleDateString(),
      },
      revenueData: mockRevenueData,
      contractData: mockContractData,
      projectTypes: mockProjectTypes,
      freelancerHiring: mockFreelancerHiring,
    };
  };
  
  // Search for company stats
  const handleSearch = () => {
    if (!searchQuery) return;
    
    setLoading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      const foundCompany = mockCompanies.find(c => 
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      if (foundCompany) {
        setCompanyData(generateMockStats(foundCompany.id));
      } else {
        setCompanyData(null);
      }
      
      setLoading(false);
    }, 800);
  };
  
  // Auto search when query is entered
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery) {
        handleSearch();
      }
    }, 500);
    
    return () => clearTimeout(timer);
  }, [searchQuery]);
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Company Statistics</h1>
        
        {/* Search and filter controls */}
        <div className="mt-6 bg-white p-6 shadow rounded-lg">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="w-full md:w-1/2">
              <label htmlFor="company-search" className="block text-sm font-medium text-gray-700 mb-1">
                Search Company
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="company-search"
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                  placeholder="Search by company name or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
            </div>
            
            <div className="w-full md:w-1/3">
              <label htmlFor="date-range" className="block text-sm font-medium text-gray-700 mb-1">
                Date Range
              </label>
              <select
                id="date-range"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
              >
                <option value="last30days">Last 30 Days</option>
                <option value="last3months">Last 3 Months</option>
                <option value="last6months">Last 6 Months</option>
                <option value="lastyear">Last Year</option>
                <option value="alltime">All Time</option>
              </select>
            </div>
          </div>
        </div>
        
        {loading && (
          <div className="mt-6 flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
          </div>
        )}
        
        {!loading && companyData && (
          <div className="mt-6 space-y-6">
            {/* Company info and summary */}
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900">{companyData.company.name}</h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">{companyData.company.email}</p>
                </div>
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <Download className="h-4 w-4 mr-2" />
                  Export Data
                </button>
              </div>
              
              <div className="border-t border-gray-200">
                <dl>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Industry</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{companyData.company.industry}</dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Member Since</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{companyData.summary.memberSince}</dd>
                  </div>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Average Rating</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {companyData.summary.avgRating} / 5.0
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
            
            {/* Summary cards */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-indigo-100 rounded-md p-3">
                      <Building className="h-6 w-6 text-indigo-600" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Total Projects</dt>
                        <dd>
                          <div className="text-lg font-medium text-gray-900">{companyData.summary.totalProjects}</div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                      <TrendingUp className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Active Projects</dt>
                        <dd>
                          <div className="text-lg font-medium text-gray-900">{companyData.summary.activeProjects}</div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
                      <Users className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Total Freelancers Hired</dt>
                        <dd>
                          <div className="text-lg font-medium text-gray-900">{companyData.summary.totalFreelancers}</div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-purple-100 rounded-md p-3">
                      <DollarSign className="h-6 w-6 text-purple-600" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Total Spent</dt>
                        <dd>
                          <div className="text-lg font-medium text-gray-900">${companyData.summary.totalSpent.toLocaleString()}</div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Charts section */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {/* Revenue trend chart */}
              <div className="bg-white shadow rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Revenue Trend</h3>
                  <div className="flex items-center text-sm text-gray-500">
                    <BarChart className="h-5 w-5 mr-1" />
                    Monthly data
                  </div>
                </div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={companyData.revenueData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']} />
                      <Legend />
                      <Line type="monotone" dataKey="revenue" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              {/* Project types pie chart */}
              <div className="bg-white shadow rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Project Types</h3>
                  <div className="flex items-center text-sm text-gray-500">
                    <PieChart className="h-5 w-5 mr-1" />
                    Distribution
                  </div>
                </div>
                <div className="h-64 flex justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={companyData.projectTypes}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {companyData.projectTypes.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value, name) => [`${value} projects`, name]} />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              {/* Contract status chart */}
              <div className="bg-white shadow rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Contract Status</h3>
                  <div className="flex items-center text-sm text-gray-500">
                    <BarChart className="h-5 w-5 mr-1" />
                    Current contracts
                  </div>
                </div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart
                      data={companyData.contractData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="value" name="Contracts" fill="#8884d8">
                        {companyData.contractData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Bar>
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              {/* Freelancer hiring trend */}
              <div className="bg-white shadow rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Freelancer Hiring Trend</h3>
                  <div className="flex items-center text-sm text-gray-500">
                    <TrendingUp className="h-5 w-5 mr-1" />
                    Monthly data
                  </div>
                </div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart
                      data={companyData.freelancerHiring}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="count" name="Freelancers Hired" fill="#0088FE" />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {!loading && searchQuery && !companyData && (
          <div className="mt-6 bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">No results found</h3>
              <div className="mt-2 max-w-xl text-sm text-gray-500 mx-auto">
                <p>No company found matching "{searchQuery}". Try a different search term.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyStatisticsPage;                                                   