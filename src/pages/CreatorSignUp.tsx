import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  CheckCircle2,
  Upload,
  DollarSign,
  Shield
} from "lucide-react";

const CreatorSignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1);

  const benefits = [
    {
      icon: DollarSign,
      title: "Earn up to 85%",
      description: "Keep most of your revenue with our creator-friendly split"
    },
    {
      icon: Shield,
      title: "Quality Assurance",
      description: "We help ensure your assets meet industry standards"
    },
    {
      icon: Upload,
      title: "Easy Upload",
      description: "Streamlined process to get your designs to market"
    }
  ];

  const features = [
    "Instant payouts to your bank account",
    "Analytics dashboard to track performance",
    "Community of verified creators",
    "Marketing support for your assets",
    "Watermarking and license protection",
    "24/7 creator support"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-gray-900 dark:text-white">
      {/* Header */}
      <div className="border-b border-blue-200/60 dark:border-blue-800/30 bg-white/70 dark:bg-slate-950/70 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors hover-scale"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Main Site
          </Link>
        </div>
      </div>

      <div className="flex min-h-[calc(100vh-80px)]">
        {/* Left Side - Benefits */}
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800" />
          <div className="relative z-10 flex flex-col justify-center p-12 text-white">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-8"
            >
              <h1 className="text-4xl font-bold mb-4">
                Join Our Creator Community
              </h1>
              <p className="text-blue-100 text-lg">
                Turn your architectural expertise into a sustainable income stream
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-6 mb-8"
            >
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="p-2 rounded-lg bg-white/20 backdrop-blur">
                    <benefit.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{benefit.title}</h3>
                    <p className="text-blue-100 text-sm">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="space-y-3"
            >
              <h4 className="font-semibold text-lg">What you get:</h4>
              {features.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.05 }}
                  className="flex items-center gap-3 text-sm text-blue-100"
                >
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  {feature}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="flex-1 flex items-center justify-center p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md"
          >
            <div className="rounded-3xl border border-blue-100 dark:border-blue-900/30 bg-white/80 dark:bg-slate-800/50 backdrop-blur p-8 shadow-xl">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 mb-6">
                  <div className="h-8 w-8 grid place-items-center rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 text-white font-bold shadow-lg">
                    C
                  </div>
                  <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-500 bg-clip-text text-transparent">
                    Creator Portal
                  </span>
                </div>
                <h1 className="text-2xl font-bold mb-2">Create Your Account</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Start monetizing your architectural assets today
                </p>
              </div>

              {/* Auth Notice */}
              <div className="mb-6 rounded-2xl border border-blue-200 dark:border-blue-800/30 bg-blue-50 dark:bg-blue-900/10 p-4 animate-fade-in">
                <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">
                  Authentication Setup Required
                </h3>
                <p className="text-xs text-blue-700 dark:text-blue-300">
                  To enable creator sign-up, connect this project to Supabase using the green button in the top right.
                </p>
              </div>

              {/* Sign Up Form */}
              <form className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">First Name</label>
                    <input
                      type="text"
                      className="w-full rounded-xl border border-blue-200 dark:border-blue-800 bg-white/90 dark:bg-slate-800/70 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                      placeholder="John"
                      disabled
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Last Name</label>
                    <input
                      type="text"
                      className="w-full rounded-xl border border-blue-200 dark:border-blue-800 bg-white/90 dark:bg-slate-800/70 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                      placeholder="Doe"
                      disabled
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      className="w-full rounded-xl border border-blue-200 dark:border-blue-800 bg-white/90 dark:bg-slate-800/70 pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                      placeholder="creator@example.com"
                      disabled
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      className="w-full rounded-xl border border-blue-200 dark:border-blue-800 bg-white/90 dark:bg-slate-800/70 pl-10 pr-12 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                      placeholder="Create a strong password"
                      disabled
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                      disabled
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Portfolio URL (Optional)</label>
                  <input
                    type="url"
                    className="w-full rounded-xl border border-blue-200 dark:border-blue-800 bg-white/90 dark:bg-slate-800/70 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                    placeholder="https://yourportfolio.com"
                    disabled
                  />
                </div>

                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    className="mt-1 rounded border-blue-300 dark:border-blue-700"
                    disabled
                  />
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    I agree to the{" "}
                    <button className="text-blue-600 dark:text-blue-400 hover:underline font-medium" disabled>
                      Creator Terms
                    </button>{" "}
                    and{" "}
                    <button className="text-blue-600 dark:text-blue-400 hover:underline font-medium" disabled>
                      Privacy Policy
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-medium bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover-scale opacity-50 cursor-not-allowed"
                  disabled
                >
                  Create Creator Account
                </button>
              </form>

              {/* Sign In Link */}
              <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  to="/creator/signin"
                  className="text-blue-600 dark:text-blue-400 hover:underline font-medium story-link"
                >
                  Sign in
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CreatorSignUp;