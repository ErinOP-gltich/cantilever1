import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";

const SignIn = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-amber-50/30 dark:from-neutral-950 dark:to-neutral-950 text-gray-900 dark:text-white">
      {/* Header */}
      <div className="border-b border-gray-200/60 dark:border-white/10 bg-white/70 dark:bg-neutral-950/60 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </div>

      <div className="flex min-h-[calc(100vh-80px)] items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="rounded-3xl border border-gray-200/70 dark:border-white/10 bg-white/80 dark:bg-white/5 backdrop-blur p-8 shadow-lg">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 mb-6">
                <div className="h-8 w-8 grid place-items-center rounded-xl bg-gradient-to-br from-amber-700 to-yellow-600 text-white font-bold shadow-sm">
                  C
                </div>
                <span className="text-lg font-semibold tracking-tight">Cantilever</span>
              </div>
              <h1 className="text-2xl font-semibold mb-2">Welcome back</h1>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Sign in to access your architectural assets
              </p>
            </div>

            {/* Auth Notice */}
            <div className="mb-6 rounded-2xl border border-amber-200 dark:border-amber-800/30 bg-amber-50 dark:bg-amber-900/10 p-4">
              <h3 className="text-sm font-medium text-amber-800 dark:text-amber-200 mb-2">
                Authentication Setup Required
              </h3>
              <p className="text-xs text-amber-700 dark:text-amber-300">
                To enable sign-in functionality, this project needs to be connected to Supabase. 
                Click the green Supabase button in the top right to set up authentication.
              </p>
            </div>

            {/* Sign In Form */}
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    className="w-full rounded-2xl border border-gray-200 dark:border-white/10 bg-white/90 dark:bg-neutral-950/70 pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="your.email@example.com"
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
                    className="w-full rounded-2xl border border-gray-200 dark:border-white/10 bg-white/90 dark:bg-neutral-950/70 pl-10 pr-12 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Enter your password"
                    disabled
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    disabled
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded border-gray-300" disabled />
                  <span className="text-gray-600 dark:text-gray-300">Remember me</span>
                </label>
                <button type="button" className="text-primary hover:underline" disabled>
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3 text-sm font-medium bg-gradient-to-r from-amber-700 to-yellow-600 text-white shadow-sm hover:shadow-md hover:from-amber-800 hover:to-yellow-700 active:scale-[.99] transition opacity-50 cursor-not-allowed"
                disabled
              >
                Sign In
              </button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center">
              <div className="flex-1 border-t border-gray-200 dark:border-white/10"></div>
              <span className="px-4 text-xs text-gray-500">OR</span>
              <div className="flex-1 border-t border-gray-200 dark:border-white/10"></div>
            </div>

            {/* Social Login Placeholder */}
            <div className="space-y-3">
              <button
                type="button"
                className="w-full inline-flex items-center justify-center gap-2 rounded-2xl border border-gray-200 dark:border-white/10 bg-white/60 dark:bg-white/5 px-6 py-3 text-sm font-medium hover:bg-gray-50 dark:hover:bg-white/10 transition opacity-50 cursor-not-allowed"
                disabled
              >
                Continue with Google
              </button>
            </div>

            {/* Sign Up Link */}
            <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-300">
              Don't have an account?{" "}
              <button className="text-primary hover:underline font-medium" disabled>
                Sign up
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SignIn;