import React, { useState, useEffect } from 'react';
import axios from 'axios';

const JobPostingPage = () => {
  const [jobPostings, setJobPostings] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    deadline: "",
    urgent: false,
    location: ""
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData)
      const response = await axios.post("http://localhost:3000/business/postings", {
        title: formData.title,
        description: formData.description,
        requirements: formData.requirements.split(",").map(req => req.trim()),
        salary: formData.salary,
        deadline: formData.deadline,
        urgent: formData.urgent,
        location: formData.location,
        postedOn: new Date()
      });
      if (response.data.success === true) {
        alert("Job posting created successfully");
        setFormData({
          title: "",
          description: "",
          requirements: "",
          salary: "",
          deadline: "",
          urgent: false,
          location: ""
        });
      }

    } catch (err) {
      console.log(err)
    }
  };

  const fetchPostings = async () => {
    try {
      const response = await axios.get("http://localhost:3000/business/postings");
      setJobPostings(response.data);
    } catch (err) {
      console.log(err)
    }
  }

  // Calculate days remaining until deadline
  const getDaysRemaining = (deadlineDate) => {
    const today = new Date();
    const deadline = new Date(deadlineDate);
    const diffTime = deadline.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleDelete = async (id) => {
    try {
      const cf = confirm("Are you sure you want to delete this job posting?");
      if (!cf) return;
      const response = await axios.delete(`http://localhost:3000/business/postings/${id}`);
      if (response.data.success === true) {
        alert("Job posting deleted successfully");
        fetchPostings();
      }
    } catch (err) {
      console.log(err)
    }
  };

  useEffect(() => {
    fetchPostings();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Job Postings</h1>

      {/* Add New Job Posting Form */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Create New Job Posting</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                placeholder="Remote, Hybrid, or Location"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Salary Range</label>
              <input
                type="text"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                placeholder="50,000 - 70,000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Application Deadline</label>
              <input
                type="date"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Job Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              ></textarea>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Requirements (comma separated)</label>
              <input
                type="text"
                name="requirements"
                value={formData.requirements}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                placeholder="JavaScript, React, 3+ years experience, etc."
              />
            </div>
            <div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="urgent"
                  id="urgent"
                  checked={formData.urgent}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="urgent" className="ml-2 block text-sm text-gray-700">
                  Mark as Urgent
                </label>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-300"
          >
            Post Job
          </button>
        </form>
      </div>

      {/* Job Postings List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobPostings.map((job) => {
          const daysRemaining = getDaysRemaining(job.deadline);

          return (
            <div key={job.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-semibold text-gray-800">{job.title}</h3>
                  {job.urgent && (
                    <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                      Urgent
                    </span>
                  )}
                </div>
                <p className="text-gray-600 mb-3">{job.description}</p>

                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-1">Requirements:</h4>
                  <ul className="list-disc list-inside text-gray-600 text-sm">
                    {(Array.isArray(job.requirements) ? job.requirements : []).map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-3 mb-3 text-sm">
                  <div className="flex items-center text-gray-600">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path>
                    </svg>
                    ${job.salary}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                    {job.location}
                  </div>
                </div>

                <div className={`text-sm flex items-center ${daysRemaining <= 5 ? 'text-red-600' : 'text-gray-600'}`}>
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  {daysRemaining > 0
                    ? `${daysRemaining} days remaining to apply`
                    : "Application deadline passed"}
                </div>
              </div>
              <div className="px-5 py-3 bg-gray-50 border-t border-gray-200">
                <button onClick={() => handleDelete(job._id)} className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition-colors duration-300">
                  Delete
                </button>
              </div>
            </div>
          );
        })}

        {
          jobPostings.length === 0 && (
            <div className="col-span-3 text-center text-gray-600">
              No job postings available
            </div>
          )
        }
      </div>
    </div>
  );
};

export default JobPostingPage;