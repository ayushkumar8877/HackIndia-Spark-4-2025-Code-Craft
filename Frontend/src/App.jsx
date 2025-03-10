import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './App.css'
import './index.css'
import Landing from './components/Landing';
import Sidebar from './components/Admin/Sidebar';
import AdminPanel from './components/Admin/Dashboard';
import { Activity, Users, Briefcase, FileText, Settings, LayoutDashboard, IndianRupee, MessageCircle } from 'lucide-react';
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
const menuItems = [
  { icon: Activity, label: 'Dashboard', path: '/' },
  { icon: LayoutDashboard, label: 'Freelancer Dashboard', path: '/freelancer-dashboard' },
  { icon: Users, label: 'Business Dashboard', path: '/business-dashboard' },
  { icon: Briefcase, label: 'Jobs', path: '/jobs' },
  { icon: FileText, label: 'Contracts', path: '/contracts' },
  { icon: Settings, label: 'Settings', path: '/settings' },
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