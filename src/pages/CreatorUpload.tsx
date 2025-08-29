import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  UploadCloud,
  FileImage,
  Tag,
  DollarSign,
  MapPin,
  Plus,
  X,
  Check,
  AlertCircle,
  Info
} from "lucide-react";
import CreatorNav from "../components/CreatorNav";

const CreatorUpload = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [step, setStep] = useState(1);
  const [tags, setTags] = useState([]);
  const [cities, setCities] = useState([]);
  const [dragActive, setDragActive] = useState(false);

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

  const categories = [
    { key: "bim", label: "BIM Families", desc: "Revit families and parametric models" },
    { key: "details", label: "Detail Libraries", desc: "CAD details and construction drawings" },
    { key: "specs", label: "Spec Templates", desc: "Specification documents and templates" },
    { key: "renders", label: "Render Packs", desc: "Materials, textures, and render assets" },
  ];

  const suggestedTags = ["Revit 2024", "LOD 300", "Parametric", "IS:456", "NBC", "Code compliant"];
  const suggestedCities = ["Bengaluru", "Hyderabad", "Pune", "Delhi NCR", "Mumbai", "Chennai"];

  const addTag = (tag) => {
    if (!tags.includes(tag)) {
      setTags([...tags, tag]);
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const addCity = (city) => {
    if (!cities.includes(city)) {
      setCities([...cities, city]);
    }
  };

  const removeCity = (cityToRemove) => {
    setCities(cities.filter(city => city !== cityToRemove));
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    // Handle file upload logic here
  };

  const steps = [
    { number: 1, title: "Upload Files", desc: "Add your asset files" },
    { number: 2, title: "Asset Details", desc: "Describe your asset" },
    { number: 3, title: "Pricing & Tags", desc: "Set price and metadata" },
    { number: 4, title: "Review", desc: "Final review" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-gray-900 dark:text-white">
      <CreatorNav darkMode={darkMode} toggleDark={() => setDarkMode(!darkMode)} />

      <div className="mx-auto max-w-4xl px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-500 bg-clip-text text-transparent mb-3">
            Upload New Asset
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Share your architectural assets with the community
          </p>
        </motion.div>

        {/* Progress Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            {steps.map((stepItem, index) => (
              <div key={stepItem.number} className="flex-1 relative">
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                    step >= stepItem.number
                      ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg animate-scale-in"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                  }`}>
                    {step > stepItem.number ? <Check className="h-4 w-4" /> : stepItem.number}
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`flex-1 h-0.5 ml-4 transition-colors duration-300 ${
                      step > stepItem.number ? "bg-blue-600" : "bg-gray-200 dark:bg-gray-700"
                    }`} />
                  )}
                </div>
                <div className="mt-2 hidden sm:block">
                  <div className="text-xs font-medium">{stepItem.title}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{stepItem.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Step Content */}
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="rounded-3xl border border-blue-100 dark:border-blue-900/30 bg-white/80 dark:bg-slate-800/50 backdrop-blur p-8 shadow-lg"
        >
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Upload Your Files</h3>
                <div
                  className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 hover-scale ${
                    dragActive
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                      : "border-blue-200 dark:border-blue-800 hover:border-blue-300 dark:hover:border-blue-700"
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <FileImage className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                  <h4 className="text-lg font-medium mb-2">Drop files here or click to upload</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    Supported formats: RFA, RVT, DWG, DXF, PDF, DOCX, PNG, JPG, SBSAR
                  </p>
                  <button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover-scale">
                    <UploadCloud className="h-5 w-5" />
                    Choose Files
                  </button>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-4">
                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                  <div className="text-sm">
                    <div className="font-medium text-blue-800 dark:text-blue-200 mb-1">Upload Guidelines</div>
                    <ul className="text-blue-700 dark:text-blue-300 space-y-1">
                      <li>• Maximum file size: 50MB per file</li>
                      <li>• Include preview images for better visibility</li>
                      <li>• Ensure files are clean and well-organized</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold mb-4">Asset Details</h3>
              
              <div>
                <label className="block text-sm font-medium mb-2">Asset Title</label>
                <input
                  type="text"
                  className="w-full rounded-xl border border-blue-200 dark:border-blue-800 bg-white/90 dark:bg-slate-800/70 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  placeholder="e.g., Parametric Door Set - Revit 2024"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {categories.map((category) => (
                    <button
                      key={category.key}
                      className="p-4 rounded-xl border border-blue-200 dark:border-blue-800 hover:border-blue-300 dark:hover:border-blue-700 bg-gradient-to-r from-blue-50 to-white dark:from-slate-800 dark:to-slate-700 text-left transition-all duration-300 hover-scale"
                    >
                      <div className="font-medium text-sm">{category.label}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{category.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  rows={4}
                  className="w-full rounded-xl border border-blue-200 dark:border-blue-800 bg-white/90 dark:bg-slate-800/70 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none transition-all duration-300"
                  placeholder="Describe your asset, its features, and use cases..."
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold mb-4">Pricing & Tags</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Price (USD)</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="number"
                      className="w-full rounded-xl border border-blue-200 dark:border-blue-800 bg-white/90 dark:bg-slate-800/70 pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                      placeholder="29"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">License Type</label>
                  <select className="w-full rounded-xl border border-blue-200 dark:border-blue-800 bg-white/90 dark:bg-slate-800/70 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300">
                    <option>Single-firm Commercial</option>
                    <option>Multi-firm Commercial</option>
                    <option>Educational</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Tags</label>
                <div className="mb-3">
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-medium animate-scale-in"
                      >
                        {tag}
                        <button onClick={() => removeTag(tag)} className="hover:text-blue-900 dark:hover:text-blue-100">
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-xs text-gray-500 dark:text-gray-400">Suggested tags:</div>
                  <div className="flex flex-wrap gap-2">
                    {suggestedTags.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => addTag(tag)}
                        className="px-3 py-1 rounded-full border border-blue-200 dark:border-blue-800 text-xs hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors hover-scale"
                      >
                        <Plus className="h-3 w-3 inline mr-1" />
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Applicable Cities</label>
                <div className="mb-3">
                  <div className="flex flex-wrap gap-2">
                    {cities.map((city) => (
                      <span
                        key={city}
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-xs font-medium animate-scale-in"
                      >
                        <MapPin className="h-3 w-3" />
                        {city}
                        <button onClick={() => removeCity(city)} className="hover:text-emerald-900 dark:hover:text-emerald-100">
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-xs text-gray-500 dark:text-gray-400">Select applicable cities:</div>
                  <div className="flex flex-wrap gap-2">
                    {suggestedCities.map((city) => (
                      <button
                        key={city}
                        onClick={() => addCity(city)}
                        className="px-3 py-1 rounded-full border border-blue-200 dark:border-blue-800 text-xs hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors hover-scale"
                      >
                        <Plus className="h-3 w-3 inline mr-1" />
                        {city}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold mb-4">Review & Submit</h3>
              
              <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl p-6">
                <div className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-emerald-600 dark:text-emerald-400 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-emerald-800 dark:text-emerald-200 mb-2">Ready to Submit!</h4>
                    <p className="text-emerald-700 dark:text-emerald-300 text-sm mb-4">
                      Your asset will be reviewed by our team within 24-48 hours. You'll receive an email notification once it's approved.
                    </p>
                    <ul className="text-emerald-700 dark:text-emerald-300 text-sm space-y-1">
                      <li>• Files will be processed and optimized</li>
                      <li>• Quality assurance check for compliance</li>
                      <li>• Automatic watermarking applied</li>
                      <li>• Listed in marketplace upon approval</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 dark:bg-amber-900/20 rounded-2xl p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5" />
                  <div className="text-sm">
                    <div className="font-medium text-amber-800 dark:text-amber-200 mb-1">Before Submitting</div>
                    <div className="text-amber-700 dark:text-amber-300">
                      Ensure all files are final versions and properly named. Changes after submission require re-review.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between items-center pt-8 border-t border-blue-100 dark:border-blue-900/30">
            <button
              onClick={() => setStep(Math.max(1, step - 1))}
              disabled={step === 1}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-blue-200 dark:border-blue-800 bg-white/60 dark:bg-slate-800/60 text-gray-700 dark:text-gray-300 font-medium hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300 hover-scale disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Step {step} of {steps.length}
            </div>

            <button
              onClick={() => step < 4 ? setStep(step + 1) : null}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover-scale"
            >
              {step === 4 ? "Submit for Review" : "Next"}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CreatorUpload;