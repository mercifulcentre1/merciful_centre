"use client";

import { useEffect, useState } from "react";
import { fetchEvents, events, getStorageUrl } from "@/lib/api";
import { Plus, Trash2, Edit2, Calendar, MapPin, Clock, X, Search, MoreVertical } from "lucide-react";

export default function AdminEvents() {
  const [eventsList, setEventsList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSlideOverOpen, setIsSlideOverOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<any | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    event_date: "",
    time: "",
    location: "",
    description: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  const loadEvents = async () => {
    try {
      const data = await fetchEvents();
      setEventsList(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = new FormData();
      Object.keys(formData).forEach(key => data.append(key, (formData as any)[key]));
      
      if (imageFile) {
        data.append("image_file", imageFile);
      }

      if (editingEvent) {
        data.append("_method", "PUT");
        await events.update(editingEvent.id, data);
      } else {
        await events.create(data);
      }
      setIsSlideOverOpen(false);
      loadEvents();
    } catch (err: any) {
      alert(err.message || "Failed to save event");
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    try {
      await events.delete(id);
      loadEvents();
    } catch (err: any) {
      alert("Failed to delete event");
    }
  };

  const openSlideOver = (event?: any) => {
    if (event) {
      setEditingEvent(event);
      setFormData({
        title: event.title,
        event_date: event.event_date.split('T')[0],
        time: event.time || "",
        location: event.location || "",
        description: event.description || "",
      });
    } else {
      setEditingEvent(null);
      setFormData({
        title: "",
        event_date: "",
        time: "",
        location: "",
        description: "",
      });
    }
    setImageFile(null);
    setIsSlideOverOpen(true);
  };


  const filteredEvents = eventsList.filter(e => e.title.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="space-y-6">
      
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search events..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
          />
        </div>
        <button
          onClick={() => openSlideOver()}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl transition-all shadow-sm shadow-indigo-200 font-medium text-sm w-full sm:w-auto justify-center"
        >
          <Plus size={18} /> New Event
        </button>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {isLoading ? (
          [1,2,3].map(i => (
            <div key={i} className="bg-white rounded-xl border border-slate-200 h-80 animate-pulse"></div>
          ))
        ) : filteredEvents.length === 0 ? (
          <div className="col-span-full py-12 text-center text-slate-500 bg-white rounded-xl border border-slate-200 border-dashed">
            <Calendar className="w-12 h-12 mx-auto text-slate-300 mb-3" />
            <p>No events found.</p>
          </div>
        ) : (
          filteredEvents.map((event) => (
            <div key={event.id} className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-sm transition-all group flex flex-col">
              <div className="h-48 bg-slate-100 relative overflow-hidden">
                {event.image_url ? (
                  <img 
                    src={getStorageUrl(event.image_url)} 
                    alt={event.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-full bg-indigo-50">
                    <Calendar className="w-12 h-12 text-indigo-200" />
                  </div>
                )}
                
                {/* Date Badge */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-lg shadow-sm text-center min-w-[3.5rem]">
                  <p className="text-xs font-bold text-slate-500 uppercase leading-none">{new Date(event.event_date).toLocaleString('default', { month: 'short' })}</p>
                  <p className="text-lg font-black text-indigo-600 leading-none mt-1">{new Date(event.event_date).getDate()}</p>
                </div>

                {/* Hover Actions */}
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0">
                  <button onClick={() => openSlideOver(event)} className="p-2 bg-white/90 backdrop-blur-md text-slate-700 rounded-full hover:bg-indigo-50 hover:text-indigo-600 shadow-sm transition-colors">
                    <Edit2 size={16} />
                  </button>
                  <button onClick={() => handleDelete(event.id)} className="p-2 bg-white/90 backdrop-blur-md text-slate-700 rounded-full hover:bg-red-50 hover:text-red-600 shadow-sm transition-colors">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col">
                <h3 className="font-bold text-slate-800 text-lg mb-2 line-clamp-1">{event.title}</h3>
                <div className="space-y-2 mb-4">
                  {event.time && (
                    <div className="flex items-center text-sm text-slate-500 gap-2">
                      <Clock className="w-4 h-4 text-slate-400" />
                      {event.time}
                    </div>
                  )}
                  {event.location && (
                    <div className="flex items-center text-sm text-slate-500 gap-2">
                      <MapPin className="w-4 h-4 text-slate-400" />
                      <span className="line-clamp-1">{event.location}</span>
                    </div>
                  )}
                </div>
                <p className="text-sm text-slate-600 line-clamp-2 mt-auto">{event.description}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Slide-over Panel */}
      {isSlideOverOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" onClick={() => setIsSlideOverOpen(false)} />
          
          <div className="fixed inset-y-0 right-0 max-w-md w-full flex">
            <div className="w-full bg-white shadow-2xl flex flex-col h-full transform transition-transform animate-slide-in-right">
              
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                <h2 className="text-lg font-bold text-slate-800">
                  {editingEvent ? "Edit Event" : "Add New Event"}
                </h2>
                <button onClick={() => setIsSlideOverOpen(false)} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                <form id="event-form" onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Event Title</label>
                    <input
                      required
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all shadow-sm"
                      placeholder="e.g. Sunday Service"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">Date</label>
                      <input
                        type="date"
                        required
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all shadow-sm"
                        value={formData.event_date}
                        onChange={(e) => setFormData({ ...formData, event_date: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">Time</label>
                      <input
                        type="time"
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all shadow-sm"
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Location</label>
                    <input
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all shadow-sm"
                      placeholder="e.g. Main Auditorium"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Description</label>
                    <textarea
                      required
                      rows={5}
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all shadow-sm resize-none"
                      placeholder="Tell us more about this event..."
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Promotional Banner</label>
                    <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center hover:bg-slate-50 transition-colors">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                        className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer"
                      />
                    </div>
                    {editingEvent && editingEvent.image_url && <p className="text-xs text-slate-500 mt-2 ml-1">Leave blank to keep the current image.</p>}
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
                  form="event-form"
                  className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-colors shadow-sm shadow-indigo-200"
                >
                  Save Event
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
