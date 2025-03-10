import React, { useEffect, useState } from 'react';
import axios from 'axios';

const HirePage = () => {
  const [hiredEmployees, setHiredEmployees] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    project: "",
    salary: "",
    deadline: "",
    skills: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      const response = await axios.post("http://localhost:3000/business/hire", {
        name: formData.name,
        project: formData.project,
        salary: formData.salary,
        deadline: formData.deadline,
        skills: formData.skills.split(",").map((skill) => skill.trim()),
      });
      if (response.data.success) {
        alert("Employee added successfully");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchHiredEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:3000/business/hire");
      setHiredEmployees(response.data);
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchHiredEmployees();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Employee Hiring Management</h1>

      {/* Add New Hire Form */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Add New Hire</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Employee Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Project</label>
              <input
                type="text"
                name="project"
                value={formData.project}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Salary (USD)</label>
              <input
                type="number"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Deadline</label>
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Skills (comma separated)</label>
              <input
                type="text"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                placeholder="React, JavaScript, UI/UX, etc."
              />
            </div>
          </div>
          <button
            type="submit"
            className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-300"
          >
            Add Employee
          </button>
        </form>
      </div>

      {/* Hired Employees List */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Hired Employees</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 text-left text-gray-700 border-b">Name</th>
                <th className="p-3 text-left text-gray-700 border-b">Project</th>
                <th className="p-3 text-left text-gray-700 border-b">Salary</th>
                <th className="p-3 text-left text-gray-700 border-b">Deadline</th>
                <th className="p-3 text-left text-gray-700 border-b">Skills</th>
              </tr>
            </thead>
            <tbody>
              {hiredEmployees.map((employee) => (
                <tr key={employee.id} className="hover:bg-gray-50">
                  <td className="p-3 border-b">{employee.name}</td>
                  <td className="p-3 border-b">{employee.project}</td>
                  <td className="p-3 border-b">${employee.salary.toLocaleString()}</td>
                  <td className="p-3 border-b">{new Date(employee.deadline).toLocaleDateString()}</td>
                  <td className="p-3 border-b">
                    <div className="flex flex-wrap gap-1">
                      {employee.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HirePage;