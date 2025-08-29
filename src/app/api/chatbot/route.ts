// // // import { NextRequest, NextResponse } from 'next/server';

// // // // Define the expected request body structure
// // // interface ChatbotQuery {
// // //   question: string;
// // //   resume_data: {
// // //     name: string | null;
// // //     tag: string | null;
// // //     email: string | null;
// // //     location: string | null;
// // //     number: string | null;
// // //     summary: string | null;
// // //     websites: string[];
// // //     skills: string[];
// // //     education: string[];
// // //     experience: string[];
// // //     student: string[];
// // //     courses: string[];
// // //     internships: string[];
// // //     extracurriculars: string[];
// // //     hobbies: string[];
// // //     references: string[];
// // //     languages: string[];
// // //   };
// // // }

// // // // POST handler for /api/chatbot
// // // export async function POST(req: NextRequest) {
// // //   try {
// // //     // Parse the request body
// // //     const body: ChatbotQuery = await req.json();

// // //     // Validate the request body
// // //     if (!body.question || !body.resume_data) {
// // //       return NextResponse.json(
// // //         { error: 'Question and resume_data are required' },
// // //         { status: 400 }
// // //       );
// // //     }

// // //     // Forward the request to the FastAPI backend
// // //     const response = await fetch('http://localhost:8000/api/chatbot', {
// // //       method: 'POST',
// // //       headers: {
// // //         'Content-Type': 'application/json',
// // //       },
// // //       body: JSON.stringify(body),
// // //     });

// // //     // Check if the backend response is successful
// // //     if (!response.ok) {
// // //       const errorData = await response.json();
// // //       return NextResponse.json(
// // //         { error: errorData.detail || 'Failed to process chatbot query' },
// // //         { status: response.status }
// // //       );
// // //     }

// // //     // Parse the backend response
// // //     const data = await response.json();

// // //     // Return the chatbot response
// // //     return NextResponse.json({ answer: data.answer });
// // //   } catch (error) {
// // //     console.error('Error processing chatbot request:', error);
// // //     return NextResponse.json(
// // //       { error: 'Internal server error' },
// // //       { status: 500 }
// // //     );
// // //   }
// // // }
// // import { NextRequest, NextResponse } from 'next/server';

// // // Define the expected request body structure
// // interface ChatbotQuery {
// //   question: string;
// //   resume_data: {
// //     name: string | null;
// //     tag: string | null;
// //     email: string | null;
// //     location: string | null;
// //     number: string | null;
// //     summary: string | null;
// //     websites: string[];
// //     skills: string[];
// //     education: string[];
// //     experience: string[];
// //     student: string[];
// //     courses: string[];
// //     internships: string[];
// //     extracurriculars: string[];
// //     hobbies: string[];
// //     references: string[];
// //     languages: string[];
// //   };
// // }

// // // POST handler for /api/chatbot
// // export async function POST(req: NextRequest) {
// //   try {
// //     // Parse the request body
// //     const body: ChatbotQuery = await req.json();

// //     // Validate the request body
// //     if (!body.question || !body.resume_data) {
// //       return NextResponse.json(
// //         { error: 'Question and resume_data are required' },
// //         { status: 400 }
// //       );
// //     }

// //     // Forward the request to the FastAPI backend
// //     const response = await fetch('http://localhost:8000/api/chatbot', {
// //       method: 'POST',
// //       headers: {
// //         'Content-Type': 'application/json',
// //       },
// //       body: JSON.stringify(body),
// //     });

// //     // Check if the backend response is successful
// //     if (!response.ok) {
// //       const errorData = await response.json();
// //       return NextResponse.json(
// //         { error: errorData.detail || 'Failed to process chatbot query' },
// //         { status: response.status }
// //       );
// //     }

// //     // Parse the backend response
// //     const data = await response.json();

// //     // Return the chatbot response
// //     return NextResponse.json({ answer: data.answer });
// //   } catch (error) {
// //     console.error('Error processing chatbot request:', error);
// //     return NextResponse.json(
// //       { error: 'Internal server error' },
// //       { status: 500 }
// //     );
// //   }
// // }
// import { NextRequest, NextResponse } from 'next/server';

// // Define the expected request body structure
// interface ChatbotQuery {
//   question: string;
//   resume_data: {
//     name: string | null;
//     tag: string | null;
//     email: string | null;
//     location: string | null;
//     number: string | null;
//     summary: string | null;
//     websites: string[];
//     skills: string[];
//     education: string[];
//     experience: string[];
//     student: string[];
//     courses: string[];
//     internships: string[];
//     extracurriculars: string[];
//     hobbies: string[];
//     references: string[];
//     languages: string[];
//   };
// }

// // POST handler for /api/chatbot
// export async function POST(req: NextRequest) {
//   try {
//     // Parse the request body
//     const body: ChatbotQuery = await req.json();

//     // Validate the request body
//     if (!body.question || !body.resume_data) {
//       return NextResponse.json(
//         { error: 'Question and resume_data are required' },
//         { status: 400 }
//       );
//     }

//     // Forward the request to the FastAPI backend
//     const response = await fetch('http://localhost:8000/api/chatbot', {
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
//     return NextResponse.json({ answer: data.answer });
//   } catch (error) {
//     console.error('Error processing chatbot request:', error);
//     return NextResponse.json(
//       { error: 'Internal server error. Please ensure the backend server is running and try again.' },
//       { status: 500 }
//     );
//   }
// }

// import { NextRequest, NextResponse } from 'next/server';

// // Define the expected request body structure
// interface ChatbotQuery {
//   message: string;
//   context?: {
//     resume_data?: any;
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
//     const FASTAPI_URL = process.env.NEXT_PUBLIC_FASTAPI_URL || 'http://localhost:8000'|| 'https://ehmt8mro7sonvp9cs5oblz.streamlit.app/';

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
import { NextRequest, NextResponse } from 'next/server';
import { ResumeData } from '../../../../lib/store';

// Define the expected request body structure
interface ChatbotQuery {
  message: string;
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
    if (!body.message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Get backend URL from environment
    const FASTAPI_URL = process.env.NEXT_PUBLIC_FASTAPI_URL || 'http://localhost:8000' || 'https://ehmt8mro7sonvp9cs5oblz.streamlit.app/' || 'https://hg-airesumebuilder-backend-production.up.railway.app';

    // Forward the request to the FastAPI backend
    const response = await fetch(`${FASTAPI_URL}/api/chatbot`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    // Check if the backend response is successful
    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.detail || 'Failed to process chatbot query' },
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
      { error: 'Internal server error. Please ensure the backend server is running and try again.' },
      { status: 500 }
    );
  }
}
