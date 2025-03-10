import React, { useState, useEffect } from 'react';

const ApplicationPage = () => {
  const [applications, setApplications] = useState([
    {
      id: 1,
      name: "Alex Johnson",
      email: "alex.johnson@email.com",
      position: "Senior Frontend Developer",
      project: "Website Redesign",
      appliedDate: "2025-03-01",
      experience: 5,
      skills: ["React", "TypeScript", "Redux", "TailwindCSS"],
      status: "Pending",
      firstApplied: true
    },
    {
      id: 2,
      name: "Sarah Williams",
      email: "sarah.w@email.com",
      position: "Backend Engineer",
      project: "API Development",
      appliedDate: "2025-03-02",
      experience: 7,
      skills: ["Node.js", "Express", "MongoDB", "GraphQL"],
      status: "Interviewing",
      firstApplied: true
    },
    {
      id: 3,
      name: "Michael Chen",
      email: "m.chen@email.com",
      position: "UI/UX Designer",
      project: "Mobile App Design",
      appliedDate: "2025-03-05",
      experience: 4,
      skills: ["Figma", "Adobe XD", "Sketch", "Wireframing"],
      status: "Rejected",
      firstApplied: false
    },
    {
      id: 4,
      name: "Emily Rodriguez",
      email: "e.rodriguez@email.com",
      position: "Frontend Developer",
      project: "E-commerce Platform",
      appliedDate: "2025-03-07",
      experience: 3,
      skills: ["JavaScript", "React", "CSS", "HTML"],
      status: "Pending",
      firstApplied: true
    },
    {
      id: 5,
      name: "James Wilson",
      email: "james.w@email.com",
      position: "Full Stack Developer",
      project: "CRM Development",
      appliedDate: "2025-03-08",
      experience: 6,
      skills: ["React", "Node.js", "SQL", "TypeScript"],
      status: "Pending",
      firstApplied: false
    }
  ]);

  // Filter states
  const [filters, setFilters] = useState({
    project: "",
    status: "",
    skills: "",
    firstApplied: false,
    sortBy: "date"
  });

  // Filtered applications
  const [filteredApplications, setFilteredApplications] = useState(applications);

  // List of unique projects
  const projects = [...new Set(applications.map(app => app.project))];
  
  // List of unique statuses
  const statuses = [...new Set(applications.map(app => app.status))];

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Apply filters
  useEffect(() => {
    let result = [...applications];
    
    // Filter by project
    if (filters.project) {
      result = result.filter(app => app.project === filters.project);
    }
    
    // Filter by status
    if (filters.status) {
      result = result.filter(app => app.status === filters.status);
    }
    
    // Filter by skills
    if (filters.skills) {
      const skillsArray = filters.skills.toLowerCase().split(',').map(skill => skill.trim());
      result = result.filter(app => 
        app.skills.some(skill => 
          skillsArray.some(s => skill.toLowerCase().includes(s))
        )
      );
    }
    
    // Filter by first applied
    if (filters.firstApplied) {
      result = result.filter(app => app.firstApplied);
    }
    
    // Sort applications
    if (filters.sortBy === "date") {
      result.sort((a, b) => new Date(b.appliedDate) - new Date(a.appliedDate));
    } else if (filters.sortBy === "experience") {
      result.sort((a, b) => b.experience - a.experience);
    }
    
    setFilteredApplications(result);
  }, [filters, applications]);

  // Update application status
  const updateStatus = (id, newStatus) => {
    setApplications(prevApplications => 
      prevApplications.map(app => 
        app.id === id ? { ...app, status: newStatus } : app
      )
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Application Management</h1>
      
      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Filter Applications</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Project</label>
            <select
              name="project"
              value={filters.project}
              onChange={handleFilterChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Projects</option>
              {projects.map((project, index) => (
                <option key={index} value={project}>{project}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Statuses</option>
              {statuses.map((status, index) => (
                <option key={index} value={status}>{status}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Skills</label>
            <input
              type="text"
              name="skills"
              value={filters.skills}
              onChange={handleFilterChange}
              placeholder="React, Node.js, etc."
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
            <select
              name="sortBy"
              value={filters.sortBy}
              onChange={handleFilterChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="date">Application Date</option>
              <option value="experience">Experience</option>
            </select>
          </div>
        </div>
        
        <div className="mt-4 flex items-center">
          <input
            type="checkbox"
            id="firstApplied"
            name="firstApplied"
            checked={filters.firstApplied}
            onChange={handleFilterChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="firstApplied" className="ml-2 block text-sm text-gray-700">
            First Come First Serve
          </label>
        </div>
        
        <div className="mt-4">
          <p className="text-sm text-gray-600">
            Showing {filteredApplications.length} of {applications.length} applications
          </p>
        </div>
      </div>
      
      {/* Applications List */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Applicant
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Position & Project
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Skills
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Applied Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredApplications.map((application) => (
                <tr key={application.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                        {application.name.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{application.name}</div>
                        <div className="text-sm text-gray-500">{application.email}</div>
                        <div className="text-xs text-gray-500">{application.experience} years experience</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{application.position}</div>
                    <div className="text-sm text-gray-500">{application.project}</div>
                    {application.firstApplied && (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Early Applicant
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {application.skills.map((skill, index) => (
                        <span 
                          key={index} 
                          className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Date(application.appliedDate).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${application.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                        application.status === 'Interviewing' ? 'bg-blue-100 text-blue-800' : 
                        application.status === 'Rejected' ? 'bg-red-100 text-red-800' : 
                        application.status === 'Hired' ? 'bg-green-100 text-green-800' : 
                        'bg-gray-100 text-gray-800'}`}
                    >
                      {application.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <select
                      value={application.status}
                      onChange={(e) => updateStatus(application.id, e.target.value)}
                      className="mr-2 p-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Interviewing">Interviewing</option>
                      <option value="Hired">Hired</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                    <button className="text-indigo-600 hover:text-indigo-900 mr-2">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredApplications.length === 0 && (
          <div className="py-10 text-center">
            <p className="text-gray-500">No applications match your filters</p>
          </div>
        )}
      </div>
      
      {/* Add New Application Form */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Add New Application</h2>
        <form>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="john.doe@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Frontend Developer"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Project</label>
              <select
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Project</option>
                {projects.map((project, index) => (
                  <option key={index} value={project}>{project}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Years of Experience</label>
              <input
                type="number"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="5"
                min="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Skills (comma separated)</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="React, JavaScript, CSS, etc."
              />
            </div>
          </div>
          <button
            type="submit"
            className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-300"
          >
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
};

export default ApplicationPage;