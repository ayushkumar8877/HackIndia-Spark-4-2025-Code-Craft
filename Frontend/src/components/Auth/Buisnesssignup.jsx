import React, { useState } from 'react';
import axios from 'axios';

const BusinessSignup = () => {
  const [signupData, setSignupData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    contactPerson: '',
    companyName: '',
    agreeToTerms: false
  });

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleSignupChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSignupData({
      ...signupData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleLoginChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLoginData({
      ...loginData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/business/signup', {
        name: signupData.companyName,
        email: signupData.email,
        contact: signupData.contactPerson,
        password: signupData.password,
      });
      if (response.data.success == true) {
        localStorage.setItem('businessId', response.data.id);
        localStorage.setItem('businessName', response.data.name);
        window.location.href = '/business/auth';
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/business/login', {
        email: loginData.email,
        password: loginData.password
      })
      if (response.data.success == true) {
        localStorage.setItem('businessId', response.data.id);
        localStorage.setItem('businessName', response.data.name);
        window.location.href = '/business/dashboard';
      }
    } catch (err) {
      console.log(err);
    }
  };

  const toggleLoginModal = () => {
    setShowLoginModal(!showLoginModal);
  };

  return (
    <div className="w-full min-h-screen bg-white relative">
      {/* Header */}
      <header className="w-full bg-gray-900 text-white p-6">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Business Registration</h1>
          <div>
            <span className="mr-4">Already have an account?</span>
            <button
              onClick={toggleLoginModal}
              className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Log In
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto py-10 px-6">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Register Your Business</h2>
            <p className="text-gray-600">Create your account and then complete your profile to access top talent</p>
          </div>

          {/* Sign Up Options */}
          <div className="flex mb-8 gap-4">
            <button className="flex-1 py-3 border border-gray-300 rounded-lg flex justify-center items-center gap-2 hover:bg-gray-50">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4.59-12.42L10 14.17l-2.59-2.58L6 13l4 4 8-8z" />
              </svg>
              <span>Continue with Email</span>
            </button>
            <button className="flex-1 py-3 bg-blue-600 text-white rounded-lg flex justify-center items-center gap-2 hover:bg-blue-700">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm-2 12h-4v4h-2v-4H7v-2h4V9h2v4h4v2z" />
              </svg>
              <span>LinkedIn</span>
            </button>
          </div>

          <div className="flex items-center mb-8">
            <div className="flex-grow h-px bg-gray-300"></div>
            <span className="px-4 text-gray-500">or complete the form</span>
            <div className="flex-grow h-px bg-gray-300"></div>
          </div>

          {/* Signup Form */}
          <form onSubmit={handleSignupSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Business Email</label>
                <input
                  type="email"
                  name="email"
                  value={signupData.email}
                  onChange={handleSignupChange}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Contact Person</label>
                <input
                  type="text"
                  name="contactPerson"
                  value={signupData.contactPerson}
                  onChange={handleSignupChange}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  name="password"
                  value={signupData.password}
                  onChange={handleSignupChange}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={signupData.confirmPassword}
                  onChange={handleSignupChange}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Company Name</label>
                <input
                  type="text"
                  name="companyName"
                  value={signupData.companyName}
                  onChange={handleSignupChange}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  required
                />
              </div>
            </div>

            {/* Verification & Submission */}
            <div className="mb-6">
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 mb-4">
                <h4 className="font-medium text-gray-800 mb-2">Next Steps</h4>
                <p className="text-gray-600 text-sm">
                  After creating your account, you'll be directed to complete your business profile with additional information.
                  Our team will then verify your business information to ensure platform quality.
                  You'll be notified via email when your account is approved (typically within 1-2 business days).
                </p>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="agreeToTerms"
                  name="agreeToTerms"
                  checked={signupData.agreeToTerms}
                  onChange={handleSignupChange}
                  className="w-4 h-4 mr-2"
                  required
                />
                <label htmlFor="agreeToTerms" className="text-sm text-gray-700">
                  I agree to the <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 font-medium text-lg"
            >
              Create Account & Continue to Profile Setup
            </button>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-gray-100 py-6">
        <div className="max-w-6xl mx-auto px-6 text-center text-gray-600">
          <p>© 2025 Freelancer Platform. All rights reserved.</p>
        </div>
      </footer>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800">Business Login</h3>
                <button
                  onClick={toggleLoginModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>

              <form onSubmit={handleLoginSubmit}>
                <div className="mb-4">
                  <label className="block mb-2 text-sm font-medium text-gray-700">Business Email</label>
                  <input
                    type="email"
                    name="email"
                    value={loginData.email}
                    onChange={handleLoginChange}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    required
                  />
                </div>

                <div className="mb-6">
                  <label className="block mb-2 text-sm font-medium text-gray-700">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={loginData.password}
                    onChange={handleLoginChange}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    required
                  />
                </div>

                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="rememberMe"
                      name="rememberMe"
                      checked={loginData.rememberMe}
                      onChange={handleLoginChange}
                      className="w-4 h-4 mr-2"
                    />
                    <label htmlFor="rememberMe" className="text-sm text-gray-700">Remember me</label>
                  </div>
                  <a href="#" className="text-sm text-blue-600 hover:underline">Forgot password?</a>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 font-medium"
                >
                  Log In
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Don't have an account? <button onClick={toggleLoginModal} className="text-blue-600 hover:underline">Register now</button>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BusinessSignup;