// // import { NextRequest, NextResponse } from 'next/server';
// // import { OptimizationResponse } from '../../../../../lib/api'; // Import the OptimizationResponse type from lib/api.ts

// // const BACKEND_URL = process.env.NEXT_PUBLIC_FASTAPI_URL  ||  'http://localhost:8000' || 'https://hg-airesumebuilder-backend-production.up.railway.app/' ;


// // export async function POST(request: NextRequest) {
// //   try {
// //     const body = await request.json();
    
// //     const response = await fetch(`${BACKEND_URL}/api/resume/optimize`, {
// //       method: 'POST',
// //       headers: {
// //         'Content-Type': 'application/json',
// //       },
// //       body: JSON.stringify(body),
// //     });

// //     if (!response.ok) {
// //       const errorData = await response.json().catch(() => ({ detail: 'Unknown error' }));
// //       return NextResponse.json(
// //         { error: errorData.detail || 'Failed to optimize resume' },
// //         { status: response.status }
// //       );
// //     }

// //     const data = await response.json() as OptimizationResponse;

// //     // Validate response structure
// //     if (
// //       !data ||
// //       typeof data.optimized_summary !== 'string' ||
// //       !Array.isArray(data.suggested_skills) ||
// //       !Array.isArray(data.keyword_matches) ||
// //       !Array.isArray(data.improvement_suggestions)
// //     ) {
// //       console.error('Invalid response structure:', data);
// //       return NextResponse.json(
// //         { error: 'Invalid response format from backend' },
// //         { status: 500 }
// //       );
// //     }

// //     return NextResponse.json(data);
// //   } catch (error) {
// //     console.error('Resume optimization error:', error);
// //     return NextResponse.json(
// //       { error: 'Internal server error' },
// //       { status: 500 }
// //     );
// //   }
// // }


// // ---------------




// import { NextRequest, NextResponse } from 'next/server';

// export async function POST(request: NextRequest) {
//   try {
//     const body = await request.json();
    
//     // Get backend URL from environment (without trailing slash)
//     const BACKEND_URL = process.env.NEXT_PUBLIC_FASTAPI_URL || 
//                         process.env.FASTAPI_URL || 
//                         'https://hg-airesumebuilder-backend-production.up.railway.app';

//     const backendUrl = BACKEND_URL.replace(/\/$/, '');
    
//     console.log(`[Next.js API] Forwarding optimize request to: ${backendUrl}/api/resume/optimize`);

//     const response = await fetch(`${backendUrl}/api/resume/optimize`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(body),
//       timeout: 30000, // 30 second timeout
//     });

//     if (!response.ok) {
//       const errorData = await response.json().catch(() => ({ detail: 'Unknown error' }));
//       console.error(`[Next.js API] Backend optimize error: ${response.status} - ${JSON.stringify(errorData)}`);
      
//       return NextResponse.json(
//         { error: errorData.detail || 'Failed to optimize resume' },
//         { status: response.status }
//       );
//     }

//     const data = await response.json();

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
//       { 
//         error: 'Internal server error',
//         details: error instanceof Error ? error.message : 'Unknown error'
//       },
//       { status: 500 }
//     );
//   }
// }

// export async function GET() {
//   return NextResponse.json({ message: 'GET method not allowed on this endpoint.' }, { status: 405 });
// }


import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  // AbortController for timeout functionality
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

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
        'Accept': 'application/json',
      },
      body: JSON.stringify(body),
      signal: controller.signal, // Use AbortController for timeout
    });

    // Clear the timeout since the request completed
    clearTimeout(timeoutId);

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

    console.log(`[Next.js API] Successfully optimized resume`);
    return NextResponse.json(data);

  } catch (error) {
    // Clear timeout on error
    clearTimeout(timeoutId);

    // Handle timeout specifically
    if (error.name === 'AbortError') {
      console.error("Request timeout: Backend took too long to respond");
      return NextResponse.json(
        { 
          error: "Request timeout. Backend service is taking too long to respond.",
          details: "The resume optimization request timed out after 30 seconds."
        },
        { status: 408 } // 408 Request Timeout
      );
    }

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
  return NextResponse.json(
    { message: 'GET method not allowed on this endpoint. Use POST for resume optimization.' },
    { status: 405 }
  );
}

// Handle OPTIONS requests for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
