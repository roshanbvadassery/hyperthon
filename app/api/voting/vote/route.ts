import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// POST /api/voting/vote - Cast a vote
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { roundId, voterName, votedForId } = body

    if (!roundId || !voterName || !votedForId) {
      return NextResponse.json({ error: 'Round ID, voter name, and voted for ID are required' }, { status: 400 })
    }

    // Check if voting is open for this round
    const { data: round, error: roundError } = await supabase
      .from('voting_rounds')
      .select('is_voting_open')
      .eq('id', roundId)
      .single()

    if (roundError || !round) {
      return NextResponse.json({ error: 'Round not found' }, { status: 404 })
    }

    if (!round.is_voting_open) {
      return NextResponse.json({ error: 'Voting is closed for this round' }, { status: 400 })
    }

    // Check if the participant being voted for exists in this round
    const { data: participant, error: participantError } = await supabase
      .from('voting_participants')
      .select('id')
      .eq('id', votedForId)
      .eq('round_id', roundId)
      .single()

    if (participantError || !participant) {
      return NextResponse.json({ error: 'Participant not found in this round' }, { status: 404 })
    }

    const { data: vote, error } = await supabase
      .from('votes')
      .insert([{
        round_id: roundId,
        voter_name: voterName.trim(),
        voted_for_id: votedForId
      }])
      .select()
      .single()

    if (error) {
      if (error.code === '23505') { // Unique constraint violation
        return NextResponse.json({ error: 'You have already voted in this round' }, { status: 400 })
      }
      console.error('Error casting vote:', error)
      return NextResponse.json({ error: 'Failed to cast vote' }, { status: 500 })
    }

    return NextResponse.json({ vote, success: true })
  } catch (error) {
    console.error('Error in POST /api/voting/vote:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 