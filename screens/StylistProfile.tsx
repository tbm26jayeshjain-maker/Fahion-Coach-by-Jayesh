import React, { useState } from 'react';
import { Stylist } from '../types';
import { Button } from '../components/Button';
import { BookingFlow } from './BookingFlow';
import { ArrowLeft, Star, Clock, MapPin, Share2, Award, Heart } from 'lucide-react';

interface StylistProfileProps {
  stylist: Stylist;
  onBack: () => void;
}

export const StylistProfile: React.FC<StylistProfileProps> = ({ stylist, onBack }) => {
  const [showBooking, setShowBooking] = useState(false);
  const [activeTab, setActiveTab] = useState<'portfolio' | 'reviews'>('portfolio');

  return (
    <div className="pb-24 bg-white min-h-screen animate-fadeIn">
      {/* Hero Image */}
      <div className="relative h-[45vh]">
        <img src={stylist.imageUrl} className="w-full h-full object-cover" alt={stylist.name} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60"></div>
        
        {/* Nav */}
        <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center text-white pt-safe">
            <button onClick={onBack} className="p-2 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/30 transition-colors">
                <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-3">
                <button className="p-2 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/30 transition-colors">
                    <Heart className="w-5 h-5" />
                </button>
                <button className="p-2 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/30 transition-colors">
                    <Share2 className="w-5 h-5" />
                </button>
            </div>
        </div>

        {/* Hero Info */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h1 className="text-3xl font-serif font-medium mb-1">{stylist.name}</h1>
            <p className="text-white/80 text-sm mb-3 flex items-center gap-2">
                {stylist.title} • {stylist.experienceYears} Yrs Exp
            </p>
            <div className="flex flex-wrap gap-2">
                <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs flex items-center gap-1 border border-white/10">
                    <Award className="w-3 h-3 text-gold" />
                    Verified {stylist.school}
                </span>
                <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs flex items-center gap-1 border border-white/10">
                    <Star className="w-3 h-3 text-gold fill-gold" />
                    {stylist.rating} ({stylist.reviewCount})
                </span>
            </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-5 py-6">
        <div className="mb-6">
            <h3 className="font-serif text-lg mb-2 text-primary">About</h3>
            <p className="text-secondary text-sm leading-relaxed">{stylist.bio}</p>
        </div>

        <div className="flex border-b border-gray-100 mb-6">
            <button 
                onClick={() => setActiveTab('portfolio')}
                className={`flex-1 pb-3 text-sm font-medium transition-all ${
                    activeTab === 'portfolio' ? 'text-royal border-b-2 border-royal' : 'text-muted'
                }`}
            >
                Portfolio
            </button>
            <button 
                onClick={() => setActiveTab('reviews')}
                className={`flex-1 pb-3 text-sm font-medium transition-all ${
                    activeTab === 'reviews' ? 'text-royal border-b-2 border-royal' : 'text-muted'
                }`}
            >
                Reviews
            </button>
        </div>

        {activeTab === 'portfolio' ? (
            <div className="grid grid-cols-2 gap-3">
                {stylist.portfolio.map((img, i) => (
                    <img key={i} src={img} className="w-full aspect-[3/4] object-cover rounded-lg" alt="Portfolio" />
                ))}
            </div>
        ) : (
            <div className="space-y-4">
                {stylist.reviews.map(review => (
                    <div key={review.id} className="bg-surface p-4 rounded-xl">
                        <div className="flex justify-between items-start mb-2">
                            <span className="font-medium text-sm">{review.userName}</span>
                            <span className="text-xs text-muted">{review.date}</span>
                        </div>
                        <div className="flex gap-0.5 mb-2">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'text-gold fill-gold' : 'text-gray-300'}`} />
                            ))}
                        </div>
                        <p className="text-sm text-secondary">{review.comment}</p>
                    </div>
                ))}
                {stylist.reviews.length === 0 && (
                    <p className="text-center text-muted text-sm py-4">No reviews yet.</p>
                )}
            </div>
        )}
      </div>

      {/* Sticky Bottom Booking Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 shadow-xl z-30 pb-safe">
        <div className="flex items-center gap-4 max-w-3xl mx-auto">
            <div className="flex-1">
                <p className="text-xs text-muted">Consultation starts at</p>
                <p className="text-lg font-bold text-royal">₹{stylist.hourlyRate}<span className="text-xs font-normal text-secondary">/30m</span></p>
            </div>
            <Button size="lg" className="px-8 shadow-xl shadow-royal/20" onClick={() => setShowBooking(true)}>
                Book Session
            </Button>
        </div>
      </div>

      {showBooking && (
        <BookingFlow 
            stylist={stylist} 
            onClose={() => setShowBooking(false)} 
            onSuccess={() => { setShowBooking(false); onBack(); }}
        />
      )}
    </div>
  );
};