import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './App.css'
import './index.css'
import Landing from './components/Landing';
import Sidebar from './components/Admin/Sidebar';
import AdminPanel from './components/Admin/Dashboard';
import BlacklistPage from './components/Admin/Blacklist';
import BusinessPage from './components/Admin/Business';
import FreelancerPage from './components/Admin/Freelancer';
import { Activity, Users, Briefcase, FileText, Settings, LayoutDashboard, IndianRupee, MessageCircle, Building, Ban } from 'lucide-react';
import ErrorPage from './components/ErrorPage';
import FreelancerSignup from './components/Auth/Freelancersignup';
import Dashboard from './components/Admin/Dashboard';
import FreelancerDashboard from './components/Freelancer/freecomponents/FreelancerDashboard';
import FreeSidebar from './components/Freelancer/Freelancersidebar';
import FreePaymentsPage from './components/Freelancer/freecomponents/payments';
import FreePortfolioPage from './components/Freelancer/freecomponents/Portfolio';
import FreeChatPage from './components/Freelancer/freecomponents/chatpart';
import FreeJobPage from './components/Freelancer/freecomponents/job';
import FreeSettings from './components/Freelancer/freecomponents/Settings';
import BusinessDashboard from './components/Buisness/Buisnesscmponents/BuisnessDashboard';
import HiredEmployee from './components/Buisness/Buisnesscmponents/HiredEmployee';
import Jobposting from './components/Buisness/Buisnesscmponents/Jobposting';
import Application from './components/Buisness/Buisnesscmponents/Application';
import BuisnessSettings from './components/Buisness/Buisnesscmponents/Setting';
import BuisnessChat from './components/Buisness/Buisnesscmponents/Chat';
import BuisnessSidebar from './components/Buisness/BuisnessSidebar';
import BusinessSignup from './components/Auth/Buisnesssignup';
const menuItems = [
  { icon: Activity, label: 'Dashboard', path: '/admin/dashboard' },
  { icon: Users, label: 'Freelancers', path: '/admin/freelancer' },
  { icon: Building, label: 'Business Dashboard', path: '/admin/business' },
  { icon: Ban, label: 'Blacklist', path: '/admin/blacklist' },
];

const freemenuItems = [
  { icon: Activity, label: 'Freelancer Dashboard', path: '/freelancer/dashboard' },
  { icon: Briefcase, label: 'Jobs', path: '/freelancer/job' },
  { icon: IndianRupee, label: 'Payments', path: '/freelancer/payments' },
  { icon: FileText, label: 'Portfolio', path: '/freelancer/portfolio' },
  { icon: MessageCircle, label: 'Chat', path: '/freelancer/chat' },
  { icon: Settings, label: 'Settings', path: '/freelancer/settings' },
];

const BuisnessmenuItems = [
  { icon: Users, label: 'Business Dashboard', path: '/Business/dashboard' },
  { icon: Briefcase, label: 'Contracts', path: "/Business/jobposting", },
  { icon: FileText, label: 'Application', path: "/Business/application", },
  { icon: Users, label: 'HiredEmployee', path: "/Business/HiredEmployee", },
  { icon: MessageCircle, label: 'Chat', path: "/Business/chat", },
  { icon: Settings, label: 'Settings', path: '/Business/settings' },
];

const router = createBrowserRouter([
  {
    path: "*",
    element: (
      <div>
        <ErrorPage />
      </div>
    ),
  },
  {
    path: "/",
    element: (
      <div>
        <Landing />
      </div>
    ),
  },
  {
    path: "/admin/dashboard",
    element: (
      <div className="flex h-screen bg-gray-50">
        <Sidebar menuItems={menuItems} />
        <div className="flex-1 overflow-auto">
          <Dashboard />
        </div>
      </div>
    ),
  },
  {
    path: "/admin/blacklist",
    element: (
      <div className="flex h-screen bg-gray-50">
        <Sidebar menuItems={menuItems} />
        <div className="flex-1 overflow-auto">
          <BlacklistPage />
        </div>
      </div>
    ),
  },
  {
    path: "/admin/freelancer",
    element: (
      <div className="flex h-screen bg-gray-50">
        <Sidebar menuItems={menuItems} />
        <div className="flex-1 overflow-auto">
          <FreelancerPage />
        </div>
      </div>
    ),
  },
  {
    path: "/admin/business",
    element: (
      <div className="flex h-screen bg-gray-50">
        <Sidebar menuItems={menuItems} />
        <div className="flex-1 overflow-auto">
          <BusinessPage />
        </div>
      </div>
    ),
  },
  // frelancer
  {
    path: "/freelancer/auth",
    element: (
      <div>
        <FreelancerSignup />
      </div>
    ),
  },
  {
    path: "/freelancer/dashboard",
    element: (
      <div className='flex flex-row'>
        <FreeSidebar freemenuItems={freemenuItems} />
        <FreelancerDashboard />
      </div>
    ),
  },
  {
    path: "/freelancer/payments",
    element: (
      <div className='flex flex-row'>
        <FreeSidebar freemenuItems={freemenuItems} />
        <FreePaymentsPage />
      </div>
    ),
  },
  {
    path: "/freelancer/job",
    element: (
      <div className='flex flex-row'>
        <FreeSidebar freemenuItems={freemenuItems} />
        <FreeJobPage />
      </div>
    ),
  },
  {
    path: "/freelancer/portfolio",
    element: (
      <div className='flex flex-row'>
        <FreeSidebar freemenuItems={freemenuItems} />
        <FreePortfolioPage />
      </div>
    ),
  },
  {
    path: "/freelancer/chat",
    element: (
      <div className='flex flex-row'>
        <FreeSidebar freemenuItems={freemenuItems} />
        <FreeChatPage />
      </div>
    ),
  },
  {
    path: "/freelancer/settings",
    element: (
      <div className='flex flex-row'>
        <FreeSidebar freemenuItems={freemenuItems} />
        <FreeSettings />
      </div>
    ),
  },

  // Buisness
  {
    path: "/Business/auth",
    element: (
      <div className='flex flex-row'>
        <BusinessSignup />
      </div>
    ),
  },
  {
    path: "/Business/dashboard",
    element: (
      <div className='flex flex-row'>
        <BuisnessSidebar BuisnessmenuItems={BuisnessmenuItems} />
        <BusinessDashboard />
      </div>
    ),
  },
  {
    path: "/Business/HiredEmployee",
    element: (
      <div className='flex flex-row'>
        <BuisnessSidebar BuisnessmenuItems={BuisnessmenuItems} />
        <HiredEmployee />
      </div>
    ),
  },
  {
    path: "/Business/jobposting",
    element: (
      <div className='flex flex-row'>
        <BuisnessSidebar BuisnessmenuItems={BuisnessmenuItems} />
        <Jobposting />
      </div>
    ),
  },
  {
    path: "/Business/application",
    element: (
      <div className='flex flex-row'>
        <BuisnessSidebar BuisnessmenuItems={BuisnessmenuItems} />
        <Application />
      </div>
    ),
  },
  {
    path: "/Business/chat",
    element: (
      <div className='flex flex-row'>
        <BuisnessSidebar BuisnessmenuItems={BuisnessmenuItems} />
        <BuisnessChat />
      </div>
    ),
  },
  {
    path: "/Business/settings",
    element: (
      <div className='flex flex-row'>
        <BuisnessSidebar BuisnessmenuItems={BuisnessmenuItems} />
        <BuisnessSettings />
      </div>
    ),
  },

  {
    path: "/admin/dashboard",
    element: (
      <div>
        <AdminPanel />
      </div>
    ),
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App