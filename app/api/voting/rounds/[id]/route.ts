import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

// PUT /api/voting/rounds/[id] - Update a voting round
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    if (!supabaseAdmin) {
      return NextResponse.json({ error: 'Supabase admin not configured' }, { status: 500 })
    }

    const body = await request.json()
    const { name, description, is_active, is_registration_open, is_voting_open } = body

    const updateData: any = {}
    if (name !== undefined) updateData.name = name
    if (description !== undefined) updateData.description = description
    if (is_active !== undefined) updateData.is_active = is_active
    if (is_registration_open !== undefined) updateData.is_registration_open = is_registration_open
    if (is_voting_open !== undefined) updateData.is_voting_open = is_voting_open

    const { data: round, error } = await supabaseAdmin
      .from('voting_rounds')
      .update(updateData)
      .eq('id', params.id)
      .select()
      .single()

    if (error) {
      console.error('Error updating round:', error)
      return NextResponse.json({ error: 'Failed to update round' }, { status: 500 })
    }

    return NextResponse.json({ round })
  } catch (error) {
    console.error('Error in PUT /api/voting/rounds/[id]:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE /api/voting/rounds/[id] - Delete a voting round
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    if (!supabaseAdmin) {
      return NextResponse.json({ error: 'Supabase admin not configured' }, { status: 500 })
    }

    const { error } = await supabaseAdmin
      .from('voting_rounds')
      .delete()
      .eq('id', params.id)

    if (error) {
      console.error('Error deleting round:', error)
      return NextResponse.json({ error: 'Failed to delete round' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error in DELETE /api/voting/rounds/[id]:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 