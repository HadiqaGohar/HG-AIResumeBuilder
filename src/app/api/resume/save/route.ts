import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    const FASTAPI_URL = process.env.NEXT_PUBLIC_FASTAPI_URL || 
                        'https://hg-airesumebuilder-backend-production.up.railway.app';
    
    const backendUrl = FASTAPI_URL.replace(/\/$/, '');
    
    const response = await fetch(`${backendUrl}/api/resume/save`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.error || 'Failed to save resume' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error saving resume:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
