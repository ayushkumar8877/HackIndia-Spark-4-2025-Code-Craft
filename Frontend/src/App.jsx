import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './App.css'
import './index.css'
import Landing from './components/Landing';
import Dashboard from './components/Admin/Dashboard';
import Sidebar from './components/Sidebar';
import Freesignup from './components/Auth/Freelancersignup';
import Businesssignup from './components/Auth/Buisnesssignup';
import AdminPanel from './components/Admin/AdminPannel';
import FreelancerProfileSetup from './components/Auth/Freelancerprofile';
import BusinessProfileSetup from './components/Auth/Businessprofile';
import { Activity, Users, Briefcase, FileText, Settings, LayoutDashboard } from 'lucide-react';

const menuItems = [
  { icon: Activity, label: 'Dashboard', path: '/' },
  { icon: LayoutDashboard, label: 'Freelancer Dashboard', path: '/freelancer-dashboard' },
  { icon: Users, label: 'Business Dashboard', path: '/business-dashboard' },
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
    path: "/admin-dashboard",
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
    path: "/adminpannel",
    element: (
      <div>
        <AdminPanel/>
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
