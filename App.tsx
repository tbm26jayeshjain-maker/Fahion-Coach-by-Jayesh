import React, { useState, useEffect } from 'react';
import { Home } from './screens/Home';
import { StylistProfile } from './screens/StylistProfile';
import { AdminDashboard } from './screens/AdminDashboard';
import { YourBookings } from './screens/YourBookings';
import { SessionScreen } from './screens/SessionScreen';
import { Navigation } from './components/Navigation';
import { MOCK_STYLISTS } from './constants';
import { Stylist } from './types';
import { ExternalLink, Loader2, Smartphone } from 'lucide-react';
import { supabase } from './lib/supabase';

const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState('home');
  const [selectedStylist, setSelectedStylist] = useState<Stylist | null>(null);
  
  // View State
  const [isAdmin, setIsAdmin] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  const [isInSession, setIsInSession] = useState(false);
  
  // Data State
  const [stylists, setStylists] = useState<Stylist[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch Stylists from Supabase
  useEffect(() => {
    const fetchStylists = async () => {
      try {
        const { data, error } = await supabase.from('stylists').select('*');
        
        if (error || !data || data.length === 0) {
          console.warn('Supabase fetch failed or empty, using mock data:', error);
          setStylists(MOCK_STYLISTS);
        } else {
          setStylists(data as unknown as Stylist[]);
        }
      } catch (err) {
        console.error('Connection error:', err);
        setStylists(MOCK_STYLISTS);
      } finally {
        setLoading(false);
      }
    };

    fetchStylists();
  }, []);

  // Handle Resize and Initial View Set
  useEffect(() => {
    const handleResize = () => {
      const desktop = window.innerWidth >= 1024;
      setIsDesktop(desktop);
    };

    window.addEventListener('resize', handleResize);
    
    // Set initial view based on screen size only once on mount
    if (window.innerWidth >= 1024) {
        setIsAdmin(true);
    }

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleStylistSelect = (stylist: Stylist) => {
    setSelectedStylist(stylist);
  };

  const handleBack = () => {
    setSelectedStylist(null);
  };

  const handleJoinSession = () => {
    setIsInSession(true);
  };

  const handleEndSession = () => {
    setIsInSession(false);
  };

  if (loading) {
    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center">
             <div className="w-12 h-12 border-4 border-royal/20 border-t-royal rounded-full animate-spin mb-4"></div>
             <p className="text-royal font-serif tracking-widest text-sm">FASHION COACH</p>
        </div>
    );
  }

  // Active Session View (Overlays everything)
  if (isInSession) {
    return <SessionScreen onEndSession={handleEndSession} />;
  }

  // Admin View (Desktop Default)
  if (isAdmin) {
    return (
        <>
            <AdminDashboard />
            {/* Floating Toggle Button - Visible on all screens to ensure access */}
            <div className="fixed bottom-6 right-6 z-50">
                <button 
                    onClick={() => setIsAdmin(false)}
                    className="bg-primary hover:bg-black text-white px-5 py-3 rounded-full shadow-2xl flex items-center gap-2 font-medium transition-transform hover:scale-105"
                >
                    <Smartphone className="w-4 h-4" />
                    Switch to Mobile App
                </button>
            </div>
        </>
    );
  }

  // Mobile App View
  return (
    <div className={`min-h-screen font-sans antialiased ${isDesktop ? 'bg-gray-900 py-8' : 'bg-white'}`}>
      <div className={`mx-auto min-h-screen relative shadow-2xl overflow-hidden bg-gray-50 ${isDesktop ? 'max-w-md rounded-[3rem] border-[8px] border-gray-800' : ''}`}>
        <div className="h-full bg-white overflow-y-auto scrollbar-hide">
            {selectedStylist ? (
                <StylistProfile stylist={selectedStylist} onBack={handleBack} />
            ) : (
                <>
                    {currentTab === 'home' && (
                        <Home stylists={stylists} onStylistSelect={handleStylistSelect} />
                    )}
                    
                    {currentTab === 'bookings' && (
                        <YourBookings onJoinSession={handleJoinSession} />
                    )}

                    {currentTab === 'profile' && (
                         <div className="p-6 pb-24">
                            <h2 className="text-2xl font-serif mb-6">Profile</h2>
                            <div className="space-y-4">
                                <div className="p-4 bg-surface rounded-xl flex items-center gap-4">
                                    <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
                                        <img src="https://ui-avatars.com/api/?name=User&background=random" alt="User" />
                                    </div>
                                    <div>
                                        <p className="font-medium">Guest User</p>
                                        <p className="text-xs text-muted">+91 98765 43210</p>
                                    </div>
                                </div>
                                <button onClick={() => setIsAdmin(true)} className="w-full text-left p-4 rounded-xl border border-gray-100 flex items-center justify-between hover:bg-surface">
                                    <span className="font-medium">Switch to Admin View</span>
                                    <ExternalLink className="w-4 h-4 text-muted" />
                                </button>
                                <div className="p-4 border border-gray-100 rounded-xl">
                                    <h4 className="font-medium text-sm mb-2">Preferences</h4>
                                    <div className="flex justify-between items-center text-sm text-secondary">
                                        <span>Auto-join Sessions</span>
                                        <div className="w-10 h-6 bg-green-500 rounded-full relative cursor-pointer">
                                            <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    
                    <Navigation currentTab={currentTab} onTabChange={setCurrentTab} isAdmin={false} />
                </>
            )}
        </div>
      </div>
    </div>
  );
};

export default App;