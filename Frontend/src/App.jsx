import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './App.css'
import './index.css'
import Landing from './components/Landing';
import Sidebar from './components/Admin/Sidebar';
import AdminPanel from './components/Admin/Dashboard';
import { Activity, Users, Briefcase, FileText, Settings, LayoutDashboard } from 'lucide-react';
import ErrorPage from './components/ErrorPage';
import FreelancerSignup from './components/Auth/Freelancersignup';
import Dashboard from './components/Admin/Dashboard';
import FreelancerDashboard from './components/Freelancer/freecomponents/FreelancerDashboard';
import FreeSidebar from './components/Freelancer/Freelancersidebar';

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
        <FreeSidebar freemenuItems={menuItems} />
        <FreelancerDashboard />
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