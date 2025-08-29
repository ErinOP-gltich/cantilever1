
import React, { useState } from "react";
import { Send, Mail, User, MessageSquare } from "lucide-react";

const Contact: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thanks for reaching out! (demo)\nWe'll get back to you at " + email + ".");
    setName(""); setEmail(""); setMessage("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-2xl mx-auto px-4 py-16">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center gap-3 mb-6">
            <Send className="w-6 h-6" />
            <h1 className="text-2xl font-semibold">Contact us</h1>
          </div>
          <p className="text-slate-600 mb-6">Send us a message and we’ll respond as soon as possible.</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block">
              <span className="text-sm">Name</span>
              <div className="mt-1 flex items-center gap-2 border rounded-xl px-3 py-2">
                <User className="w-4 h-4" />
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full outline-none"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </label>
            <label className="block">
              <span className="text-sm">Email</span>
              <div className="mt-1 flex items-center gap-2 border rounded-xl px-3 py-2">
                <Mail className="w-4 h-4" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </label>
            <label className="block">
              <span className="text-sm">Message</span>
              <div className="mt-1 flex items-start gap-2 border rounded-xl px-3 py-2">
                <MessageSquare className="w-4 h-4 mt-2" />
                <textarea
                  placeholder="How can we help?"
                  className="w-full outline-none resize-y min-h-[120px]"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
              </div>
            </label>
            <button
              type="submit"
              className="w-full bg-black text-white rounded-xl py-2.5 hover:opacity-90"
            >
              Send message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
