import React, { useState } from 'react';
import { Stylist } from '../types';
import { StylistCard } from '../components/StylistCard';
import { Search, SlidersHorizontal, Sparkles } from 'lucide-react';

interface HomeProps {
  stylists: Stylist[];
  onStylistSelect: (stylist: Stylist) => void;
}

export const Home: React.FC<HomeProps> = ({ stylists, onStylistSelect }) => {
  const [filter, setFilter] = useState('All');
  const filters = ['All', 'Editorial', 'Streetwear', 'Sustainable', 'Red Carpet'];

  return (
    <div className="pb-24 pt-4 px-4 max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
            <p className="text-xs font-medium text-royal tracking-widest uppercase mb-1">Fashion Coach</p>
            <h1 className="text-2xl font-serif text-primary">Discover Stylists</h1>
        </div>
        <div className="w-10 h-10 rounded-full bg-surface border border-gray-200 overflow-hidden">
             <img src="https://ui-avatars.com/api/?name=User&background=random" alt="Profile" />
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
        <input 
            type="text" 
            placeholder="Search by style, name, or occasion..." 
            className="w-full pl-10 pr-4 py-3 bg-surface rounded-xl border-none focus:ring-2 focus:ring-royal/10 outline-none text-sm placeholder:text-muted/70"
        />
        <button className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 bg-white rounded-lg shadow-sm">
            <SlidersHorizontal className="w-4 h-4 text-primary" />
        </button>
      </div>

      {/* Featured Banner */}
      <div className="relative rounded-2xl overflow-hidden mb-8 shadow-card group cursor-pointer h-48">
        <img 
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=1000" 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
            alt="Featured"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center p-6">
            <div className="text-white max-w-xs">
                <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-gold fill-gold animate-pulse" />
                    <span className="text-xs font-bold tracking-widest uppercase text-gold">Trending</span>
                </div>
                <h2 className="text-2xl font-serif mb-2 leading-tight">Summer Wedding Essentials</h2>
                <p className="text-sm text-white/80 mb-4 line-clamp-2">Curated looks for the wedding season by top NIFT alumni.</p>
                <button className="bg-white text-primary px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">Explore Collection</button>
            </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto pb-6 no-scrollbar">
        {filters.map(f => (
            <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                    filter === f 
                        ? 'bg-royal text-white shadow-md shadow-royal/20' 
                        : 'bg-surface text-secondary border border-transparent hover:border-gray-200'
                }`}
            >
                {f}
            </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-4">
        {stylists.map(stylist => (
            <StylistCard key={stylist.id} stylist={stylist} onClick={() => onStylistSelect(stylist)} />
        ))}
      </div>
    </div>
  );
};