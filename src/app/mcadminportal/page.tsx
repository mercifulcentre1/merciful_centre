"use client";

import { useEffect, useState } from "react";
import { fetchSermons, fetchEvents, users, gallery } from "@/lib/api";
import { Video, Calendar, Users, Image as ImageIcon, Plus, ArrowUpRight, Activity } from "lucide-react";
import Link from "next/link";

export default function DashboardOverview() {
  const [stats, setStats] = useState({
    sermonsCount: 0,
    eventsCount: 0,
    usersCount: 0,
    galleryCount: 0,
  });
  const [activities, setActivities] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const [sermonsData, eventsData, usersData, galleryData] = await Promise.all([
          fetchSermons().catch(() => []),
          fetchEvents().catch(() => []),
          users.getAll().catch(() => ({ users: [] })),
          gallery.getAll().catch(() => ({ gallery: [] }))
        ]);
        
        setStats({
          sermonsCount: sermonsData.length || 0,
          eventsCount: eventsData.length || 0,
          usersCount: usersData.users?.length || 0,
          galleryCount: galleryData.gallery?.length || 0,
        });

        // Compute recent activities
        const recent = [
          ...sermonsData.map((s: any) => ({ type: 'sermon', title: 'New sermon uploaded', desc: `"${s.title}" was added.`, date: new Date(s.created_at || s.date || Date.now()) })),
          ...eventsData.map((e: any) => ({ type: 'event', title: 'New event scheduled', desc: `"${e.title}" was added.`, date: new Date(e.created_at || e.event_date || Date.now()) })),
          ...(galleryData.gallery || []).map((g: any) => ({ type: 'gallery', title: 'Gallery updated', desc: `"${g.title}" was added.`, date: new Date(g.created_at || Date.now()) })),
          ...(usersData.users || []).map((u: any) => ({ type: 'user', title: 'Admin user added', desc: `"${u.full_name || u.username}" was granted access.`, date: new Date(u.created_at || Date.now()) }))
        ];

        recent.sort((a, b) => b.date.getTime() - a.date.getTime());
        setActivities(recent.slice(0, 5));

      } catch (error) {
        console.error("Failed to load dashboard stats", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadStats();
  }, []);

  const statCards = [
    { title: "Total Sermons", value: stats.sermonsCount, icon: Video, color: "text-blue-600", bg: "bg-blue-50", link: "/mcadminportal/sermons" },
    { title: "Upcoming Events", value: stats.eventsCount, icon: Calendar, color: "text-indigo-600", bg: "bg-indigo-50", link: "/mcadminportal/events" },
    { title: "Gallery Photos", value: stats.galleryCount, icon: ImageIcon, color: "text-pink-600", bg: "bg-pink-50", link: "/mcadminportal/gallery" },
    { title: "Active Users", value: stats.usersCount, icon: Users, color: "text-emerald-600", bg: "bg-emerald-50", link: "/mcadminportal/users" },
  ];

  const quickActions = [
    { title: "New Sermon", desc: "Upload a recent sermon", icon: Video, link: "/mcadminportal/sermons" },
    { title: "Create Event", desc: "Schedule an upcoming event", icon: Calendar, link: "/mcadminportal/events" },
    { title: "Add Photos", desc: "Update the church gallery", icon: ImageIcon, link: "/mcadminportal/gallery" },
    { title: "Invite User", desc: "Add a new admin staff", icon: Users, link: "/mcadminportal/users" },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Welcome Banner */}
      <div className="bg-purple-900 rounded-xl p-8 border border-purple-800 shadow-sm relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <h2 className="text-3xl font-bold mb-3 tracking-tight text-white">Welcome back, Admin!</h2>
          <p className="text-purple-100 text-lg">
            Here's what's happening with Merciful Centre today. Manage your sermons, keep your congregation updated with events, and maintain the community gallery.
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-sm transition-shadow group relative overflow-hidden">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl ${stat.bg} ${stat.color} ring-1 ring-inset ring-slate-100`}>
                  <Icon className="w-6 h-6" />
                </div>
                <Link href={stat.link} className="p-2 text-slate-300 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                  <ArrowUpRight className="w-5 h-5" />
                </Link>
              </div>
              <h3 className="text-slate-500 font-medium text-sm mb-1">{stat.title}</h3>
              <p className="text-3xl font-bold text-slate-800">
                {isLoading ? (
                  <span className="inline-block w-16 h-8 bg-slate-100 rounded animate-pulse"></span>
                ) : (
                  String(stat.value || 0)
                )}
              </p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <Activity className="w-5 h-5 text-indigo-600" />
              Recent Activity
            </h3>
            <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700">View All</button>
          </div>
          
          <div className="space-y-6">
            {isLoading ? (
              <div className="space-y-4">
                {[1,2,3].map(i => (
                  <div key={i} className="flex gap-4 animate-pulse">
                    <div className="w-10 h-10 bg-slate-100 rounded-full"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-slate-100 rounded w-1/4"></div>
                      <div className="h-3 bg-slate-100 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : activities.length === 0 ? (
              <div className="text-slate-500 text-sm">No recent activities found.</div>
            ) : (
              <div className="space-y-6">
                {activities.map((activity, index) => {
                  let Icon = Activity;
                  let colors = "bg-slate-50 text-slate-600 ring-slate-100";
                  if (activity.type === 'sermon') {
                    Icon = Video;
                    colors = "bg-blue-50 text-blue-600 ring-blue-100";
                  } else if (activity.type === 'event') {
                    Icon = Calendar;
                    colors = "bg-indigo-50 text-indigo-600 ring-indigo-100";
                  } else if (activity.type === 'gallery') {
                    Icon = ImageIcon;
                    colors = "bg-pink-50 text-pink-600 ring-pink-100";
                  } else if (activity.type === 'user') {
                    Icon = Users;
                    colors = "bg-emerald-50 text-emerald-600 ring-emerald-100";
                  }

                  return (
                    <div key={index} className="flex gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ring-1 ${colors}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-800">{activity.title}</p>
                        <p className="text-sm text-slate-500">{activity.desc}</p>
                        <p className="text-xs text-slate-400 mt-1">{activity.date.toLocaleDateString()}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Quick Actions</h3>
          <div className="space-y-3">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Link 
                  href={action.link} 
                  key={index}
                  className="flex items-center p-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all group"
                >
                  <div className="w-10 h-10 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center group-hover:bg-white group-hover:text-indigo-600 group-hover:shadow-sm transition-all mr-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-800 group-hover:text-indigo-600 transition-colors">{action.title}</p>
                    <p className="text-xs text-slate-500">{action.desc}</p>
                  </div>
                  <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                    <Plus className="w-4 h-4 text-indigo-600" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
