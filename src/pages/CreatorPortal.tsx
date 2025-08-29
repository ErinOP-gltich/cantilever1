import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  UploadCloud,
  DollarSign,
  MessageSquare,
  TrendingUp,
  Eye,
  Download,
  Star,
  Plus,
  FileImage,
  Calendar,
  Activity
} from "lucide-react";
import CreatorNav from "../components/CreatorNav";

const CreatorPortal = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    const stored = localStorage.getItem("creator-theme");
    const startDark = stored ? stored === "dark" : mql;
    setDarkMode(startDark);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("creator-theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("creator-theme", "light");
    }
  }, [darkMode]);

  const stats = [
    { label: "Total Uploads", value: "24", icon: FileImage, change: "+3 this month", color: "from-blue-500 to-blue-600" },
    { label: "Total Earnings", value: "$2,847", icon: DollarSign, change: "+$492 this month", color: "from-emerald-500 to-emerald-600" },
    { label: "Downloads", value: "1,342", icon: Download, change: "+156 this week", color: "from-purple-500 to-purple-600" },
    { label: "Avg Rating", value: "4.8", icon: Star, change: "+0.2 this month", color: "from-amber-500 to-amber-600" },
  ];

  const recentUploads = [
    { id: 1, title: "Modern Door Handle Set", views: 89, downloads: 12, status: "approved", date: "2 days ago" },
    { id: 2, title: "Parametric Window Family", views: 156, downloads: 28, status: "pending", date: "5 days ago" },
    { id: 3, title: "Stair Detail Library", views: 234, downloads: 45, status: "approved", date: "1 week ago" },
  ];

  const quickActions = [
    { title: "Upload New Asset", desc: "Share your latest designs", icon: UploadCloud, link: "/creator/upload", color: "from-blue-500 to-blue-600" },
    { title: "View Earnings", desc: "Track your revenue", icon: DollarSign, link: "/creator/earnings", color: "from-emerald-500 to-emerald-600" },
    { title: "Check Requests", desc: "Review custom orders", icon: MessageSquare, link: "/creator/requests", color: "from-purple-500 to-purple-600" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-gray-900 dark:text-white">
      <CreatorNav darkMode={darkMode} toggleDark={() => setDarkMode(!darkMode)} />

      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-500 bg-clip-text text-transparent">
                Welcome back, Creator!
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Here's how your assets are performing today
              </p>
            </div>
            <Link
              to="/creator/upload"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover-scale animate-fade-in"
            >
              <Plus className="h-5 w-5" />
              New Upload
            </Link>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="relative rounded-2xl border border-blue-100 dark:border-blue-900/30 bg-white/80 dark:bg-slate-800/50 backdrop-blur p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover-scale animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-xl bg-gradient-to-r ${stat.color} text-white shadow-lg`}>
                  <stat.icon className="h-5 w-5" />
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</div>
                </div>
              </div>
              <div className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                {stat.change}
              </div>
            </div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="rounded-2xl border border-blue-100 dark:border-blue-900/30 bg-white/80 dark:bg-slate-800/50 backdrop-blur p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Activity className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                Quick Actions
              </h3>
              <div className="space-y-3">
                {quickActions.map((action, index) => (
                  <Link
                    key={action.title}
                    to={action.link}
                    className="block p-4 rounded-xl border border-blue-100 dark:border-blue-900/30 hover:border-blue-200 dark:hover:border-blue-800 bg-gradient-to-r from-blue-50 to-white dark:from-slate-800 dark:to-slate-700 transition-all duration-300 hover-scale animate-fade-in"
                    style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg bg-gradient-to-r ${action.color} text-white shadow-md`}>
                        <action.icon className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="font-medium text-sm">{action.title}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{action.desc}</div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Recent Uploads */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2"
          >
            <div className="rounded-2xl border border-blue-100 dark:border-blue-900/30 bg-white/80 dark:bg-slate-800/50 backdrop-blur p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  Recent Uploads
                </h3>
                <Link
                  to="/creator/uploads"
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline story-link"
                >
                  View all
                </Link>
              </div>
              
              <div className="space-y-3">
                {recentUploads.map((upload, index) => (
                  <motion.div
                    key={upload.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="p-4 rounded-xl border border-blue-100 dark:border-blue-900/30 bg-gradient-to-r from-blue-50/50 to-white dark:from-slate-700 dark:to-slate-800 hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{upload.title}</h4>
                        <div className="flex items-center gap-4 mt-1 text-xs text-gray-500 dark:text-gray-400">
                          <span className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            {upload.views}
                          </span>
                          <span className="flex items-center gap-1">
                            <Download className="h-3 w-3" />
                            {upload.downloads}
                          </span>
                          <span>{upload.date}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                          upload.status === 'approved' 
                            ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' 
                            : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                        }`}>
                          {upload.status}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CreatorPortal;