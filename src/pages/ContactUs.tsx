import React from "react";
import { motion } from "framer-motion";
import { Mail, MessageSquare, Clock, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const ContactUs = () => {
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

      <div className="mx-auto max-w-4xl px-4 py-16">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-semibold mb-6">
            Get in <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-700 to-yellow-600 dark:from-amber-500 dark:to-yellow-400">Touch</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Have questions about our platform, need help with an asset, or want to become a creator? 
            We're here to help.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="rounded-3xl border border-gray-200/70 dark:border-white/10 bg-white/80 dark:bg-white/5 backdrop-blur p-8">
              <h2 className="text-2xl font-semibold mb-6">Send us a message</h2>
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    className="w-full rounded-2xl border border-gray-200 dark:border-white/10 bg-white/90 dark:bg-neutral-950/70 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full rounded-2xl border border-gray-200 dark:border-white/10 bg-white/90 dark:bg-neutral-950/70 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Subject</label>
                  <select className="w-full rounded-2xl border border-gray-200 dark:border-white/10 bg-white/90 dark:bg-neutral-950/70 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                    <option>General Inquiry</option>
                    <option>Asset Support</option>
                    <option>Creator Application</option>
                    <option>Technical Issue</option>
                    <option>Partnership</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <textarea
                    rows={4}
                    className="w-full rounded-2xl border border-gray-200 dark:border-white/10 bg-white/90 dark:bg-neutral-950/70 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    placeholder="Tell us how we can help you..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3 text-sm font-medium bg-gradient-to-r from-amber-700 to-yellow-600 text-white shadow-sm hover:shadow-md hover:from-amber-800 hover:to-yellow-700 active:scale-[.99] transition"
                >
                  <MessageSquare className="h-4 w-4" />
                  Send Message
                </button>
              </form>
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="space-y-6">
              {/* Email */}
              <div className="rounded-3xl border border-gray-200/70 dark:border-white/10 bg-white/80 dark:bg-white/5 backdrop-blur p-6">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-amber-700 to-yellow-600 text-white shadow-sm mb-4">
                  <Mail className="h-5 w-5" />
                </div>
                <h3 className="font-semibold mb-2">Email Us</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                  For general inquiries and support
                </p>
                <a 
                  href="mailto:contact@cantilever.dev" 
                  className="text-primary hover:underline font-medium"
                >
                  contact@cantilever.dev
                </a>
              </div>

              {/* Response Time */}
              <div className="rounded-3xl border border-gray-200/70 dark:border-white/10 bg-white/80 dark:bg-white/5 backdrop-blur p-6">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-amber-700 to-yellow-600 text-white shadow-sm mb-4">
                  <Clock className="h-5 w-5" />
                </div>
                <h3 className="font-semibold mb-2">Response Time</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  We typically respond within 24 hours during business days. 
                  For urgent technical issues, we aim to respond within 4 hours.
                </p>
              </div>

              {/* FAQ Link */}
              <div className="rounded-3xl border border-gray-200/70 dark:border-white/10 bg-white/80 dark:bg-white/5 backdrop-blur p-6">
                <h3 className="font-semibold mb-2">Before you reach out</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                  Check our FAQ section for answers to common questions about 
                  assets, licensing, and platform usage.
                </p>
                <Link 
                  to="/#faq" 
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                >
                  View FAQ Section
                </Link>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-16 text-center"
        >
          <div className="rounded-3xl border border-gray-200/70 dark:border-white/10 bg-white/80 dark:bg-white/5 backdrop-blur p-8">
            <h3 className="text-xl font-semibold mb-4">Looking to become a creator?</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Join our community of verified creators and start monetizing your architectural assets. 
              We provide all the tools and support you need to succeed.
            </p>
            <button className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium bg-gradient-to-r from-amber-700 to-yellow-600 text-white shadow-sm hover:shadow-md hover:from-amber-800 hover:to-yellow-700 active:scale-[.99] transition">
              Learn More About Selling
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactUs;