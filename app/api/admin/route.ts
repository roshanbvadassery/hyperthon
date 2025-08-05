export const dynamic = 'force-dynamic'
export const revalidate = 0

import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET() {
  try {
    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: 'Admin client not configured' },
        { status: 500 }
      )
    }

    // Fetch all data in parallel
    const [registrationsResult, cityStatsResult, analyticsResult] = await Promise.all([
      // Fetch all registrations
      supabaseAdmin
        .from('registrations')
        .select('*')
        .order('created_at', { ascending: false }),
      
      // Fetch city statistics
      supabaseAdmin
        .from('registration_stats')
        .select('*'),
      
      // Fetch analytics
      supabaseAdmin
        .rpc('get_registration_analytics')
    ])

    const { data: registrations, error: regsError } = registrationsResult
    const { data: cityStats, error: cityError } = cityStatsResult
    const { data: analytics, error: analyticsError } = analyticsResult

    if (regsError) {
      console.error('Registrations error:', regsError)
      return NextResponse.json(
        { error: 'Failed to fetch registrations' },
        { status: 500 }
      )
    }

    if (cityError) {
      console.error('City stats error:', cityError)
      return NextResponse.json(
        { error: 'Failed to fetch city statistics' },
        { status: 500 }
      )
    }

    if (analyticsError) {
      console.error('Analytics error:', analyticsError)
      return NextResponse.json(
        { error: 'Failed to fetch analytics' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      registrations: registrations || [],
      cityStats: cityStats || [],
      analytics: analytics && analytics.length > 0 ? analytics[0] : null
    })

  } catch (error) {
    console.error('Admin API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 