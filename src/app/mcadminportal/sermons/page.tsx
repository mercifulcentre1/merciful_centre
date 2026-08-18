"use client";

import { useEffect, useState } from "react";
import { fetchSermons, sermons, getStorageUrl } from "@/lib/api";
import { Plus, Trash2, Edit2, Video, Search, X, Mic, Headphones } from "lucide-react";

export default function AdminSermons() {
  const [sermonsList, setSermonsList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSlideOverOpen, setIsSlideOverOpen] = useState(false);
  const [editingSermon, setEditingSermon] = useState<any | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    preacher: "",
    date: "",
    description: "",
  });
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);

  const loadSermons = async () => {
    try {
      const data = await fetchSermons();
      setSermonsList(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadSermons();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = new FormData();
      Object.keys(formData).forEach(key => data.append(key, (formData as any)[key]));
      
      if (thumbnailFile) data.append("thumbnail_file", thumbnailFile);
      if (audioFile) data.append("audio_file", audioFile);

      if (editingSermon) {
        data.append("_method", "PUT");
        await sermons.update(editingSermon.id, data);
      } else {
        await sermons.create(data);
      }
      setIsSlideOverOpen(false);
      loadSermons();
    } catch (err: any) {
      alert(err.message || "Failed to save sermon");
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this sermon?")) return;
    try {
      await sermons.delete(id);
      loadSermons();
    } catch (err: any) {
      alert("Failed to delete sermon");
    }
  };

  const openSlideOver = (sermon?: any) => {
    if (sermon) {
      setEditingSermon(sermon);
      setFormData({
        title: sermon.title,
        preacher: sermon.preacher,
        date: sermon.date.split('T')[0],
        description: sermon.description || "",
      });
    } else {
      setEditingSermon(null);
      setFormData({
        title: "",
        preacher: "",
        date: "",
        description: "",
      });
    }
    setThumbnailFile(null);
    setAudioFile(null);
    setIsSlideOverOpen(true);
  };


  const filteredSermons = sermonsList.filter(s => 
    s.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.preacher.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by title or preacher..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
          />
        </div>
        <button
          onClick={() => openSlideOver()}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl transition-all shadow-sm shadow-indigo-200 font-medium text-sm w-full sm:w-auto justify-center"
        >
          <Plus size={18} /> Upload Sermon
        </button>
      </div>

      {/* Sermons List View */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-sm font-semibold">
                <th className="px-6 py-4">Sermon Details</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Media</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center">
                    <div className="flex flex-col items-center gap-2 text-slate-400">
                      <Video className="w-8 h-8 animate-pulse text-slate-300" />
                      <span className="text-sm">Loading sermons...</span>
                    </div>
                  </td>
                </tr>
              ) : filteredSermons.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-slate-500 border-dashed">
                    <Video className="w-10 h-10 mx-auto text-slate-300 mb-3" />
                    <p>No sermons found.</p>
                  </td>
                </tr>
              ) : (
                filteredSermons.map((sermon) => (
                  <tr key={sermon.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-12 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0 border border-slate-200">
                          {sermon.thumbnail_url ? (
                            <img src={getStorageUrl(sermon.thumbnail_url)} alt={sermon.title} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-indigo-50">
                              <Video className="w-5 h-5 text-indigo-300" />
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-slate-800 line-clamp-1">{sermon.title}</p>
                          <div className="flex items-center gap-1.5 text-sm text-slate-500 mt-0.5">
                            <Mic className="w-3.5 h-3.5" />
                            <span>{sermon.preacher}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 font-medium">
                      {new Date(sermon.date).toLocaleDateString('default', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                    <td className="px-6 py-4">
                      {sermon.audio_url ? (
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-100">
                          <Headphones className="w-3 h-3" /> Audio Attached
                        </div>
                      ) : (
                        <span className="text-xs text-slate-400 font-medium">No audio</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => openSlideOver(sermon)} className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                          <Edit2 size={18} />
                        </button>
                        <button onClick={() => handleDelete(sermon.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Slide-over Panel for Forms */}
      {isSlideOverOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" onClick={() => setIsSlideOverOpen(false)} />
          
          <div className="fixed inset-y-0 right-0 max-w-md w-full flex">
            <div className="w-full bg-white shadow-2xl flex flex-col h-full transform transition-transform animate-slide-in-right">
              
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                <h2 className="text-lg font-bold text-slate-800">
                  {editingSermon ? "Edit Sermon" : "Upload New Sermon"}
                </h2>
                <button onClick={() => setIsSlideOverOpen(false)} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                <form id="sermon-form" onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Sermon Title</label>
                    <input
                      required
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all shadow-sm"
                      placeholder="e.g. Walking in Faith"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">Preacher</label>
                      <input
                        required
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all shadow-sm"
                        placeholder="e.g. Pastor John"
                        value={formData.preacher}
                        onChange={(e) => setFormData({ ...formData, preacher: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">Date</label>
                      <input
                        type="date"
                        required
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all shadow-sm"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Description/Notes</label>
                    <textarea
                      required
                      rows={4}
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all shadow-sm resize-none"
                      placeholder="Summary of the message..."
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                  </div>

                  <div className="space-y-4 pt-2">
                    <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                      <label className="block text-sm font-semibold text-slate-700 mb-1">Thumbnail Image</label>
                      <p className="text-xs text-slate-500 mb-3">Cover image for the sermon video player.</p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setThumbnailFile(e.target.files?.[0] || null)}
                        className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-white file:border file:border-slate-200 file:text-slate-700 hover:file:bg-slate-100 cursor-pointer"
                      />
                    </div>

                    <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                      <label className="block text-sm font-semibold text-slate-700 mb-1">Audio Recording</label>
                      <p className="text-xs text-slate-500 mb-3">Upload the MP3 file of the sermon.</p>
                      <input
                        type="file"
                        accept="audio/*"
                        onChange={(e) => setAudioFile(e.target.files?.[0] || null)}
                        className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-white file:border file:border-slate-200 file:text-slate-700 hover:file:bg-slate-100 cursor-pointer"
                      />
                    </div>
                  </div>
                </form>
              </div>

              <div className="p-4 border-t border-slate-100 bg-white grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setIsSlideOverOpen(false)}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  form="sermon-form"
                  className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-colors shadow-sm shadow-indigo-200"
                >
                  Save Sermon
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
