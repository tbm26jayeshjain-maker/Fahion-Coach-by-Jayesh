import React from 'react';
import { Stylist } from '../types';
import { Star, ShieldCheck } from 'lucide-react';

interface StylistCardProps {
  stylist: Stylist;
  onClick: () => void;
}

export const StylistCard: React.FC<StylistCardProps> = ({ stylist, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="group bg-white rounded-xl overflow-hidden shadow-card hover:shadow-hover transition-all duration-300 cursor-pointer border border-gray-100"
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        <img 
          src={stylist.imageUrl} 
          alt={stylist.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>
        <div className="absolute bottom-3 left-3 text-white">
          <h3 className="font-serif text-lg font-medium tracking-wide flex items-center gap-1">
            {stylist.name}
            {stylist.isVerified && <ShieldCheck className="w-4 h-4 text-gold" />}
          </h3>
          <p className="text-xs text-white/90 font-light">{stylist.school}</p>
        </div>
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1 shadow-sm">
          <Star className="w-3 h-3 text-gold fill-gold" />
          <span className="text-xs font-semibold text-primary">{stylist.rating}</span>
        </div>
      </div>
      <div className="p-4 space-y-2">
        <div className="flex flex-wrap gap-1">
          {stylist.specialty.slice(0, 2).map((tag, idx) => (
            <span key={idx} className="text-[10px] uppercase tracking-wider text-secondary bg-surface px-2 py-1 rounded-sm">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex justify-between items-center pt-1">
          <p className="text-xs text-muted">Starting at</p>
          <p className="text-sm font-semibold text-primary">₹{stylist.hourlyRate}</p>
        </div>
      </div>
    </div>
  );
};