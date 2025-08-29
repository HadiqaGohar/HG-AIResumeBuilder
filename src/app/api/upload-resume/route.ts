// import { NextRequest, NextResponse } from "next/server";
// import { getDocument, GlobalWorkerOptions } from "pdfjs-dist"; // npm install pdfjs-dist
// import mammoth from "mammoth"; // npm install mammoth
// import path from "path";
// import { fileURLToPath } from "url";

// // Set worker path for pdf.js (required for Node.js)
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// GlobalWorkerOptions.workerSrc = path.resolve(__dirname, "../node_modules/pdfjs-dist/build/pdf.worker.js");

// export async function POST(req: NextRequest) {
//   try {
//     const formData = await req.formData();
//     const file = formData.get("file") as File;

//     if (!file) {
//       return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
//     }

//     const arrayBuffer = await file.arrayBuffer();
//     const buffer = Buffer.from(arrayBuffer);

//     const extractedData = await parseResume(buffer, file.type);

//     if (!extractedData || Object.keys(extractedData).length === 0) {
//       return NextResponse.json({ error: "No data extracted from the file" }, { status: 400 });
//     }

//     return NextResponse.json(extractedData, { status: 200 });
//   } catch (error) {
//     console.error("Error processing resume upload:", error);
//     return NextResponse.json(
//       { error: "Failed to process resume upload: " + (error as Error).message },
//       { status: 500 }
//     );
//   }
// }

// export async function GET() {
//   return NextResponse.json({ message: "GET method not allowed" }, { status: 405 });
// }

// async function parseResume(buffer: Buffer, fileType: string): Promise<ExtractedResumeData> {
//   let text = "";

//   try {
//     if (fileType === "application/pdf") {
//       const pdf = await getDocument({ data: buffer }).promise;
//       const numPages = pdf.numPages;
//       for (let i = 1; i <= numPages; i++) {
//         const page = await pdf.getPage(i);
//         const content = await page.getTextContent();
//         text += content.items.map((item: any) => item.str).join(" ") + "\n";
//       }
//       if (!text || text.trim() === "") {
//         throw new Error("No text extracted from PDF (possibly image-based PDF)");
//       }
//     } else if (fileType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
//       const result = await mammoth.extractRawText({ buffer });
//       text = result.value || "";
//       if (!text || text.trim() === "") {
//         throw new Error("No text extracted from DOCX");
//       }
//     } else {
//       throw new Error("Unsupported file format. Please upload a PDF or DOCX file.");
//     }
//   } catch (error) {
//     console.error("Parsing error details:", error);
//     throw new Error("Error parsing file: " + (error as Error).message);
//   }

//   const extracted: ExtractedResumeData = {};
//   const lines = text.split("\n").map((line) => line.trim()).filter(line => line.length > 0); // Filter empty lines

//   for (const line of lines) {
//     if (line.includes("@") && line.includes(".com")) extracted.email = line;
//     if (line.match(/\d{10}/)) extracted.number = line.match(/\d{10}/)?.[0]; // Extract first 10-digit number
//     if (line.toLowerCase().includes("name") || line.match(/^[A-Z][a-z]+\s[A-Z][a-z]+$/)) {
//       extracted.name = line.includes("name") ? lines[lines.indexOf(line) + 1] || line : line;
//     }
//     if (line.toLowerCase().includes("title") || line.toLowerCase().includes("tag")) {
//       extracted.tag = line.includes("title") || line.includes("tag") ? lines[lines.indexOf(line) + 1] || line : line;
//     }
//     if (line.toLowerCase().includes("education")) {
//       const eduIndex = lines.indexOf(line);
//       extracted.education = lines.slice(eduIndex + 1, eduIndex + 4).filter(l => l && !l.toLowerCase().includes("experience"));
//     }
//     if (line.toLowerCase().includes("experience")) {
//       const expIndex = lines.indexOf(line);
//       extracted.experience = lines.slice(expIndex + 1, expIndex + 4).filter(l => l && !l.toLowerCase().includes("skills"));
//     }
//     if (line.toLowerCase().includes("skills")) {
//       extracted.skills = line.split(":").slice(1).join(":").split(",").map((s) => s.trim()) || lines.slice(lines.indexOf(line) + 1, lines.indexOf(line) + 4).flatMap(l => l.split(",")).map(s => s.trim());
//     }
//     if (line.toLowerCase().includes("summary")) {
//       const sumIndex = lines.indexOf(line);
//       extracted.summary = lines.slice(sumIndex + 1, sumIndex + 4).join(" ").trim();
//     }
//   }

//   return extracted;
// }

// interface ExtractedResumeData {
//   name?: string;
//   tag?: string;
//   email?: string;
//   number?: string;
//   skills?: string[];
//   education?: string[];
//   experience?: string[];
//   summary?: string;
// }

// src/app/api/upload-resume/route.ts

import { NextRequest, NextResponse } from "next/server";

// This Next.js API route acts as a proxy to your FastAPI backend.
// It receives the file from your Next.js frontend and forwards it to FastAPI
// for actual processing (PDF/DOCX parsing, AI extraction).
// This prevents browser-specific libraries like pdfjs-dist from running in Node.js environment,
// which causes errors like "DOMMatrix is not defined".

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Create a new FormData object to send to the FastAPI backend
    const backendFormData = new FormData();
    backendFormData.append("file", file); // Append the original file received from the frontend

    // --- IMPORTANT: Replace 'http://localhost:8000' with your actual FastAPI backend URL ---
    // Example for a deployed backend: const FASTAPI_BACKEND_URL = "https://your-fastapi-app.vercel.app";
    const FASTAPI_BACKEND_URL = process.env.NEXT_PUBLIC_FASTAPI_URL || "http://localhost:8000"|| 'https://ehmt8mro7sonvp9cs5oblz.streamlit.app/' || 'https://hg-airesumebuilder-backend-production.up.railway.app/'; // Using an environment variable is best practice

    const backendResponse = await fetch(`${FASTAPI_BACKEND_URL}/api/resume/extract`, {
      method: "POST",
      body: backendFormData,
      // Note: Do not set Content-Type header manually when sending FormData,
      // as fetch will set it correctly with the boundary string.
    });

    if (!backendResponse.ok) {
      // If the backend returns an error (e.g., 400, 500), propagate it back to the frontend
      let errorDetail = "Failed to process file on backend";
      try {
        const errorData = await backendResponse.json();
        errorDetail = errorData.detail || errorDetail;
      } catch {
        // If the backend response is not valid JSON, use a generic message
        console.error("Backend error response not JSON:", await backendResponse.text());
      }
      return NextResponse.json(
        { error: errorDetail },
        { status: backendResponse.status }
      );
    }

    // If backend processing was successful, parse the JSON response
    const extractedData = await backendResponse.json();

    if (!extractedData || Object.keys(extractedData).length === 0) {
      return NextResponse.json({ error: "No data extracted from the file" }, { status: 400 });
    }

    // Return the extracted data to your Next.js frontend
    return NextResponse.json(extractedData, { status: 200 });
  } catch (error) {
    console.error("Error in Next.js API route /api/upload-resume:", error);
    // Return a generic 500 error for unexpected issues in this proxy route
    return NextResponse.json(
      { error: "An unexpected error occurred during resume upload processing." },
      { status: 500 }
    );
  }
}

// Optional: Handle GET requests if necessary, though POST is primarily used for uploads
export async function GET() {
  return NextResponse.json({ message: "GET method not allowed on this endpoint" }, { status: 405 });
}
