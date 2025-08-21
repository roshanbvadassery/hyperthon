import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

// GET /api/voting/rounds - Get all voting rounds
export async function GET() {
  try {
    if (!supabaseAdmin) {
      return NextResponse.json({ error: 'Supabase admin not configured' }, { status: 500 })
    }

    const { data: rounds, error } = await supabaseAdmin
      .from('voting_rounds')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching rounds:', error)
      return NextResponse.json({ error: 'Failed to fetch rounds' }, { status: 500 })
    }

    return NextResponse.json({ rounds })
  } catch (error) {
    console.error('Error in GET /api/voting/rounds:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/voting/rounds - Create a new voting round
export async function POST(request: NextRequest) {
  try {
    if (!supabaseAdmin) {
      return NextResponse.json({ error: 'Supabase admin not configured' }, { status: 500 })
    }

    const body = await request.json()
    const { name, description } = body

    if (!name) {
      return NextResponse.json({ error: 'Round name is required' }, { status: 400 })
    }

    const { data: round, error } = await supabaseAdmin
      .from('voting_rounds')
      .insert([{
        name,
        description,
        is_active: false,
        is_registration_open: true,
        is_voting_open: false
      }])
      .select()
      .single()

    if (error) {
      console.error('Error creating round:', error)
      return NextResponse.json({ error: 'Failed to create round' }, { status: 500 })
    }

    return NextResponse.json({ round })
  } catch (error) {
    console.error('Error in POST /api/voting/rounds:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 