import React, { useState, useEffect } from 'react';
import { MOCK_BOOKINGS } from '../constants';
import { Booking } from '../types';
import { Button } from '../components/Button';
import { Calendar, Clock, Video, MoreHorizontal, Download, X, Mic, MicOff, Video as VideoIcon, VideoOff, Wifi, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface YourBookingsProps {
  onJoinSession: () => void;
}

export const YourBookings: React.FC<YourBookingsProps> = ({ onJoinSession }) => {
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'cancelled'>('all');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [autoJoinModalOpen, setAutoJoinModalOpen] = useState(false);
  
  useEffect(() => {
    const fetchBookings = async () => {
        try {
            const { data, error } = await supabase.from('bookings').select('*');
            if (error || !data || data.length === 0) {
                console.warn("Using mock bookings due to error/empty:", error);
                setBookings(MOCK_BOOKINGS);
            } else {
                setBookings(data as unknown as Booking[]);
            }
        } catch (e) {
            setBookings(MOCK_BOOKINGS);
        } finally {
            setLoading(false);
        }
    };
    fetchBookings();
  }, []);

  // Sort bookings: In-progress first
  const sortedBookings = [...bookings].sort((a, b) => {
    if (a.status === 'in-progress') return -1;
    if (b.status === 'in-progress') return 1;
    return 0;
  });

  const filteredBookings = sortedBookings.filter(b => {
    if (filter === 'all') return true;
    if (filter === 'upcoming') return b.status === 'scheduled' || b.status === 'in-progress';
    if (filter === 'cancelled') return b.status === 'cancelled';
    return true;
  });

  // Auto-detect "In-progress" booking for auto-join
  useEffect(() => {
    if (!loading) {
        const activeBooking = bookings.find(b => b.status === 'in-progress');
        if (activeBooking) {
            // Simple delay to simulate finding it upon open
            const timer = setTimeout(() => {
                setAutoJoinModalOpen(true);
            }, 800);
            return () => clearTimeout(timer);
        }
    }
  }, [bookings, loading]);

  if (loading) {
      return (
          <div className="min-h-screen bg-gray-50 flex items-center justify-center">
              <Loader2 className="w-8 h-8 text-royal animate-spin" />
          </div>
      );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-white px-6 pt-12 pb-4 shadow-sm sticky top-0 z-10">
        <h1 className="text-2xl font-serif text-primary mb-4">Your Bookings</h1>
        <div className="flex gap-2">
            {['all', 'upcoming', 'cancelled'].map((f) => (
                <button
                    key={f}
                    onClick={() => setFilter(f as any)}
                    className={`px-4 py-1.5 rounded-full text-xs font-medium capitalize transition-all ${
                        filter === f 
                            ? 'bg-primary text-white' 
                            : 'bg-surface text-secondary border border-transparent hover:border-gray-200'
                    }`}
                >
                    {f}
                </button>
            ))}
        </div>
      </div>

      {/* List */}
      <div className="p-4 space-y-4">
        {filteredBookings.length === 0 ? (
             <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <Calendar className="w-8 h-8 text-muted" />
                </div>
                <h3 className="font-serif text-lg text-primary">No bookings found</h3>
                <p className="text-sm text-secondary">Your scheduled sessions will appear here.</p>
             </div>
        ) : (
            filteredBookings.map(booking => (
                <div key={booking.id} className={`bg-white rounded-xl overflow-hidden shadow-card border transition-all ${booking.status === 'in-progress' ? 'border-gold shadow-gold/20' : 'border-gray-100'}`}>
                    
                    {/* Status Bar for Active */}
                    {booking.status === 'in-progress' && (
                        <div className="bg-gradient-to-r from-gold to-yellow-600 px-4 py-2 flex items-center justify-between text-white animate-pulse-subtle">
                            <div className="flex items-center gap-2">
                                <span className="relative flex h-2.5 w-2.5">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
                                </span>
                                <span className="text-xs font-bold tracking-wide uppercase">Session in Progress</span>
                            </div>
                            <span className="text-xs font-medium">Join Now</span>
                        </div>
                    )}

                    <div className="p-5">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-3">
                                <img src={booking.stylistImage} alt={booking.stylistName} className="w-12 h-12 rounded-full object-cover border border-gray-100" />
                                <div>
                                    <h3 className="font-serif font-medium text-primary">{booking.stylistName}</h3>
                                    <p className="text-xs text-secondary">{booking.stylistTitle}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-lg font-bold text-primary">₹{booking.amount}</p>
                                <span className={`text-[10px] font-medium uppercase px-2 py-0.5 rounded-full ${
                                    booking.status === 'scheduled' ? 'bg-blue-50 text-blue-700' :
                                    booking.status === 'completed' ? 'bg-green-50 text-green-700' :
                                    booking.status === 'cancelled' ? 'bg-red-50 text-red-700' :
                                    'bg-gold/10 text-gold'
                                }`}>
                                    {booking.status}
                                </span>
                            </div>
                        </div>

                        <div className="bg-surface rounded-lg p-3 flex justify-between items-center text-sm mb-4">
                            <div className="flex items-center gap-2 text-primary">
                                <Calendar className="w-4 h-4 text-royal" />
                                <span className="font-medium">{new Date(booking.date).toLocaleDateString()}</span>
                            </div>
                            <div className="w-px h-4 bg-gray-300"></div>
                            <div className="flex items-center gap-2 text-primary">
                                <Clock className="w-4 h-4 text-royal" />
                                <span className="font-medium">{booking.time} ({booking.duration}m)</span>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            {booking.status === 'in-progress' ? (
                                <Button fullWidth onClick={() => setAutoJoinModalOpen(true)} className="bg-gradient-to-r from-royal to-[#3b3dbf] shadow-lg shadow-royal/30 border border-white/10">
                                    <Video className="w-4 h-4 mr-2" />
                                    Join Call
                                </Button>
                            ) : (
                                <>
                                    <Button variant="outline" className="flex-1 text-xs">Reschedule</Button>
                                    <Button variant="ghost" className="px-3"><MoreHorizontal className="w-4 h-4" /></Button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            ))
        )}
      </div>

      {/* Auto Join Modal */}
      {autoJoinModalOpen && bookings.find(b => b.status === 'in-progress') && (
        <AutoJoinModal 
            booking={bookings.find(b => b.status === 'in-progress')!} 
            onClose={() => setAutoJoinModalOpen(false)}
            onJoin={onJoinSession}
        />
      )}
    </div>
  );
};

// Sub-component for the Auto Join Flow
const AutoJoinModal: React.FC<{ booking: Booking; onClose: () => void; onJoin: () => void }> = ({ booking, onClose, onJoin }) => {
    const [countdown, setCountdown] = useState(5);
    const [cameraOn, setCameraOn] = useState(true);
    const [micOn, setMicOn] = useState(true);
    const [isJoining, setIsJoining] = useState(false);
  
    useEffect(() => {
      if (countdown > 0 && !isJoining) {
        const timer = setTimeout(() => setCountdown(c => c - 1), 1000);
        return () => clearTimeout(timer);
      } else if (countdown === 0 && !isJoining) {
        handleJoin();
      }
    }, [countdown, isJoining]);
  
    const handleJoin = () => {
        setIsJoining(true);
        setTimeout(() => {
            onJoin();
        }, 800);
    };
  
    return (
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-primary/80 backdrop-blur-md p-0 sm:p-4 animate-fadeIn">
        <div className="bg-white w-full max-w-sm rounded-t-3xl sm:rounded-2xl overflow-hidden shadow-2xl relative">
            <div className="p-6 text-center">
                <div className="w-20 h-20 mx-auto rounded-full p-1 border-2 border-gold mb-4 relative">
                     <img src={booking.stylistImage} alt="" className="w-full h-full rounded-full object-cover" />
                     <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 border-2 border-white rounded-full"></div>
                </div>
                
                <h3 className="text-xl font-serif font-bold text-primary mb-1">Session Starting</h3>
                <p className="text-secondary text-sm mb-6">with {booking.stylistName}</p>
  
                {/* Controls */}
                <div className="flex justify-center gap-6 mb-8">
                    <button onClick={() => setMicOn(!micOn)} className={`p-4 rounded-full transition-all ${micOn ? 'bg-gray-100 text-primary' : 'bg-red-50 text-red-500'}`}>
                        {micOn ? <Mic className="w-6 h-6" /> : <MicOff className="w-6 h-6" />}
                    </button>
                    <button onClick={() => setCameraOn(!cameraOn)} className={`p-4 rounded-full transition-all ${cameraOn ? 'bg-gray-100 text-primary' : 'bg-red-50 text-red-500'}`}>
                        {cameraOn ? <VideoIcon className="w-6 h-6" /> : <VideoOff className="w-6 h-6" />}
                    </button>
                </div>
  
                {/* Network Check */}
                <div className="flex items-center justify-center gap-2 text-xs text-green-600 font-medium mb-8 bg-green-50 py-1 px-3 rounded-full mx-auto w-fit">
                    <Wifi className="w-3 h-3" />
                    Connection Good
                </div>
  
                <Button 
                    fullWidth 
                    size="lg" 
                    onClick={handleJoin}
                    className="mb-3 bg-royal"
                >
                    {isJoining ? 'Connecting...' : `Join Now (${countdown}s)`}
                </Button>
                
                <button onClick={onClose} className="text-sm text-secondary hover:text-primary font-medium p-2">
                    Cancel & Join Later
                </button>
            </div>
        </div>
      </div>
    );
  };