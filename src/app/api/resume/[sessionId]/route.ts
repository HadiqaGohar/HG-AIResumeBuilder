import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { sessionId: string } }
) {
  try {
    const { sessionId } = params;
    
    const FASTAPI_URL = process.env.NEXT_PUBLIC_FASTAPI_URL || 
                        'https://hg-airesumebuilder-backend-production.up.railway.app';
    
    const backendUrl = FASTAPI_URL.replace(/\/$/, '');
    
    const response = await fetch(`${backendUrl}/api/resume/${sessionId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.error || 'Resume not found' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching resume:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
