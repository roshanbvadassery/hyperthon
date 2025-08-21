"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Users, Vote, UserPlus, CheckCircle, AlertCircle, Trophy } from 'lucide-react';
import { VotingRound, VotingParticipant } from '@/lib/supabase';

export default function VotingPage() {
  const params = useParams();
  const roundId = params.roundId as string;

  const [round, setRound] = useState<VotingRound | null>(null);
  const [participants, setParticipants] = useState<VotingParticipant[]>([]);
  const [loading, setLoading] = useState(true);
  const [registering, setRegistering] = useState(false);
  const [voting, setVoting] = useState(false);
  const [newParticipantName, setNewParticipantName] = useState('');
  const [voterName, setVoterName] = useState('');
  const [selectedParticipant, setSelectedParticipant] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    if (roundId) {
      fetchRoundData();
      fetchParticipants();
    }
  }, [roundId]);

  const fetchRoundData = async () => {
    try {
      const response = await fetch('/api/voting/rounds');
      const data = await response.json();
      if (data.rounds) {
        const currentRound = data.rounds.find((r: VotingRound) => r.id === roundId);
        setRound(currentRound || null);
      }
    } catch (error) {
      console.error('Error fetching round:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchParticipants = async () => {
    try {
      const response = await fetch(`/api/voting/participants?roundId=${roundId}`);
      const data = await response.json();
      if (data.participants) {
        setParticipants(data.participants);
      }
    } catch (error) {
      console.error('Error fetching participants:', error);
    }
  };

  const registerParticipant = async () => {
    if (!newParticipantName.trim()) return;

    setRegistering(true);
    try {
      const response = await fetch('/api/voting/participants', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roundId,
          name: newParticipantName.trim(),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: 'Successfully registered!' });
        setNewParticipantName('');
        fetchParticipants();
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to register' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to register' });
    } finally {
      setRegistering(false);
    }
  };

  const castVote = async () => {
    if (!voterName.trim() || !selectedParticipant) return;

    setVoting(true);
    try {
      const response = await fetch('/api/voting/vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roundId,
          voterName: voterName.trim(),
          votedForId: selectedParticipant,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: 'Vote cast successfully!' });
        setHasVoted(true);
        setVoterName('');
        setSelectedParticipant(null);
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to cast vote' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to cast vote' });
    } finally {
      setVoting(false);
    }
  };

  const getStatusBadge = () => {
    if (!round) return null;
    
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
        <div className="text-white text-xl font-bold">Loading voting round...</div>
      </div>
    );
  }

  if (!round) {
    return (
      <div className="min-h-screen bg-[#0000ff] flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="text-center py-12">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">Round Not Found</h2>
            <p className="text-gray-600">The voting round you're looking for doesn't exist.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0000ff] p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-black text-white mb-2 uppercase tracking-tight">
            {round.name}
          </h1>
          {round.description && (
            <p className="text-white/80 font-semibold mb-4">{round.description}</p>
          )}
          <div className="flex justify-center">
            {getStatusBadge()}
          </div>
        </div>

        {/* Alert Messages */}
        {message && (
          <Alert className={`mb-6 ${message.type === 'success' ? 'border-green-500' : 'border-red-500'}`}>
            <AlertDescription className="flex items-center gap-2">
              {message.type === 'success' ? (
                <CheckCircle className="h-4 w-4 text-green-500" />
              ) : (
                <AlertCircle className="h-4 w-4 text-red-500" />
              )}
              {message.text}
            </AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Registration Section */}
          {round.is_registration_open && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserPlus className="h-5 w-5" />
                  Register as Participant
                </CardTitle>
                <CardDescription>
                  Add your name to participate in this voting round
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Input
                    placeholder="Enter your name"
                    value={newParticipantName}
                    onChange={(e) => setNewParticipantName(e.target.value)}
                    disabled={registering}
                  />
                  <Button
                    onClick={registerParticipant}
                    disabled={!newParticipantName.trim() || registering}
                    className="w-full bg-[#0000ff] hover:bg-[#0000cc]"
                  >
                    {registering ? 'Registering...' : 'Register'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Voting Section */}
          {round.is_voting_open && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Vote className="h-5 w-5" />
                  Cast Your Vote
                </CardTitle>
                <CardDescription>
                  Enter your name and select who you want to vote for
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!hasVoted ? (
                  <div className="space-y-4">
                    <Input
                      placeholder="Enter your name (voter)"
                      value={voterName}
                      onChange={(e) => setVoterName(e.target.value)}
                      disabled={voting}
                    />
                    <div className="space-y-2">
                      <label className="text-sm font-semibold">Select participant to vote for:</label>
                      <div className="space-y-2 max-h-40 overflow-y-auto">
                        {participants.map((participant) => (
                          <label
                            key={participant.id}
                            className="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                          >
                            <input
                              type="radio"
                              name="vote"
                              value={participant.id}
                              checked={selectedParticipant === participant.id}
                              onChange={(e) => setSelectedParticipant(e.target.value)}
                              className="mr-3"
                            />
                            <span className="font-medium">{participant.name}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <Button
                      onClick={castVote}
                      disabled={!voterName.trim() || !selectedParticipant || voting}
                      className="w-full bg-green-600 hover:bg-green-700"
                    >
                      {voting ? 'Casting Vote...' : 'Cast Vote'}
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                    <h3 className="text-lg font-bold mb-2">Vote Cast Successfully!</h3>
                    <p className="text-gray-600">Thank you for participating in this round.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Participants List */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Participants ({participants.length})
            </CardTitle>
            <CardDescription>
              Current participants in this voting round
            </CardDescription>
          </CardHeader>
          <CardContent>
            {participants.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {participants.map((participant, index) => (
                  <div
                    key={participant.id}
                    className="p-3 bg-gray-50 rounded-lg text-center"
                  >
                    <div className="font-medium">{participant.name}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      #{index + 1}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No participants registered yet
              </div>
            )}
          </CardContent>
        </Card>

        {/* Results Link */}
        {round.is_active && (
          <Card className="mt-6">
            <CardContent className="text-center py-6">
              <Trophy className="h-8 w-8 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-lg font-bold mb-2">Want to see the results?</h3>
              <Button
                variant="outline"
                onClick={() => window.open(`/voting/${roundId}/results`, '_blank')}
              >
                View Results
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
} 