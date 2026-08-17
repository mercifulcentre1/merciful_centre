"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import AdminGuard from "@/components/admin/AdminGuard";
import { 
  LayoutDashboard, 
  Video, 
  Calendar, 
  Image as ImageIcon, 
  Users, 
  Settings, 
  LogOut,
  Bell,
  Search,
  Menu,
  Radio
} from "lucide-react";
import { useState } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (pathname === "/mcadminportal/login") {
    return <AdminGuard>{children}</AdminGuard>;
  }

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    router.push("/mcadminportal/login");
  };

  const navItems = [
    { name: "Overview", href: "/mcadminportal", icon: LayoutDashboard },
    { name: "Live Stream", href: "/mcadminportal/livestream", icon: Radio },
    { name: "Sermons", href: "/mcadminportal/sermons", icon: Video },
    { name: "Events", href: "/mcadminportal/events", icon: Calendar },
    { name: "Gallery", href: "/mcadminportal/gallery", icon: ImageIcon },
    { name: "Users", href: "/mcadminportal/users", icon: Users },
  ];

  const getPageTitle = () => {
    if (pathname === "/mcadminportal") return "Dashboard Overview";
    const match = navItems.find(item => item.href !== "/mcadminportal" && pathname.startsWith(item.href));
    if (match) return match.name;
    if (pathname.includes("settings")) return "Settings";
    return "Admin Portal";
  };

  return (
    <AdminGuard>
      <div className="min-h-screen bg-slate-50 text-slate-900 flex font-sans">
        
        {/* Sidebar (Desktop) */}
        <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col fixed inset-y-0 z-30">
          <div className="h-16 flex items-center px-6 border-b border-slate-100">
            <img src="/MC_Logo_purple.png" alt="Merciful Centre" className="w-8 h-8 object-contain mr-3" />
            <h2 className="text-lg font-bold text-slate-800 tracking-tight">
              Merciful Centre
            </h2>
          </div>

          <div className="p-4">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 px-2">Menu</p>
            <nav className="space-y-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href || (item.href !== "/mcadminportal" && pathname.startsWith(`${item.href}/`)) || (item.href !== "/mcadminportal" && pathname === item.href);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 font-medium text-sm ${
                      isActive
                        ? "bg-indigo-50 text-indigo-700 shadow-sm ring-1 ring-indigo-100/50"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? "text-indigo-600" : "text-slate-400"}`} />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="mt-auto p-4 border-t border-slate-100">
            <nav className="space-y-1">
              <Link
                href="/mcadminportal/settings"
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 font-medium text-sm ${
                  pathname.includes("settings")
                    ? "bg-indigo-50 text-indigo-700 shadow-sm ring-1 ring-indigo-100/50"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <Settings className={`w-5 h-5 ${pathname.includes("settings") ? "text-indigo-600" : "text-slate-400"}`} />
                Settings
              </Link>
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-3 px-3 py-2.5 text-red-600 hover:bg-red-50 hover:text-red-700 rounded-xl transition-colors font-medium text-sm"
              >
                <LogOut className="w-5 h-5 text-red-500" />
                Logout
              </button>
            </nav>
            <div className="mt-6 pt-4 border-t border-slate-100 px-3">
              <Link href="/" className="text-xs font-medium text-indigo-600 hover:text-indigo-700 transition-colors flex items-center gap-1">
                &larr; Back to Website
              </Link>
            </div>
          </div>
        </aside>

        {/* Mobile Sidebar Overlay */}
        {isMobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-slate-900/50 z-40 md:hidden backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Mobile Sidebar */}
        <aside className={`fixed inset-y-0 left-0 w-64 bg-white shadow-2xl z-50 transform transition-transform duration-300 md:hidden flex flex-col ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
           {/* Same content as desktop sidebar, duplicated for simplicity in this example or extracted to component */}
           <div className="h-16 flex items-center px-6 border-b border-slate-100">
            <img src="/MC_Logo_purple.png" alt="Merciful Centre" className="w-8 h-8 object-contain mr-3" />
            <h2 className="text-lg font-bold text-slate-800 tracking-tight">Admin</h2>
          </div>
          <div className="p-4 flex-1">
            <nav className="space-y-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href || (item.href !== "/mcadminportal" && pathname.startsWith(item.href));
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 font-medium text-sm ${
                      isActive ? "bg-indigo-50 text-indigo-700" : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? "text-indigo-600" : "text-slate-400"}`} />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-h-screen md:ml-64">
          
          {/* Top Header */}
          <header className="h-16 bg-slate-50 border-b border-slate-200 sticky top-0 z-20 px-4 sm:px-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsMobileMenuOpen(true)}
                className="md:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-lg"
              >
                <Menu className="w-5 h-5" />
              </button>
              <h1 className="text-xl font-bold text-slate-800 hidden sm:block">
                {getPageTitle()}
              </h1>
            </div>

            <div className="flex items-center gap-3 sm:gap-6">
              <div className="relative hidden md:block">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input 
                  type="text" 
                  placeholder="Quick search..." 
                  className="pl-9 pr-4 py-2 bg-slate-100/50 border border-transparent rounded-full text-sm focus:bg-white focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 outline-none transition-all w-64"
                />
              </div>
              <button className="relative p-2 text-slate-400 hover:bg-slate-100 rounded-full transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 border-2 border-white rounded-full"></span>
              </button>
              <div className="h-8 w-px bg-slate-200 hidden sm:block"></div>
              <div className="flex items-center gap-3 cursor-pointer p-1 rounded-full hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-200 pr-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 text-white flex items-center justify-center font-bold text-sm shadow-sm ring-2 ring-white">
                  A
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-slate-700 leading-none">Admin</p>
                  <p className="text-xs text-slate-500 mt-0.5">super_admin</p>
                </div>
              </div>
            </div>
          </header>
          
          <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
            <div className="max-w-7xl mx-auto w-full">
              {children}
            </div>
          </main>
          
        </div>
      </div>
    </AdminGuard>
  );
}
