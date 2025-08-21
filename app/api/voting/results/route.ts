import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// GET /api/voting/results?roundId=... - Get voting results for a round
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const roundId = searchParams.get('roundId')

    if (!roundId) {
      return NextResponse.json({ error: 'Round ID is required' }, { status: 400 })
    }

    const { data: results, error } = await supabase
      .from('voting_results')
      .select('*')
      .eq('round_id', roundId)
      .order('vote_count', { ascending: false })

    if (error) {
      console.error('Error fetching results:', error)
      return NextResponse.json({ error: 'Failed to fetch results' }, { status: 500 })
    }

    // Get total votes for this round
    const { data: totalVotes, error: totalError } = await supabase
      .from('votes')
      .select('id', { count: 'exact' })
      .eq('round_id', roundId)

    if (totalError) {
      console.error('Error fetching total votes:', totalError)
      return NextResponse.json({ error: 'Failed to fetch total votes' }, { status: 500 })
    }

    return NextResponse.json({ 
      results, 
      totalVotes: totalVotes?.length || 0 
    })
  } catch (error) {
    console.error('Error in GET /api/voting/results:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 