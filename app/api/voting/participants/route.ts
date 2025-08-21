import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// GET /api/voting/participants?roundId=... - Get participants for a round
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const roundId = searchParams.get('roundId')

    if (!roundId) {
      return NextResponse.json({ error: 'Round ID is required' }, { status: 400 })
    }

    const { data: participants, error } = await supabase
      .from('voting_participants')
      .select('*')
      .eq('round_id', roundId)
      .order('created_at', { ascending: true })

    if (error) {
      console.error('Error fetching participants:', error)
      return NextResponse.json({ error: 'Failed to fetch participants' }, { status: 500 })
    }

    return NextResponse.json({ participants })
  } catch (error) {
    console.error('Error in GET /api/voting/participants:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/voting/participants - Register as a participant
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { roundId, name } = body

    if (!roundId || !name) {
      return NextResponse.json({ error: 'Round ID and name are required' }, { status: 400 })
    }

    // Check if registration is open for this round
    const { data: round, error: roundError } = await supabase
      .from('voting_rounds')
      .select('is_registration_open')
      .eq('id', roundId)
      .single()

    if (roundError || !round) {
      return NextResponse.json({ error: 'Round not found' }, { status: 404 })
    }

    if (!round.is_registration_open) {
      return NextResponse.json({ error: 'Registration is closed for this round' }, { status: 400 })
    }

    const { data: participant, error } = await supabase
      .from('voting_participants')
      .insert([{
        round_id: roundId,
        name: name.trim()
      }])
      .select()
      .single()

    if (error) {
      if (error.code === '23505') { // Unique constraint violation
        return NextResponse.json({ error: 'This name is already registered for this round' }, { status: 400 })
      }
      console.error('Error creating participant:', error)
      return NextResponse.json({ error: 'Failed to register participant' }, { status: 500 })
    }

    return NextResponse.json({ participant })
  } catch (error) {
    console.error('Error in POST /api/voting/participants:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 