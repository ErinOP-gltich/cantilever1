import React from "react";
import { motion } from "framer-motion";
import { Building2, ShieldCheck, Users, Target, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const AboutUs = () => {
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
            About <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-700 to-yellow-600 dark:from-amber-500 dark:to-yellow-400">Cantilever</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            We're transforming how architects access and share premium building assets through 
            a curated marketplace built for the Indian construction industry.
          </p>
        </motion.div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-3xl border border-gray-200/70 dark:border-white/10 bg-white/80 dark:bg-white/5 backdrop-blur p-8"
          >
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-amber-700 to-yellow-600 text-white shadow-sm mb-4">
              <Target className="h-6 w-6" />
            </div>
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              To accelerate architectural workflows by providing verified, code-compliant, 
              and locally-relevant building assets that save time and improve project quality.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-3xl border border-gray-200/70 dark:border-white/10 bg-white/80 dark:bg-white/5 backdrop-blur p-8"
          >
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-amber-700 to-yellow-600 text-white shadow-sm mb-4">
              <Building2 className="h-6 w-6" />
            </div>
            <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              To become India's premier architectural asset marketplace, connecting 
              creators and practitioners while maintaining the highest standards of quality and compliance.
            </p>
          </motion.div>
        </div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-semibold text-center mb-8">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: ShieldCheck,
                title: "Quality First",
                description: "Every asset undergoes rigorous review for structure, performance, and code compliance."
              },
              {
                icon: Users,
                title: "Community Driven",
                description: "Built by architects, for architects. We understand the challenges you face daily."
              },
              {
                icon: Building2,
                title: "Local Expertise",
                description: "City-specific tagging and local code compliance to meet regional requirements."
              }
            ].map((value, index) => (
              <div
                key={value.title}
                className="text-center p-6 rounded-3xl border border-gray-200/70 dark:border-white/10 bg-white/60 dark:bg-white/3 backdrop-blur"
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-amber-700 to-yellow-600 text-white shadow-sm mb-4">
                  <value.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{value.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Story */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-3xl border border-gray-200/70 dark:border-white/10 bg-white/80 dark:bg-white/5 backdrop-blur p-8"
        >
          <h2 className="text-3xl font-semibold mb-6">Our Story</h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
            <p>
              Cantilever was born from the frustration of spending countless hours recreating 
              architectural assets that should have been readily available. Our founders, 
              experienced architects themselves, recognized the inefficiency in the industry 
              where professionals repeatedly built the same components from scratch.
            </p>
            <p>
              What started as a simple idea to share BIM families among colleagues has evolved 
              into India's most comprehensive architectural asset marketplace. We've built 
              rigorous quality standards, implemented local code tagging, and created a 
              platform that serves both individual architects and large firms.
            </p>
            <p>
              Today, Cantilever serves thousands of architects across India, helping them 
              save time, improve quality, and focus on what matters most - designing 
              exceptional spaces.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutUs;