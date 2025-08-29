// import { NextRequest, NextResponse } from "next/server";

// export async function POST(req: NextRequest) {
//   try {
//     const body = await req.json();

//     const FASTAPI_BACKEND_URL = process.env.NEXT_PUBLIC_FASTAPI_URL ||  "http://localhost:8000" || 'https://hg-airesumebuilder-backend-production.up.railway.app/' ;

    
//     const backendResponse = await fetch(`${FASTAPI_BACKEND_URL}/api/resume/edit`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(body),
//     });

//     if (!backendResponse.ok) {
//       let errorDetail = "Failed to process edit request on backend";
//       try {
//         const errorData = await backendResponse.json();
//         errorDetail = errorData.detail || errorDetail;
//       } catch {
//         console.error("Backend error response not JSON:", await backendResponse.text());
//       }
//       return NextResponse.json({ error: errorDetail }, { status: backendResponse.status });
//     }

//     const editedData = await backendResponse.json();
//     return NextResponse.json(editedData, { status: 200 });
//   } catch (error) {
//     console.error("Error in Next.js API route /api/resume/edit:", error);
//     return NextResponse.json(
//       { error: "An unexpected error occurred during resume edit processing." },
//       { status: 500 }
//     );
//   }
// }

// export async function GET() {
//   return NextResponse.json({ message: "GET method not allowed on this endpoint" }, { status: 405 });
// }



// ---------------


import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Get backend URL from environment (without trailing slash)
    const FASTAPI_BACKEND_URL = process.env.NEXT_PUBLIC_FASTAPI_URL || 
                                process.env.FASTAPI_URL || 
                                'https://hg-airesumebuilder-backend-production.up.railway.app';

    const backendUrl = FASTAPI_BACKEND_URL.replace(/\/$/, '');
    
    console.log(`[Next.js API] Forwarding edit request to: ${backendUrl}/api/resume/edit`);

    const backendResponse = await fetch(`${backendUrl}/api/resume/edit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      timeout: 30000, // 30 second timeout
    });

    if (!backendResponse.ok) {
      let errorDetail = "Failed to process edit request on backend";
      try {
        const errorData = await backendResponse.json();
        errorDetail = errorData.detail || errorDetail;
      } catch {
        const errorText = await backendResponse.text();
        console.error("Backend error response:", errorText);
        errorDetail = errorText || errorDetail;
      }
      
      return NextResponse.json(
        { error: errorDetail }, 
        { status: backendResponse.status }
      );
    }

    const editedData = await backendResponse.json();
    return NextResponse.json(editedData, { status: 200 });
  } catch (error) {
    console.error("Error in Next.js API route /api/resume/edit:", error);
    return NextResponse.json(
      { 
        error: "An unexpected error occurred during resume edit processing.",
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ message: "GET method not allowed on this endpoint" }, { status: 405 });
}
