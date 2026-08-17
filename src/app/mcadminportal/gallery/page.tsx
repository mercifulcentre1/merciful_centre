"use client";

import { useState, useEffect } from "react";
import { gallery } from "@/lib/api";
import { Plus, Trash2, Edit2, Image as ImageIcon, Search, X, FolderHeart } from "lucide-react";

export default function GalleryPage() {
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSlideOverOpen, setIsSlideOverOpen] = useState(false);
  const [editingImage, setEditingImage] = useState<any | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Events",
  });
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    loadGallery();
  }, []);

  const loadGallery = async () => {
    try {
      const data = await gallery.getAll();
      setImages(data.gallery);
    } catch (error) {
      console.error("Failed to load gallery:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("category", formData.category);
      if (file) {
        data.append("image_file", file);
      }

      if (editingImage) {
        data.append("_method", "PUT");
        await gallery.update(editingImage.id, data);
      } else {
        await gallery.create(data);
      }
      setIsSlideOverOpen(false);
      loadGallery();
    } catch (error) {
      console.error("Failed to save gallery item:", error);
      alert("Error saving item.");
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this image?")) {
      await gallery.delete(id);
      loadGallery();
    }
  };

  const openSlideOver = (item?: any) => {
    if (item) {
      setEditingImage(item);
      setFormData({
        title: item.title,
        description: item.description || "",
        category: item.category || "Events",
      });
      setFile(null);
    } else {
      setEditingImage(null);
      setFormData({
        title: "",
        description: "",
        category: "Events",
      });
      setFile(null);
    }
    setIsSlideOverOpen(true);
  };

  const getImageUrl = (url: string) => {
    if (url.startsWith("http")) return url;
    const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace("/api", "") || "http://localhost:8080";
    return `${baseUrl}/${url}`;
  };

  const categories = ["All", "Events", "Worship", "Community", "Youth", "Other"];

  const filteredImages = images.filter(img => {
    const matchesSearch = img.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "All" || img.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      
      {/* Top Action Bar */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        
        {/* Categories Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                activeCategory === cat 
                  ? "bg-indigo-600 text-white shadow-sm shadow-indigo-200" 
                  : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full xl:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search images..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
            />
          </div>
          <button
            onClick={() => openSlideOver()}
            className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl transition-all shadow-sm shadow-indigo-200 font-medium text-sm w-full sm:w-auto shrink-0"
          >
            <Plus size={18} /> Upload Photo
          </button>
        </div>
      </div>

      {/* Gallery Grid (Masonry style approx) */}
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
        {loading ? (
          [1,2,3,4,5,6].map(i => (
            <div key={i} className={`bg-white rounded-xl border border-slate-200 animate-pulse break-inside-avoid ${i%2 === 0 ? 'h-64' : 'h-80'}`}></div>
          ))
        ) : filteredImages.length === 0 ? (
          <div className="col-span-full py-12 text-center text-slate-500 bg-white rounded-xl border border-slate-200 border-dashed break-inside-avoid">
            <ImageIcon className="w-12 h-12 mx-auto text-slate-300 mb-3" />
            <p>No photos found.</p>
          </div>
        ) : (
          filteredImages.map((item) => (
            <div key={item.id} className="relative group rounded-xl overflow-hidden border border-slate-200 shadow-sm break-inside-avoid bg-white">
              
              {item.image_url ? (
                <img 
                  src={getImageUrl(item.image_url)} 
                  alt={item.title} 
                  className="w-full object-cover"
                />
              ) : (
                <div className="w-full h-48 bg-slate-100 flex items-center justify-center">
                  <ImageIcon className="w-10 h-10 text-slate-300" />
                </div>
              )}
              
              {/* Overlay Content */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-5">
                
                {/* Top Actions */}
                <div className="flex justify-between items-start translate-y-[-10px] group-hover:translate-y-0 transition-transform duration-300">
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-lg text-xs font-semibold text-white border border-white/30 shadow-sm flex items-center gap-1.5">
                    <FolderHeart className="w-3 h-3" /> {item.category}
                  </span>
                  
                  <div className="flex gap-2">
                    <button onClick={() => openSlideOver(item)} className="p-2 bg-white/20 backdrop-blur-md text-white rounded-full hover:bg-indigo-500 border border-white/30 transition-colors shadow-sm">
                      <Edit2 size={14} />
                    </button>
                    <button onClick={() => handleDelete(item.id)} className="p-2 bg-white/20 backdrop-blur-md text-white rounded-full hover:bg-red-500 border border-white/30 transition-colors shadow-sm">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                {/* Bottom Details */}
                <div className="translate-y-[10px] group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="font-bold text-white text-lg leading-tight mb-1">{item.title}</h3>
                  <p className="text-sm text-slate-300 line-clamp-2">{item.description}</p>
                </div>

              </div>
            </div>
          ))
        )}
      </div>

      {/* Slide-over Panel for Forms */}
      {isSlideOverOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" onClick={() => setIsSlideOverOpen(false)} />
          
          <div className="fixed inset-y-0 right-0 max-w-md w-full flex">
            <div className="w-full bg-white shadow-2xl flex flex-col h-full transform transition-transform animate-slide-in-right">
              
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                <h2 className="text-lg font-bold text-slate-800">
                  {editingImage ? "Edit Photo Details" : "Upload New Photo"}
                </h2>
                <button onClick={() => setIsSlideOverOpen(false)} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                <form id="gallery-form" onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Photo Title</label>
                    <input
                      required
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all shadow-sm"
                      placeholder="e.g. Sunday Worship Service"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Category</label>
                    <select
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all shadow-sm appearance-none"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    >
                      <option value="Events">Events</option>
                      <option value="Worship">Worship</option>
                      <option value="Community">Community</option>
                      <option value="Youth">Youth</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Description (Optional)</label>
                    <textarea
                      rows={4}
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all shadow-sm resize-none"
                      placeholder="Add some context to this photo..."
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Upload Image</label>
                    <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center hover:bg-slate-50 transition-colors">
                      <input
                        type="file"
                        accept="image/*"
                        required={!editingImage}
                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                        className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer"
                      />
                    </div>
                    {editingImage && <p className="text-xs text-slate-500 mt-2 ml-1">Leave blank to keep the current image.</p>}
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
                  form="gallery-form"
                  className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-colors shadow-sm shadow-indigo-200"
                >
                  Save Photo
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
