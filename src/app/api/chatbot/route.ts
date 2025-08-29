// import { NextRequest, NextResponse } from 'next/server';
// import { ResumeData } from '../../../../lib/store';

// // Define the expected request body structure
// interface ChatbotQuery {
//   message: string;
//   context?: {
//     resume_data?: ResumeData;
//   };
// }

// // POST handler for /api/chatbot
// export async function POST(req: NextRequest) {
//   try {
//     // Parse the request body
//     const body: ChatbotQuery = await req.json();

//     // Validate the request body
//     if (!body.message) {
//       return NextResponse.json(
//         { error: 'Message is required' },
//         { status: 400 }
//       );
//     }

//     // Get backend URL from environment
//     const FASTAPI_URL = process.env.NEXT_PUBLIC_FASTAPI_URL || 'http://localhost:8000' || 'https://hg-airesumebuilder-backend-production.up.railway.app/' ;

//     // Forward the request to the FastAPI backend
//     const response = await fetch(`${FASTAPI_URL}/api/chatbot`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(body),
//     });

//     // Check if the backend response is successful
//     if (!response.ok) {
//       const errorData = await response.json();
//       return NextResponse.json(
//         { error: errorData.detail || 'Failed to process chatbot query' },
//         { status: response.status }
//       );
//     }

//     // Parse the backend response
//     const data = await response.json();

//     // Return the chatbot response
//     return NextResponse.json(data);
//   } catch (error) {
//     console.error('Error processing chatbot request:', error);
//     return NextResponse.json(
//       { error: 'Internal server error. Please ensure the backend server is running and try again.' },
//       { status: 500 }
//     );
//   }
// }


// ------------------------


import { NextRequest, NextResponse } from 'next/server';
import { ResumeData } from '../../../../lib/store';

// Define the expected request body structure
interface ChatbotQuery {
  message: string;
  session_id?: string;
  context?: {
    resume_data?: ResumeData;
  };
}

// POST handler for /api/chatbot
export async function POST(req: NextRequest) {
  try {
    // Parse the request body
    const body: ChatbotQuery = await req.json();

    // Validate the request body
    if (!body.message || body.message.trim().length === 0) {
      return NextResponse.json(
        { error: 'Message is required and cannot be empty' },
        { status: 400 }
      );
    }

    // Get backend URL from environment with fallbacks
    const FASTAPI_URL = process.env.NEXT_PUBLIC_FASTAPI_URL || 
                        process.env.FASTAPI_URL || 
                        'https://hg-airesumebuilder-backend-production.up.railway.app';

    // Clean up URL (remove trailing slash if present)
    const backendUrl = FASTAPI_URL.replace(/\/$/, '');
    
    console.log('Forwarding chatbot request to:', `${backendUrl}/api/chatbot`);

    // Forward the request to the FastAPI backend
    const response = await fetch(`${backendUrl}/api/chatbot`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(body),
    });

    // Check if the backend response is successful
    if (!response.ok) {
      let errorDetail = 'Failed to process chatbot query';
      
      try {
        const errorData = await response.json();
        errorDetail = errorData.detail || errorData.error || errorDetail;
      } catch (e) {
        // If response is not JSON, use status text
        errorDetail = response.statusText || errorDetail;
      }
      
      console.error('Backend error:', response.status, errorDetail);
      
      return NextResponse.json(
        { 
          error: errorDetail,
          status: response.status 
        },
        { status: response.status }
      );
    }

    // Parse the backend response
    const data = await response.json();

    // Return the chatbot response
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error processing chatbot request:', error);
    
    return NextResponse.json(
      { 
        error: 'Internal server error. Please ensure the backend server is running and try again.',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}

// OPTIONS handler for CORS preflight requests
export async function OPTIONS() {
  return NextResponse.json({}, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
