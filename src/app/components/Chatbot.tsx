// 'use client'
// import React, { useState, useEffect, useRef } from 'react';
// import { TbMessageChatbotFilled } from "react-icons/tb";
// import { FiSend, FiMaximize2, FiMinimize2, FiX, FiTrash2, FiExternalLink } from "react-icons/fi";
// import { BiBot, BiUser } from "react-icons/bi";

// interface Message {
//   role: 'user' | 'bot';
//   content: string;
//   type?: string;
//   sources?: Array<{title: string, url: string}>;
//   suggestions?: string[];
//   timestamp?: string;
// }

// interface ResumeData {
//   name: string | null;
//   tag: string | null;
//   email: string | null;
//   location: string | null;
//   number: string | null;
//   summary: string | null;
//   websites: string[];
//   skills: string[];
//   education: string[];
//   experience: string[];
//   student: string[];
//   courses: string[];
//   internships: string[];
//   extracurriculars: string[];
//   hobbies: string[];
//   references: string[];
//   languages: string[];
// }

// const Chatbot: React.FC = () => {
//   const [isOpen, setIsOpen] = useState<boolean>(false);
//   const [isMaximized, setIsMaximized] = useState<boolean>(false);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [input, setInput] = useState<string>('');
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [isInitialized, setIsInitialized] = useState<boolean>(false);
//   const [sessionId] = useState<string>(() => `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
//   const messagesEndRef = useRef<HTMLDivElement>(null);
//   const inputRef = useRef<HTMLInputElement>(null);
  
//   // Dragging state - Simple bottom-right positioning
//   const [position, setPosition] = useState({ x: 20, y: 20 }); // Distance from bottom-right corner
//   const [isDragging, setIsDragging] = useState(false);
//   const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
//   const chatbotRef = useRef<HTMLDivElement>(null);
  
//   const [resumeData, setResumeData] = useState<ResumeData>({
//     name: null,
//     tag: null,
//     email: null,
//     location: null,
//     number: null,
//     summary: null,
//     websites: [],
//     skills: [],
//     education: [],
//     experience: [],
//     student: [],
//     courses: [],
//     internships: [],
//     extracurriculars: [],
//     hobbies: [],
//     references: [],
//     languages: [],
//   });

//   // Quick action suggestions
//   const quickActions = [
//     "Help me improve my resume summary",
//     "What skills should I add?",
//     "Search for current salary trends",
//     "How to write better job descriptions?",
//     "Find information about my industry"
//   ];

//   useEffect(() => {
//     // Initialize with welcome message
//     if (messages.length === 0) {
//       setMessages([{
//         role: 'bot',
//         content: "Hi! I'm your smart resume assistant. I can help you improve your resume, search for current industry information, and answer career questions. How can I help you today?",
//         type: 'welcome'
//       }]);
//     }
//     // Set initialized to true after component mounts
//     setIsInitialized(true);
//   }, [messages]);

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   useEffect(() => {
//     // Load resume data from localStorage or API
//     const savedResumeData = localStorage.getItem('resumeData');
//     if (savedResumeData) {
//       try {
//         setResumeData(JSON.parse(savedResumeData));
//       } catch (error) {
//         console.error('Error parsing saved resume data:', error);
//       }
//     }
//   }, []);

//   // Simple positioning - no complex calculations needed

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   const getFallbackResponse = (message: string): string => {
//     // Information about Hadiqa Gohar and the website
//     if (message.includes('creator') || message.includes('author') || message.includes('builder') || message.includes('hadiqa') || message.includes('gohar')) {
//       return `👋 Hi! I'm the HG Resume Builder assistant. This amazing resume builder was created by **Hadiqa Gohar**, a talented Student Leader, Web Developer, Agentic AI Developer, UI/UX Specialist, and SEO Expert.

// 🌟 **About Hadiqa Gohar:**
// - Student Leader at Governor Sindh Initiative for AI & Computing
// - 1+ years of web development experience
// - Winner of a laptop from GIAIC
// - 5K+ LinkedIn followers
// - Contributor to Modern Python Colab Notebook

// 💻 **Her Skills:** Next.js, React, TypeScript, Python, TailwindCSS, Figma, and many more!

// You can learn more about her on the [About page](/about) or connect with her on [GitHub](https://github.com/HadiqaGohar).`;
//     }

//     if (message.includes('about') || message.includes('website') || message.includes('resume builder')) {
//       return `Welcome to **HG Resume Builder**! 🎉

// This is a professional resume builder created by **Hadiqa Gohar** to help you create world-class resumes with AI-powered tools.

// ✨ **Features:**
// - AI-powered resume generation
// - ATS-friendly templates
// - Real-time preview
// - Professional designs
// - Easy customization

// 🚀 **Get Started:**
// - Browse [Templates](/template)
// - Use the [Dashboard](/dashboard) to build your resume
// - [Upload](/upload-resume) an existing resume

// Need help with anything specific? Just ask!`;
//     }

//     if (message.includes('help') || message.includes('how') || message.includes('guide')) {
//       return `I'm here to help you with HG Resume Builder! 🤖

// **What I can help you with:**
// - Resume building tips and guidance
// - Template selection advice
// - Feature explanations
// - Technical support
// - Information about the creator, Hadiqa Gohar

// **Quick Actions:**
// - "Show me templates" - Browse available templates
// - "How to build resume" - Get step-by-step guidance
// - "About creator" - Learn about Hadiqa Gohar
// - "Features" - Explore what HG Resume Builder offers

// What would you like to know more about?`;
//     }

//     if (message.includes('template') || message.includes('design')) {
//       return `🎨 **Resume Templates by Hadiqa Gohar**

// HG Resume Builder offers professional, ATS-friendly templates designed to help you stand out:

// 📋 **Available Templates:**
// - **Template 1**: Chameleon Pro Resume - Clean, customizable design
// - More templates coming soon!

// ✅ **Template Features:**
// - ATS-friendly formatting
// - Customizable colors
// - Professional layouts
// - Real-time preview

// Ready to choose a template? Visit our [Templates page](/template) to get started!`;
//     }

//     // Default response
//     return `Hi! I'm the HG Resume Builder assistant, created by **Hadiqa Gohar**. 

// I'm here to help you build professional resumes! Unfortunately, I'm having trouble connecting to my main knowledge base right now, but I can still help you with:

// - Information about HG Resume Builder
// - Guidance on using our features
// - Details about our creator, Hadiqa Gohar
// - General resume building tips

// What would you like to know? Try asking about "templates", "how to build resume", or "about creator"!`;
//   };

//   const handleSendMessage = async (messageText?: string) => {
//     const messageToSend = messageText || input.trim();
//     if (!messageToSend) return;

//     const userMessage: Message = { 
//       role: 'user', 
//       content: messageToSend,
//       timestamp: new Date().toISOString()
//     };
    
//     setMessages(prev => [...prev, userMessage]);
//     setInput('');
//     setIsLoading(true);

//     try {
//       const response = await fetch('http://localhost:8000/api/chatbot', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ 
//           message: messageToSend, 
//           context: { resume_data: resumeData },
//           session_id: sessionId
//         }),
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();
      
//       const botMessage: Message = { 
//         role: 'bot', 
//         content: data.response || 'Sorry, I couldn\'t process your request.',
//         type: data.type,
//         sources: data.sources,
//         suggestions: data.suggestions,
//         timestamp: data.timestamp
//       };
      
//       setMessages(prev => [...prev, botMessage]);
//     } catch (error) {
//       console.error('Chatbot error:', error);
      
//       // Fallback responses with Hadiqa Gohar information
//       const fallbackResponse = getFallbackResponse(messageToSend.toLowerCase());
      
//       const errorMessage: Message = { 
//         role: 'bot',
//         content: fallbackResponse,
//         timestamp: new Date().toISOString(),
//         type: 'fallback'
//       };
//       setMessages(prev => [...prev, errorMessage]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       handleSendMessage();
//     }
//   };

//   const clearConversation = async () => {
//     try {
//       await fetch('http://localhost:8000/api/chatbot/session/clear', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ session_id: sessionId }),
//       });
      
//       setMessages([{
//         role: 'bot',
//         content: "Conversation cleared! How can I help you today?",
//         type: 'welcome'
//       }]);
//     } catch (error) {
//       console.error('Error clearing conversation:', error);
//     }
//   };

//   const openLink = (url: string) => {
//     window.open(url, '_blank', 'noopener,noreferrer');
//   };

//   const formatMessage = (content: string) => {
//     // Simple formatting for better readability
//     return content
//       .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
//       .replace(/\*(.*?)\*/g, '<em>$1</em>')
//       .replace(/\n/g, '<br>');
//   };

//   // Dragging functionality
//   const handleMouseDown = (e: React.MouseEvent) => {
//     if (chatbotRef.current) {
//       const rect = chatbotRef.current.getBoundingClientRect();
//       setDragOffset({
//         x: e.clientX - rect.left,
//         y: e.clientY - rect.top
//       });
//       setIsDragging(true);
//     }
//   };

//   const handleTouchStart = (e: React.TouchEvent) => {
//     if (chatbotRef.current) {
//       const rect = chatbotRef.current.getBoundingClientRect();
//       const touch = e.touches[0];
//       setDragOffset({
//         x: touch.clientX - rect.left,
//         y: touch.clientY - rect.top
//       });
//       setIsDragging(true);
//     }
//   };

//   // Handle mouse/touch move and end events
//   useEffect(() => {
//     const handleMouseMove = (e: MouseEvent) => {
//       if (isDragging) {
//         const iconX = e.clientX - dragOffset.x;
//         const iconY = e.clientY - dragOffset.y;
        
//         // Convert to distance from bottom-right corner
//         const newX = window.innerWidth - iconX - 56; // Distance from right edge
//         const newY = window.innerHeight - iconY - 56; // Distance from bottom edge
        
//         // Keep within screen bounds (minimum 0, maximum screen size minus icon size)
//         setPosition({
//           x: Math.max(0, Math.min(newX, window.innerWidth - 56)),
//           y: Math.max(0, Math.min(newY, window.innerHeight - 56))
//         });
//       }
//     };

//     const handleTouchMove = (e: TouchEvent) => {
//       if (isDragging) {
//         e.preventDefault();
//         const touch = e.touches[0];
//         const iconX = touch.clientX - dragOffset.x;
//         const iconY = touch.clientY - dragOffset.y;
        
//         // Convert to distance from bottom-right corner
//         const newX = window.innerWidth - iconX - 56;
//         const newY = window.innerHeight - iconY - 56;
        
//         setPosition({
//           x: Math.max(0, Math.min(newX, window.innerWidth - 56)),
//           y: Math.max(0, Math.min(newY, window.innerHeight - 56))
//         });
//       }
//     };

//     const handleEnd = () => {
//       setIsDragging(false);
//     };

//     if (isDragging) {
//       document.addEventListener('mousemove', handleMouseMove);
//       document.addEventListener('mouseup', handleEnd);
//       document.addEventListener('touchmove', handleTouchMove, { passive: false });
//       document.addEventListener('touchend', handleEnd);
//     }

//     return () => {
//       document.removeEventListener('mousemove', handleMouseMove);
//       document.removeEventListener('mouseup', handleEnd);
//       document.removeEventListener('touchmove', handleTouchMove);
//       document.removeEventListener('touchend', handleEnd);
//     };
//   }, [isDragging, dragOffset]);

//   return (
//     <div>
//       {/* Draggable Chatbot Icon with notification dot */}
//       {isInitialized && (
//         <div 
//           ref={chatbotRef}
//           className="fixed z-[70]"
//           style={{
//             right: `${position.x}px`,
//             bottom: `${position.y}px`,
//           }}
//         >
//         <div
//           className={`w-14 h-14 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center cursor-move shadow-lg hover:shadow-xl transition-all duration-300 ${
//             isDragging ? 'scale-110' : 'hover:scale-110'
//           }`}
//           onMouseDown={handleMouseDown}
//           onTouchStart={handleTouchStart}
//           onClick={() => {
//             // Only open chat if not dragging
//             if (!isDragging) {
//               setIsOpen(!isOpen);
//             }
//           }}
//         >
//           <TbMessageChatbotFilled size={30} color='white'/>
//         </div>
//         {!isOpen && messages.length > 1 && (
//           <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
//         )}
        
//         {/* Drag hint tooltip - show when in initial bottom-right position */}
//         {/* {!isDragging && isInitialized && position.x === 20 && position.y === 20 && (
//           <div className="absolute -left-32 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-lg animate-bounce">
//             Drag to move!
//             <div className="absolute right-0 top-1/2 transform translate-x-1 -translate-y-1/2 border-4 border-transparent border-l-gray-800"></div>
//           </div>
//         )} */}
//         </div>
//       )}

//       {/* Enhanced Chatbot Interface */}
//       {isOpen && (
//         <div
//           className={`fixed ${
//             isMaximized 
//               ? 'inset-0' 
//               : 'w-96 h-[600px] rounded-lg'
//           } bg-white shadow-2xl z-[60] flex flex-col transition-all duration-300 border border-gray-200`}
//           style={
//             !isMaximized ? {
//               right: `${Math.min(position.x, window.innerWidth - 384)}px`, // 384px = w-96
//               bottom: `${Math.max(position.y - 600, 20)}px`, // 600px = h-[600px]
//             } : {}
//           }
//         >
//           {/* Enhanced Header */}
//           <div className={`flex justify-between items-center p-4 bg-gradient-to-r from-purple-500 to-blue-500 ${isMaximized ? 'rounded-none' : 'rounded-t-lg'}`}>
//             <div className="flex items-center space-x-2">
//               <BiBot className="text-white text-xl" />
//               <h2 className="text-lg font-semibold text-white">Smart Resume Assistant</h2>
//             </div>
//             <div className="flex space-x-2">
//               <button
//                 className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-full transition-colors"
//                 onClick={clearConversation}
//                 title="Clear conversation"
//               >
//                 <FiTrash2 size={18} />
//               </button>
//               <button
//                 className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-full transition-colors"
//                 onClick={() => setIsMaximized(!isMaximized)}
//                 title={isMaximized ? "Minimize to window" : "Maximize to fullscreen"}
//               >
//                 {isMaximized ? <FiMinimize2 size={18} /> : <FiMaximize2 size={18} />}
//               </button>
//               <button
//                 className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-full transition-colors"
//                 onClick={() => setIsOpen(false)}
//                 title="Close chat"
//               >
//                 <FiX size={18} />
//               </button>
//             </div>
//           </div>

//           {/* Chat Area */}
//           <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
//             {messages.map((msg, index) => (
//               <div key={index} className={`mb-4 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
//                 <div className={`flex items-start space-x-2 ${msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
//                   <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
//                     msg.role === 'user' 
//                       ? 'bg-purple-500 text-white' 
//                       : 'bg-blue-500 text-white'
//                   }`}>
//                     {msg.role === 'user' ? <BiUser size={16} /> : <BiBot size={16} />}
//                   </div>
//                   <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
//                     msg.role === 'user' 
//                       ? 'bg-purple-500 text-white' 
//                       : 'bg-white text-gray-800 shadow-md border'
//                   }`}>
//                     <div 
//                       dangerouslySetInnerHTML={{ __html: formatMessage(msg.content) }}
//                       className="text-sm"
//                     />
                    
//                     {/* Sources */}
//                     {msg.sources && msg.sources.length > 0 && (
//                       <div className="mt-2 pt-2 border-t border-gray-200">
//                         <p className="text-xs text-gray-600 mb-1">Sources:</p>
//                         {msg.sources.map((source, idx) => (
//                           <button
//                             key={idx}
//                             onClick={() => openLink(source.url)}
//                             className="flex items-center space-x-1 text-xs text-blue-600 hover:text-blue-800 mb-1"
//                           >
//                             <FiExternalLink size={10} />
//                             <span className="truncate max-w-48">{source.title}</span>
//                           </button>
//                         ))}
//                       </div>
//                     )}
                    
//                     {/* Suggestions */}
//                     {msg.suggestions && msg.suggestions.length > 0 && (
//                       <div className="mt-2 pt-2 border-t border-gray-200">
//                         <p className="text-xs text-gray-600 mb-1">Quick actions:</p>
//                         {msg.suggestions.slice(0, 2).map((suggestion, idx) => (
//                           <button
//                             key={idx}
//                             onClick={() => handleSendMessage(suggestion)}
//                             className="block text-xs text-purple-600 hover:text-purple-800 mb-1 text-left"
//                           >
//                             • {suggestion}
//                           </button>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             ))}
            
//             {/* Loading indicator */}
//             {isLoading && (
//               <div className="flex items-start space-x-2 mb-4">
//                 <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center">
//                   <BiBot size={16} />
//                 </div>
//                 <div className="bg-white px-4 py-2 rounded-lg shadow-md border">
//                   <div className="flex space-x-1">
//                     <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
//                     <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
//                     <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
//                   </div>
//                 </div>
//               </div>
//             )}
//             <div ref={messagesEndRef} />
//           </div>

//           {/* Quick Actions */}
//           {messages.length <= 1 && (
//             <div className="px-4 py-2 border-t bg-white">
//               <p className="text-xs text-gray-600 mb-2">Quick actions:</p>
//               <div className="flex flex-wrap gap-1">
//                 {quickActions.slice(0, 3).map((action, index) => (
//                   <button
//                     key={index}
//                     onClick={() => handleSendMessage(action)}
//                     className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded-full transition-colors"
//                   >
//                     {action}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Enhanced Input Area */}
//           <div className="p-4 border-t bg-white rounded-b-lg">
//             <div className="flex space-x-2">
//               <input
//                 ref={inputRef}
//                 type="text"
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//                 onKeyPress={handleKeyPress}
//                 disabled={isLoading}
//                 className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent disabled:bg-gray-100"
//                 placeholder="Ask me anything about resumes, careers, or search for information..."
//               />
//               <button
//                 onClick={() => handleSendMessage()}
//                 disabled={isLoading || !input.trim()}
//                 className="bg-gradient-to-r from-purple-500 to-blue-500 text-white p-3 rounded-lg hover:from-purple-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
//               >
//                 <FiSend size={16} />
//               </button>
//             </div>
//             <p className="text-xs text-gray-500 mt-2 text-center">
//               I can search the web, help with resumes, and answer career questions
//             </p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Chatbot;

'use client'
import React, { useState, useEffect, useRef } from 'react';
import { TbMessageChatbotFilled } from "react-icons/tb";
import { FiSend, FiMaximize2, FiMinimize2, FiX, FiTrash2, FiExternalLink } from "react-icons/fi";
import { BiBot, BiUser } from "react-icons/bi";

interface Message {
  role: 'user' | 'bot';
  content: string;
  type?: string;
  sources?: Array<{title: string, url: string}>;
  suggestions?: string[];
  timestamp?: string;
}

interface ResumeData {
  name: string | null;
  tag: string | null;
  email: string | null;
  location: string | null;
  number: string | null;
  summary: string | null;
  websites: string[];
  skills: string[];
  education: string[];
  experience: string[];
  student: string[];
  courses: string[];
  internships: string[];
  extracurriculars: string[];
  hobbies: string[];
  references: string[];
  languages: string[];
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isMaximized, setIsMaximized] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const [sessionId] = useState<string>(() => `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Dragging state - Simple bottom-right positioning
  const [position, setPosition] = useState({ x: 20, y: 20 }); // Distance from bottom-right corner
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const chatbotRef = useRef<HTMLDivElement>(null);
  
  const [resumeData, setResumeData] = useState<ResumeData>({
    name: null,
    tag: null,
    email: null,
    location: null,
    number: null,
    summary: null,
    websites: [],
    skills: [],
    education: [],
    experience: [],
    student: [],
    courses: [],
    internships: [],
    extracurriculars: [],
    hobbies: [],
    references: [],
    languages: [],
  });

  // Get backend URL - Railway production ya local development
  // const BACKEND_URL = process.env.NEXT_PUBLIC_FASTAPI_URL || 
  //                     (typeof window !== 'undefined' && window.location.hostname === 'localhost' 
  //                       ? 'http://localhost:8000' 
  //                       : 'https://hg-airesumebuilder-backend-production.up.railway.app');

  // Quick action suggestions
  const quickActions = [
    "Help me improve my resume summary",
    "What skills should I add?",
    "Search for current salary trends",
    "How to write better job descriptions?",
    "Find information about my industry"
  ];

  useEffect(() => {
    // Initialize with welcome message
    if (messages.length === 0) {
      setMessages([{
        role: 'bot',
        content: "Hi! I'm your smart resume assistant. I can help you improve your resume, search for current industry information, and answer career questions. How can I help you today?",
        type: 'welcome'
      }]);
    }
    // Set initialized to true after component mounts
    setIsInitialized(true);
  }, [messages]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Load resume data from localStorage or API
    const savedResumeData = localStorage.getItem('resumeData');
    if (savedResumeData) {
      try {
        setResumeData(JSON.parse(savedResumeData));
      } catch (error) {
        console.error('Error parsing saved resume data:', error);
      }
    }
  }, []);

  // Simple positioning - no complex calculations needed

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const getFallbackResponse = (message: string): string => {
    // Information about Hadiqa Gohar and the website
    if (message.includes('creator') || message.includes('author') || message.includes('builder') || message.includes('hadiqa') || message.includes('gohar')) {
      return `👋 Hi! I'm the HG Resume Builder assistant. This amazing resume builder was created by **Hadiqa Gohar**, a talented Student Leader, Web Developer, Agentic AI Developer, UI/UX Specialist, and SEO Expert.

🌟 **About Hadiqa Gohar:**
- Student Leader at Governor Sindh Initiative for AI & Computing
- 1+ years of web development experience
- Winner of a laptop from GIAIC
- 5K+ LinkedIn followers
- Contributor to Modern Python Colab Notebook

💻 **Her Skills:** Next.js, React, TypeScript, Python, TailwindCSS, Figma, and many more!

You can learn more about her on the [About page](/about) or connect with her on [GitHub](https://github.com/HadiqaGohar).`;
    }

    if (message.includes('about') || message.includes('website') || message.includes('resume builder')) {
      return `Welcome to **HG Resume Builder**! 🎉

This is a professional resume builder created by **Hadiqa Gohar** to help you create world-class resumes with AI-powered tools.

✨ **Features:**
- AI-powered resume generation
- ATS-friendly templates
- Real-time preview
- Professional designs
- Easy customization

🚀 **Get Started:**
- Browse [Templates](/template)
- Use the [Dashboard](/dashboard) to build your resume
- [Upload](/upload-resume) an existing resume

Need help with anything specific? Just ask!`;
    }

    if (message.includes('help') || message.includes('how') || message.includes('guide')) {
      return `I'm here to help you with HG Resume Builder! 🤖

**What I can help you with:**
- Resume building tips and guidance
- Template selection advice
- Feature explanations
- Technical support
- Information about the creator, Hadiqa Gohar

**Quick Actions:**
- "Show me templates" - Browse available templates
- "How to build resume" - Get step-by-step guidance
- "About creator" - Learn about Hadiqa Gohar
- "Features" - Explore what HG Resume Builder offers

What would you like to know more about?`;
    }

    if (message.includes('template') || message.includes('design')) {
      return `🎨 **Resume Templates by Hadiqa Gohar**

HG Resume Builder offers professional, ATS-friendly templates designed to help you stand out:

📋 **Available Templates:**
- **Template 1**: Chameleon Pro Resume - Clean, customizable design
- More templates coming soon!

✅ **Template Features:**
- ATS-friendly formatting
- Customizable colors
- Professional layouts
- Real-time preview

Ready to choose a template? Visit our [Templates page](/template) to get started!`;
    }

    // Default response
    return `Hi! I'm the HG Resume Builder assistant, created by **Hadiqa Gohar**. 

I'm here to help you build professional resumes! Unfortunately, I'm having trouble connecting to my main knowledge base right now, but I can still help you with:

- Information about HG Resume Builder
- Guidance on using our features
- Details about our creator, Hadiqa Gohar
- General resume building tips

What would you like to know? Try asking about "templates", "how to build resume", or "about creator"!`;
  };

  const handleSendMessage = async (messageText?: string) => {
    const messageToSend = messageText || input.trim();
    if (!messageToSend) return;

    const userMessage: Message = { 
      role: 'user', 
      content: messageToSend,
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Use Next.js API route as proxy instead of direct backend call
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: messageToSend, 
          context: { resume_data: resumeData },
          session_id: sessionId
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      const botMessage: Message = { 
        role: 'bot', 
        content: data.response || data.error || 'Sorry, I couldn\'t process your request.',
        type: data.type,
        sources: data.sources,
        suggestions: data.suggestions,
        timestamp: data.timestamp
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Chatbot error:', error);
      
      // Fallback responses with Hadiqa Gohar information
      const fallbackResponse = getFallbackResponse(messageToSend.toLowerCase());
      
      const errorMessage: Message = { 
        role: 'bot',
        content: fallbackResponse,
        timestamp: new Date().toISOString(),
        type: 'fallback'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearConversation = async () => {
    try {
      // Use Next.js API route as proxy for clearing session
      await fetch('/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: 'clear_session',
          session_id: sessionId
        }),
      });
      
      setMessages([{
        role: 'bot',
        content: "Conversation cleared! How can I help you today?",
        type: 'welcome'
      }]);
    } catch (error) {
      console.error('Error clearing conversation:', error);
      // Fallback - just clear locally
      setMessages([{
        role: 'bot',
        content: "Conversation cleared! How can I help you today?",
        type: 'welcome'
      }]);
    }
  };

  const openLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const formatMessage = (content: string) => {
    // Simple formatting for better readability
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br>');
  };

  // Dragging functionality
  const handleMouseDown = (e: React.MouseEvent) => {
    if (chatbotRef.current) {
      const rect = chatbotRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
      setIsDragging(true);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (chatbotRef.current) {
      const rect = chatbotRef.current.getBoundingClientRect();
      const touch = e.touches[0];
      setDragOffset({
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top
      });
      setIsDragging(true);
    }
  };

  // Handle mouse/touch move and end events
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const iconX = e.clientX - dragOffset.x;
        const iconY = e.clientY - dragOffset.y;
        
        // Convert to distance from bottom-right corner
        const newX = window.innerWidth - iconX - 56; // Distance from right edge
        const newY = window.innerHeight - iconY - 56; // Distance from bottom edge
        
        // Keep within screen bounds (minimum 0, maximum screen size minus icon size)
        setPosition({
          x: Math.max(0, Math.min(newX, window.innerWidth - 56)),
          y: Math.max(0, Math.min(newY, window.innerHeight - 56))
        });
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging) {
        e.preventDefault();
        const touch = e.touches[0];
        const iconX = touch.clientX - dragOffset.x;
        const iconY = touch.clientY - dragOffset.y;
        
        // Convert to distance from bottom-right corner
        const newX = window.innerWidth - iconX - 56;
        const newY = window.innerHeight - iconY - 56;
        
        setPosition({
          x: Math.max(0, Math.min(newX, window.innerWidth - 56)),
          y: Math.max(0, Math.min(newY, window.innerHeight - 56))
        });
      }
    };

    const handleEnd = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleEnd);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleEnd);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleEnd);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleEnd);
    };
  }, [isDragging, dragOffset]);

  return (
    <div>
      {/* Draggable Chatbot Icon with notification dot */}
      {isInitialized && (
        <div 
          ref={chatbotRef}
          className="fixed z-[70]"
          style={{
            right: `${position.x}px`,
            bottom: `${position.y}px`,
          }}
        >
        <div
          className={`w-14 h-14 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center cursor-move shadow-lg hover:shadow-xl transition-all duration-300 ${
            isDragging ? 'scale-110' : 'hover:scale-110'
          }`}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          onClick={() => {
            // Only open chat if not dragging
            if (!isDragging) {
              setIsOpen(!isOpen);
            }
          }}
        >
          <TbMessageChatbotFilled size={30} color='white'/>
        </div>
        {!isOpen && messages.length > 1 && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
        )}
        
        {/* Drag hint tooltip - show when in initial bottom-right position */}
        {/* {!isDragging && isInitialized && position.x === 20 && position.y === 20 && (
          <div className="absolute -left-32 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-lg animate-bounce">
            Drag to move!
            <div className="absolute right-0 top-1/2 transform translate-x-1 -translate-y-1/2 border-4 border-transparent border-l-gray-800"></div>
          </div>
        )} */}
        </div>
      )}

      {/* Enhanced Chatbot Interface */}
      {isOpen && (
        <div
          className={`fixed ${
            isMaximized 
              ? 'inset-0' 
              : 'w-96 h-[600px] rounded-lg'
          } bg-white shadow-2xl z-[60] flex flex-col transition-all duration-300 border border-gray-200`}
          style={
            !isMaximized ? {
              right: `${Math.min(position.x, window.innerWidth - 384)}px`, // 384px = w-96
              bottom: `${Math.max(position.y - 600, 20)}px`, // 600px = h-[600px]
            } : {}
          }
        >
          {/* Enhanced Header */}
          <div className={`flex justify-between items-center p-4 bg-gradient-to-r from-purple-500 to-blue-500 ${isMaximized ? 'rounded-none' : 'rounded-t-lg'}`}>
            <div className="flex items-center space-x-2">
              <BiBot className="text-white text-xl" />
              <h2 className="text-lg font-semibold text-white">Smart Resume Assistant</h2>
            </div>
            <div className="flex space-x-2">
              <button
                className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-full transition-colors"
                onClick={clearConversation}
                title="Clear conversation"
              >
                <FiTrash2 size={18} />
              </button>
              <button
                className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-full transition-colors"
                onClick={() => setIsMaximized(!isMaximized)}
                title={isMaximized ? "Minimize to window" : "Maximize to fullscreen"}
              >
                {isMaximized ? <FiMinimize2 size={18} /> : <FiMaximize2 size={18} />}
              </button>
              <button
                className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-full transition-colors"
                onClick={() => setIsOpen(false)}
                title="Close chat"
              >
                <FiX size={18} />
              </button>
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            {messages.map((msg, index) => (
              <div key={index} className={`mb-4 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                <div className={`flex items-start space-x-2 ${msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    msg.role === 'user' 
                      ? 'bg-purple-500 text-white' 
                      : 'bg-blue-500 text-white'
                  }`}>
                    {msg.role === 'user' ? <BiUser size={16} /> : <BiBot size={16} />}
                  </div>
                  <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    msg.role === 'user' 
                      ? 'bg-purple-500 text-white' 
                      : 'bg-white text-gray-800 shadow-md border'
                  }`}>
                    <div 
                      dangerouslySetInnerHTML={{ __html: formatMessage(msg.content) }}
                      className="text-sm"
                    />
                    
                    {/* Sources */}
                    {msg.sources && msg.sources.length > 0 && (
                      <div className="mt-2 pt-2 border-t border-gray-200">
                        <p className="text-xs text-gray-600 mb-1">Sources:</p>
                        {msg.sources.map((source, idx) => (
                          <button
                            key={idx}
                            onClick={() => openLink(source.url)}
                            className="flex items-center space-x-1 text-xs text-blue-600 hover:text-blue-800 mb-1"
                          >
                            <FiExternalLink size={10} />
                            <span className="truncate max-w-48">{source.title}</span>
                          </button>
                        ))}
                      </div>
                    )}
                    
                    {/* Suggestions */}
                    {msg.suggestions && msg.suggestions.length > 0 && (
                      <div className="mt-2 pt-2 border-t border-gray-200">
                        <p className="text-xs text-gray-600 mb-1">Quick actions:</p>
                        {msg.suggestions.slice(0, 2).map((suggestion, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleSendMessage(suggestion)}
                            className="block text-xs text-purple-600 hover:text-purple-800 mb-1 text-left"
                          >
                            • {suggestion}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {/* Loading indicator */}
            {isLoading && (
              <div className="flex items-start space-x-2 mb-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center">
                  <BiBot size={16} />
                </div>
                <div className="bg-white px-4 py-2 rounded-lg shadow-md border">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          {messages.length <= 1 && (
            <div className="px-4 py-2 border-t bg-white">
              <p className="text-xs text-gray-600 mb-2">Quick actions:</p>
              <div className="flex flex-wrap gap-1">
                {quickActions.slice(0, 3).map((action, index) => (
                  <button
                    key={index}
                    onClick={() => handleSendMessage(action)}
                    className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded-full transition-colors"
                  >
                    {action}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Enhanced Input Area */}
          <div className="p-4 border-t bg-white rounded-b-lg">
            <div className="flex space-x-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
                className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent disabled:bg-gray-100"
                placeholder="Ask me anything about resumes, careers, or search for information..."
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={isLoading || !input.trim()}
                className="bg-gradient-to-r from-purple-500 to-blue-500 text-white p-3 rounded-lg hover:from-purple-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                <FiSend size={16} />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              I can search the web, help with resumes, and answer career questions
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
