import React from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  UploadCloud, 
  DollarSign, 
  MessageSquare, 
  LayoutDashboard,
  Moon,
  Sun,
  LogOut,
  User
} from "lucide-react";

interface CreatorNavProps {
  darkMode: boolean;
  toggleDark: () => void;
}

const CreatorNav: React.FC<CreatorNavProps> = ({ darkMode, toggleDark }) => {
  const location = useLocation();

  const navItems = [
    { path: "/creator", icon: LayoutDashboard, label: "Dashboard" },
    { path: "/creator/upload", icon: UploadCloud, label: "Upload" },
    { path: "/creator/earnings", icon: DollarSign, label: "Earnings" },
    { path: "/creator/requests", icon: MessageSquare, label: "Requests" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="sticky top-0 z-50 border-b border-blue-200/60 dark:border-blue-800/30">
      <div className="absolute inset-0 -z-10 backdrop-blur supports-[backdrop-filter]:bg-white/80 dark:supports-[backdrop-filter]:bg-slate-950/80" />
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/creator" className="inline-flex items-center gap-3 hover-scale">
            <div className="h-8 w-8 grid place-items-center rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 text-white font-bold shadow-lg">
              C
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-500 bg-clip-text text-transparent">
              Creator Portal
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            {navItems.map(({ path, icon: Icon, label }) => (
              <Link
                key={path}
                to={path}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 hover-scale ${
                  isActive(path)
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg animate-scale-in"
                    : "text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400"
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleDark}
              className="p-2 rounded-xl border border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300 hover-scale"
            >
              {darkMode ? 
                <Sun className="h-4 w-4 text-blue-600 dark:text-blue-400" /> : 
                <Moon className="h-4 w-4 text-blue-600" />
              }
            </button>
            
            <div className="h-6 w-px bg-blue-200 dark:bg-blue-800" />
            
            <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300 hover-scale">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Profile</span>
            </button>
            
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-300 hover-scale"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Exit Portal</span>
            </Link>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden pb-4">
          <div className="flex gap-1 overflow-x-auto">
            {navItems.map(({ path, icon: Icon, label }) => (
              <Link
                key={path}
                to={path}
                className={`inline-flex shrink-0 items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-300 ${
                  isActive(path)
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg"
                    : "text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatorNav;