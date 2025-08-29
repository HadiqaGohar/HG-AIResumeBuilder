// import { NextResponse } from 'next/server';

// export async function GET() {
//   try {
//     // Get backend URL from environment
//     const FASTAPI_URL = process.env.NEXT_PUBLIC_FASTAPI_URL || 'http://localhost:8000' || 'https://hg-airesumebuilder-backend-production.up.railway.app/' ;

    
//     const response = await fetch(`${FASTAPI_URL}/api/templates`, {
//       method: 'GET',
//       headers: { 'Content-Type': 'application/json' },
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       return NextResponse.json(
//         { error: errorData.detail || 'Failed to fetch templates' },
//         { status: response.status }
//       );
//     }

//     const data = await response.json();
//     return NextResponse.json(data);
//   } catch (error) {
//     console.error('Error fetching templates:', error);
//     return NextResponse.json(
//       { error: 'Internal server error' },
//       { status: 500 }
//     );
//   }
// }


// -----------------


import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Get backend URL from environment (without trailing slash)
    const FASTAPI_URL = process.env.NEXT_PUBLIC_FASTAPI_URL || 
                        process.env.FASTAPI_URL || 
                        'https://hg-airesumebuilder-backend-production.up.railway.app';

    const backendUrl = FASTAPI_URL.replace(/\/$/, '');
    
    console.log(`[Templates API] Fetching templates from: ${backendUrl}/api/templates`);

    const response = await fetch(`${backendUrl}/api/templates`, {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      // Add timeout for the fetch request
      signal: AbortSignal.timeout(10000), // 10 second timeout
    });

    if (!response.ok) {
      let errorDetail = 'Failed to fetch templates from backend';
      
      try {
        const errorData = await response.json();
        errorDetail = errorData.detail || errorData.error || errorDetail;
      } catch {
        // If response is not JSON, get the text
        const errorText = await response.text();
        errorDetail = errorText || errorDetail;
      }
      
      console.error(`[Templates API] Backend error: ${response.status} - ${errorDetail}`);
      
      return NextResponse.json(
        { 
          error: errorDetail,
          status: response.status 
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    
    // Validate response structure
    if (!data || !Array.isArray(data)) {
      console.error('[Templates API] Invalid response format from backend:', data);
      return NextResponse.json(
        { error: 'Invalid response format from backend' },
        { status: 500 }
      );
    }

    console.log(`[Templates API] Successfully fetched ${data.length} templates`);
    
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Error fetching templates:', error);
    
    // Handle specific error types
    if (error.name === 'AbortError') {
      return NextResponse.json(
        { error: 'Request timeout. Backend service is taking too long to respond.' },
        { status: 408 }
      );
    }
    
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      return NextResponse.json(
        { error: 'Cannot connect to backend service. Please check if the backend server is running.' },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { 
        error: 'Internal server error while fetching templates',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}

// Handle OPTIONS requests for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
