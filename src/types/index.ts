export interface ServiceTime {
  id: number;
  day: string;
  time: string;
  type: string;
}

export interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image: string | null;
  is_featured: number;
}

export interface ChurchService {
  id: number;
  name: string;
  dayOfWeek: string;
  time: string;
  description: string;
  nextServiceDate: string;
  location: string;
  isLiveStreamAvailable: boolean;
  streamUrl?: string;
}

export interface Sermon {
  id: number;
  title: string;
  description: string | null;
  date: string;
  preacher: string;
  thumbnailUrl: string | null;
  videoUrl: string;
  audioUrl: string | null;
  isFeatured: boolean;
  scriptureReferences: string[];
  duration?: string;
  series?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface AdminCredentials {
  username: string;
  password: string;
}

export interface SetupData extends AdminCredentials {
  email: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface LivestreamSettings {
  platform: "youtube" | "facebook";
  channel_url: string;
  is_live: boolean;
  stream_title: string | null;
  stream_description: string | null;
  next_service_date: string | null;
  next_service_title: string | null;
}

export interface LivestreamArchive {
  id: number;
  title: string;
  platform: "youtube" | "facebook";
  video_id: string;
  thumbnail_url: string | null;
  stream_date: string;
  created_at?: string;
  updated_at?: string;
}
