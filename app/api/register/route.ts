import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin, type Registration } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: 'Admin client not configured' },
        { status: 500 }
      )
    }

    const body = await request.json()
    
    // Validate required fields
    const requiredFields = [
      'firstName', 'lastName', 'email', 'phone', 
      'city', 'experience', 'agreedToTerms'
    ]
    
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        )
      }
    }

    // Check if email already exists
    const { data: existingUser } = await supabaseAdmin
      .from('registrations')
      .select('email')
      .eq('email', body.email)
      .single()

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already registered!' },
        { status: 409 }
      )
    }

    // Map form data to database structure
    const registrationData: Omit<Registration, 'id' | 'created_at' | 'updated_at'> = {
      first_name: body.firstName,
      last_name: body.lastName,
      email: body.email,
      phone: body.phone,
      telegram: body.telegram || null,
      city: body.city,
      experience_level: body.experience,
      preferred_languages: body.preferredLanguages || [],
      github_profile: body.github || null,
      linkedin_profile: body.linkedin || null,
      agreed_to_terms: body.agreedToTerms,
      agreed_to_marketing: body.agreedToMarketing || false
    }

    // Insert registration into database
    const { data: registration, error } = await supabaseAdmin
      .from('registrations')
      .insert([registrationData])
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to save registration' },
        { status: 500 }
      )
    }

    // Update city registration count
    await supabaseAdmin.rpc('increment_city_registrations', { 
      city_name: body.city 
    })

    return NextResponse.json({
      success: true,
      message: 'Registration successful!',
      data: {
        id: registration.id,
        name: `${registration.first_name} ${registration.last_name}`,
        city: registration.city
      }
    })

  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: 'Admin client not configured' },
        { status: 500 }
      )
    }

    // Get registration statistics
    const { data: stats, error } = await supabaseAdmin
      .from('registrations')
      .select('city, created_at')

    if (error) throw error

    // Count by city
    const cityStats = stats.reduce((acc: Record<string, number>, reg) => {
      acc[reg.city] = (acc[reg.city] || 0) + 1
      return acc
    }, {})

    return NextResponse.json({
      total: stats.length,
      by_city: cityStats
    })
    
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    )
  }
} 