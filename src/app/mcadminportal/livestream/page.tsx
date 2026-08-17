"use client";

import { useEffect, useState } from "react";
import { fetchLivestreamSettings, apiCall } from "@/lib/api";
import { LivestreamSettings, LivestreamArchive } from "@/types";
import { Video, Trash2, Plus, Calendar, Settings } from "lucide-react";

export default function AdminLivestream() {
  const [activeTab, setActiveTab] = useState<"settings" | "archives">("settings");

  // Settings State
  const [settings, setSettings] = useState<LivestreamSettings>({
    platform: "youtube",
    channel_url: "",
    is_live: false,
    stream_title: "",
    stream_description: "",
    next_service_date: "",
    next_service_title: "",
  });
  const [isSubmittingSettings, setIsSubmittingSettings] = useState(false);
  const [settingsSuccess, setSettingsSuccess] = useState("");
  const [settingsError, setSettingsError] = useState("");

  // Archives State
  const [archives, setArchives] = useState<LivestreamArchive[]>([]);
  const [isLoadingArchives, setIsLoadingArchives] = useState(true);
  const [isAddingArchive, setIsAddingArchive] = useState(false);
  const [newArchive, setNewArchive] = useState({
    title: "",
    platform: "youtube",
    video_id: "",
    thumbnail_url: "",
    stream_date: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data = await fetchLivestreamSettings();
      if (data) setSettings(data as any);

      const archivesRes = await apiCall("/livestream/archives");
      if (archivesRes.archives) {
        setArchives(archivesRes.archives);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoadingArchives(false);
    }
  };

  const handleSettingsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingSettings(true);
    setSettingsSuccess("");
    setSettingsError("");

    try {
      await apiCall("/livestream/settings", {
        method: "POST",
        body: settings,
        requiresAuth: true
      });
      setSettingsSuccess("Livestream configuration updated successfully!");
    } catch (err: any) {
      setSettingsError(err.message || "Failed to update settings");
    } finally {
      setIsSubmittingSettings(false);
    }
  };

  const handleArchiveSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await apiCall("/livestream/archives", {
        method: "POST",
        body: newArchive,
        requiresAuth: true
      });
      setArchives([res.archive, ...archives]);
      setIsAddingArchive(false);
      setNewArchive({
        title: "",
        platform: "youtube",
        video_id: "",
        thumbnail_url: "",
        stream_date: new Date().toISOString().split('T')[0],
      });
    } catch (err: any) {
      alert(err.message || "Failed to add archive");
    }
  };

  const handleDeleteArchive = async (id: number) => {
    if (!confirm("Are you sure you want to delete this archive?")) return;
    try {
      await apiCall(`/livestream/archives/${id}`, {
        method: "DELETE",
        requiresAuth: true
      });
      setArchives(archives.filter((a) => a.id !== id));
    } catch (err: any) {
      alert(err.message || "Failed to delete archive");
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold text-slate-800">Live Stream Management</h1>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200">
        <button
          onClick={() => setActiveTab("settings")}
          className={`px-6 py-3 font-semibold text-sm transition-all border-b-2 flex items-center gap-2 ${
            activeTab === "settings"
              ? "border-indigo-600 text-indigo-600"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <Settings className="w-4 h-4" />
          Active Stream Config
        </button>
        <button
          onClick={() => setActiveTab("archives")}
          className={`px-6 py-3 font-semibold text-sm transition-all border-b-2 flex items-center gap-2 ${
            activeTab === "archives"
              ? "border-indigo-600 text-indigo-600"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <Video className="w-4 h-4" />
          Previous Streams
        </button>
      </div>

      {activeTab === "settings" && (
        <div className="bg-white rounded-xl p-8 border border-slate-200 shadow-sm">
          <h2 className="text-xl font-bold mb-6 text-slate-800">Current Stream & Next Service</h2>
          
          {settingsError && <div className="text-red-600 mb-6 bg-red-50 p-4 rounded-xl border border-red-100">{settingsError}</div>}
          {settingsSuccess && <div className="text-emerald-600 mb-6 bg-emerald-50 p-4 rounded-xl border border-emerald-100">{settingsSuccess}</div>}

          <form onSubmit={handleSettingsSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Platform</label>
                <select
                  value={settings.platform}
                  onChange={(e) => setSettings({ ...settings, platform: e.target.value as any })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                >
                  <option value="youtube">YouTube</option>
                  <option value="facebook">Facebook</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Channel URL</label>
                <input
                  type="url"
                  required
                  value={settings.channel_url}
                  onChange={(e) => setSettings({ ...settings, channel_url: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                  placeholder="https://youtube.com/..."
                />
              </div>
            </div>

            <div className="flex items-center gap-3 bg-slate-50 p-6 rounded-xl border border-slate-200">
              <input
                type="checkbox"
                id="is_live"
                checked={settings.is_live}
                onChange={(e) => setSettings({ ...settings, is_live: e.target.checked })}
                className="w-6 h-6 rounded text-indigo-600 focus:ring-indigo-500 cursor-pointer"
              />
              <div>
                <label htmlFor="is_live" className="text-slate-800 font-bold text-base cursor-pointer">Live Stream is Active Right Now</label>
                <p className="text-slate-500 text-sm mt-1">Check this to show the video player on the public page.</p>
              </div>
            </div>

            <hr className="border-slate-100 my-8" />
            <h3 className="text-lg font-bold text-slate-800 mb-6">Page Hero Settings</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-slate-700 mb-2">Main Page Title</label>
                <input
                  type="text"
                  value={settings.stream_title || ""}
                  onChange={(e) => setSettings({ ...settings, stream_title: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                  placeholder="e.g. Join Us Live For Sunday Service"
                />
                <p className="text-slate-500 text-xs mt-1">This text appears in giant letters over the background image on the public page.</p>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-slate-700 mb-2">Page Description</label>
                <textarea
                  value={settings.stream_description || ""}
                  onChange={(e) => setSettings({ ...settings, stream_description: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all min-h-[100px]"
                  placeholder="e.g. We are so glad you are joining us online today! Share this link with your friends."
                />
              </div>
            </div>

            <hr className="border-slate-100 my-8" />
            <h3 className="text-lg font-bold text-slate-800 mb-6">Next Service Countdown</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Service Title</label>
                <input
                  type="text"
                  value={settings.next_service_title || ""}
                  onChange={(e) => setSettings({ ...settings, next_service_title: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                  placeholder="e.g. Sunday Worship Experience"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Service Date & Time</label>
                <input
                  type="datetime-local"
                  value={settings.next_service_date ? new Date(settings.next_service_date).toISOString().slice(0,16) : ""}
                  onChange={(e) => {
                    try {
                      const iso = e.target.value ? new Date(e.target.value).toISOString() : "";
                      setSettings({ ...settings, next_service_date: iso });
                    } catch (err) {
                      setSettings({ ...settings, next_service_date: "" });
                    }
                  }}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                />
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmittingSettings}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-sm shadow-indigo-200 flex items-center gap-2"
              >
                {isSubmittingSettings ? "Saving..." : "Save Configuration"}
              </button>
            </div>
          </form>
        </div>
      )}

      {activeTab === "archives" && (
        <div className="space-y-6">
          <div className="flex justify-end">
            <button
              onClick={() => setIsAddingArchive(!isAddingArchive)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-sm shadow-indigo-200 flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              {isAddingArchive ? "Cancel" : "Add Previous Stream"}
            </button>
          </div>

          {isAddingArchive && (
            <div className="bg-white rounded-xl p-8 border border-slate-200 shadow-sm animate-in slide-in-from-top-4 duration-300">
              <h3 className="text-xl font-bold mb-6 text-slate-800">Add Past Livestream</h3>
              <form onSubmit={handleArchiveSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Title</label>
                    <input
                      type="text"
                      required
                      value={newArchive.title}
                      onChange={(e) => setNewArchive({ ...newArchive, title: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                      placeholder="e.g. Walking in Faith"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Stream Date</label>
                    <input
                      type="date"
                      required
                      value={newArchive.stream_date}
                      onChange={(e) => setNewArchive({ ...newArchive, stream_date: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Platform</label>
                    <select
                      value={newArchive.platform}
                      onChange={(e) => setNewArchive({ ...newArchive, platform: e.target.value as any })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                    >
                      <option value="youtube">YouTube</option>
                      <option value="facebook">Facebook</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Video ID or Link</label>
                    <input
                      type="text"
                      required
                      value={newArchive.video_id}
                      onChange={(e) => setNewArchive({ ...newArchive, video_id: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                      placeholder="e.g. dQw4w9WgXcQ or full URL"
                    />
                  </div>
                </div>
                <div className="pt-2">
                  <button
                    type="submit"
                    className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-xl font-bold transition-all"
                  >
                    Save Archive
                  </button>
                </div>
              </form>
            </div>
          )}

          {isLoadingArchives ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-600">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
                    <tr>
                      <th className="px-6 py-4">Title</th>
                      <th className="px-6 py-4">Platform</th>
                      <th className="px-6 py-4">Date</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {archives.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="px-6 py-12 text-center text-slate-400">
                          No previous live streams found.
                        </td>
                      </tr>
                    ) : (
                      archives.map((archive) => (
                        <tr key={archive.id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-6 py-4 font-medium text-slate-800">{archive.title}</td>
                          <td className="px-6 py-4 capitalize">{archive.platform}</td>
                          <td className="px-6 py-4">
                            <span className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-slate-400" />
                              {new Date(archive.stream_date).toLocaleDateString()}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button
                              onClick={() => handleDeleteArchive(archive.id)}
                              className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
