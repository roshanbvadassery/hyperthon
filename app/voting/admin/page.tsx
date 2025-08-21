"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Plus, Settings, Users, BarChart3, Trash2 } from 'lucide-react';
import { VotingRound } from '@/lib/supabase';

export default function VotingAdmin() {
  const [rounds, setRounds] = useState<VotingRound[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [newRound, setNewRound] = useState({ name: '', description: '' });
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

  const createRound = async () => {
    if (!newRound.name.trim()) return;

    try {
      const response = await fetch('/api/voting/rounds', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRound),
      });

      if (response.ok) {
        setNewRound({ name: '', description: '' });
        setIsCreating(false);
        fetchRounds();
      }
    } catch (error) {
      console.error('Error creating round:', error);
    }
  };

  const updateRound = async (roundId: string, updates: Partial<VotingRound>) => {
    try {
      const response = await fetch(`/api/voting/rounds/${roundId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });

      if (response.ok) {
        fetchRounds();
      }
    } catch (error) {
      console.error('Error updating round:', error);
    }
  };

  const deleteRound = async (roundId: string) => {
    if (!confirm('Are you sure you want to delete this round? This will delete all participants and votes.')) {
      return;
    }

    try {
      const response = await fetch(`/api/voting/rounds/${roundId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchRounds();
      }
    } catch (error) {
      console.error('Error deleting round:', error);
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

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0000ff] flex items-center justify-center">
        <div className="text-white text-xl font-bold">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0000ff] p-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-black text-white mb-2 uppercase tracking-tight">
            Voting Admin
          </h1>
          <p className="text-white/80 font-semibold">
            Manage voting rounds and control the voting process
          </p>
        </div>

        {/* Create New Round */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Create New Voting Round
            </CardTitle>
            <CardDescription>
              Start a new voting round for participants to register and vote
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!isCreating ? (
              <Button onClick={() => setIsCreating(true)} className="bg-[#0000ff] hover:bg-[#0000cc]">
                <Plus className="mr-2 h-4 w-4" />
                New Round
              </Button>
            ) : (
              <div className="space-y-4">
                <Input
                  placeholder="Round name (e.g., Speed Coding Round 1)"
                  value={newRound.name}
                  onChange={(e) => setNewRound({ ...newRound, name: e.target.value })}
                />
                <Textarea
                  placeholder="Description (optional)"
                  value={newRound.description}
                  onChange={(e) => setNewRound({ ...newRound, description: e.target.value })}
                />
                <div className="flex gap-2">
                  <Button onClick={createRound} className="bg-[#0000ff] hover:bg-[#0000cc]">
                    Create Round
                  </Button>
                  <Button variant="outline" onClick={() => setIsCreating(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Voting Rounds */}
        <div className="grid gap-6">
          {rounds.map((round) => (
            <Card key={round.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">{round.name}</CardTitle>
                    {round.description && (
                      <CardDescription className="mt-1">{round.description}</CardDescription>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(round)}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteRound(round.id!)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Registration Control */}
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Registration
                    </Label>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={round.is_registration_open}
                        onCheckedChange={(checked) =>
                          updateRound(round.id!, { is_registration_open: checked })
                        }
                      />
                      <span className="text-sm">
                        {round.is_registration_open ? 'Open' : 'Closed'}
                      </span>
                    </div>
                  </div>

                  {/* Voting Control */}
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold flex items-center gap-2">
                      <BarChart3 className="h-4 w-4" />
                      Voting
                    </Label>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={round.is_voting_open}
                        onCheckedChange={(checked) =>
                          updateRound(round.id!, { is_voting_open: checked })
                        }
                      />
                      <span className="text-sm">
                        {round.is_voting_open ? 'Open' : 'Closed'}
                      </span>
                    </div>
                  </div>

                  {/* Active Status */}
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold flex items-center gap-2">
                      <Settings className="h-4 w-4" />
                      Active Status
                    </Label>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={round.is_active}
                        onCheckedChange={(checked) =>
                          updateRound(round.id!, { is_active: checked })
                        }
                      />
                      <span className="text-sm">
                        {round.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold">Quick Actions</Label>
                    <div className="space-y-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full"
                        onClick={() => window.open(`/voting/${round.id}`, '_blank')}
                      >
                        View Voting Page
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full"
                        onClick={() => window.open(`/voting/${round.id}/results`, '_blank')}
                      >
                        View Results
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="mt-4 text-xs text-gray-500">
                  Created: {new Date(round.created_at!).toLocaleString()}
                  {round.updated_at !== round.created_at && (
                    <> • Updated: {new Date(round.updated_at!).toLocaleString()}</>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}

          {rounds.length === 0 && (
            <Card>
              <CardContent className="text-center py-12">
                <p className="text-gray-500 mb-4">No voting rounds created yet</p>
                <Button
                  onClick={() => setIsCreating(true)}
                  className="bg-[#0000ff] hover:bg-[#0000cc]"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Create Your First Round
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
} 