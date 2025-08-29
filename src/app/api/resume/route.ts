// import { NextRequest, NextResponse } from 'next/server';

// export async function POST(req: NextRequest) {
//   try {
//     const requestBody = await req.json(); // Get JSON body from frontend (education, skills)

//     const FASTAPI_URL = process.env.NEXT_PUBLIC_FASTAPI_URL ||'http://localhost:8000'|| 'https://hg-airesumebuilder-backend-production.up.railway.app/'  ;
    

//     console.log(`[Next.js API] Forwarding resume request to FastAPI: ${FASTAPI_URL}/api/resume`);

//     const response = await fetch(`${FASTAPI_URL}/api/resume`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(requestBody), // Send JSON body to FastAPI
//     });

//     console.log(`[Next.js API] Received resume response from FastAPI with status: ${response.status}`);

//     const data = await response.json();
//     return NextResponse.json(data, { status: response.status });

//   } catch (error) {
//     console.error('[Next.js API] Error in resume API route:', error);
//     return NextResponse.json(
//       { error: 'Internal server error during resume generation.', details: error.message, stack: error.stack },
//       { status: 500 }
//     );
//   }
// }

// export async function GET() {
//   return NextResponse.json({ message: 'GET method not allowed on this endpoint.' }, { status: 405 });
// }



// -----------------------------



import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const requestBody = await req.json();

    // Get backend URL from environment (without trailing slash)
    const FASTAPI_URL = process.env.NEXT_PUBLIC_FASTAPI_URL || 
                        process.env.FASTAPI_URL || 
                        'https://hg-airesumebuilder-backend-production.up.railway.app';

    // Remove any trailing slash
    const backendUrl = FASTAPI_URL.replace(/\/$/, '');
    
    console.log(`[Next.js API] Forwarding resume request to FastAPI: ${backendUrl}/api/resume`);

    const response = await fetch(`${backendUrl}/api/resume`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    console.log(`[Next.js API] Received resume response from FastAPI with status: ${response.status}`);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[Next.js API] Backend error: ${response.status} - ${errorText}`);
      
      return NextResponse.json(
        { error: 'Backend service unavailable', details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });

  } catch (error) {
    console.error('[Next.js API] Error in resume API route:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error during resume generation.',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ message: 'GET method not allowed on this endpoint.' }, { status: 405 });
}
