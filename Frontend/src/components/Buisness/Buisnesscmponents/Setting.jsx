import React, { useState, useEffect } from 'react';

const BusinessProfileSettings = () => {
  const [profileData, setProfileData] = useState({
    industry: '',
    companySize: '',
    description: '',
    website: '',
    hiringNeeds: '',
    location: '',
    contactPhone: '',
    logo: null,
    currentLogoUrl: null
  });
  
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Simulated fetch of existing profile data
  useEffect(() => {
    // In a real application, this would be an API call to fetch the user's profile
    const fetchProfileData = async () => {
      try {
        setIsLoading(true);
        // Replace with actual API call
        // const response = await fetch('/api/business/profile');
        // const data = await response.json();
        
        // Simulated data for demo purposes
        const data = {
          industry: 'technology',
          companySize: '11-50',
          description: 'We build innovative solutions for small businesses.',
          website: 'https://example.com',
          hiringNeeds: 'Looking for frontend developers with React experience.',
          location: 'New York, USA',
          contactPhone: '+1 (555) 123-4567',
          currentLogoUrl: '/images/company-logo.png'
        };
        
        setProfileData(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching profile data:', error);
        setMessage({ type: 'error', text: 'Failed to load profile data. Please try again.' });
        setIsLoading(false);
      }
    };
    
    fetchProfileData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setProfileData({
        ...profileData,
        logo: e.target.files[0]
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Here you would typically send the data to your backend
    // For example:
    // const formData = new FormData();
    // Object.keys(profileData).forEach(key => {
    //   if (key !== 'currentLogoUrl' && profileData[key] !== null) {
    //     formData.append(key, profileData[key]);
    //   }
    // });
    
    // Simulate API call with a timeout
    setTimeout(() => {
      console.log('Updated business profile data:', profileData);
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
      setIsLoading(false);
    }, 1000);
  };

  if (isLoading && Object.values(profileData).every(value => value === '' || value === null)) {
    return (
      <div className="w-full min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-white">
      {/* Header */}
      <header className="w-full bg-gray-900 text-white p-6">
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
                <label className="block mb-2 text-sm font-medium text-gray-700">Company Logo</label>
                
                {/* Show current logo if available */}
                {profileData.currentLogoUrl && (
                  <div className="mb-4">
                    <p className="text-sm text-gray-500 mb-2">Current logo:</p>
                    <div className="w-24 h-24 border border-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                      <img 
                        src={profileData.currentLogoUrl} 
                        alt="Company logo" 
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                  </div>
                )}
                
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg className="w-8 h-8 mb-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                      </svg>
                      <p className="mb-1 text-sm text-gray-500">Click to upload a new logo</p>
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
                {profileData.logo && (
                  <p className="mt-2 text-sm text-green-600">
                    New logo selected: {profileData.logo.name}
                  </p>
                )}
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
                type="submit"
                className="flex-1 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 font-medium"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </span>
                ) : 'Save Changes'}
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