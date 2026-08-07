"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import {
  LayoutDashboard,
  MessageSquare,
  Upload,
  BarChart3,
  LogOut,
} from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white flex flex-col shadow-2xl">

      {/* Logo */}
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-3xl font-bold tracking-wide">
  LOOP AI
</h1>

        <p className="text-slate-400 text-sm mt-1">
          Customer Intelligence
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">

        <Link
          href="/dashboard"
          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-700 transition-all duration-200 hover:translate-x-1"
        >
          <LayoutDashboard size={20} />
          Dashboard
        </Link>

        <Link
          href="/dashboard/customer-feedback"
          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-700 transition-all duration-200 hover:translate-x-1"
        >
          <MessageSquare size={20} />
          Feedback
        </Link>

        <Link
          href="/dashboard/feedback"
          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-700 transition-all duration-200 hover:translate-x-1"
        >
          <MessageSquare size={20} />
          Manage Feedback
        </Link>

        <Link
          href="/import"
          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-700 transition-all duration-200 hover:translate-x-1"
        >
          <Upload size={20} />
          Import CSV
        </Link>

        <Link
          href="/reports"
          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-700 transition-all duration-200 hover:translate-x-1"
        >
          <BarChart3 size={20} />
          Reports
        </Link>

      

      {/* Logout */}
      
        <button
          onClick={() => signOut({ callbackUrl: "https://loop-ai-customer-feedback-beta.vercel.app" })}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-600 hover:text-white transition-all duration-200"
        >
          <LogOut size={20} />
          Logout
        </button>
      </nav>

      {/* Footer */}
      <div className="border-t border-slate-700 p-5 text-center">
        <p className="text-sm text-slate-400">
          Powered by Groq AI
        </p>
      </div>

    </aside>
  );
}