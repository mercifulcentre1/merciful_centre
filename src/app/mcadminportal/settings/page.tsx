"use client";

import { useEffect, useState } from "react";
import { fetchLivestreamSettings, apiCall } from "@/lib/api";
import { LivestreamSettings } from "@/types";

export default function AdminSettings() {
  const [settings, setSettings] = useState<LivestreamSettings>({
    platform: "youtube",
    channel_url: "",
    is_live: false,
    stream_title: "",
    stream_description: "",
    next_service_date: "",
    next_service_title: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const data = await fetchLivestreamSettings();
        if (data) setSettings(data as any);
      } catch (err) {
        console.error(err);
      }
    };
    loadSettings();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccess("");
    setError("");

    try {
      await apiCall("/livestream/settings", {
        method: "POST",
        body: settings,
        requiresAuth: true
      });
      setSuccess("Settings updated successfully!");
    } catch (err: any) {
      setError(err.message || "Failed to update settings");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold">Site Settings</h1>

      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h2 className="text-xl font-bold mb-6">General Configuration</h2>
        
        {error && <div className="text-red-400 mb-4 bg-red-900/20 p-3 rounded">{error}</div>}
        {success && <div className="text-green-400 mb-4 bg-green-900/20 p-3 rounded">{success}</div>}

          {/* Settings will go here */}
          <div className="text-gray-500 text-sm">
            General site settings can be configured here. Livestream management has moved to the Live Stream tab.
          </div>
          
      </div>
    </div>
  );
}
