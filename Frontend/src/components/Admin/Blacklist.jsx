import React, { useState } from 'react';
import { Search, Filter, X, Check, AlertTriangle } from 'lucide-react';

const BlacklistPage = () => {
  // State for tabs, search, and blacklist data
  const [activeTab, setActiveTab] = useState('freelancers');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  
  // Mock data for demonstration
  const [freelancers, setFreelancers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', skills: 'React, Node.js', blacklisted: true, reason: 'Contract violation' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', skills: 'UI/UX, Design', blacklisted: false, reason: '' },
    { id: 3, name: 'Mike Wilson', email: 'mike@example.com', skills: 'Python, Django', blacklisted: false, reason: '' },
    { id: 4, name: 'Sarah Johnson', email: 'sarah@example.com', skills: 'JavaScript, React', blacklisted: true, reason: 'Unprofessional conduct' },
  ]);
  
  const [companies, setCompanies] = useState([
    { id: 1, name: 'Tech Solutions Inc.', email: 'contact@techsolutions.com', industry: 'Software Development', blacklisted: false, reason: '' },
    { id: 2, name: 'Design Masters', email: 'info@designmasters.com', industry: 'Graphic Design', blacklisted: true, reason: 'Payment issues' },
    { id: 3, name: 'Global Services', email: 'support@globalservices.com', industry: 'Consulting', blacklisted: false, reason: '' },
    { id: 4, name: 'InnovateNow', email: 'hello@innovatenow.com', industry: 'Technology', blacklisted: true, reason: 'Multiple complaints' },
  ]);
  
  // Toggle blacklist status
  const toggleBlacklist = (id, type, reason = '') => {
    if (type === 'freelancer') {
      setFreelancers(freelancers.map(freelancer => 
        freelancer.id === id 
          ? { ...freelancer, blacklisted: !freelancer.blacklisted, reason: !freelancer.blacklisted ? reason : '' } 
          : freelancer
      ));
    } else {
      setCompanies(companies.map(company => 
        company.id === id 
          ? { ...company, blacklisted: !company.blacklisted, reason: !company.blacklisted ? reason : '' } 
          : company
      ));
    }
  };
  
  // Filter and search functionality
  const getFilteredData = () => {
    const data = activeTab === 'freelancers' ? freelancers : companies;
    
    return data.filter(item => {
      // Filter by status
      if (filterStatus === 'blacklisted' && !item.blacklisted) return false;
      if (filterStatus === 'active' && item.blacklisted) return false;
      
      // Search by name or email
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return item.name.toLowerCase().includes(query) || 
               item.email.toLowerCase().includes(query);
      }
      
      return true;
    });
  };
  
  // UI for blacklist reason modal
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [blacklistReason, setBlacklistReason] = useState('');
  
  const openBlacklistModal = (item, type) => {
    setSelectedItem({ ...item, type });
    setBlacklistReason(item.reason || '');
    setShowModal(true);
  };
  
  const confirmBlacklist = () => {
    if (selectedItem) {
      toggleBlacklist(selectedItem.id, selectedItem.type, blacklistReason);
      setShowModal(false);
      setSelectedItem(null);
      setBlacklistReason('');
    }
  };
  
  const filteredData = getFilteredData();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Blacklist Management</h1>
        
        {/* Tab navigation */}
        <div className="mt-4 border-b border-gray-200">
          <nav className="flex space-x-8" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('freelancers')}
              className={`${
                activeTab === 'freelancers'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Freelancers
            </button>
            <button
              onClick={() => setActiveTab('companies')}
              className={`${
                activeTab === 'companies'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Companies
            </button>
          </nav>
        </div>
        
        {/* Search and filter controls */}
        <div className="mt-6 flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0 sm:space-x-4">
          <div className="relative w-full sm:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder={`Search ${activeTab}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All</option>
              <option value="blacklisted">Blacklisted Only</option>
              <option value="active">Active Only</option>
            </select>
          </div>
        </div>
        
        {/* Data table */}
        <div className="mt-6 bg-white shadow overflow-hidden sm:rounded-md">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {activeTab === 'freelancers' ? 'Skills' : 'Industry'}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reason
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {activeTab === 'freelancers' ? item.skills : item.industry}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.blacklisted ? (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                          Blacklisted
                        </span>
                      ) : (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Active
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.reason || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => openBlacklistModal(item, activeTab === 'freelancers' ? 'freelancer' : 'company')}
                        className={`inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md ${
                          item.blacklisted
                            ? 'text-indigo-700 bg-indigo-100 hover:bg-indigo-200'
                            : 'text-red-700 bg-red-100 hover:bg-red-200'
                        }`}
                      >
                        {item.blacklisted ? 'Remove from Blacklist' : 'Add to Blacklist'}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                    No {activeTab} found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Blacklist reason modal */}
      {showModal && selectedItem && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100">
                  <AlertTriangle className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    {selectedItem.blacklisted ? 'Remove from Blacklist' : 'Add to Blacklist'}
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      {selectedItem.blacklisted
                        ? `Are you sure you want to remove ${selectedItem.name} from the blacklist?`
                        : `Are you sure you want to blacklist ${selectedItem.name}? This will hide them from ${
                            selectedItem.type === 'freelancer' ? 'companies' : 'freelancers'
                          }.`}
                    </p>
                    
                    {!selectedItem.blacklisted && (
                      <div className="mt-4">
                        <label htmlFor="reason" className="block text-sm font-medium text-gray-700 text-left">
                          Reason for blacklisting
                        </label>
                        <textarea
                          id="reason"
                          name="reason"
                          rows="3"
                          className="mt-1 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                          placeholder="Please provide a reason for blacklisting..."
                          value={blacklistReason}
                          onChange={(e) => setBlacklistReason(e.target.value)}
                        ></textarea>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
                  onClick={confirmBlacklist}
                >
                  Confirm
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                  onClick={() => {
                    setShowModal(false);
                    setSelectedItem(null);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlacklistPage;