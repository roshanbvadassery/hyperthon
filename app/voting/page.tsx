"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Vote, Users, BarChart3, Settings, Plus, ArrowRight } from 'lucide-react';
import { VotingRound } from '@/lib/supabase';

export default function VotingLanding() {
  const [rounds, setRounds] = useState<VotingRound[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRounds();
  }, []);

  const fetchRounds = async () => {
    try {
      const response = await fetch('/api/voting/rounds');
      const data = await response.json();
      if (data.rounds) {
        setRounds(data.rounds);
      }
    } catch (error) {
      console.error('Error fetching rounds:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (round: VotingRound) => {
    if (round.is_voting_open) {
      return <Badge className="bg-green-500">Voting Open</Badge>;
    } else if (round.is_registration_open) {
      return <Badge className="bg-blue-500">Registration Open</Badge>;
    } else if (round.is_active) {
      return <Badge className="bg-yellow-500">Active</Badge>;
    } else {
      return <Badge variant="secondary">Inactive</Badge>;
    }
  };

  const activeRounds = rounds.filter(round => round.is_active || round.is_registration_open || round.is_voting_open);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0000ff] flex items-center justify-center">
        <div className="text-white text-xl font-bold">Loading voting rounds...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0000ff] p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-black text-white mb-4 uppercase tracking-tight">
            Hyperthon Voting
          </h1>
          <p className="text-white/80 font-semibold text-lg mb-6">
            Participate in anonymous voting rounds. Register, vote, and see live results!
          </p>
          
        </div>

        {/* Active Rounds */}
        {activeRounds.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-black text-white mb-6 uppercase">Active Voting Rounds</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeRounds.map((round) => (
                <Card key={round.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <CardTitle className="text-lg">{round.name}</CardTitle>
                      {getStatusBadge(round)}
                    </div>
                    {round.description && (
                      <CardDescription>{round.description}</CardDescription>
                    )}
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="text-sm text-gray-600">
                        Created: {new Date(round.created_at!).toLocaleDateString()}
                      </div>
                      
                      <div className="flex gap-2">
                        <Link href={`/voting/${round.id}`} className="flex-1">
                          <Button className="w-full bg-[#0000ff] hover:bg-[#0000cc]">
                            <Vote className="mr-2 h-4 w-4" />
                            Join Round
                          </Button>
                        </Link>
                        
                        <Link href={`/voting/${round.id}/results`}>
                          <Button variant="outline" size="icon">
                            <BarChart3 className="h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* All Rounds */}
        <div>
          <h2 className="text-2xl font-black text-white mb-6 uppercase">All Voting Rounds</h2>
          
          {rounds.length > 0 ? (
            <div className="grid gap-4">
              {rounds.map((round) => (
                <Card key={round.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold">{round.name}</h3>
                          {getStatusBadge(round)}
                        </div>
                        {round.description && (
                          <p className="text-gray-600 mb-2">{round.description}</p>
                        )}
                        <div className="text-sm text-gray-500">
                          Created: {new Date(round.created_at!).toLocaleString()}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Link href={`/voting/${round.id}`}>
                          <Button variant="outline" size="sm">
                            <Users className="mr-2 h-4 w-4" />
                            Join
                          </Button>
                        </Link>
                        <Link href={`/voting/${round.id}/results`}>
                          <Button variant="outline" size="sm">
                            <BarChart3 className="mr-2 h-4 w-4" />
                            Results
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <Vote className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-500 mb-2">No Voting Rounds Yet</h3>
                <p className="text-gray-400 mb-6">
                  Create your first voting round to get started with the blind voting system.
                </p>
                <Link href="/voting/admin">
                  <Button className="bg-[#0000ff] hover:bg-[#0000cc]">
                    <Plus className="mr-2 h-4 w-4" />
                    Create First Round
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>

        {/* How It Works */}
        <Card className="mt-12">
          <CardHeader>
            <CardTitle>How Blind Voting Works</CardTitle>
            <CardDescription>Simple steps to participate in anonymous voting</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold">1</span>
                </div>
                <h4 className="font-bold mb-2">Register as Participant</h4>
                <p className="text-gray-600 text-sm">Add your name to join a voting round when registration is open</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold">2</span>
                </div>
                <h4 className="font-bold mb-2">Cast Your Vote</h4>
                <p className="text-gray-600 text-sm">Vote for any participant when voting opens - completely anonymous</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold">3</span>
                </div>
                <h4 className="font-bold mb-2">View Results</h4>
                <p className="text-gray-600 text-sm">See live results and final rankings - votes remain anonymous</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-12 text-center">
          <Link href="/">
            <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
              <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
} 