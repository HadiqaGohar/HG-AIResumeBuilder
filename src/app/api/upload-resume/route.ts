// import { NextRequest, NextResponse } from "next/server";

// // This Next.js API route acts as a proxy to your FastAPI backend.
// // It receives the file from your Next.js frontend and forwards it to FastAPI
// // for actual processing (PDF/DOCX parsing, AI extraction).
// // This prevents browser-specific libraries like pdfjs-dist from running in Node.js environment,
// // which causes errors like "DOMMatrix is not defined".


// export async function POST(req: NextRequest) {
//   try {
//     const formData = await req.formData();
//     const file = formData.get("file") as File;

//     if (!file) {
//       return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
//     }

//     // Create a new FormData object to send to the FastAPI backend
//     const backendFormData = new FormData();
//     backendFormData.append("file", file); // Append the original file received from the frontend

//     // --- IMPORTANT: Replace 'http://localhost:8000' with your actual FastAPI backend URL ---
//     // Example for a deployed backend: const FASTAPI_BACKEND_URL = "https://your-fastapi-app.vercel.app";
//     const FASTAPI_BACKEND_URL = process.env.NEXT_PUBLIC_FASTAPI_URL || "http://localhost:8000" || 'https://hg-airesumebuilder-backend-production.up.railway.app/' ; // Using an environment variable is best practice

//     const backendResponse = await fetch(`${FASTAPI_BACKEND_URL}/api/resume/extract`, {
//       method: "POST",
//       body: backendFormData,
//       // Note: Do not set Content-Type header manually when sending FormData,
//       // as fetch will set it correctly with the boundary string.
//     });

//     if (!backendResponse.ok) {
//       // If the backend returns an error (e.g., 400, 500), propagate it back to the frontend
//       let errorDetail = "Failed to process file on backend";
//       try {
//         const errorData = await backendResponse.json();
//         errorDetail = errorData.detail || errorDetail;
//       } catch {
//         // If the backend response is not valid JSON, use a generic message
//         console.error("Backend error response not JSON:", await backendResponse.text());
//       }
//       return NextResponse.json(
//         { error: errorDetail },
//         { status: backendResponse.status }
//       );
//     }

//     // If backend processing was successful, parse the JSON response
//     const extractedData = await backendResponse.json();

//     if (!extractedData || Object.keys(extractedData).length === 0) {
//       return NextResponse.json({ error: "No data extracted from the file" }, { status: 400 });
//     }

//     // Return the extracted data to your Next.js frontend
//     return NextResponse.json(extractedData, { status: 200 });
//   } catch (error) {
//     console.error("Error in Next.js API route /api/upload-resume:", error);
//     // Return a generic 500 error for unexpected issues in this proxy route
//     return NextResponse.json(
//       { error: "An unexpected error occurred during resume upload processing." },
//       { status: 500 }
//     );
//   }
// }

// // Optional: Handle GET requests if necessary, though POST is primarily used for uploads
// export async function GET() {
//   return NextResponse.json({ message: "GET method not allowed on this endpoint" }, { status: 405 });
// }



// -------------


import { NextRequest, NextResponse } from "next/server";

// This Next.js API route acts as a proxy to your FastAPI backend.
// It receives the file from your Next.js frontend and forwards it to FastAPI
// for actual processing (PDF/DOCX parsing, AI extraction).

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Validate file type
    const fileName = file.name.toLowerCase();
    if (!fileName.endsWith('.pdf') && !fileName.endsWith('.docx')) {
      return NextResponse.json(
        { error: "Unsupported file format. Only PDF and DOCX files are supported." },
        { status: 400 }
      );
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File size too large. Maximum size is 10MB." },
        { status: 400 }
      );
    }

    // Get backend URL from environment (without trailing slash)
    const FASTAPI_BACKEND_URL = process.env.NEXT_PUBLIC_FASTAPI_URL || 
                                process.env.FASTAPI_URL || 
                                'https://hg-airesumebuilder-backend-production.up.railway.app';

    const backendUrl = FASTAPI_BACKEND_URL.replace(/\/$/, '');
    
    console.log(`[Upload API] Forwarding file to backend: ${backendUrl}/api/resume/extract`);

    // Create a new FormData object to send to the FastAPI backend
    const backendFormData = new FormData();
    backendFormData.append("file", file);

    const backendResponse = await fetch(`${backendUrl}/api/resume/extract`, {
      method: "POST",
      body: backendFormData,
      // Note: Do not set Content-Type header manually when sending FormData,
      // as fetch will set it correctly with the boundary string.
      signal: AbortSignal.timeout(60000), // 60 second timeout
    });

    if (!backendResponse.ok) {
      // If the backend returns an error, propagate it back to the frontend
      let errorDetail = "Failed to process file on backend";
      try {
        const errorData = await backendResponse.json();
        errorDetail = errorData.detail || errorData.error || errorDetail;
      } catch {
        // If the backend response is not valid JSON, use the text
        const errorText = await backendResponse.text();
        console.error("Backend error response:", errorText);
        errorDetail = errorText || errorDetail;
      }
      
      return NextResponse.json(
        { error: errorDetail },
        { status: backendResponse.status }
      );
    }

    // If backend processing was successful, parse the JSON response
    const extractedData = await backendResponse.json();

    if (!extractedData || Object.keys(extractedData).length === 0) {
      return NextResponse.json(
        { error: "No data extracted from the file. The file may be corrupted or contain no text." },
        { status: 400 }
      );
    }

    console.log(`[Upload API] Successfully extracted data from file: ${file.name}`);
    
    // Return the extracted data to your Next.js frontend
    return NextResponse.json(extractedData, { status: 200 });
    
  } catch (error) {
    console.error("Error in Next.js API route /api/upload-resume:", error);
    
    // Handle specific error types
    if (error.name === 'AbortError') {
      return NextResponse.json(
        { error: "Request timeout. The file processing took too long." },
        { status: 408 }
      );
    }
    
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      return NextResponse.json(
        { error: "Cannot connect to backend service. Please check if the backend server is running." },
        { status: 503 }
      );
    }

    // Return a generic 500 error for unexpected issues
    return NextResponse.json(
      { 
        error: "An unexpected error occurred during resume upload processing.",
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}

// Handle GET requests
export async function GET() {
  return NextResponse.json(
    { message: "GET method not allowed on this endpoint. Use POST to upload files." },
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
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
