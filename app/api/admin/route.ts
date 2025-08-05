export const dynamic = 'force-dynamic'
export const revalidate = 0

import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { createClient } from '@supabase/supabase-js'

async function verifyAuth(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }

  const token = authHeader.split(' ')[1];
  
  // Create a client with the user's token to verify authentication
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  
  const supabaseUser = createClient(supabaseUrl, supabaseAnonKey, {
    global: {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  });

  const { data: { user }, error } = await supabaseUser.auth.getUser();
  
  if (error || !user) {
    return null;
  }

  return user;
}

export async function GET(request: NextRequest) {
  try {
    // Verify authentication
    const user = await verifyAuth(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

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