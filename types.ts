export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Stylist {
  id: string;
  name: string;
  title: string;
  specialty: string[];
  experienceYears: number;
  school: 'NIFT' | 'Pearl' | 'Parsons' | 'CSM';
  rating: number;
  reviewCount: number;
  hourlyRate: number;
  imageUrl: string;
  portfolio: string[];
  bio: string;
  reviews: Review[];
  isVerified: boolean;
  status: 'active' | 'pending' | 'rejected';
}

export interface ServiceTier {
  id: string;
  durationMinutes: number;
  price: number;
  name: string;
  description: string;
}

export interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}

export interface Booking {
  id: string;
  stylistId: string;
  stylistName: string;
  stylistImage: string;
  stylistTitle: string;
  serviceName: string;
  date: string; // ISO string or readable date
  time: string;
  duration: number;
  amount: number;
  status: 'scheduled' | 'pending_finalize' | 'in-progress' | 'completed' | 'cancelled';
  joinLink?: string;
}