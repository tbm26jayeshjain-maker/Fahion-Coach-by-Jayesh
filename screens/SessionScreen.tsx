import React from 'react';
import { Mic, Video, PhoneOff, MessageSquare, Share2, MoreVertical, Minimize2 } from 'lucide-react';

interface SessionScreenProps {
  onEndSession: () => void;
}

export const SessionScreen: React.FC<SessionScreenProps> = ({ onEndSession }) => {
  return (
    <div className="fixed inset-0 bg-gray-900 z-50 flex flex-col">
      {/* Header overlay */}
      <div className="absolute top-0 left-0 right-0 p-4 pt-safe flex justify-between items-start z-10 text-white">
        <div className="flex items-center gap-3 bg-black/20 backdrop-blur-md px-3 py-1.5 rounded-full">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-medium">12:04</span>
        </div>
        <button onClick={onEndSession} className="p-2 bg-black/20 backdrop-blur-md rounded-full">
            <Minimize2 className="w-5 h-5" />
        </button>
      </div>

      {/* Main Stylist View */}
      <div className="flex-1 relative">
        <img 
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1000" 
            className="w-full h-full object-cover" 
            alt="Stylist" 
        />
        <div className="absolute bottom-4 left-4">
            <div className="text-white">
                <h3 className="text-lg font-bold shadow-black drop-shadow-md">Aisha Sharma</h3>
                <p className="text-xs text-white/80 drop-shadow-md">NIFT Stylist</p>
            </div>
        </div>
      </div>

      {/* Self View (PIP) */}
      <div className="absolute top-20 right-4 w-28 h-40 bg-gray-800 rounded-xl overflow-hidden border-2 border-white/20 shadow-xl">
         <img 
            src="https://ui-avatars.com/api/?name=User&background=random" 
            className="w-full h-full object-cover" 
            alt="Self" 
        />
      </div>

      {/* Controls Bar */}
      <div className="bg-gray-900 px-6 py-8 pb-safe rounded-t-3xl -mt-6 relative z-10 flex flex-col items-center">
        <div className="w-10 h-1 bg-gray-700 rounded-full mb-6"></div>
        
        <div className="flex items-center gap-6">
            <button className="p-4 bg-gray-800 rounded-full text-white hover:bg-gray-700 transition-colors">
                <Mic className="w-6 h-6" />
            </button>
            <button className="p-4 bg-gray-800 rounded-full text-white hover:bg-gray-700 transition-colors">
                <Video className="w-6 h-6" />
            </button>
            <button onClick={onEndSession} className="p-5 bg-red-500 rounded-full text-white shadow-lg shadow-red-500/30 hover:bg-red-600 transition-colors transform hover:scale-105">
                <PhoneOff className="w-8 h-8 fill-current" />
            </button>
            <button className="p-4 bg-gray-800 rounded-full text-white hover:bg-gray-700 transition-colors">
                <MessageSquare className="w-6 h-6" />
            </button>
            <button className="p-4 bg-gray-800 rounded-full text-white hover:bg-gray-700 transition-colors">
                <Share2 className="w-6 h-6" />
            </button>
        </div>
      </div>
    </div>
  );
};