import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Download,
  Calendar,
  CreditCard,
  Eye,
  Filter,
  MoreHorizontal
} from "lucide-react";
import CreatorNav from "../components/CreatorNav";

const CreatorEarnings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [timeFilter, setTimeFilter] = useState("month");

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
    {
      label: "Total Earnings",
      value: "$2,847.50",
      change: "+$492.30",
      changeType: "increase",
      icon: DollarSign,
      color: "from-emerald-500 to-emerald-600"
    },
    {
      label: "This Month",
      value: "$573.20",
      change: "+22.5%",
      changeType: "increase",
      icon: TrendingUp,
      color: "from-blue-500 to-blue-600"
    },
    {
      label: "Pending Payout",
      value: "$127.80",
      change: "Available now",
      changeType: "neutral",
      icon: CreditCard,
      color: "from-purple-500 to-purple-600"
    },
    {
      label: "Total Downloads",
      value: "1,342",
      change: "+156 this week",
      changeType: "increase",
      icon: Download,
      color: "from-amber-500 to-amber-600"
    }
  ];

  const transactions = [
    {
      id: 1,
      asset: "Modern Door Handle Set",
      buyer: "AEC Studio Pvt Ltd",
      amount: 29.99,
      commission: 25.49,
      date: "2024-01-15",
      status: "completed"
    },
    {
      id: 2,
      asset: "Parametric Window Family",
      buyer: "Design Works Inc",
      amount: 39.99,
      commission: 33.99,
      date: "2024-01-14",
      status: "completed"
    },
    {
      id: 3,
      asset: "Stair Detail Library",
      buyer: "BuildTech Solutions",
      amount: 24.99,
      commission: 21.24,
      date: "2024-01-12",
      status: "processing"
    },
    {
      id: 4,
      asset: "Office Furniture Set",
      buyer: "Space Architects",
      amount: 49.99,
      commission: 42.49,
      date: "2024-01-10",
      status: "completed"
    },
    {
      id: 5,
      asset: "Concrete Textures Pack",
      buyer: "Render Studio",
      amount: 19.99,
      commission: 16.99,
      date: "2024-01-08",
      status: "completed"
    }
  ];

  const topAssets = [
    {
      name: "Modern Door Handle Set",
      revenue: "$1,247.50",
      downloads: 498,
      rating: 4.8
    },
    {
      name: "Parametric Window Family",
      revenue: "$892.30",
      downloads: 342,
      rating: 4.6
    },
    {
      name: "Stair Detail Library",
      revenue: "$564.20",
      downloads: 287,
      rating: 4.9
    }
  ];

  const timeFilters = [
    { key: "week", label: "This Week" },
    { key: "month", label: "This Month" },
    { key: "quarter", label: "This Quarter" },
    { key: "year", label: "This Year" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-gray-900 dark:text-white">
      <CreatorNav darkMode={darkMode} toggleDark={() => setDarkMode(!darkMode)} />

      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-500 bg-clip-text text-transparent">
              Earnings Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Track your revenue and asset performance
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 rounded-xl border border-blue-200 dark:border-blue-800 bg-white/60 dark:bg-slate-800/60 p-1">
              {timeFilters.map((filter) => (
                <button
                  key={filter.key}
                  onClick={() => setTimeFilter(filter.key)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium transition-all duration-300 ${
                    timeFilter === filter.key
                      ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md animate-scale-in"
                      : "text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover-scale">
              <CreditCard className="h-4 w-4" />
              Request Payout
            </button>
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
              <div className={`text-xs font-medium flex items-center gap-1 ${
                stat.changeType === 'increase' ? 'text-emerald-600 dark:text-emerald-400' :
                stat.changeType === 'decrease' ? 'text-red-600 dark:text-red-400' :
                'text-gray-500 dark:text-gray-400'
              }`}>
                {stat.changeType === 'increase' && <TrendingUp className="h-3 w-3" />}
                {stat.changeType === 'decrease' && <TrendingDown className="h-3 w-3" />}
                {stat.change}
              </div>
            </div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Transactions */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="rounded-2xl border border-blue-100 dark:border-blue-900/30 bg-white/80 dark:bg-slate-800/50 backdrop-blur p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  Recent Transactions
                </h3>
                <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline story-link">
                  View all
                </button>
              </div>

              <div className="space-y-3">
                {transactions.map((transaction, index) => (
                  <motion.div
                    key={transaction.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.05 }}
                    className="p-4 rounded-xl border border-blue-100 dark:border-blue-900/30 bg-gradient-to-r from-blue-50/50 to-white dark:from-slate-700 dark:to-slate-800 hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-sm">{transaction.asset}</h4>
                          <div className="text-right">
                            <div className="font-semibold text-emerald-600 dark:text-emerald-400">
                              +${transaction.commission}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              ${transaction.amount} total
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {transaction.buyer}
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {transaction.date}
                            </span>
                            <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                              transaction.status === 'completed'
                                ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                                : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                            }`}>
                              {transaction.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Top Performing Assets */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-1"
          >
            <div className="rounded-2xl border border-blue-100 dark:border-blue-900/30 bg-white/80 dark:bg-slate-800/50 backdrop-blur p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                Top Assets
              </h3>
              
              <div className="space-y-4">
                {topAssets.map((asset, index) => (
                  <motion.div
                    key={asset.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="p-4 rounded-xl border border-blue-100 dark:border-blue-900/30 bg-gradient-to-r from-blue-50/30 to-white dark:from-slate-700 dark:to-slate-800"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-sm line-clamp-1">{asset.name}</h4>
                      <div className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                        {asset.revenue}
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <Download className="h-3 w-3" />
                          {asset.downloads}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {asset.rating}★
                        </span>
                      </div>
                      <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                        <MoreHorizontal className="h-3 w-3" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                <div className="text-sm font-medium mb-1">Next Payout</div>
                <div className="text-2xl font-bold mb-1">$127.80</div>
                <div className="text-xs text-blue-100">Processed on the 1st of each month</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CreatorEarnings;