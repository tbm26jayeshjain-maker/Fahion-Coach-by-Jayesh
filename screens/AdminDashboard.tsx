import React, { useState, useEffect } from 'react';
import { MOCK_STYLISTS } from '../constants';
import { Stylist } from '../types';
import { Button } from '../components/Button';
import { CheckCircle, XCircle, MoreHorizontal, LayoutGrid, Users, DollarSign, Bell, Loader2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { supabase } from '../lib/supabase';

export const AdminDashboard: React.FC = () => {
  const [stylists, setStylists] = useState<Stylist[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchStylists();
  }, []);

  const fetchStylists = async () => {
    try {
        const { data, error } = await supabase.from('stylists').select('*');
        if (error || !data || data.length === 0) {
            setStylists(MOCK_STYLISTS);
        } else {
            setStylists(data as unknown as Stylist[]);
        }
    } catch (e) {
        setStylists(MOCK_STYLISTS);
    } finally {
        setLoading(false);
    }
  };

  const handleVerify = async (id: string) => {
    // Optimistic update
    setStylists(prev => prev.map(s => s.id === id ? { ...s, isVerified: true, status: 'active' } : s));

    try {
        const { error } = await supabase
            .from('stylists')
            .update({ isVerified: true, status: 'active' }) // assuming columns match, or map to is_verified
            .eq('id', id);
        
        if (error) throw error;
    } catch (e) {
        console.error('Update failed', e);
        // Revert on failure could go here
    }
  };

  const handleReject = async (id: string) => {
    setStylists(prev => prev.map(s => s.id === id ? { ...s, status: 'rejected' } : s));
    
    try {
        const { error } = await supabase
            .from('stylists')
            .update({ status: 'rejected' })
            .eq('id', id);

        if (error) throw error;
    } catch (e) {
        console.error('Update failed', e);
    }
  };

  const data = [
    { name: 'Mon', revenue: 4000 },
    { name: 'Tue', revenue: 3000 },
    { name: 'Wed', revenue: 2000 },
    { name: 'Thu', revenue: 2780 },
    { name: 'Fri', revenue: 1890 },
    { name: 'Sat', revenue: 2390 },
    { name: 'Sun', revenue: 3490 },
  ];

  if (loading) {
      return (
          <div className="min-h-screen bg-surface flex items-center justify-center">
              <Loader2 className="w-8 h-8 text-royal animate-spin" />
          </div>
      );
  }

  return (
    <div className="min-h-screen bg-surface flex">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
            <div className="p-6 border-b border-gray-100">
                <h1 className="text-xl font-serif font-bold text-royal tracking-wide">Fashion Coach</h1>
                <p className="text-xs text-muted uppercase tracking-wider mt-1">Admin Panel</p>
            </div>
            <nav className="flex-1 p-4 space-y-1">
                <div className="flex items-center gap-3 px-4 py-3 bg-royal/5 text-royal rounded-lg font-medium cursor-pointer">
                    <Users className="w-5 h-5" />
                    Stylists
                </div>
                <div className="flex items-center gap-3 px-4 py-3 text-secondary hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
                    <LayoutGrid className="w-5 h-5" />
                    Bookings
                </div>
                <div className="flex items-center gap-3 px-4 py-3 text-secondary hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
                    <DollarSign className="w-5 h-5" />
                    Payouts
                </div>
            </nav>
            <div className="p-4 border-t border-gray-100">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-200"></div>
                    <div>
                        <p className="text-sm font-medium">Admin User</p>
                        <p className="text-xs text-muted">Super Admin</p>
                    </div>
                </div>
            </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center sticky top-0 z-20">
                <h2 className="text-2xl font-serif text-primary">Stylist Verification</h2>
                <div className="flex items-center gap-4">
                    <button className="p-2 text-secondary hover:bg-gray-100 rounded-full relative">
                        <Bell className="w-5 h-5" />
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-danger rounded-full border border-white"></span>
                    </button>
                    <Button variant="outline" size="sm">Export Data</Button>
                </div>
            </header>

            <main className="p-8 max-w-7xl mx-auto space-y-8">
                
                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                        <p className="text-sm text-muted mb-1">Pending Requests</p>
                        <h3 className="text-3xl font-serif text-primary">{stylists.filter(s => s.status === 'pending').length}</h3>
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                        <p className="text-sm text-muted mb-1">Active Stylists</p>
                        <h3 className="text-3xl font-serif text-success">{stylists.filter(s => s.status === 'active').length}</h3>
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                        <p className="text-sm text-muted mb-1">Total Revenue (Weekly)</p>
                        <h3 className="text-3xl font-serif text-royal">₹124,500</h3>
                    </div>
                </div>

                {/* Chart Section */}
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                    <h3 className="font-serif text-lg mb-6">Revenue Overview</h3>
                    <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#888', fontSize: 12}} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{fill: '#888', fontSize: 12}} />
                                <Tooltip 
                                    contentStyle={{backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}
                                    cursor={{fill: '#f7f7f9'}}
                                />
                                <Bar dataKey="revenue" fill="#2B2C8A" radius={[4, 4, 0, 0]} barSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Verification Table */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                        <h3 className="font-serif text-lg">Pending Verifications</h3>
                    </div>
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 text-xs uppercase text-muted font-medium">
                            <tr>
                                <th className="px-6 py-4">Stylist</th>
                                <th className="px-6 py-4">Credentials</th>
                                <th className="px-6 py-4">Specialty</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {stylists.map((stylist) => (
                                <tr key={stylist.id} className="hover:bg-surface/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <img src={stylist.imageUrl} className="w-10 h-10 rounded-full object-cover" alt="" />
                                            <div>
                                                <p className="font-medium text-primary text-sm">{stylist.name}</p>
                                                <p className="text-xs text-muted">{stylist.experienceYears} Years Exp.</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                            {stylist.school}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-secondary">
                                        {stylist.specialty.join(', ')}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                                            ${stylist.status === 'active' ? 'bg-green-100 text-green-800' : 
                                              stylist.status === 'rejected' ? 'bg-red-100 text-red-800' : 
                                              'bg-yellow-100 text-yellow-800'}`}>
                                            {stylist.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        {stylist.status === 'pending' ? (
                                            <div className="flex items-center justify-end gap-2">
                                                <button onClick={() => handleVerify(stylist.id)} className="p-1 text-success hover:bg-success/10 rounded">
                                                    <CheckCircle className="w-5 h-5" />
                                                </button>
                                                <button onClick={() => handleReject(stylist.id)} className="p-1 text-danger hover:bg-danger/10 rounded">
                                                    <XCircle className="w-5 h-5" />
                                                </button>
                                            </div>
                                        ) : (
                                            <button className="text-muted hover:text-primary">
                                                <MoreHorizontal className="w-5 h-5" />
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    </div>
  );
};