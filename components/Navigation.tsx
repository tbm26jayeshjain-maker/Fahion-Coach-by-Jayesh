import React from 'react';
import { Home, User, Calendar } from 'lucide-react';

interface NavigationProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  isAdmin: boolean;
}

export const Navigation: React.FC<NavigationProps> = ({ currentTab, onTabChange, isAdmin }) => {
  const tabs = [
    { id: 'home', icon: Home, label: 'Discover' },
    { id: 'bookings', icon: Calendar, label: 'Your Bookings' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  if (isAdmin) {
    return null; 
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-3 flex justify-between items-center z-40 md:hidden pb-safe">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = currentTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex-1 flex flex-col items-center gap-1 transition-colors ${
              isActive ? 'text-royal' : 'text-gray-400'
            }`}
          >
            <Icon className={`w-6 h-6 ${isActive ? 'fill-current' : ''}`} strokeWidth={isActive ? 2 : 1.5} />
            <span className={`text-[10px] font-medium ${isActive ? 'text-royal' : 'text-gray-400'}`}>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
};