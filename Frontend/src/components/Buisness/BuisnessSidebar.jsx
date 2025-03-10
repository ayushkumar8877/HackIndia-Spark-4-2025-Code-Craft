import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Briefcase, LogOut } from 'lucide-react';

function BuisnessSidebar({ BuisnessmenuItems }) {
  const location = useLocation();

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      localStorage.clear();
      window.location.href = "/";
    }
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 px-4 py-6 flex flex-col justify-between h-screen">
      {/* Sidebar Menu */}
      <div>
        <div className="flex items-center gap-3 mb-8">
          <Briefcase className="w-8 h-8 text-accent-600" />
          <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
            FreelanceHub
          </span>
        </div>

        <nav className="space-y-1">
          {BuisnessmenuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
                    ? "bg-primary-50 text-primary-600"
                    : "text-gray-600 hover:bg-gray-50"
                  }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors w-full"
      >
        <LogOut className="w-5 h-5" />
        <span className="font-medium">Logout</span>
      </button>
    </div>
  );
}

export default BuisnessSidebar;
