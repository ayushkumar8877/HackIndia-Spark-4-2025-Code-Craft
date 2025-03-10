import React, { useState } from 'react';

const BusinessProfileSetup = () => {
  const [profileData, setProfileData] = useState({
    industry: '',
    companySize: '',
    description: '',
    website: '',
    hiringNeeds: '',
    location: '',
    contactPhone: '',
    logo: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setProfileData({
      ...profileData,
      logo: e.target.files[0]
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Business profile data:', profileData);
    // Here you would typically send the data to your backend
    // Then redirect to dashboard or success page
    alert('Profile setup complete! Redirecting to dashboard...');
    // window.location.href = '/business/dashboard';
  };

  return (
    <div className="w-full min-h-screen bg-white">
      {/* Header */}
      <header className="w-full bg-gray-900 text-white p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold">Complete Your Business Profile</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto py-10 px-6">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Business Profile Setup</h2>
            <p className="text-gray-600">Provide detailed information about your company to help connect with the right talent</p>
          </div>

          {/* Progress Steps */}
          <div className="flex mb-10">
            <div className="flex-1">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <p className="text-center mt-2 text-sm font-medium">Account Created</p>
            </div>
            <div className="flex-1 relative">
              <div className="absolute top-5 left-0 right-0 h-1 bg-gray-300">
                <div className="h-1 bg-blue-600 w-1/2"></div>
              </div>
              <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto">
                <span className="font-medium">2</span>
              </div>
              <p className="text-center mt-2 text-sm font-medium text-blue-600">Profile Setup</p>
            </div>
            <div className="flex-1 relative">
              <div className="absolute top-5 left-0 right-0 h-1 bg-gray-300"></div>
              <div className="w-10 h-10 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center mx-auto">
                <span className="font-medium">3</span>
              </div>
              <p className="text-center mt-2 text-sm font-medium text-gray-500">Verification</p>
            </div>
          </div>

          {/* Profile Form */}
          <form onSubmit={handleSubmit}>
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
              
              <div className="md:col-span-2">
                <label className="block mb-2 text-sm font-medium text-gray-700">Company Logo (optional)</label>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg className="w-8 h-8 mb-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                      </svg>
                      <p className="mb-1 text-sm text-gray-500">Click to upload</p>
                      <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (MAX. 2MB)</p>
                    </div>
                    <input 
                      id="dropzone-file" 
                      type="file" 
                      className="hidden" 
                      onChange={handleFileChange}
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* Verification Information */}
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 mb-6">
              <h4 className="font-medium text-gray-800 mb-2">Verification Process</h4>
              <p className="text-gray-600 text-sm">
                After completing your profile, our team will verify your business information to ensure platform quality. 
                You'll be notified via email when your account is approved (typically within 1-2 business days).
              </p>
            </div>
            
            <div className="flex gap-4">
              <button
                type="button"
                className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
                onClick={() => window.history.back()}
              >
                Back
              </button>
              <button
                type="submit"
                className="flex-1 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 font-medium"
              >
                Complete Profile Setup
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

export default BusinessProfileSetup;