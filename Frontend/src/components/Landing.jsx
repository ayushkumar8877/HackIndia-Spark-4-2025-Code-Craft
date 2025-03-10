import React, { useState } from 'react';
import Logo from '../assets/logo.png';

const Landing = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <div className="w-full min-h-screen bg-white">
            {/* Header */}
            <header className="pt-5 pr-30 pl-30 w-full bg-gray-900 text-white">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <svg className="h-8 w-8 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <h1 className="text-xl font-bold">Mindlancer</h1>
                        </div>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center space-x-8">
                            <a href="#" className="text-blue-400 hover:text-blue-300 transition duration-150">How It Works</a>
                            <a href="#" className="text-blue-400 hover:text-blue-300 transition duration-150">Browse Projects</a>
                            <a href="#" className="text-blue-400 hover:text-blue-300 transition duration-150">Find Talent</a>
                            <a href="#" className="text-blue-400 hover:text-blue-300 transition duration-150">Pricing</a>
                        </nav>

                        {/* Mobile menu button */}
                        <button
                            className="md:hidden p-2 rounded-md text-gray-200 hover:text-white focus:outline-none"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {mobileMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>

                    {/* Mobile Navigation */}
                    {mobileMenuOpen && (
                        <nav className="md:hidden pt-4 pb-3 space-y-3">
                            <a href="#" className="block text-blue-400 hover:text-blue-300 transition duration-150">How It Works</a>
                            <a href="#" className="block text-blue-400 hover:text-blue-300 transition duration-150">Browse Projects</a>
                            <a href="#" className="block text-blue-400 hover:text-blue-300 transition duration-150">Find Talent</a>
                            <a href="#" className="block text-blue-400 hover:text-blue-300 transition duration-150">Pricing</a>
                        </nav>
                    )}
                </div>
            </header>

            {/* Hero Section */}
            <section className="pr-30 pl-30 w-full bg-gray-900 text-white">
                <div className="container mx-auto px-4 py-16 md:py-24">
                    <div className="flex flex-col md:flex-row items-center">
                        <div className="md:w-1/2 mb-10 md:mb-0 text-center md:text-left">
                            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">AI-Powered Freelance Matching for Tech Talent</h2>
                            <p className="text-lg mb-8">Connect with top software developers or find the perfect tech project, powered by advanced AI matching technology.</p>
                            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center md:justify-start">
                                <a href="#freelancers" className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-md text-center transition duration-300">
                                    Join as Freelancer
                                </a>
                                <a href="#companies" className="bg-white hover:bg-gray-100 text-gray-900 font-medium py-3 px-6 rounded-md text-center transition duration-300">
                                    Hire Developers
                                </a>
                            </div>
                        </div>
                        <div className="md:w-1/2 md:pl-10">
                            <img src={Logo} alt="AI-powered freelancer matching" className="ml-20" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Section */}
            <section className="pr-30 pl-30 w-full py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Why Choose Mindlancer</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="p-6 rounded-lg transition duration-300 hover:shadow-lg">
                            <div className="bg-blue-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-2 text-gray-800">AI-Powered Matching</h3>
                            <p className="text-gray-600">Our advanced algorithms connect you with the perfect tech talent or projects based on skills, experience, and preferences.</p>
                        </div>

                        {/* Feature 2 */}
                        <div className="p-6 rounded-lg transition duration-300 hover:shadow-lg">
                            <div className="bg-blue-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-2 text-gray-800">Secure Payments</h3>
                            <p className="text-gray-600">Escrow payments, milestone-based releases, and transparent fee structure to ensure fair compensation.</p>
                        </div>

                        {/* Feature 3 */}
                        <div className="p-6 rounded-lg transition duration-300 hover:shadow-lg">
                            <div className="bg-blue-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-2 text-gray-800">Verified Talent</h3>
                            <p className="text-gray-600">All freelancers undergo thorough vetting for skills, ensuring you work with qualified professionals.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Join Sections */}
            <section id="freelancers" className="pr-30 pl-30 w-full py-16 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Join our platform</h2>
                    <div className="flex flex-col gap-10 md:flex-row items-center">
                        <div className="md:w-1/2 mb-10 md:mb-0 flex flex-col items-center">
                            <div className="flex flex-col items-center p-6 bg-blue-50 rounded-2xl shadow-md">
                                <div className="mb-4 p-4 bg-blue-100 rounded-full">
                                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                                    </svg>
                                </div>
                                <h2 className="text-2xl font-semibold mb-2 text-gray-800">Join as a Freelancer</h2>
                                <p className="mb-4 text-gray-600 text-center">
                                    Access high-quality tech projects from companies worldwide. Showcase your skills and get matched with opportunities that fit your expertise.
                                </p>
                                <a href="/freelancer/auth" className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-md text-center transition duration-300">
                                    Get Started
                                </a>
                            </div>
                        </div>
                        <div className="md:w-1/2 mb-10 md:mb-0 flex flex-col items-center">
                            <div className="flex flex-col items-center p-6 bg-blue-50 rounded-2xl shadow-md">
                                <div className="mb-4 p-4 bg-blue-100 rounded-full">
                                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c1.66 0 2.99-1.34 2.99-3S13.66 2 12 2 9 3.34 9 5s1.34 3 3 3zm0 2c-2.67 0-8 1.34-8 4v1h16v-1c0-2.66-5.33-4-8-4z"></path>
                                    </svg>
                                </div>
                                <h2 className="text-2xl font-semibold mb-2 text-gray-800">Hire Top Tech Talent</h2>
                                <p className="mb-4 text-gray-600 text-center">
                                    Post your project and get matched with pre-vetted developers who have the exact skills you need. Our AI matching ensures you find the right fit.
                                </p>
                                <a href="/company-login" className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-md text-center transition duration-300">
                                    Get Started
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="pr-30 pl-30 w-full bg-gray-50 py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">How Mindlancer Works</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {/* Step 1 */}
                        <div className="flex flex-col items-center text-center">
                            <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-4">1</div>
                            <h3 className="text-lg font-semibold mb-2 text-gray-800">Create Your Profile</h3>
                            <p className="text-gray-600">Sign up and build your profile with skills, experience, and portfolio.</p>
                        </div>

                        {/* Step 2 */}
                        <div className="flex flex-col items-center text-center">
                            <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-4">2</div>
                            <h3 className="text-lg font-semibold mb-2 text-gray-800">AI Matching</h3>
                            <p className="text-gray-600">Our AI analyzes your profile to connect you with relevant projects or talent.</p>
                        </div>

                        {/* Step 3 */}
                        <div className="flex flex-col items-center text-center">
                            <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-4">3</div>
                            <h3 className="text-lg font-semibold mb-2 text-gray-800">Collaborate</h3>
                            <p className="text-gray-600">Use our platform tools to communicate, share files, and track progress.</p>
                        </div>

                        {/* Step 4 */}
                        <div className="flex flex-col items-center text-center">
                            <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-4">4</div>
                            <h3 className="text-lg font-semibold mb-2 text-gray-800">Get Paid</h3>
                            <p className="text-gray-600">Secure milestone payments and hassle-free transactions.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="pr-30 pl-30 w-full py-16 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">What Our Users Say</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Testimonial 1 */}
                        <div className="p-6 rounded-lg border border-gray-200 shadow-sm">
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-blue-100 rounded-full mr-4"></div>
                                <div>
                                    <h4 className="font-semibold text-gray-800">Alex Chen</h4>
                                    <p className="text-gray-500 text-sm">Frontend Developer</p>
                                </div>
                            </div>
                            <p className="text-gray-600">"Mindlancer has connected me with quality projects that match my skill set perfectly. The AI matching system is impressive."</p>
                        </div>

                        {/* Testimonial 2 */}
                        <div className="p-6 rounded-lg border border-gray-200 shadow-sm">
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-blue-100 rounded-full mr-4"></div>
                                <div>
                                    <h4 className="font-semibold text-gray-800">Sarah Johnson</h4>
                                    <p className="text-gray-500 text-sm">CTO, TechStart</p>
                                </div>
                            </div>
                            <p className="text-gray-600">"We've hired three developers through Mindlancer. The quality of talent and the speed of matching exceeded our expectations."</p>
                        </div>

                        {/* Testimonial 3 */}
                        <div className="p-6 rounded-lg border border-gray-200 shadow-sm">
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-blue-100 rounded-full mr-4"></div>
                                <div>
                                    <h4 className="font-semibold text-gray-800">Miguel Santos</h4>
                                    <p className="text-gray-500 text-sm">Full Stack Developer</p>
                                </div>
                            </div>
                            <p className="text-gray-600">"The platform's secure payment system gives me peace of mind, and the project management tools make collaboration seamless."</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="pr-30 pl-30 w-full bg-gray-900 text-white py-12">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <div className="flex items-center mb-4">
                                <svg className="h-8 w-8 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <h1 className="text-xl font-bold">Mindlancer</h1>
                            </div>
                            <p className="text-gray-400">AI-powered freelancer marketplace connecting tech talent with businesses worldwide.</p>
                        </div>

                        <div>
                            <h4 className="font-semibold text-lg mb-4">For Freelancers</h4>
                            <ul className="space-y-2">
                                <li><a href="#" className="text-gray-400 hover:text-white transition duration-150">Find Projects</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white transition duration-150">Create Profile</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white transition duration-150">Payment Process</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white transition duration-150">Success Stories</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-semibold text-lg mb-4">For Companies</h4>
                            <ul className="space-y-2">
                                <li><a href="#" className="text-gray-400 hover:text-white transition duration-150">Post Projects</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white transition duration-150">Hiring Guide</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white transition duration-150">Contract Types</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white transition duration-150">Enterprise Solutions</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-semibold text-lg mb-4">Connect</h4>
                            <ul className="space-y-2">
                                <li><a href="#" className="text-gray-400 hover:text-white transition duration-150">Contact Us</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white transition duration-150">Blog</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white transition duration-150">FAQ</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white transition duration-150">Privacy Policy</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-500">
                        <p>© 2025 Mindlancer.com. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Landing