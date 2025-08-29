import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  MessageSquare,
  Clock,
  CheckCircle2,
  XCircle,
  User,
  DollarSign,
  Calendar,
  Building2,
  Mail,
  Phone,
  Filter,
  Search
} from "lucide-react";
import CreatorNav from "../components/CreatorNav";

const CreatorRequests = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

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

  const requests = [
    {
      id: 1,
      type: "custom",
      title: "Custom Kitchen Cabinet Family",
      client: {
        name: "Rohit Sharma",
        company: "Design Works Pvt Ltd",
        email: "rohit@designworks.in",
        phone: "+91 98765 43210"
      },
      description: "Need a parametric kitchen cabinet family for Revit 2024 with Indian standard dimensions. Should include multiple door styles and hardware options.",
      budget: "$150-200",
      deadline: "2024-02-15",
      status: "pending",
      priority: "high",
      submittedAt: "2024-01-10T10:30:00Z",
      requirements: [
        "Revit 2024 compatibility",
        "Parametric dimensions",
        "Multiple door styles",
        "Hardware variations",
        "Indian standards compliant"
      ]
    },
    {
      id: 2,
      type: "modification",
      title: "Modify Door Handle Set - Add Hardware Options",
      client: {
        name: "Priya Patel",
        company: "AEC Studio",
        email: "priya@aecstudio.com",
        phone: "+91 98123 45678"
      },
      description: "Request modification to existing door handle set to include more hardware finish options and sizing variants.",
      budget: "$75-100",
      deadline: "2024-02-08",
      status: "in_progress",
      priority: "medium",
      submittedAt: "2024-01-08T14:20:00Z",
      requirements: [
        "Add brass finish option",
        "Include lever variations",
        "Update material library",
        "Maintain existing parameters"
      ]
    },
    {
      id: 3,
      type: "licensing",
      title: "Extended License for Window Family",
      client: {
        name: "Mumbai Architects Consortium",
        company: "MAC Group",
        email: "licensing@macgroup.in",
        phone: "+91 98888 99999"
      },
      description: "Request for extended multi-firm license for parametric window family to be used across 5 offices in the consortium.",
      budget: "$300-400",
      deadline: "2024-01-25",
      status: "approved",
      priority: "low",
      submittedAt: "2024-01-05T09:15:00Z",
      requirements: [
        "Multi-firm license agreement",
        "Usage rights for 5 offices",
        "12-month license period",
        "Support included"
      ]
    },
    {
      id: 4,
      type: "support",
      title: "Technical Support - Stair Family Issues",
      client: {
        name: "Arjun Reddy",
        company: "Build Tech Solutions",
        email: "arjun@buildtech.co.in",
        phone: "+91 99234 56789"
      },
      description: "Experiencing issues with stair family not loading properly in Revit 2023. Need technical assistance to resolve compatibility problems.",
      budget: "Free (Existing Customer)",
      deadline: "2024-01-20",
      status: "resolved",
      priority: "high",
      submittedAt: "2024-01-03T16:45:00Z",
      requirements: [
        "Revit 2023 compatibility check",
        "File corruption analysis",
        "Provide updated version if needed",
        "Documentation update"
      ]
    }
  ];

  const statusConfig = {
    pending: { color: "amber", label: "Pending Review" },
    in_progress: { color: "blue", label: "In Progress" },
    approved: { color: "emerald", label: "Approved" },
    resolved: { color: "emerald", label: "Resolved" },
    rejected: { color: "red", label: "Rejected" }
  };

  const priorityConfig = {
    high: { color: "red", label: "High" },
    medium: { color: "amber", label: "Medium" },
    low: { color: "green", label: "Low" }
  };

  const typeConfig = {
    custom: { icon: Building2, label: "Custom Asset", color: "blue" },
    modification: { icon: MessageSquare, label: "Modification", color: "purple" },
    licensing: { icon: DollarSign, label: "Licensing", color: "emerald" },
    support: { icon: User, label: "Support", color: "amber" }
  };

  const filteredRequests = requests.filter(request => {
    const matchesFilter = filter === "all" || request.status === filter;
    const matchesSearch = searchTerm === "" || 
      request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.client.company.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const stats = [
    { label: "Total Requests", value: requests.length, color: "from-blue-500 to-blue-600" },
    { label: "Pending", value: requests.filter(r => r.status === "pending").length, color: "from-amber-500 to-amber-600" },
    { label: "In Progress", value: requests.filter(r => r.status === "in_progress").length, color: "from-purple-500 to-purple-600" },
    { label: "Completed", value: requests.filter(r => r.status === "approved" || r.status === "resolved").length, color: "from-emerald-500 to-emerald-600" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-gray-900 dark:text-white">
      <CreatorNav darkMode={darkMode} toggleDark={() => setDarkMode(!darkMode)} />

      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-500 bg-clip-text text-transparent mb-3">
            Client Requests
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage custom orders, modifications, and support requests
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-blue-100 dark:border-blue-900/30 bg-white/80 dark:bg-slate-800/50 backdrop-blur p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover-scale animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</div>
                </div>
                <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color} text-white shadow-lg`}>
                  <MessageSquare className="h-6 w-6" />
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Filters & Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 mb-6"
        >
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search requests..."
                className="w-full rounded-xl border border-blue-200 dark:border-blue-800 bg-white/90 dark:bg-slate-800/70 pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="rounded-xl border border-blue-200 dark:border-blue-800 bg-white/90 dark:bg-slate-800/70 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="approved">Approved</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>
        </motion.div>

        {/* Requests List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-6"
        >
          {filteredRequests.map((request, index) => (
            <motion.div
              key={request.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="rounded-2xl border border-blue-100 dark:border-blue-900/30 bg-white/80 dark:bg-slate-800/50 backdrop-blur p-6 shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Request Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                     <div className="flex items-center gap-3">
                       {(() => {
                         const IconComponent = typeConfig[request.type].icon;
                         return (
                           <div className="p-2 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg">
                             <IconComponent className="h-5 w-5" />
                           </div>
                         );
                       })()}
                      <div>
                        <h3 className="font-semibold text-lg">{request.title}</h3>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                            {typeConfig[request.type].label}
                          </span>
                          <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                            {statusConfig[request.status].label}
                          </span>
                          <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
                            {priorityConfig[request.priority].label} Priority
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                    {request.description}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <DollarSign className="h-4 w-4" />
                      <span>Budget: {request.budget}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <Calendar className="h-4 w-4" />
                      <span>Deadline: {new Date(request.deadline).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-sm font-medium mb-2">Requirements:</h4>
                    <div className="flex flex-wrap gap-2">
                      {request.requirements.slice(0, 3).map((req, i) => (
                        <span
                          key={i}
                          className="inline-block px-2 py-1 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-xs"
                        >
                          {req}
                        </span>
                      ))}
                      {request.requirements.length > 3 && (
                        <span className="inline-block px-2 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs">
                          +{request.requirements.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Client Info */}
                <div className="lg:w-80">
                  <div className="rounded-xl border border-blue-100 dark:border-blue-900/30 bg-gradient-to-r from-blue-50/50 to-white dark:from-slate-700 dark:to-slate-800 p-4">
                    <h4 className="font-medium mb-3 flex items-center gap-2">
                      <User className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      Client Details
                    </h4>
                    
                    <div className="space-y-3">
                      <div>
                        <div className="font-medium text-sm">{request.client.name}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{request.client.company}</div>
                      </div>
                      
                      <div className="space-y-2 text-xs">
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                          <Mail className="h-3 w-3" />
                          <span>{request.client.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                          <Phone className="h-3 w-3" />
                          <span>{request.client.phone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                          <Clock className="h-3 w-3" />
                          <span>Submitted {new Date(request.submittedAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-4">
                      {request.status === "pending" && (
                        <>
                          <button className="flex-1 inline-flex items-center justify-center gap-1 px-3 py-2 rounded-lg bg-gradient-to-r from-emerald-600 to-emerald-700 text-white text-xs font-medium shadow-md hover:shadow-lg transition-all duration-300 hover-scale">
                            <CheckCircle2 className="h-3 w-3" />
                            Accept
                          </button>
                          <button className="flex-1 inline-flex items-center justify-center gap-1 px-3 py-2 rounded-lg bg-gradient-to-r from-red-600 to-red-700 text-white text-xs font-medium shadow-md hover:shadow-lg transition-all duration-300 hover-scale">
                            <XCircle className="h-3 w-3" />
                            Decline
                          </button>
                        </>
                      )}
                      
                      <button className="flex-1 inline-flex items-center justify-center gap-1 px-3 py-2 rounded-lg border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 text-xs font-medium hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300 hover-scale">
                        <MessageSquare className="h-3 w-3" />
                        Message
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {filteredRequests.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <MessageSquare className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-500 dark:text-gray-400 mb-2">
              No requests found
            </h3>
            <p className="text-gray-400 dark:text-gray-500">
              {searchTerm || filter !== "all" 
                ? "Try adjusting your search or filter criteria"
                : "You don't have any requests yet. They'll appear here when clients contact you."
              }
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CreatorRequests;