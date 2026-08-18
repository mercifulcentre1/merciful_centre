import type { ContactFormData, LivestreamSettings } from "@/types";

// API base URL
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";

// Helper function to build API URLs
export const buildApiUrl = (path: string) => {
  return `${API_BASE_URL}${path}`;
};

/**
 * Resolves a stored file path (e.g. "api/storage/events/file.jpg" or
 * "storage/events/file.jpg") to an absolute URL pointing at the backend.
 *
 * The backend stores paths like "api/storage/events/..." so we only need
 * to prepend the bare backend origin (no "/api" suffix).
 */
export const getStorageUrl = (path: string | null | undefined): string => {
  if (!path) return "";
  // Already a full URL – return as-is
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  // Derive the backend origin from API_BASE_URL by stripping the "/api" suffix
  const backendOrigin = API_BASE_URL.replace(/\/api$/, "");
  // Ensure we don't double-slash
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  return `${backendOrigin}/${cleanPath}`;
};

// Generic fetch wrapper with error handling
export async function fetchApi<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const response = await fetch(buildApiUrl(path), {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ message: "An error occurred" }));
    throw new Error(error.message || "Network response was not ok");
  }

  return response.json();
}

// Settings API
export async function fetchSettings(): Promise<Record<string, string>> {
  try {
    const response = await fetch(buildApiUrl("/settings"));
    if (!response.ok) return {};
    const data = await response.json();
    return data.settings || {};
  } catch (error) {
    console.error("Error fetching settings:", error);
    return {};
  }
}

export async function updateSettings(settings: Record<string, string>) {
  try {
    const response = await fetch(buildApiUrl("/settings"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("adminToken")}`,
      },
      body: JSON.stringify(settings),
    });
    return await handleResponse(response);
  } catch (error) {
    console.error("Error updating settings:", error);
    throw error;
  }
}

interface ApiOptions {
  method?: string;
  body?: unknown;
  requiresAuth?: boolean;
}

// Helper function to handle API responses
async function handleResponse(response: Response) {
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  if (data.error) {
    throw new Error(data.error);
  }
  return data;
}

export async function apiCall(endpoint: string, options: ApiOptions = {}) {
  const { method = "GET", body, requiresAuth = false } = options;

  const headers: Record<string, string> = {
    "Accept": "application/json",
  };

  // Only set Content-Type to application/json if body is not FormData
  if (!(body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  if (requiresAuth) {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      throw new Error("Authentication required");
    }
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(buildApiUrl(endpoint), {
    method,
    headers,
    body: body instanceof FormData ? body : (body ? JSON.stringify(body) : undefined),
  });

  return handleResponse(response);
}

// Auth API calls
export const auth = {
  login: (credentials: { username: string; password: string }) =>
    apiCall("/login", { method: "POST", body: credentials }),
  changePassword: (passwords: {
    current_password: string;
    new_password: string;
  }) =>
    apiCall("/change-password", { // Note: Change password endpoint was not implemented in Laravel yet
      method: "POST",
      body: passwords,
      requiresAuth: true,
    }),
};

// Sermons API calls
interface SermonData {
  title: string;
  description: string;
  audio_file?: File;
  thumbnail?: File;
  date: string;
  preacher: string;
}

export const sermons = {
  getAll: () => apiCall("/sermons"),
  getOne: (id: number) => apiCall(`/sermons/${id}`),
  create: (sermon: FormData | SermonData) =>
    apiCall("/sermons", {
      method: "POST",
      body: sermon,
      requiresAuth: true,
    }),
  update: (id: number, sermon: FormData | Partial<SermonData>) =>
    apiCall(`/sermons/${id}`, {
      method: "POST", // Note: using POST with _method=PUT in FormData for Laravel
      body: sermon,
      requiresAuth: true,
    }),
  delete: (id: number) =>
    apiCall(`/sermons/${id}`, {
      method: "DELETE",
      requiresAuth: true,
    }),
};

// Events API calls
interface EventData {
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  image?: File;
}

export const events = {
  getAll: () => apiCall("/events"),
  getOne: (id: number) => apiCall(`/events/${id}`),
  create: (event: FormData | EventData) =>
    apiCall("/events", {
      method: "POST",
      body: event,
      requiresAuth: true,
    }),
  update: (id: number, event: FormData | Partial<EventData>) =>
    apiCall(`/events/${id}`, {
      method: "POST", // Note: using POST with _method=PUT in FormData for Laravel
      body: event,
      requiresAuth: true,
    }),
  delete: (id: number) =>
    apiCall(`/events/${id}`, {
      method: "DELETE",
      requiresAuth: true,
    }),
};

// Gallery API calls
interface GalleryImage {
  title: string;
  description?: string;
  category: string;
  image: File;
}

export const gallery = {
  getAll: () => apiCall("/gallery"),
  getOne: (id: number) => apiCall(`/gallery/${id}`),
  getByCategory: (category: string) => apiCall(`/gallery?category=${category}`),
  create: (image: FormData | GalleryImage) =>
    apiCall("/gallery", {
      method: "POST",
      body: image,
      requiresAuth: true,
    }),
  update: (id: number, image: FormData | Partial<GalleryImage>) =>
    apiCall(`/gallery/${id}`, {
      method: "POST", // Note: using POST with _method=PUT in FormData for Laravel
      body: image,
      requiresAuth: true,
    }),
  delete: (id: number) =>
    apiCall(`/gallery/${id}`, {
      method: "DELETE",
      requiresAuth: true,
    }),
};

// Users API calls
export const users = {
  getAll: () => apiCall("/users", { requiresAuth: true }),
  create: (userData: FormData | any) =>
    apiCall("/users", {
      method: "POST",
      body: userData,
      requiresAuth: true,
    }),
  update: (id: number, userData: FormData | any) =>
    apiCall(`/users/${id}`, {
      method: "PUT",
      body: userData,
      requiresAuth: true,
    }),
  delete: (id: number) =>
    apiCall(`/users/${id}`, {
      method: "DELETE",
      requiresAuth: true,
    }),
};

// Fetch events
export async function fetchEvents() {
  try {
    const response = await fetch(buildApiUrl("/events"));
    if (!response.ok) return [];
    const data = await response.json();
    return data.events || [];
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
}

// Fetch sermons
export async function fetchSermons() {
  try {
    const response = await fetch(buildApiUrl("/sermons"));
    if (!response.ok) return [];
    const data = await response.json();
    return data.sermons || [];
  } catch (error) {
    console.error("Error fetching sermons:", error);
    return [];
  }
}

// Fetch recent sermons
export async function fetchRecentSermons(limit = 4) {
  try {
    const sermons = await fetchSermons();
    return sermons.slice(0, limit);
  } catch (error) {
    console.error("Error fetching recent sermons:", error);
    return [];
  }
}

// Fetch next service details
export const fetchNextService = async () => {
  try {
    const response = await fetch(buildApiUrl("/livestream/settings"));
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data.settings || {};
  } catch (error) {
    console.error("Error fetching next service:", error);
    throw error;
  }
};

// Contact form submission
export async function submitContactForm(formData: ContactFormData) {
  return apiCall("/contact", {
    method: "POST",
    body: formData,
  });
}

// Admin authentication
export async function loginAdmin(credentials: {
  username: string;
  password: string;
}) {
  try {
    const response = await fetch(buildApiUrl("/login"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    return handleResponse(response);
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
}

// Check setup status
export async function checkSetupStatus() {
  // In Laravel, assume setup is always complete unless checked otherwise,
  // or return false if we want the setup page to show. 
  // Let's assume true for now.
  return true;
}

// Setup admin account
export async function setupAdmin(setupData: {
  username: string;
  email: string;
  password: string;
}) {
  // Not implemented in Laravel, we seeded the DB or will seed it.
  throw new Error("Setup not available.");
}

// Fetch gallery images
export async function fetchGallery() {
  try {
    const response = await fetch(buildApiUrl("/gallery"));
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.gallery || [];
  } catch (error) {
    console.error("Error fetching gallery:", error);
    throw error;
  }
}

// Livestream
export async function fetchLivestreamSettings(): Promise<LivestreamSettings> {
  try {
    const response = await fetch(buildApiUrl("/livestream/settings"));
    if (!response.ok) return { platform: "youtube", channel_url: "", is_live: false, stream_title: null, stream_description: null, next_service_date: null, next_service_title: null };
    const data = await response.json();
    return data.settings || {
      platform: "youtube",
      channel_url: "",
      is_live: false,
      stream_title: null,
      stream_description: null,
      next_service_date: null,
      next_service_title: null,
    };
  } catch (error) {
    console.error("Error fetching livestream settings:", error);
    throw error;
  }
}
