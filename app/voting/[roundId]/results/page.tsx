"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Trophy, Users, BarChart3, Crown, Medal, Award, ArrowLeft, RefreshCw } from 'lucide-react';
import { VotingRound, VotingResult } from '@/lib/supabase';

export default function ResultsPage() {
  const params = useParams();
  const roundId = params.roundId as string;

  const [round, setRound] = useState<VotingRound | null>(null);
  const [results, setResults] = useState<VotingResult[]>([]);
  const [totalVotes, setTotalVotes] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (roundId) {
      fetchData();
      // Auto-refresh results every 10 seconds if voting is open
      const interval = setInterval(() => {
        if (round?.is_voting_open) {
          fetchResults();
        }
      }, 10000);

      return () => clearInterval(interval);
    }
  }, [roundId, round?.is_voting_open]);

  const fetchData = async () => {
    await Promise.all([fetchRoundData(), fetchResults()]);
    setLoading(false);
  };

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
    }
  };

  const fetchResults = async () => {
    try {
      const response = await fetch(`/api/voting/results?roundId=${roundId}`);
      const data = await response.json();
      if (data.results) {
        setResults(data.results);
        setTotalVotes(data.totalVotes || 0);
      }
    } catch (error) {
      console.error('Error fetching results:', error);
    }
  };

  const getPositionIcon = (position: number) => {
    switch (position) {
      case 1:
        return <Crown className="h-6 w-6 text-yellow-500" />;
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />;
      case 3:
        return <Award className="h-6 w-6 text-amber-600" />;
      default:
        return <div className="h-6 w-6 rounded-full bg-gray-300 flex items-center justify-center text-xs font-bold">{position}</div>;
    }
  };

  const getPositionColor = (position: number) => {
    switch (position) {
      case 1:
        return 'bg-gradient-to-r from-yellow-400 to-yellow-600';
      case 2:
        return 'bg-gradient-to-r from-gray-300 to-gray-500';
      case 3:
        return 'bg-gradient-to-r from-amber-400 to-amber-600';
      default:
        return 'bg-gradient-to-r from-blue-400 to-blue-600';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0000ff] flex items-center justify-center">
        <div className="text-white text-xl font-bold">Loading results...</div>
      </div>
    );
  }

  if (!round) {
    return (
      <div className="min-h-screen bg-[#0000ff] flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="text-center py-12">
            <h2 className="text-xl font-bold mb-2">Round Not Found</h2>
            <p className="text-gray-600">The voting round you're looking for doesn't exist.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Filter out participants with null IDs and sort by vote count
  const sortedResults = results
    .filter(result => result.participant_id)
    .sort((a, b) => b.vote_count - a.vote_count);

  const maxVotes = sortedResults.length > 0 ? sortedResults[0].vote_count : 0;

  return (
    <div className="min-h-screen bg-[#0000ff] p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Button
              variant="outline"
              onClick={() => window.history.back()}
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <Button
              variant="outline"
              onClick={fetchResults}
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
          
          <h1 className="text-4xl font-black text-white mb-2 uppercase tracking-tight">
            {round.name} Results
          </h1>
          {round.description && (
            <p className="text-white/80 font-semibold mb-4">{round.description}</p>
          )}
          
          <div className="flex items-center gap-4">
            <Badge className={`${round.is_voting_open ? 'bg-green-500' : 'bg-gray-500'}`}>
              {round.is_voting_open ? 'Live Results' : 'Final Results'}
            </Badge>
            <div className="text-white/80 font-semibold">
              Total Votes: {totalVotes}
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Users className="h-5 w-5" />
                Participants
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black">{sortedResults.length}</div>
              <p className="text-sm text-gray-600">Total registered</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <BarChart3 className="h-5 w-5" />
                Total Votes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black">{totalVotes}</div>
              <p className="text-sm text-gray-600">Votes cast</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Trophy className="h-5 w-5" />
                Leader
              </CardTitle>
            </CardHeader>
            <CardContent>
              {sortedResults.length > 0 ? (
                <>
                  <div className="text-xl font-black truncate">{sortedResults[0].participant_name}</div>
                  <p className="text-sm text-gray-600">{sortedResults[0].vote_count} votes</p>
                </>
              ) : (
                <div className="text-gray-500">No votes yet</div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Results */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5" />
              Voting Results
            </CardTitle>
            <CardDescription>
              {round.is_voting_open ? 'Live results - updates automatically' : 'Final results'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {sortedResults.length > 0 ? (
              <div className="space-y-4">
                {sortedResults.map((result, index) => {
                  const position = index + 1;
                  const percentage = maxVotes > 0 ? (result.vote_count / maxVotes) * 100 : 0;
                  
                  return (
                    <div
                      key={result.participant_id}
                      className={`p-4 rounded-lg ${getPositionColor(position)} text-white relative overflow-hidden`}
                    >
                      <div className="flex items-center justify-between relative z-10">
                        <div className="flex items-center gap-3">
                          {getPositionIcon(position)}
                          <div>
                            <h3 className="font-black text-lg">{result.participant_name}</h3>
                            <p className="text-white/80 text-sm">
                              Position #{position}
                            </p>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="text-2xl font-black">{result.vote_count}</div>
                          <div className="text-white/80 text-sm">
                            {totalVotes > 0 ? Math.round((result.vote_count / totalVotes) * 100) : 0}%
                          </div>
                        </div>
                      </div>
                      
                      {/* Progress bar background */}
                      <div className="absolute inset-0 bg-black/20">
                        <div 
                          className="h-full bg-white/20 transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <Trophy className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-500 mb-2">No Results Yet</h3>
                <p className="text-gray-400">
                  {round.is_voting_open 
                    ? 'Voting is open but no votes have been cast yet.'
                    : 'No votes were cast in this round.'
                  }
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Voting Status */}
        {round.is_voting_open && (
          <Card className="mt-6">
            <CardContent className="text-center py-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-full font-semibold">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                Voting is currently open
              </div>
              <p className="text-gray-600 mt-2">
                Results update automatically every 10 seconds
              </p>
              <Button
                className="mt-4"
                onClick={() => window.open(`/voting/${roundId}`, '_blank')}
              >
                Go to Voting Page
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
} 