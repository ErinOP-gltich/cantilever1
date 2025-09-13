import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  Sparkles,
  UploadCloud,
  ShieldCheck,
  Star,
  Building2,
  FileText,
  Layers,
  Boxes,
  Download,
  Filter,
  MapPin,
  CheckCircle2,
  X,
  Menu,
  User,
  LogIn,
  Plus,
  ExternalLink,
  BookOpen,
  Heart,
  Moon,
  Sun,
  Mail,
  Globe,
  View,
  Gauge,
  Glasses,
  Cylinder,
  Calculator,
} from "lucide-react";

// --- Demo data ---------------------------------------------------------------
const CATEGORIES = [
  { key: "bim", label: "House plans", icon: Boxes },
  { key: "details", label: "Office plans", icon: Layers },
  { key: "specs", label: "Scenery plans", icon: FileText },
  { key: "renders", label: "Rural plans", icon: Sparkles },
];

const CITY_TAGS = ["Bengaluru", "Hyderabad", "Pune", "Delhi NCR", "Mumbai", "Chennai"]; // for future code-localization filters

const ASSETS = [
  {
    id: "a1",
    title: "House - Modern house plan",
    category: "bim",
    price: 29,
    rating: 4.8,
    sales: 7,
    cityTags: ["Bengaluru"],
    formats: ["RFA", "RVT"],
    cover:
      "https://cdn.pixabay.com/photo/2014/07/10/17/18/large-home-389271_1280.jpg",
    author: {
      name: "Mohan Kumar",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&auto=format&fit=crop",
    },
    highlights: ["Stunning exteriors", "Modern design", "Ready to deploy"],
    featured: true,
  },
  {
    id: "a2",
    title: "House - Rural house plan",
    category: "details",
    price: 39,
    rating: 4.6,
    sales: 8,
    cityTags: ["Hyderabad", "Pune"],
    formats: ["DWG", "DXF", "PDF"],
    cover:
      "https://cdn.pixabay.com/photo/2021/10/25/16/33/town-6741493_1280.jpg",
    author: {
      name: "Reddy Chetan",
      avatar:
        "https://images.unsplash.com/photo-1550525811-e5869dd03032?q=80&w=300&auto=format&fit=crop",
    },
    highlights: ["Code tagged", "Section/plan/elevations", "Ready to deploy"],
  },
  {
    id: "a3",
    title: "Office Design - Office design plan",
    category: "specs",
    price: 24,
    rating: 4.5,
    sales: 2,
    cityTags: ["Mumbai", "Delhi NCR"],
    formats: ["DOCX", "PNG", "JPG"],
    cover:
      "https://cdn.pixabay.com/photo/2012/12/19/18/18/london-71205_1280.jpg",
    author: {
      name: "Sprite Works",
      avatar:
        "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=300&auto=format&fit=crop",
    },
    highlights: ["Aligned", "Editable clauses", "Ready to deploy"],
  },
  {
    id: "a4",
    title: "House Interior - House interior plan",
    category: "renders",
    price: 19,
    rating: 4.7,
    sales: 4,
    cityTags: ["Chennai"],
    formats: ["PNG", "JPG", "SBSAR"],
    cover:
      "https://cdn.pixabay.com/photo/2014/05/26/07/53/blueprint-354233_1280.jpg",
    author: {
      name: "Rahul Roy",
      avatar:
        "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=300&auto=format&fit=crop",
    },
    highlights: ["4k interiors", "Physically correct", "Ready to deploy"],
  },
  {
    id: "a4",
    title: "House - Riverfront house plan",
    category: "renders",
    price: 19,
    rating: 4.7,
    sales: 1,
    cityTags: ["Delhi NCR"],
    formats: ["PNG", "JPG", "SBSAR"],
    cover:
      "https://cdn.pixabay.com/photo/2014/06/17/16/53/blueprint-370588_1280.jpg",
    author: {
      name: "Aman Sharma",
      avatar:
        "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=300&auto=format&fit=crop",
    },
    highlights: ["4k maps", "Physically correct", "Ready to deploy"],
  },
  {
    id: "a4",
    title: "Office Interior - Office interior plan",
    category: "renders",
    price: 19,
    rating: 4.9,
    sales: 5,
    cityTags: ["Delhi NCR"],
    formats: ["PNG", "JPG", "SBSAR"],
    cover:
      "https://cdn.pixabay.com/photo/2015/04/20/06/46/office-730681_1280.jpg",
    author: {
      name: "Rundy Naidu",
      avatar:
        "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=300&auto=format&fit=crop",
    },
    highlights: ["4k maps", "Physically correct", "Ready to deploy"],
  },
];

const CREATOR_BADGES = [
  { icon: ShieldCheck, text: "Verified creator" },
  { icon: Star, text: "Top rated" },
  { icon: Download, text: "5+ downloads" },
];

// --- Small UI helpers --------------------------------------------------------
const Tag = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center rounded-full border px-2 py-1 text-xs text-gray-700 dark:text-gray-200 border-gray-200/70 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-sm">
    {children}
  </span>
);

const PillButton = ({ children, className = "", ...props }: { children: React.ReactNode; className?: string; [key: string]: any }) => (
  <button
    className={`btn-primary ${className}`}
    {...props}
  >
    {children}
  </button>
);

const GhostButton = ({ children, className = "", ...props }: { children: React.ReactNode; className?: string; [key: string]: any }) => (
  <button
    className={`btn-ghost ${className}`}
    {...props}
  >
    {children}
  </button>
);

// --- Card -------------------------------------------------------------------
function AssetCard({ asset, onOpen }: { asset: any; onOpen: (asset: any) => void }) {
  return (
    <motion.div
      layout
      whileHover={{ y: -4 }}
      className="group relative rounded-3xl overflow-hidden glass shadow-sm hover:shadow-lg transition hover-lift"
    >
      {asset.featured && (
        <div className="absolute left-3 top-3 z-10">
          <span className="rounded-full bg-amber-500/90 text-white text-[10px] tracking-wide px-2 py-1 shadow">FEATURED</span>
        </div>
      )}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img src={asset.cover} alt={asset.title} className="h-full w-full object-cover group-hover:scale-105 transition duration-300" />
        <div className="absolute top-2 left-2 flex gap-1">
          {asset.cityTags.slice(0, 2).map((t) => (
            <Tag key={t}>
              <MapPin className="h-3 w-3 mr-1" />
              {t}
            </Tag>
          ))}
        </div>
        <button className="absolute right-2 top-2 rounded-full bg-white/80 dark:bg-neutral-900/70 p-2 hover:scale-105 transition">
          <Heart className="h-4 w-4" />
        </button>
        <div className="absolute bottom-2 left-2">
          <Tag>{asset.formats.join(" · ")}</Tag>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white leading-tight">
              {asset.title}
            </h3>
            <div className="mt-1 text-sm text-gray-500">{asset.author.name}</div>
          </div>
          <div className="text-right">
            <div className="font-semibold">₹{Math.round(asset.price * 85)}</div>
            <div className="text-xs text-gray-500">${asset.price}</div>
          </div>
        </div>
        <div className="mt-2 flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
          <div className="inline-flex items-center gap-1">
            <Star className="h-4 w-4" />
            {asset.rating}
          </div>
          <div className="inline-flex items-center gap-1">
            <Download className="h-4 w-4" />
            {asset.sales}
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {asset.highlights.slice(0, 3).map((h) => (
            <Tag key={h}>{h}</Tag>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between">
          <GhostButton onClick={() => onOpen(asset)}>
            <BookOpen className="h-4 w-4" /> Preview
          </GhostButton>
          <PillButton onClick={() => onOpen(asset)}>
            <Download className="h-4 w-4" /> Add to cart
          </PillButton>
        </div>
      </div>
    </motion.div>
  );
}

// --- Modal ------------------------------------------------------------------
function Modal({ open, onClose, asset }: { open: boolean; onClose: () => void; asset: any }) {
  if (!open || !asset) return null;
  return (
    <div className="fixed inset-0 z-50 grid place-items-center p-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-3xl rounded-3xl overflow-hidden bg-white dark:bg-neutral-900 border border-gray-200 dark:border-white/10 shadow-2xl"
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 dark:border-white/10">
          <div className="flex items-center gap-3">
            <img src={asset.author.avatar} className="h-8 w-8 rounded-full" alt={asset.author.name} />
            <div>
              <div className="font-semibold">{asset.title}</div>
              <div className="text-sm text-gray-500">by {asset.author.name}</div>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/5">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="grid md:grid-cols-2 gap-0">
          <div className="relative aspect-[4/3] md:aspect-auto">
            <img src={asset.cover} className="h-full w-full object-cover" alt={asset.title} />
          </div>
          <div className="p-5">
            <div className="flex flex-wrap gap-2">
              {CREATOR_BADGES.map((b, i) => (
                <Tag key={i}>
                  <b.icon className="h-3 w-3 mr-1" />
                  {b.text}
                </Tag>
              ))}
            </div>
            <div className="mt-4 space-y-3 text-sm text-gray-700 dark:text-gray-200">
              <div className="flex items-center gap-2">
                <Layers className="h-4 w-4" /> Formats: {asset.formats.join(", ")}
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" /> Cities: {asset.cityTags.join(", ")}
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4" /> License: Single-firm commercial
              </div>
            </div>
            <div className="mt-4">
              <div className="font-semibold mb-2">Highlights</div>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-200">
                {asset.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 mt-0.5" /> {h}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-5 flex items-center justify-between">
              <div>
                <div className="text-2xl font-semibold">₹{Math.round(asset.price * 85)}</div>
                <div className="text-xs text-gray-500">${asset.price} (excl. taxes)</div>
              </div>
              <div className="flex gap-2">
                <GhostButton>
                  <ExternalLink className="h-4 w-4" /> View creator
                </GhostButton>
                <PillButton>
                  <Download className="h-4 w-4" /> Purchase
                </PillButton>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// --- Header / Nav -----------------------------------------------------------
function Navbar({ onToggleMobile, darkMode, toggleDark, navigate }: { onToggleMobile: () => void; darkMode: boolean; toggleDark: () => void; navigate: (path: string) => void }) {
  return (
    <div className="sticky top-0 z-40 border-b border-gray-200/60 dark:border-white/10">
      <div className="absolute inset-0 -z-10 backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-neutral-950/60" />
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-14 items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5"
              onClick={onToggleMobile}
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="inline-flex items-center gap-2">
              <div 
                className="h-7 w-7 grid place-items-center rounded-xl text-white font-bold shadow-sm" 
                style={{background: 'var(--gradient-primary)'}}
              >
                <img src="C:\Users\Aman\Cantilever1\src\components\Logo1.png" alt="Cantilever" className="h-7 w-7" />
              </div>
              <span className="font-semibold tracking-tight">Cantilever</span>
            </div>
            <nav className="hidden lg:flex items-center gap-6 ml-8 text-sm text-gray-600 dark:text-gray-300">
              <a href="#browse" className="hover:text-gray-900 dark:hover:text-white smooth-transition hover-lift">
                Browse
              </a>
              <button 
                onClick={() => navigate('/vastu-calculator')} 
                className="hover:text-gray-900 dark:hover:text-white cursor-pointer smooth-transition hover-lift"
              >
                Vastu Calculator
              </button>
            </nav>
            <nav className="hidden md:flex items-center space-x-6">
              <a href="https://mycantilever.in" className="text-foreground/80 hover:text-primary smooth-transition hover-lift">
                Creators
              </a>
            </nav>
          </div>
          <div className="flex items-center gap-2">
            <nav className="hidden md:flex lg:hidden items-center gap-4 text-sm text-gray-600 dark:text-gray-300 mr-4">
              <button 
                onClick={() => navigate('/vastu-calculator')} 
                className="hover:text-gray-900 dark:hover:text-white cursor-pointer smooth-transition hover-lift"
              >
                Vastu Calculator
              </button>
            </nav>
            <button
              onClick={toggleDark}
              className="p-2 rounded-full border border-gray-200 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/5"
            >
              {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <Link to="/signin">
              <GhostButton className="smooth-transition hover-lift">
                <LogIn className="h-4 w-4" /> Sign in
              </GhostButton>
            </Link>
            <div className="hidden lg:flex gap-2">
              <Link to="/contact">
                <GhostButton className="smooth-transition hover-lift">
                  Contact us
                </GhostButton>
              </Link>
              <Link to="/about">
                <GhostButton className="smooth-transition hover-lift">
                  About us
                </GhostButton>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileMenu({ open, onClose, navigate }: { open: boolean; onClose: () => void; navigate: (path: string) => void }) {
  if (!open) return null;
  return (
    <div className="md:hidden fixed inset-0 z-40">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="absolute top-0 left-0 right-0 rounded-b-3xl bg-white dark:bg-neutral-950 p-4 border-b border-gray-200 dark:border-white/10">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-2">
            <div 
              className="h-7 w-7 grid place-items-center rounded-xl text-white font-bold" 
              style={{background: 'var(--gradient-primary)'}}
            >              <img src="C:\Users\Aman\Cantilever1\src\components\Logo1.png" alt="Cantilever" className="h-7 w-7" />

            </div>
            <span className="font-semibold">Cantilever</span>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="mt-4 grid gap-2 text-sm">
          <a href="#browse" className="px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 smooth-transition hover-lift" onClick={onClose}>
            Browse
          </a>
          <button 
            onClick={() => { navigate('/vastu-calculator'); onClose(); }} 
            className="px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 w-full text-left smooth-transition hover-lift"
          >
            Vastu Calculator
          </button>
          <a href="#contact" className="px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 smooth-transition hover-lift" onClick={onClose}>
            Contact us
          </a>
          <a href="#about" className="px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 smooth-transition hover-lift" onClick={onClose}>
            About us
          </a>
        </div>
      </div>
    </div>
  );
}

// --- Hero -------------------------------------------------------------------
function Hero({ query, setQuery }: { query: string; setQuery: (query: string) => void }) {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(70rem_70rem_at_10%_-10%,rgba(59,130,246,0.18),transparent),radial-gradient(60rem_60rem_at_100%_0,rgba(99,102,241,0.14),transparent)]" />
      <div className="mx-auto max-w-7xl px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-semibold leading-[1.1] tracking-tight"
            >
              Premium store for
              <span className="bg-clip-text text-transparent" style={{backgroundImage: 'var(--gradient-primary)'}}> Architectural designs</span>
            </motion.h1>
            <p className="mt-5 text-gray-600 dark:text-gray-300 text-base md:text-lg">
              Discover curated <b>Exterior plans</b>, <b>Detailed E&P</b>, <b>Interior plans</b>, and <b>Vastu Calculator</b> — code-tagged and ready to ship.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
              <div className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4" /> Verified creators</div>
              <div className="inline-flex items-center gap-2"><Building2 className="h-4 w-4" /> Local code tags</div>
              <div className="inline-flex items-center gap-2"><Download className="h-4 w-4" /> Instant delivery</div>
              <div className="inline-flex items-center gap-2"><Calculator className="h-4 w-4" /> Vastu Calculator</div>
            </div>
            <div className="mt-8 flex gap-2">
              <div className="relative flex-1 min-w-0">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search: Exterior plan, Interior plan, office design..."
                  className="w-full rounded-2xl border border-gray-200 dark:border-white/10 bg-white/90 dark:bg-neutral-950/70 pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <PillButton>
                <Filter className="h-4 w-4" /> Filters
              </PillButton>
            </div>
            <div className="mt-8 grid grid-cols-3 gap-6 text-center">
              {[{k:"Designs",v:"10+"},{k:"Architects",v:"2+"},{k:"Downloads",v:"5+"}].map(s => (
                <div key={s.k} className="rounded-2xl glass p-4">
                  <div className="text-2xl font-semibold">{s.v}</div>
                  <div className="text-xs text-gray-500 mt-1">{s.k}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="md:block hidden">
            <div className="grid grid-cols-2 gap-4">
              {ASSETS.slice(0, 4).map((a) => (
                <motion.div
                  key={a.id}
                  whileHover={{ y: -4 }}
                  className="rounded-3xl overflow-hidden glass"
                >
                  <img src={a.cover} className="h-40 w-full object-cover" alt={a.title} />
                  <div className="p-3">
                    <div className="text-sm font-medium line-clamp-1">{a.title}</div>
                    <div className="text-xs text-gray-500">{a.formats.join(" ")}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Features ---------------------------------------------------------------
function Features({ navigate }: { navigate: (path: string) => void }) {
  const items = [
    {
      title: "Rigorous QA",
      desc: "Every design reviewed for structure, parameters, performance, and code tags.",
      icon: ShieldCheck,
    },
    {
      title: "Built for speed & budget",
      desc: "Ready-to-build and save hours per project.",
      icon: Sparkles,
    },
    {
      title: "Local compliance",
      desc: "City/state tagging and update notifications when codes change.",
      icon: Building2,
    },
    {
      title: "Vastu Calculator",
      desc: "Calculate Vastu parameters for your project.",
      icon: Calculator,
    },
    {
      title: "Stability Checker",
      desc: "Check the stability of your project.",
      icon: Gauge,
    },
    {
      title: "VR/AR",
      desc: "Checkout the project in VR/AR.",
      icon: Glasses,
    },
  ];
  return (
    <section id="features" className="mx-auto max-w-7xl px-4 pb-4">
      <div className="grid md:grid-cols-3 gap-6 -mt-8">
        {items.map((it) => (
          <div
            key={it.title}
            className={`rounded-3xl glass p-6 shadow-sm ${it.title === "Vastu Calculator" ? "cursor-pointer hover:shadow-md transition-shadow" : ""}`}
            onClick={it.title === "Vastu Calculator" ? () => navigate('/vastu-calculator') : undefined}
          >
            <div 
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-white shadow-sm"
              style={{background: 'var(--gradient-primary)'}}
            >
              <it.icon className="h-5 w-5" />
            </div>
            <div className="mt-3 font-semibold">{it.title}</div>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{it.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// --- Filters + Grid ---------------------------------------------------------
function Catalogue({ query, activeCat, setActiveCat, onOpen }: { query: string; activeCat: string | null; setActiveCat: (cat: string | null) => void; onOpen: (asset: any) => void }) {
  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return ASSETS.filter(
      (a) => (!activeCat || a.category === activeCat) && (a.title.toLowerCase().includes(q) || a.highlights.join(" ").toLowerCase().includes(q))
    );
  }, [query, activeCat]);

  return (
    <section id="browse" className="mx-auto max-w-7xl px-4 py-12">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl md:text-2xl font-semibold">Browse designs</h2>
        <div className="hidden md:flex gap-2">
          {CATEGORIES.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveCat(key === activeCat ? null : key)}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm border transition ${
                activeCat === key
                  ? "text-white border-primary"
                  : "border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5"
              }`}
              style={activeCat === key ? {background: 'var(--gradient-primary)'} : {}}
            >
              <Icon className="h-4 w-4" /> {label}
            </button>
          ))}
        </div>
      </div>
      <div className="md:hidden flex gap-2 overflow-x-auto pb-2 -mx-4 px-4">
        {CATEGORIES.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setActiveCat(key === activeCat ? null : key)}
            className={`inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm border transition ${
              activeCat === key
                ? "text-white border-primary"
                : "border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5"
            }`}
            style={activeCat === key ? {background: 'var(--gradient-primary)'} : {}}
          >
            <Icon className="h-4 w-4" /> {label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="mt-8 grid place-items-center text-center p-10 border border-dashed rounded-2xl text-gray-600 dark:text-gray-300">
          <div className="font-medium mb-1">No results found</div>
          <div className="text-sm">Try a different search term or category.</div>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((a) => (
            <AssetCard key={a.id} asset={a} onOpen={onOpen} />
          ))}
        </div>
      )}
    </section>
  );
}

// --- Creator CTA ------------------------------------------------------------
function CreatorCTA() {
  return (
    <section id="Designers" className="mx-auto max-w-7xl px-4 py-16">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold">Sell your architectural designs on Cantilever</h2>
          <p className="mt-4 text-gray-600 dark:text-gray-300">
            Monetize your Exteior and interior designs, CAD details, Detailed E&P maps, and floor plans. Keep up to 85% revenue, with instant payouts, watermarking, and license controls.
          </p>
          <div className="mt-6 flex gap-2">
            <PillButton>
              <UploadCloud className="h-4 w-4" /> Upload your first design
            </PillButton>
            <GhostButton>
              <User className="h-4 w-4" /> Designer guide
            </GhostButton>
          </div>
          <ul className="mt-6 grid gap-3 text-sm text-gray-700 dark:text-gray-200">
            {["Invisible watermarking", "City/code tagging", "Analytics & payouts"].map((b) => (
              <li key={b} className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" /> {b}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl overflow-hidden border border-gray-200 dark:border-white/10 bg-gradient-to-br from-blue-50 to-emerald-50 dark:from-white/5 dark:to-white/0 p-6">
          <div className="grid grid-cols-2 gap-4">
            {ASSETS.map((a) => (
              <div key={a.id} className="rounded-2xl overflow-hidden glass">
                <img src={a.cover} className="h-28 w-full object-cover" alt={a.title} />
                <div className="p-3">
                  <div className="text-sm font-medium line-clamp-1">{a.title}</div>
                  <div className="text-xs text-gray-500">{a.author.name}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// --- Testimonials ------------------------------------------------------------
function Testimonials() {
  const items = [
    {
      quote:
        "Cantilever's interior designs packs cut our modeling time by ~30%. Quality is consistently high.",
      name: "Anika Rao",
      role: "Associate, AEC Studio",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&auto=format&fit=crop",
    },
    {
      quote:
        "The city-tagged details made approvals smoother. Exactly what our team needed.",
      name: "Madhan Sharma",
      role: "Principal Architect, Gridline",
      avatar: "https://images.unsplash.com/photo-1550525811-e5869dd03032?q=80&w=300&auto=format&fit=crop",
    },
  ];
  return (
    <section className="mx-auto max-w-7xl px-4 py-8">
      <div className="grid md:grid-cols-2 gap-6">
        {items.map((t, i) => (
          <div
            key={i}
            className="rounded-3xl glass p-6"
          >
            <div className="flex items-center gap-3">
              <img src={t.avatar} className="h-10 w-10 rounded-full" alt={t.name} />
              <div>
                <div className="font-medium">{t.name}</div>
                <div className="text-xs text-gray-500">{t.role}</div>
              </div>
            </div>
            <p className="mt-3 text-sm text-gray-700 dark:text-gray-200">"{t.quote}"</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// --- Pricing ---------------------------------------------------------------
function Pricing() {
  return (
    <section id="pricing" className="mx-auto max-w-7xl px-4 py-16">
      <h2 className="text-2xl md:text-3xl font-semibold text-center">Simple pricing (To be updated)</h2>
      <p className="mt-3 text-center text-gray-600 dark:text-gray-300">Buy once, use forever. Optional Pro plan for teams.</p>
      <div className="mt-8 grid md:grid-cols-3 gap-6">
        <div className="rounded-3xl glass p-6">
          <div className="text-sm font-medium text-gray-500">Marketplace</div>
          <div className="mt-1 text-3xl font-semibold">Pay per asset</div>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">From ₹500–₹4,500 per asset depending on complexity.</p>
          <ul className="mt-4 grid gap-2 text-sm">
            <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4" /> Commercial license</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4" /> Updates included 6 months</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4" /> Instant download</li>
          </ul>
          <PillButton className="mt-6 w-full">Browse assets</PillButton>
        </div>
        <div className="rounded-3xl border-2 border-primary p-6 bg-gradient-to-b from-amber-50 to-white dark:from-white/5 dark:to-transparent">
          <div className="text-sm font-medium text-primary">Pro (Teams)</div>
          <div className="mt-1 text-3xl font-semibold">₹19,999 / user / mo</div>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">Shared seats, private catalogs, and admin controls.</p>
          <ul className="mt-4 grid gap-2 text-sm">
            <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4" /> Private design libraries</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4" /> Version pinning</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4" /> Priority support</li>
          </ul>
          <PillButton className="mt-6 w-full">Start free trial</PillButton>
        </div>
        <div className="rounded-3xl glass p-6">
          <div className="text-sm font-medium text-gray-500">Creator</div>
          <div className="mt-1 text-3xl font-semibold">Up to 85% rev share</div>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">Instant payouts, watermarking, license controls.</p>
          <ul className="mt-4 grid gap-2 text-sm">
            <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4" /> Invisible watermarking</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4" /> Analytics dashboard</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4" /> Fast responses</li>
          </ul>
          <PillButton className="mt-6 w-full">Become a designer</PillButton>
        </div>
      </div>
    </section>
  );
}

// --- FAQ / Footer -----------------------------------------------------------
function FAQ() {
  return (
    <section id="faq" className="mx-auto max-w-7xl px-4 py-16">
      <h2 className="text-2xl md:text-3xl font-semibold text-center">FAQs</h2>
      <div className="mt-8 grid md:grid-cols-2 gap-6">
        {[
          {
            q: "How are assets verified?",
            a: "We review structure, parameters, performance, and code tags. Verified creators receive a badge.",
          },
          {
            q: "What license do I get?",
            a: "Single-firm commercial license with unlimited projects. Stamping or permit submissions require local professionals.",
          },
          {
            q: "Can I request custom changes?",
            a: "Yes. Use the 'Request tweak' option on the asset page to commission the creator.",
          },
          {
            q: "Is there any legal copy protection?",
            a: "Yes, we watermark all assets to prevent unauthorized use. However, we cannot guarantee 100% protection. The party if wants can use the legal route to get the asset removed. ",
          },
        ].map((f) => (
          <div key={f.q} className="rounded-3xl glass p-5">
            <div className="font-medium">{f.q}</div>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{f.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="mt-10 border-t border-gray-200 dark:border-white/10">
      <div className="mx-auto max-w-7xl px-4 py-10 grid md:grid-cols-4 gap-6 text-sm">
        <div>
          <div className="inline-flex items-center gap-2">
            <div 
              className="h-7 w-7 grid place-items-center rounded-xl text-white font-bold"
              style={{background: 'var(--gradient-primary)'}}
            >
              C
            </div>
            <span className="font-semibold">Cantilever</span>
          </div>
          <p className="mt-3 text-gray-600 dark:text-gray-300">The marketplace for architects.</p>
          <div className="mt-4 inline-flex items-center gap-2">
            <Mail className="h-4 w-4" /> support@mycantilever.in
          </div>
        </div>
        <div>
          <div className="font-medium">Product</div>
          <ul className="mt-3 grid gap-2 text-gray-600 dark:text-gray-300">
            <li>
              <a href="#browse">Browse</a>
            </li>
            <li>
              <a href="#pricing">Pricing</a>
            </li>
            <li>
              <a href="#faq">FAQ</a>
            </li>
          </ul>
        </div>
        <div>
          <div className="font-medium">For Creators</div>
          <ul className="mt-3 grid gap-2 text-gray-600 dark:text-gray-300">
            <li>Upload assets</li>
            <li>Creator guidelines</li>
            <li>Legal & licensing</li>
          </ul>
        </div>
        <div>
          <div className="font-medium">Company</div>
          <ul className="mt-3 grid gap-2 text-gray-600 dark:text-gray-300">
            <li>About</li>
            <li>Contact</li>
            <li>Terms & Privacy</li>
          </ul>
        </div>
      </div>
      <div className="text-xs text-center text-gray-500 py-4">
        © {new Date().getFullYear()} Cantilever. All rights reserved.
      </div>
    </footer>
  );
}

// --- Root -------------------------------------------------------------------
export default function Index() {
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState(null);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const mql = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    const stored = localStorage.getItem("cantilever-theme");
    const startDark = stored ? stored === "dark" : mql;
    setDarkMode(startDark);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("cantilever-theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("cantilever-theme", "light");
    }
  }, [darkMode]);

  const onOpen = (a) => {
    setSelected(a);
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
    setSelected(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/30 to-orange-50/50 dark:from-neutral-950 dark:to-neutral-950 text-gray-900 dark:text-white">
      <Navbar
        onToggleMobile={() => setMobileOpen(true)}
        darkMode={darkMode}
        toggleDark={() => setDarkMode((v) => !v)}
        navigate={navigate}
      />
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} navigate={navigate} />
      <Hero query={query} setQuery={setQuery} />
      <Features navigate={navigate} />
      <Catalogue
        query={query}
        activeCat={activeCat}
        setActiveCat={setActiveCat}
        onOpen={onOpen}
      />
      <Testimonials />
      <Pricing />
      <FAQ />
      <Footer />
      <Modal open={open} onClose={onClose} asset={selected} />
    </div>
  );
}