"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Users, MapPin, Calendar, Download, Zap, RefreshCw, LogOut, Lock, Check, X } from "lucide-react";
import Link from "next/link";
import type { User } from '@supabase/supabase-js';

interface Registration {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  telegram?: string;
  city: string;
  experience_level: string;
  preferred_languages: string[];
  github_profile?: string;
  linkedin_profile?: string;
  created_at: string;
}

interface CityStats {
  city: string;
  date: string;
  venue: string;
  available: boolean;
  max_capacity: number;
  current_registrations: number;
  fill_percentage: number;
}

interface Analytics {
  total_registrations: number;
  registrations_today: number;
  registrations_this_week: number;
  most_popular_city: string;
  avg_registrations_per_day: number;
}

// Local approval status (client-side only)
type ApprovalStatus = 'pending' | 'approved' | 'rejected';

const getStatusesStorageKey = (user?: User | null) =>
  user?.id ? `admin-statuses:${user.id}` : 'admin-statuses:anonymous';

// Add login component
function AdminLogin({ onLogin }: { onLogin: (user: User) => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      if (data.user) onLogin(data.user);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0000ff] flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#0000ff] rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Lock className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-black text-[#0000ff] uppercase">Admin Login</h1>
          <p className="text-gray-600">Access Hyperthon Dashboard</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0000ff]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0000ff]"
              required
            />
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0000ff] text-white py-2 px-4 rounded-lg font-bold hover:bg-[#0000cc] transition-colors disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [cityStats, setCityStats] = useState<CityStats[]>([]);
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<{ city: string; experience: string; searchTerm: string; status: '' | ApprovalStatus }>({
    city: "",
    experience: "",
    searchTerm: "",
    status: ""
  });
  const [hasLoaded, setHasLoaded] = useState(false);
  const [statuses, setStatuses] = useState<Record<string, ApprovalStatus>>({});

  // Check authentication status
  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setAuthLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' || event === 'SIGNED_OUT' || event === 'USER_UPDATED') {
        setUser(session?.user ?? null);
      }
      setAuthLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const fetchData = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const response = await fetch('/api/admin', {
        headers: {
          'Authorization': `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch admin data');
      }
      
      const data = await response.json();
      
      setRegistrations(data.registrations || []);
      setCityStats(data.cityStats || []);
      setAnalytics(data.analytics);

      // Initialize/merge local statuses for incoming registrations (default: pending)
      setStatuses((prev) => {
        const ids = new Set<string>((data.registrations || []).map((r: Registration) => r.id));
        const merged: Record<string, ApprovalStatus> = {};
        // Keep only current registration ids
        for (const id of ids) {
          merged[id] = prev[id] || 'pending';
        }
        return merged;
      });

    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setHasLoaded(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.id) {
      // Load saved statuses from localStorage on login/session ready
      try {
        const raw = localStorage.getItem(getStatusesStorageKey(user));
        if (raw) {
          const parsed = JSON.parse(raw) as Record<string, ApprovalStatus>;
          setStatuses(parsed);
        }
      } catch (e) {
        console.warn('Failed to load saved statuses');
      }
      // Fetch latest data after restoring statuses
      fetchData();
    }
  }, [user?.id]);

  useEffect(() => {
    // Persist statuses whenever they change
    try {
      if (user) {
        localStorage.setItem(getStatusesStorageKey(user), JSON.stringify(statuses));
      }
    } catch (e) {
      console.warn('Failed to persist statuses');
    }
  }, [statuses, user]);

  const handleApprove = (id: string) => {
    setStatuses((prev) => ({ ...prev, [id]: 'approved' }));
  };

  const handleReject = (id: string) => {
    setStatuses((prev) => ({ ...prev, [id]: 'rejected' }));
  };

  const handleResetStatus = (id: string) => {
    setStatuses((prev) => ({ ...prev, [id]: 'pending' }));
  };

  // Show loading during auth check
  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#0000ff] flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin h-12 w-12 border-4 border-white border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-xl font-bold">Loading...</p>
        </div>
      </div>
    );
  }

  // Show login if not authenticated
  if (!user) {
    return <AdminLogin onLogin={setUser} />;
  }

  const exportToCSV = () => {
    const headers = [
      'Name', 'Email', 'Phone', 'Telegram', 'City', 'Experience',
      'Languages', 'GitHub', 'LinkedIn', 'Registration Date'
    ];

    const csvContent = [
      headers.join(','),
      ...registrations.map(reg => [
        `"${reg.first_name} ${reg.last_name}"`,
        reg.email,
        reg.phone,
        reg.telegram || '',
        reg.city,
        `"${reg.experience_level}"`,
        `"${reg.preferred_languages.join('; ')}"`,
        reg.github_profile || '',
        reg.linkedin_profile || '',
        new Date(reg.created_at).toLocaleDateString()
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `hyperthon-registrations-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const filteredRegistrations = registrations.filter(reg => {
    const matchesCity = !filter.city || reg.city === filter.city;
    const matchesExperience = !filter.experience || reg.experience_level === filter.experience;
    const matchesSearch = !filter.searchTerm || 
      reg.first_name.toLowerCase().includes(filter.searchTerm.toLowerCase()) ||
      reg.last_name.toLowerCase().includes(filter.searchTerm.toLowerCase()) ||
      reg.email.toLowerCase().includes(filter.searchTerm.toLowerCase());
    const currentStatus: ApprovalStatus = statuses[reg.id] || 'pending';
    const matchesStatus = !filter.status || currentStatus === filter.status;
    
    return matchesCity && matchesExperience && matchesSearch && matchesStatus;
  });

  if (loading && !hasLoaded) {
    return (
      <div className="min-h-screen bg-[#0000ff] flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin h-12 w-12 border-4 border-white border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-xl font-bold">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0000ff]">
      {/* Header */}
      <header className="bg-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-[#0000ff] rounded-2xl flex items-center justify-center">
                <Zap className="h-7 w-7 text-white font-bold" />
              </div>
              <div>
                <h1 className="text-3xl font-black text-[#0000ff] uppercase">Hyperthon Admin</h1>
                <p className="text-gray-600 font-semibold">Registration Dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, {user.email}</span>
              <button
                onClick={fetchData}
                className="flex items-center px-4 py-2 bg-[#0000ff] text-white rounded-lg font-bold hover:bg-[#0000cc] transition-colors"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg font-bold hover:bg-red-600 transition-colors"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </button>
              <Link 
                href="/"
                className="px-4 py-2 bg-gray-500 text-white rounded-lg font-bold hover:bg-gray-600 transition-colors"
              >
                Back to Site
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Analytics Cards */}
        {analytics && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-[#0000ff] mr-3" />
                <div>
                  <p className="text-sm font-semibold text-gray-600">Total Registrations</p>
                  <p className="text-2xl font-black text-[#0000ff]">{analytics.total_registrations}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center">
                <Calendar className="h-8 w-8 text-lime-400 mr-3" />
                <div>
                  <p className="text-sm font-semibold text-gray-600">Today</p>
                  <p className="text-2xl font-black text-[#0000ff]">{analytics.registrations_today}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center">
                <MapPin className="h-8 w-8 text-pink-400 mr-3" />
                <div>
                  <p className="text-sm font-semibold text-gray-600">Most Popular</p>
                  <p className="text-lg font-black text-[#0000ff]">{analytics.most_popular_city || 'N/A'}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-blue-400 mr-3" />
                <div>
                  <p className="text-sm font-semibold text-gray-600">Avg/Day</p>
                  <p className="text-2xl font-black text-[#0000ff]">{analytics.avg_registrations_per_day?.toFixed(1) || '0'}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* City Statistics */}
        <div className="bg-white rounded-xl shadow-lg mb-8">
          <div className="p-6 border-b">
            <h2 className="text-2xl font-black text-[#0000ff] uppercase">City Statistics</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
            {cityStats.map((city) => (
              <div key={city.city} className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-black text-lg">{city.city}</h3>
                  <span className={`px-2 py-1 rounded text-xs font-bold ${
                    city.available ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {city.available ? 'Open' : 'Closed'}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{city.venue}</p>
                <p className="text-sm text-gray-600 mb-3">{new Date(city.date).toLocaleDateString()}</p>
                <div className="flex justify-between text-sm">
                  <span>Registrations:</span>
                  <span className="font-bold">{city.current_registrations}/{city.max_capacity}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div 
                    className="bg-[#0000ff] h-2 rounded-full transition-all" 
                    style={{ width: `${Math.min(city.fill_percentage, 100)}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">{city.fill_percentage}% full</p>
              </div>
            ))}
          </div>
        </div>

        {/* Filters and Export */}
        <div className="bg-white rounded-xl shadow-lg mb-8">
          <div className="p-6 border-b">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-black text-[#0000ff] uppercase">Registrations</h2>
              <button
                onClick={exportToCSV}
                className="flex items-center px-4 py-2 bg-lime-400 text-black rounded-lg font-bold hover:bg-lime-300 transition-colors"
              >
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </button>
            </div>
          </div>
          
          <div className="p-6 border-b">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <input
                type="text"
                placeholder="Search by name or email..."
                value={filter.searchTerm}
                onChange={(e) => setFilter({...filter, searchTerm: e.target.value})}
                className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0000ff]"
              />
              <select
                value={filter.city}
                onChange={(e) => setFilter({...filter, city: e.target.value})}
                className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0000ff]"
              >
                <option value="">All Cities</option>
                {[...new Set(registrations.map(r => r.city))].map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
              <select
                value={filter.experience}
                onChange={(e) => setFilter({...filter, experience: e.target.value})}
                className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0000ff]"
              >
                <option value="">All Experience Levels</option>
                <option value="Beginner (0-1 years)">Beginner (0-1 years)</option>
                <option value="Intermediate (1-3 years)">Intermediate (1-3 years)</option>
                <option value="Advanced (3-5 years)">Advanced (3-5 years)</option>
                <option value="Expert (5+ years)">Expert (5+ years)</option>
              </select>
              <select
                value={filter.status}
                onChange={(e) => setFilter({ ...filter, status: e.target.value as '' | ApprovalStatus })}
                className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0000ff]"
              >
                <option value="">All Statuses</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </div>

          {/* Registrations Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">City</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Experience</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Languages</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredRegistrations.map((reg) => {
                  const status: ApprovalStatus = statuses[reg.id] || 'pending';
                  return (
                    <tr key={reg.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-semibold text-gray-900">{reg.first_name} {reg.last_name}</div>
                        <div className="text-sm text-gray-500">{reg.email}</div>
                        {reg.github_profile && (
                          <div className="mt-1">
                            <a
                              href={reg.github_profile}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs font-bold text-[#0000ff] hover:underline"
                            >
                              GitHub
                            </a>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{reg.phone}</div>
                        {reg.telegram && <div className="text-sm text-gray-500">{reg.telegram}</div>}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-bold bg-[#0000ff] text-white rounded-full">
                          {reg.city}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {reg.experience_level}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {reg.preferred_languages.slice(0, 3).map((lang) => (
                            <span key={lang} className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded">
                              {lang}
                            </span>
                          ))}
                          {reg.preferred_languages.length > 3 && (
                            <span className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded">
                              +{reg.preferred_languages.length - 3}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(reg.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={
                          `px-2 py-1 text-xs font-bold rounded-full ${
                            status === 'approved' ? 'bg-green-100 text-green-800' :
                            status === 'rejected' ? 'bg-red-100 text-red-800' :
                            'bg-gray-100 text-gray-800'
                          }`
                        }>
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleApprove(reg.id)}
                            className={`flex items-center gap-1 px-3 py-1 rounded text-xs font-bold transition-colors ${
                              status === 'approved' ? 'bg-green-600 text-white' : 'bg-green-100 text-green-800 hover:bg-green-200'
                            }`}
                          >
                            <Check className="h-3 w-3" /> Approve
                          </button>
                          <button
                            onClick={() => handleReject(reg.id)}
                            className={`flex items-center gap-1 px-3 py-1 rounded text-xs font-bold transition-colors ${
                              status === 'rejected' ? 'bg-red-600 text-white' : 'bg-red-100 text-red-800 hover:bg-red-200'
                            }`}
                          >
                            <X className="h-3 w-3" /> Reject
                          </button>
                          {status !== 'pending' && (
                            <button
                              onClick={() => handleResetStatus(reg.id)}
                              className="px-3 py-1 rounded text-xs font-bold bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors"
                            >
                              Reset
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredRegistrations.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 font-semibold">No registrations found matching your filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 