"use client";

import { useState, useEffect } from "react";
import { users } from "@/lib/api";
import { Plus, Trash2, Edit2, Shield, User, X, Search, MoreVertical } from "lucide-react";

interface AdminUser {
  id: number;
  username: string;
  email: string;
  full_name: string;
  role: string;
  last_login: string | null;
}

export default function UsersPage() {
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSlideOverOpen, setIsSlideOverOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    full_name: "",
    role: "admin",
    password: "",
  });

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const data = await users.getAll();
      setAdminUsers(data.users);
    } catch (error) {
      console.error("Failed to load users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload: any = { ...formData };
      if (!payload.password) delete payload.password;

      if (editingUser) {
        const updateData = new FormData();
        updateData.append("_method", "PUT");
        Object.keys(payload).forEach(key => updateData.append(key, payload[key]));
        
        await users.update(editingUser.id, updateData);
      } else {
        const createData = new FormData();
        Object.keys(payload).forEach(key => createData.append(key, payload[key]));
        await users.create(createData);
      }
      setIsSlideOverOpen(false);
      loadUsers();
    } catch (error) {
      console.error("Failed to save user:", error);
      alert("Error saving user.");
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to remove this user?")) {
      try {
        await users.delete(id);
        loadUsers();
      } catch (error) {
        console.error("Failed to delete user:", error);
        alert("Cannot delete your own account or error occurred.");
      }
    }
  };

  const openSlideOver = (user?: AdminUser) => {
    if (user) {
      setEditingUser(user);
      setFormData({
        username: user.username,
        email: user.email,
        full_name: user.full_name,
        role: user.role,
        password: "",
      });
    } else {
      setEditingUser(null);
      setFormData({
        username: "",
        email: "",
        full_name: "",
        role: "admin",
        password: "",
      });
    }
    setIsSlideOverOpen(true);
  };

  const getInitials = (name: string) => {
    if (!name) return "U";
    return name.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase();
  };

  const filteredUsers = adminUsers.filter(u => 
    u.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.username?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search users..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
          />
        </div>
        <button
          onClick={() => openSlideOver()}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl transition-all shadow-sm shadow-indigo-200 font-medium text-sm w-full sm:w-auto justify-center"
        >
          <Plus size={18} /> Invite Admin
        </button>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-sm font-semibold">
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Role & Access</th>
                <th className="px-6 py-4">Username</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center">
                    <div className="flex flex-col items-center gap-2 text-slate-400">
                      <User className="w-8 h-8 animate-pulse text-slate-300" />
                      <span className="text-sm">Loading team members...</span>
                    </div>
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-slate-500 border-dashed">
                    <Shield className="w-10 h-10 mx-auto text-slate-300 mb-3" />
                    <p>No users found matching your search.</p>
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shadow-sm ${
                          user.role === 'super_admin' ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {getInitials(user.full_name || user.username)}
                        </div>
                        <div>
                          <p className="font-bold text-slate-800">{user.full_name || 'No Name Provided'}</p>
                          <p className="text-sm text-slate-500">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${
                        user.role === 'super_admin' 
                          ? 'bg-purple-50 text-purple-700 border-purple-100' 
                          : 'bg-emerald-50 text-emerald-700 border-emerald-100'
                      }`}>
                        {user.role === 'super_admin' ? <Shield className="w-3 h-3" /> : <User className="w-3 h-3" />}
                        {user.role === 'super_admin' ? 'Super Admin' : 'Admin'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 font-medium">
                      @{user.username}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => openSlideOver(user)} className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                          <Edit2 size={18} />
                        </button>
                        <button onClick={() => handleDelete(user.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
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
                <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-indigo-600" />
                  {editingUser ? "Edit User Access" : "Invite New Admin"}
                </h2>
                <button onClick={() => setIsSlideOverOpen(false)} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                <form id="user-form" onSubmit={handleSubmit} className="space-y-5">
                  
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Full Name</label>
                    <input
                      required
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all shadow-sm"
                      placeholder="e.g. Jane Doe"
                      value={formData.full_name}
                      onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">Username</label>
                      <input
                        required
                        disabled={!!editingUser}
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all shadow-sm disabled:bg-slate-50 disabled:text-slate-400"
                        placeholder="janedoe"
                        value={formData.username}
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email Address</label>
                      <input
                        required
                        type="email"
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all shadow-sm"
                        placeholder="jane@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Role Level</label>
                    <div className="relative">
                      <select
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all shadow-sm appearance-none"
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      >
                        <option value="admin">Admin (Standard Access)</option>
                        <option value="super_admin">Super Admin (Full Access)</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100">
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                      {editingUser ? "Reset Password (Optional)" : "Initial Password"}
                    </label>
                    <input
                      type="password"
                      required={!editingUser}
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all shadow-sm"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                    {editingUser && <p className="text-xs text-slate-500 mt-2">Leave blank to keep the current password.</p>}
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
                  form="user-form"
                  className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-colors shadow-sm shadow-indigo-200"
                >
                  {editingUser ? "Save Changes" : "Create User"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
