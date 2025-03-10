import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router

const FreelancerProfileSetup = () => {
  const [formData, setFormData] = useState({
    skills: [],
    experience: '',
    hourlyRate: '',
    location: '',
    availability: '',
    portfolio: '',
    certifications: '',
    bio: '',
    profilePicture: null
  });

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    
    if (type === 'file') {
      setFormData({
        ...formData,
        [name]: files[0]
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSkillsChange = (e) => {
    setFormData({
      ...formData,
      skills: e.target.value.split(',').map(skill => skill.trim())
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Freelancer profile data:', formData);
    // Here you would typically send the data to your backend
    // On success, redirect to dashboard or profile page
    // window.location.href = '/dashboard';
  };

  const nextStep = () => {
    setCurrentStep(Math.min(currentStep + 1, totalSteps));
  };

  const prevStep = () => {
    setCurrentStep(Math.max(currentStep - 1, 1));
  };

  return (
    <div className="w-full min-h-screen bg-white">
      {/* Header */}
      <header className="w-full bg-gray-900 text-white p-6">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Profile Setup</h1>
          <div>
            <button className="px-4 py-2 border border-white rounded-lg hover:bg-white hover:text-gray-900">
              Skip for now
            </button>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="max-w-4xl mx-auto pt-6 px-6">
        <div className="flex items-center justify-between mb-2">
          {[...Array(totalSteps)].map((_, index) => (
            <React.Fragment key={index}>
              <div 
                className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  currentStep > index ? 'bg-blue-600 text-white' : 
                  currentStep === index + 1 ? 'bg-blue-100 border-2 border-blue-600 text-blue-600' : 
                  'bg-gray-200 text-gray-500'
                }`}
              >
                {index + 1}
              </div>
              {index < totalSteps - 1 && (
                <div className={`flex-1 h-1 ${currentStep > index + 1 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
              )}
            </React.Fragment>
          ))}
        </div>
        <div className="flex justify-between text-sm mb-6">
          <div>Basic Info</div>
          <div>Professional Details</div>
          <div>Portfolio & Bio</div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto pb-10 px-6">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              {currentStep === 1 && "Tell us about yourself"}
              {currentStep === 2 && "Your professional expertise"}
              {currentStep === 3 && "Showcase your work"}
            </h2>
            <p className="text-gray-600">
              {currentStep === 1 && "Start building your freelancer profile with some basic information"}
              {currentStep === 2 && "Share your skills and expertise to match with the right clients"}
              {currentStep === 3 && "Add portfolio samples and write a compelling bio"}
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Step 1: Basic Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Profile Picture</label>
                  <div className="flex items-center space-x-4">
                    <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                      {formData.profilePicture ? (
                        <img 
                          src={URL.createObjectURL(formData.profilePicture)} 
                          alt="Profile preview" 
                          className="w-full h-full object-cover" 
                        />
                      ) : (
                        <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <div>
                      <label className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 cursor-pointer">
                        <span>Upload Photo</span>
                        <input 
                          type="file" 
                          name="profilePicture" 
                          onChange={handleChange} 
                          className="hidden" 
                          accept="image/*" 
                        />
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    placeholder="City, Country"
                  />
                </div>
                
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Availability</label>
                  <select
                    name="availability"
                    value={formData.availability}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  >
                    <option value="">Select availability</option>
                    <option value="fulltime">Full-time</option>
                    <option value="parttime">Part-time</option>
                    <option value="weekends">Weekends only</option>
                    <option value="custom">Custom schedule</option>
                  </select>
                </div>
              </div>
            )}
            
            {/* Step 2: Professional Information */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Skills (comma separated)</label>
                  <input
                    type="text"
                    name="skills"
                    onChange={handleSkillsChange}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    placeholder="React, JavaScript, UI Design..."
                  />
                </div>
                
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Years of Experience</label>
                  <input
                    type="number"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    min="0"
                  />
                </div>
                
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Hourly Rate ($)</label>
                  <input
                    type="number"
                    name="hourlyRate"
                    value={formData.hourlyRate}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    min="0"
                  />
                </div>
                
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Certifications</label>
                  <textarea
                    name="certifications"
                    value={formData.certifications}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    placeholder="List your relevant certifications"
                    rows="3"
                  ></textarea>
                </div>
              </div>
            )}
            
            {/* Step 3: Portfolio & Bio */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Portfolio URL</label>
                  <input
                    type="url"
                    name="portfolio"
                    value={formData.portfolio}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    placeholder="https://your-portfolio.com"
                  />
                </div>
                
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Bio / Professional Summary</label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    placeholder="Tell potential clients about yourself and your expertise"
                    rows="6"
                  ></textarea>
                </div>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="flex justify-between mt-8">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Back
                </button>
              ) : (
                <div></div> // Empty div for spacing
              )}
              
              {currentStep < totalSteps ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Continue
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
                >
                  Complete Profile
                </button>
              )}
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

export default FreelancerProfileSetup;