export interface ServicePackage {
  id: string;
  title: string;
  price?: string; // optional
  description: string;
  features: string[];
}

export interface PortfolioItem {
  id: string;
  src: string;
  category: string;
  alt: string;
}

export interface Testimonial {
  id: string;
  couple: string;
  quote: string;
  date: string;
}

export interface ClientDocument {
  id: string;
  name: string;
  url: string;
  uploadDate: string;
  type: 'pdf' | 'image' | 'doc' | 'other';
}

export type UserRole = 'admin' | 'staff' | 'client';
export type UserStatus = 'active' | 'archived';
export type AppointmentStatus = 'pending' | 'confirmed' | 'completed';

export interface User {
  id: string;
  name: string;
  email?: string;
  role: UserRole;
  status?: UserStatus;
  phone?: string;
  loginCode?: string; // 6-digit access code for clients
  documents?: ClientDocument[]; // loaded separately
}

export interface Appointment {
  id: string;
  date: string; // YYYY-MM-DD
  time: string;
  clientName: string;
  status: AppointmentStatus;
  type: string;

  // ✅ NEW: assignment for Staff dashboard filtering
  staffId?: string; // maps to appointments.staff_id in Supabase
}

export interface Album {
  id: string;
  title: string;
  coverUrl: string;
  createdAt: string;
  clientId?: string; // client this album belongs to (if private)
}

export interface GalleryItem {
  id: string;
  url: string;
  title: string;
  albumId?: string;
}
