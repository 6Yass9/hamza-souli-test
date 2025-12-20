export interface ServicePackage {
  id: string;
  title: string;
  price?: string;
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

export interface User {
  id: string;
  name: string;
  email?: string;
  role: 'admin' | 'staff' | 'client';
  status?: 'active' | 'archived';
  phone?: string;
  loginCode?: string;
  documents?: ClientDocument[];
}

export interface Appointment {
  id: string;
  date: string; // YYYY-MM-DD
  time: string;
  clientName: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  type: string;

  // ✅ assigned staff member (maps to appointments.user_id)
  staffId?: string;
}

export interface Album {
  id: string;
  title: string;
  coverUrl: string;
  createdAt: string;
  clientId?: string;
}

export interface GalleryItem {
  id: string;
  url: string;
  title: string;
  albumId?: string;
}
