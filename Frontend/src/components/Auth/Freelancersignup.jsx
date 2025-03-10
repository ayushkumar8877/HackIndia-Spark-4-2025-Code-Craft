import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router

const FreelancerSignup = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    agreeToTerms: false
  });

  const [showLogin, setShowLogin] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Freelancer signup data:', formData);
    // Here you would typically send the data to your backend
    // On success, redirect to profile setup page
    // window.location.href = '/profile-setup';
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempted with:', {
      email: formData.email,
      password: formData.password
    });
    // Handle login logic
  };

  const handleLinkedInAuth = () => {
    try {
      window.location.href = "http://localhost:3000/auth/linkedin";
      alert(2)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="w-full min-h-screen bg-white">
      {/* Header */}
      <header className="w-full bg-gray-900 text-white p-6">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Freelancer Platform</h1>
          <div>
            <button
              onClick={() => setShowLogin(!showLogin)}
              className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              {showLogin ? "Sign Up" : "Log In"}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto py-10 px-6">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {!showLogin ? (
            // Signup Form
            <>
              <div className="mb-8 text-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Join Our Freelancer Network</h2>
                <p className="text-gray-600">Connect with top businesses and showcase your skills</p>
              </div>

              {/* Sign Up Options */}
              <div className="flex mb-8 gap-4">
                <button className="flex-1 py-3 border border-gray-300 rounded-lg flex justify-center items-center gap-2 hover:bg-gray-50">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4.59-12.42L10 14.17l-2.59-2.58L6 13l4 4 8-8z" />
                  </svg>
                  <span>Continue with Email</span>
                </button>
                <button onClick={handleLinkedInAuth} className="flex-1 py-3 bg-blue-600 text-white rounded-lg flex justify-center items-center gap-2 hover:bg-blue-700">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm-2 12h-4v4h-2v-4H7v-2h4V9h2v4h4v2z" />
                  </svg>
                  <span>LinkedIn</span>
                </button>
                <button className="flex-1 py-3 bg-gray-800 text-white rounded-lg flex justify-center items-center gap-2 hover:bg-gray-700">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
                  </svg>
                  <span>GitHub</span>
                </button>
              </div>

              <div className="flex items-center mb-8">
                <div className="flex-grow h-px bg-gray-300"></div>
                <span className="px-4 text-gray-500">or register with email</span>
                <div className="flex-grow h-px bg-gray-300"></div>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      required
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      required
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Password</label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      required
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Confirm Password</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      required
                    />
                  </div>
                </div>

                {/* Terms and Submission */}
                <div className="mb-6">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="agreeToTerms"
                      name="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onChange={handleChange}
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
            </>
          ) : (
            // Login Form
            <>
              <div className="mb-8 text-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h2>
                <p className="text-gray-600">Log in to your freelancer account</p>
              </div>

              <form onSubmit={handleLoginSubmit}>
                <div className="space-y-6 mb-6">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      required
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Password</label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      required
                    />
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="remember"
                        className="w-4 h-4 mr-2"
                      />
                      <label htmlFor="remember" className="text-sm text-gray-700">
                        Remember me
                      </label>
                    </div>
                    <a href="#" className="text-sm text-blue-600 hover:underline">Forgot password?</a>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 font-medium text-lg mb-4"
                >
                  Log In
                </button>

                <div className="text-center">
                  <p className="text-gray-600">
                    Don't have an account?{" "}
                    <button
                      type="button"
                      onClick={() => setShowLogin(false)}
                      className="text-blue-600 hover:underline"
                    >
                      Sign up
                    </button>
                  </p>
                </div>
              </form>
            </>
          )}
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

export default FreelancerSignup;