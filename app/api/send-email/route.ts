import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { supabase } from '@/lib/supabase';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const authHeader = request.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.substring(7);
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const body = await request.json();
    const { email, name } = body;

    if (!email || !name) {
      return NextResponse.json(
        { error: 'Email and name are required' },
        { status: 400 }
      );
    }

    const emailContent = `Hi ${name},

Looking forward to hosting this year's first hyperthon with you tomorrow!

Date: 13th September (Saturday)

Time: 2 pm - 8 pm (IST)

Venue:
TinkerSpace, Kochi (https://maps.app.goo.gl/GqjTwnh2qPJFjsD46?g_st=ipc)

Best Regards,
Team Hyperthon`;

    const { data, error } = await resend.emails.send({
      from: 'Team Hyperthon <noreply@hyperthon.org>',
      to: [email],
      cc: ['roshan@permissionless.net', 'hasan@widecanvas.ai'],
      subject: 'Approved for Hyperthon 2025 - Kochi',
      text: emailContent,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      messageId: data?.id 
    });

  } catch (error) {
    console.error('Email sending error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 