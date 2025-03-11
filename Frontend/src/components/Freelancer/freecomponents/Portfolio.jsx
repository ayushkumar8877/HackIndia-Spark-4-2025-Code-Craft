import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PortfolioPage() {
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    categories: [],
    imageUrl: '',
    liveDemoUrl: '',
    repositoryUrl: '',
    bgColor: 'bg-blue-200', // For UI display only - not in schema
  });
  const [categoryInput, setCategoryInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const bgColorOptions = [
    { value: 'bg-blue-200', label: 'Blue' },
    { value: 'bg-green-200', label: 'Green' },
    { value: 'bg-red-200', label: 'Red' },
    { value: 'bg-yellow-200', label: 'Yellow' },
    { value: 'bg-purple-200', label: 'Purple' },
    { value: 'bg-pink-200', label: 'Pink' },
    { value: 'bg-indigo-200', label: 'Indigo' },
    { value: 'bg-gray-200', label: 'Gray' },
  ];

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const id = localStorage.getItem("freelancerId");
      const response = await axios.get(`http://localhost:3000/freelancer/portfolio?id=${id}`);
      setProjects(response.data);
    } catch (err) {
      console.error("Error fetching projects:", err);
      setError("Failed to load projects");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject({ ...newProject, [name]: value });
  };

  const handleAddCategory = () => {
    if (categoryInput.trim() && !newProject.categories.includes(categoryInput.trim())) {
      setNewProject({
        ...newProject,
        categories: [...newProject.categories, categoryInput.trim()]
      });
      setCategoryInput('');
    }
  };

  const handleRemoveCategory = (categoryToRemove) => {
    setNewProject({
      ...newProject,
      categories: newProject.categories.filter(category => category !== categoryToRemove)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (newProject.categories.length === 0) {
      setError("Please add at least one category");
      setLoading(false);
      return;
    }

    try {
      const id = localStorage.getItem("freelancerId");

      // Create project data object matching the schema
      const projectData = {
        freelancerId: id,
        title: newProject.title,
        description: newProject.description,
        categories: newProject.categories,
        imageUrl: newProject.imageUrl,
        liveDemoUrl: newProject.liveDemoUrl,
        repositoryUrl: newProject.repositoryUrl,
        bgColor: newProject.bgColor, // This is for UI only
      };

      await axios.post(`http://localhost:3000/freelancer/portfolio`, projectData);

      // Reset form and close modal
      setNewProject({
        title: '',
        description: '',
        categories: [],
        imageUrl: '',
        liveDemoUrl: '',
        repositoryUrl: '',
        bgColor: 'bg-blue-200',
      });
      setIsModalOpen(false);

      // Refresh projects list
      fetchProjects();
    } catch (err) {
      console.error("Error adding project:", err);
      setError(err.response?.data?.message || "Failed to add project");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && categoryInput.trim()) {
      e.preventDefault();
      handleAddCategory();
    }
  };

  return (
    <div className="w-full min-h-screen bg-white">
      <main className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Portfolio</h1>
            <button
              className="bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition"
              onClick={() => setIsModalOpen(true)}
            >
              Add Project
            </button>
          </div>

          {error && (
            <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          {/* Portfolio Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div key={project._id} className="rounded-lg overflow-hidden shadow-md">
                <div className={`h-48 ${project.bgColor || 'bg-blue-200'}`}>
                  {project.imageUrl && (
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900">{project.title}</h3>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {project.categories && project.categories.map((category, index) => (
                      <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">{category}</span>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500">{project.description}</p>
                  <div className="mt-4 flex justify-between">
                    {project.liveDemoUrl && (
                      <a
                        href={project.liveDemoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800"
                      >
                        View Demo
                      </a>
                    )}
                    {!project.liveDemoUrl && (
                      <button className="text-blue-600 hover:text-blue-800">View Details</button>
                    )}
                    <button className="text-gray-600 hover:text-gray-800">Edit</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Add Project Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl max-h-screen overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Add New Project</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                {/* Project Title */}
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    value={newProject.title}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Project Description */}
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    required
                    value={newProject.description}
                    onChange={handleInputChange}
                    rows="3"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                  ></textarea>
                </div>

                {/* Categories */}
                <div>
                  <label htmlFor="categories" className="block text-sm font-medium text-gray-700">
                    Categories *
                  </label>
                  <div className="flex items-center mt-1">
                    <input
                      type="text"
                      id="categories"
                      value={categoryInput}
                      onChange={(e) => setCategoryInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Type and press Enter to add"
                    />
                    <button
                      type="button"
                      onClick={handleAddCategory}
                      className="ml-2 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {newProject.categories.map((category, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs flex items-center"
                      >
                        {category}
                        <button
                          type="button"
                          onClick={() => handleRemoveCategory(category)}
                          className="ml-1 text-blue-800 hover:text-blue-900 focus:outline-none"
                        >
                          &times;
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Background Color (for UI only) */}
                <div>
                  <label htmlFor="bgColor" className="block text-sm font-medium text-gray-700">
                    Background Color (UI display only)
                  </label>
                  <select
                    id="bgColor"
                    name="bgColor"
                    value={newProject.bgColor}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {bgColorOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <div className={`mt-2 h-8 w-16 rounded ${newProject.bgColor}`}></div>
                </div>

                {/* Image URL */}
                <div>
                  <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">
                    Image URL
                  </label>
                  <input
                    type="url"
                    id="imageUrl"
                    name="imageUrl"
                    value={newProject.imageUrl}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                {/* Live Demo URL */}
                <div>
                  <label htmlFor="liveDemoUrl" className="block text-sm font-medium text-gray-700">
                    Live Demo URL
                  </label>
                  <input
                    type="url"
                    id="liveDemoUrl"
                    name="liveDemoUrl"
                    value={newProject.liveDemoUrl}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="https://example.com"
                  />
                </div>

                {/* Repository URL */}
                <div>
                  <label htmlFor="repositoryUrl" className="block text-sm font-medium text-gray-700">
                    Repository URL
                  </label>
                  <input
                    type="url"
                    id="repositoryUrl"
                    name="repositoryUrl"
                    value={newProject.repositoryUrl}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="https://github.com/username/repo"
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className={`px-4 py-2 rounded-md text-white ${loading ? 'bg-gray-500' : 'bg-blue-600 hover:bg-blue-700'}`}
                >
                  {loading ? 'Saving...' : 'Save Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default PortfolioPage;