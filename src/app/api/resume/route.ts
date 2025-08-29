import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const requestBody = await req.json(); // Get JSON body from frontend (education, skills)

    const FASTAPI_URL = process.env.NEXT_PUBLIC_FASTAPI_URL || 'http://localhost:8000' || 'https://ehmt8mro7sonvp9cs5oblz.streamlit.app/' || 'https://hg-airesumebuilder-backend-production.up.railway.app/';

    console.log(`[Next.js API] Forwarding resume request to FastAPI: ${FASTAPI_URL}/api/resume`);

    const response = await fetch(`${FASTAPI_URL}/api/resume`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody), // Send JSON body to FastAPI
    });

    console.log(`[Next.js API] Received resume response from FastAPI with status: ${response.status}`);

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });

  } catch (error) {
    console.error('[Next.js API] Error in resume API route:', error);
    return NextResponse.json(
      { error: 'Internal server error during resume generation.', details: error.message, stack: error.stack },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ message: 'GET method not allowed on this endpoint.' }, { status: 405 });
}
