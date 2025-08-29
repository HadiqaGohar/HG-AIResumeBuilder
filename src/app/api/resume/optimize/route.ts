// import { NextRequest, NextResponse } from 'next/server';
// import { OptimizationResponse } from '../../../../../lib/api'; // Import the OptimizationResponse type from lib/api.ts

// const BACKEND_URL = process.env.NEXT_PUBLIC_FASTAPI_URL  ||  'http://localhost:8000' || 'https://hg-airesumebuilder-backend-production.up.railway.app/' ;


// export async function POST(request: NextRequest) {
//   try {
//     const body = await request.json();
    
//     const response = await fetch(`${BACKEND_URL}/api/resume/optimize`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(body),
//     });

//     if (!response.ok) {
//       const errorData = await response.json().catch(() => ({ detail: 'Unknown error' }));
//       return NextResponse.json(
//         { error: errorData.detail || 'Failed to optimize resume' },
//         { status: response.status }
//       );
//     }

//     const data = await response.json() as OptimizationResponse;

//     // Validate response structure
//     if (
//       !data ||
//       typeof data.optimized_summary !== 'string' ||
//       !Array.isArray(data.suggested_skills) ||
//       !Array.isArray(data.keyword_matches) ||
//       !Array.isArray(data.improvement_suggestions)
//     ) {
//       console.error('Invalid response structure:', data);
//       return NextResponse.json(
//         { error: 'Invalid response format from backend' },
//         { status: 500 }
//       );
//     }

//     return NextResponse.json(data);
//   } catch (error) {
//     console.error('Resume optimization error:', error);
//     return NextResponse.json(
//       { error: 'Internal server error' },
//       { status: 500 }
//     );
//   }
// }


// ---------------




import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Get backend URL from environment (without trailing slash)
    const BACKEND_URL = process.env.NEXT_PUBLIC_FASTAPI_URL || 
                        process.env.FASTAPI_URL || 
                        'https://hg-airesumebuilder-backend-production.up.railway.app';

    const backendUrl = BACKEND_URL.replace(/\/$/, '');
    
    console.log(`[Next.js API] Forwarding optimize request to: ${backendUrl}/api/resume/optimize`);

    const response = await fetch(`${backendUrl}/api/resume/optimize`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      timeout: 30000, // 30 second timeout
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ detail: 'Unknown error' }));
      console.error(`[Next.js API] Backend optimize error: ${response.status} - ${JSON.stringify(errorData)}`);
      
      return NextResponse.json(
        { error: errorData.detail || 'Failed to optimize resume' },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Validate response structure
    if (
      !data ||
      typeof data.optimized_summary !== 'string' ||
      !Array.isArray(data.suggested_skills) ||
      !Array.isArray(data.keyword_matches) ||
      !Array.isArray(data.improvement_suggestions)
    ) {
      console.error('Invalid response structure:', data);
      return NextResponse.json(
        { error: 'Invalid response format from backend' },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Resume optimization error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ message: 'GET method not allowed on this endpoint.' }, { status: 405 });
}
