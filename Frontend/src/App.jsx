import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './App.css'
import './index.css'
import Landing from './components/Landing';
import Sidebar from './components/Admin/Sidebar';
import Freesignup from './components/Auth/Freelancersignup';
import Businesssignup from './components/Auth/Buisnesssignup';
import AdminPanel from './components/Admin/AdminPannel';
import FreelancerProfileSetup from './components/Auth/Freelancerprofile';
import BusinessProfileSetup from './components/Auth/Businessprofile';
import BusinessDashboard from './components/Buisness/Buisnesscmponents/BuisnessDashboard';
import FreelancerDashboard from './components/Freelancer/freecomponents/FreelancerDashboard';
import { Activity, Users, Briefcase, FileText, Settings, LayoutDashboard } from 'lucide-react';
import BuisnessSidebar from './components/Buisness/BuisnessSidebar';
import FreeSidebar from './components/Freelancer/Freelancersidebar';  

const menuItems = [
  { icon: Activity, label: 'Dashboard', path: '/' },
  { icon: LayoutDashboard, label: 'Freelancer Dashboard', path: '/freelancer-dashboard' },
  { icon: Users, label: 'Business Dashboard', path: '/business-dashboard' },
  { icon: Briefcase, label: 'Jobs', path: '/jobs' },
  { icon: FileText, label: 'Contracts', path: '/contracts' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

const freemenuItems = [
  { icon: Activity, label: 'Dashboard', path: '/' },
  { icon: Briefcase, label: 'Jobs', path: '/jobs' },
  { icon: FileText, label: 'Contracts', path: '/contracts' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

const BuisnessmenuItems = [
  { icon: Activity, label: 'Dashboard', path: '/' },
  { icon: Briefcase, label: 'Jobs', path: '/jobs' },
  { icon: FileText, label: 'Contracts', path: '/contracts' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <Landing />
      </div>
    ),
  },
  {
    path: "/adminpannel",
    element: (
      <div className="flex h-screen bg-gray-50">
      <Sidebar menuItems={menuItems} />
      <div className="flex-1 overflow-auto">
        <AdminPanel />
      </div>
    </div>
    ),
  },
  {
    path: "/freelancer-dashboard",
    element: (
      <div className="flex h-screen bg-gray-50">
      <FreeSidebar freemenuItems={freemenuItems} />
      <div className="flex-1 overflow-auto">
        <FreelancerDashboard/>
      </div>
    </div>
    ),
  }, 
  {
    path: "/buisness-dashboard",
    element: (
      <div className="flex h-screen bg-gray-50">
      <BuisnessSidebar BuisnessmenuItems={BuisnessmenuItems} />
      <div className="flex-1 overflow-auto">
        <BusinessDashboard />
      </div>
    </div>
    ),
  },
  {
    path: "/freelancersignup",
    element: (
      <div>
        <Freesignup />
      </div>
    ),
  },
  {
    path: "/Businesssignup",
    element: (
      <div>
        <Businesssignup />
      </div>
    ),
  },
  {
    path: "/freelancerprofile",
    element: (
      <div>
        <FreelancerProfileSetup/>
      </div>
    ),
  },
  {
    path: "/businessprofile",
    element: (
      <div>
        <BusinessProfileSetup/>
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
