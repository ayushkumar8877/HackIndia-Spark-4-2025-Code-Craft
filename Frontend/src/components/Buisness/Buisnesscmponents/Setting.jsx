import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BusinessProfileSettings = () => {
  const [profileData, setProfileData] = useState({
    companyId: localStorage.getItem("businessId"),
    industry: '',
    companySize: '',
    description: '',
    website: '',
    hiringNeeds: '',
    location: '',
    contactPhone: '',
  });
  const [profileFlag, setProfileFlag] = useState(false)

  const [id, setId] = useState(localStorage.getItem("businessId"))

  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/business/profile', {
        companyId: localStorage.getItem("businessId"),
        industry: profileData.industry,
        companySize: profileData.companySize,
        description: profileData.description,
        website: profileData.website,
        hiringNeeds: profileData.hiringNeeds,
        location: profileData.location,
        contactPhone: profileData.contactPhone,
      })


      if (response.data.success) {
        alert("Profile updated successfully!")
      }
    } catch (err) {
      console.log(err)
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put('http://localhost:3000/business/profile', {
        companyId: localStorage.getItem("businessId"),
        industry: profileData.industry,
        companySize: profileData.companySize,
        description: profileData.description,
        website: profileData.website,
        hiringNeeds: profileData.hiringNeeds,
        location: profileData.location,
        contactPhone: profileData.contactPhone,
      })
      if (response.data.success) {
        alert("Profile updated successfully!")
      }
    } catch (err) {
      console.log(err)
    }
  }

  const checkProfile = async () => {
    try {
      const id = localStorage.getItem('businessId')
      const response = await axios.get(`http://localhost:3000/business/checkprofile?id=${id}`)
      if (response.data.success === true) {
        setProfileFlag(true)
      } else {
        setProfileFlag(false)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const fetchProfileDetails = async () => {
    try {
      const id = localStorage.getItem('businessId')
      const response = await axios.get(`http://localhost:3000/business/profile?id=${id}`)
      setProfileData(response.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    checkProfile()
  }, []);

  useEffect(() => {
    if (profileFlag) {
      fetchProfileDetails()
    }
  }, [profileFlag])

  return (
    <div className="w-full min-h-screen bg-white">
      {/* Header */}
      <header className="w-full text-gray-900 p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold">Business Profile Settings</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto py-10 px-6">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Update Your Business Profile</h2>
            <p className="text-gray-600">Keep your company information up to date to attract the right talent</p>
          </div>

          {/* Notification Message */}
          {message.text && (
            <div className={`p-4 mb-6 rounded-lg ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {message.text}
            </div>
          )}

          {/* Profile Form */}
          <form>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Company Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Industry</label>
                <select
                  name="industry"
                  value={profileData.industry}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  required
                >
                  <option value="">Select industry</option>
                  <option value="technology">Technology</option>
                  <option value="finance">Finance</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="education">Education</option>
                  <option value="ecommerce">E-commerce</option>
                  <option value="manufacturing">Manufacturing</option>
                  <option value="media">Media & Entertainment</option>
                  <option value="retail">Retail</option>
                  <option value="construction">Construction</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Company Size</label>
                <select
                  name="companySize"
                  value={profileData.companySize}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  required
                >
                  <option value="">Select company size</option>
                  <option value="1-10">1-10 employees</option>
                  <option value="11-50">11-50 employees</option>
                  <option value="51-200">51-200 employees</option>
                  <option value="201-500">201-500 employees</option>
                  <option value="501+">501+ employees</option>
                </select>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Location</label>
                <input
                  type="text"
                  name="location"
                  value={profileData.location}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  placeholder="City, Country"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Company Website</label>
                <input
                  type="url"
                  name="website"
                  value={profileData.website}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  placeholder="https://your-company.com"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Contact Phone</label>
                <input
                  type="tel"
                  name="contactPhone"
                  value={profileData.contactPhone}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  placeholder="+1 (123) 456-7890"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block mb-2 text-sm font-medium text-gray-700">Company Description</label>
                <textarea
                  name="description"
                  value={profileData.description}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  rows="4"
                  placeholder="Tell us about your company, mission, and values"
                  required
                ></textarea>
              </div>

              <div className="md:col-span-2">
                <label className="block mb-2 text-sm font-medium text-gray-700">Hiring Needs</label>
                <textarea
                  name="hiringNeeds"
                  value={profileData.hiringNeeds}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  rows="3"
                  placeholder="Describe your freelancer needs (skills, project types, etc.)"
                  required
                ></textarea>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
                onClick={() => window.location.href = '/business/dashboard'}
              >
                Cancel
              </button>
              <button
                onClick={profileFlag ? handleUpdate : handleSubmit}
                className="flex-1 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 font-medium"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-gray-100 py-6">
        <div className="max-w-6xl mx-auto px-6 text-center text-gray-600">
          <p>© 2025 Freelancer Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default BusinessProfileSettings;