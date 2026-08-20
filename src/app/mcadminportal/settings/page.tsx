"use client";

import { useEffect, useState } from "react";
import { fetchSettings, updateSettings } from "@/lib/api";

interface GeneralSettings {
  church_name?: string;
  church_address?: string;
  church_phone?: string;
  church_email?: string;
  facebook_url?: string;
  twitter_url?: string;
  instagram_url?: string;
  youtube_url?: string;
  service_times?: string;
  [key: string]: any;
}

export default function AdminSettings() {
  const [settings, setSettings] = useState<GeneralSettings>({
    church_name: "",
    church_address: "",
    church_phone: "",
    church_email: "",
    facebook_url: "",
    twitter_url: "",
    instagram_url: "",
    youtube_url: "",
    service_times: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const data = await fetchSettings();
        if (data) {
          setSettings(prev => ({ ...prev, ...data }));
        }
      } catch (err) {
        console.error(err);
      }
    };
    loadSettings();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccess("");
    setError("");

    try {
      await updateSettings(settings as Record<string, string>);
      setSuccess("Settings updated successfully!");
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(""), 3000);
    } catch (err: any) {
      setError(err.message || "Failed to update settings");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-12">
      <h1 className="text-3xl font-bold text-gray-900">Site Settings</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && <div className="text-red-700 bg-red-100 border border-red-400 p-4 rounded-lg">{error}</div>}
        {success && <div className="text-green-700 bg-green-100 border border-green-400 p-4 rounded-lg">{success}</div>}

        {/* Basic Info Section */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <h2 className="text-xl font-bold mb-6 text-gray-800">Basic Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Church Name</label>
              <input
                type="text"
                name="church_name"
                value={settings.church_name || ""}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                placeholder="Merciful Centre"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                name="church_email"
                value={settings.church_email || ""}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                placeholder="hello@mercifulcentre.org"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <input
                type="text"
                name="church_phone"
                value={settings.church_phone || ""}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                placeholder="+1 234 567 8900"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Physical Address</label>
              <input
                type="text"
                name="church_address"
                value={settings.church_address || ""}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                placeholder="123 Church Street, City, State"
              />
            </div>
          </div>
        </div>

        {/* Service Times Section */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <h2 className="text-xl font-bold mb-6 text-gray-800">Service Times</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Schedule (Displayed in Footer)</label>
            <textarea
              name="service_times"
              value={settings.service_times || ""}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
              placeholder="Sunday Service: 10:00 AM&#10;Wednesday Bible Study: 7:00 PM"
            />
            <p className="mt-2 text-sm text-gray-500">Each new line will be displayed on a new line in the footer.</p>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <h2 className="text-xl font-bold mb-6 text-gray-800">Social Media Links</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Facebook URL</label>
              <input
                type="url"
                name="facebook_url"
                value={settings.facebook_url || ""}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                placeholder="https://facebook.com/..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Instagram URL</label>
              <input
                type="url"
                name="instagram_url"
                value={settings.instagram_url || ""}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                placeholder="https://instagram.com/..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">YouTube URL</label>
              <input
                type="url"
                name="youtube_url"
                value={settings.youtube_url || ""}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                placeholder="https://youtube.com/..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Twitter/X URL</label>
              <input
                type="url"
                name="twitter_url"
                value={settings.twitter_url || ""}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                placeholder="https://twitter.com/..."
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 transition-colors"
          >
            {isSubmitting ? "Saving..." : "Save Settings"}
          </button>
        </div>
      </form>
    </div>
  );
}
