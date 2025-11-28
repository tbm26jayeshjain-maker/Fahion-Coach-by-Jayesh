import { Stylist, ServiceTier, TimeSlot, Booking } from './types';

export const SERVICE_TIERS: ServiceTier[] = [
  { id: '1', durationMinutes: 30, price: 1499, name: 'Quick Fix', description: 'Immediate outfit advice or quick styling check.' },
  { id: '2', durationMinutes: 45, price: 2199, name: 'Wardrobe Review', description: 'Deep dive into your current closet and mix-match ideas.' },
  { id: '3', durationMinutes: 60, price: 2999, name: 'Full Consultation', description: 'Complete style overhaul, shopping list, and lookbook.' },
];

export const MOCK_STYLISTS: Stylist[] = [
  {
    id: 's1',
    name: 'Aisha Sharma',
    title: 'Editorial Stylist',
    specialty: ['Avant-Garde', 'Streetwear'],
    experienceYears: 8,
    school: 'NIFT',
    rating: 4.9,
    reviewCount: 124,
    hourlyRate: 2999,
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1000',
    portfolio: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&q=80&w=800'
    ],
    bio: 'Specializing in high-impact editorial looks and sustainable fashion. I help clients build a wardrobe that tells a story.',
    reviews: [
      { id: 'r1', userName: 'Priya K.', rating: 5, comment: 'Absolutely transformative session!', date: '2 days ago' }
    ],
    isVerified: true,
    status: 'active'
  },
  {
    id: 's2',
    name: 'Rohan Mehta',
    title: 'Celebrity Stylist',
    specialty: ['Formal', 'Red Carpet'],
    experienceYears: 12,
    school: 'Pearl',
    rating: 4.8,
    reviewCount: 89,
    hourlyRate: 3500,
    imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=1000',
    portfolio: [
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800'
    ],
    bio: 'Bringing red carpet elegance to everyday life. My focus is on fit, fabric, and timeless sophistication.',
    reviews: [],
    isVerified: true,
    status: 'active'
  },
  {
    id: 's3',
    name: 'Zara Williams',
    title: 'Minimalist Expert',
    specialty: ['Capsule Wardrobe', 'Minimalism'],
    experienceYears: 5,
    school: 'CSM',
    rating: 4.7,
    reviewCount: 45,
    hourlyRate: 2500,
    imageUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=1000',
    portfolio: [
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&q=80&w=800'
    ],
    bio: 'Less is more. I help you declutter and refine your personal style with key investment pieces.',
    reviews: [],
    isVerified: true,
    status: 'active'
  },
   {
    id: 's4',
    name: 'Vikram Singh',
    title: 'Streetwear Curator',
    specialty: ['Urban', 'Sneakers'],
    experienceYears: 4,
    school: 'NIFT',
    rating: 4.6,
    reviewCount: 32,
    hourlyRate: 1800,
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=1000',
    portfolio: [
      'https://images.unsplash.com/photo-1523396870717-816815488105?auto=format&fit=crop&q=80&w=800'
    ],
    bio: 'Merging high fashion with street culture. Let’s find your edge.',
    reviews: [],
    isVerified: false,
    status: 'pending'
  }
];

export const MOCK_TIME_SLOTS: TimeSlot[] = [
  { id: 't1', time: '10:00 AM', available: true },
  { id: 't2', time: '10:30 AM', available: false },
  { id: 't3', time: '11:00 AM', available: true },
  { id: 't4', time: '11:30 AM', available: true },
  { id: 't5', time: '02:00 PM', available: true },
  { id: 't6', time: '02:30 PM', available: false },
  { id: 't7', time: '03:00 PM', available: true },
  { id: 't8', time: '04:00 PM', available: true },
];

export const MOCK_BOOKINGS: Booking[] = [
  {
    id: 'b1',
    stylistId: 's1',
    stylistName: 'Aisha Sharma',
    stylistImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1000',
    stylistTitle: 'Editorial Stylist',
    serviceName: 'Quick Fix',
    date: new Date().toISOString(), // Today
    time: 'Now',
    duration: 30,
    amount: 1499,
    status: 'in-progress'
  },
  {
    id: 'b2',
    stylistId: 's2',
    stylistName: 'Rohan Mehta',
    stylistImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=1000',
    stylistTitle: 'Celebrity Stylist',
    serviceName: 'Full Consultation',
    date: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
    time: '11:00 AM',
    duration: 60,
    amount: 3500,
    status: 'scheduled'
  },
  {
    id: 'b3',
    stylistId: 's3',
    stylistName: 'Zara Williams',
    stylistImage: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=1000',
    stylistTitle: 'Minimalist Expert',
    serviceName: 'Wardrobe Review',
    date: new Date(Date.now() - 604800000).toISOString(), // Last week
    time: '02:00 PM',
    duration: 45,
    amount: 2500,
    status: 'completed'
  }
];