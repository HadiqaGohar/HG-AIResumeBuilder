// 'use client';

// import React, { useState } from 'react';
// import { FaPlus, FaMinus } from 'react-icons/fa'; // For expand/collapse icons
// import { Anton } from 'next/font/google'; // Import Anton directly for component use

// // Configure the Anton font instance
// const anton = Anton({
//   subsets: ['latin'],
//   weight: ['400'], // Anton typically only has one weight
// });

// const faqItems = [
//   {
//     question: "What coding standards do you follow for robust development?",
//     answer: "We adhere to industry-best coding practices, including clean code principles, extensive documentation, and strict linting rules. Our focus is on writing maintainable, scalable, and bug-free code that stands the test of time.",
//   },
//   {
//     question: "How do you ensure optimal performance for web applications?",
//     answer: "Our React and Next.js applications are optimized for speed and performance through various techniques like code splitting, lazy loading, image optimization, server-side rendering (SSR), and efficient data fetching. We aim for lightning-fast load times and smooth user experiences.",
//   },
//   {
//     question: "What is your approach to Search Engine Optimization (SEO) in web development?",
//     answer: "We build SEO directly into the development process. This includes semantic HTML, proper meta tags, sitemaps, structured data (Schema.org), and ensuring fast page load speeds. For Next.js, we leverage its built-in SEO capabilities like dynamic meta tags and efficient rendering for better search visibility.",
//   },
//   {
//     question: "How do you handle responsiveness and cross-browser compatibility?",
//     answer: "All our applications are developed with a mobile-first approach using responsive design principles. We thoroughly test across various devices, screen sizes, and modern browsers to ensure a consistent and flawless user experience for everyone.",
//   },
//   {
//     question: "Do you implement CI/CD (Continuous Integration/Continuous Deployment) for projects?",
//     answer: "Yes, for most projects, we set up CI/CD pipelines using platforms like Vercel, Netlify, or custom GitHub Actions. This automates testing and deployment processes, ensuring rapid and reliable delivery of new features and updates.",
//   },
//   {
//     question: "What security measures do you integrate into web applications?",
//     answer: "Security is paramount. We implement best practices such as input validation, secure authentication (e.g., JWT, OAuth), protection against common vulnerabilities (XSS, SQL Injection), secure API design, and regular security audits.",
//   },
//   {
//     question: "How do you approach database design and management?",
//     answer: "We design efficient and scalable database schemas based on project requirements, whether it's SQL (PostgreSQL, MySQL) or NoSQL (MongoDB, Firebase). We focus on performance, data integrity, and robust data management strategies.",
//   },
// ];

// export default function FAQSection() {
//   const [openIndex, setOpenIndex] = useState(null);

//   const toggleFAQ = (index) => {
//     setOpenIndex(openIndex === index ? null : index);
//   };

//   return (
//     // Updated background gradient to match the screenshot's theme more closely
//     <section className="w-full py-20 bg-gradient-to-br from-[#1a0f3d] via-[#2a175e] to-[#0f214a] text-white">
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-16">
//           <h2 className={`${anton.className} text-[#E0E0E0] text-5xl md:text-6xl uppercase leading-tight`}>
//             Frequently <span className="text-purple-400">Asked Questions.</span> {/* Changed purple shade slightly */}
//           </h2>
//           <p className="text-xl text-neutral-300 max-w-2xl mx-auto mt-4"> {/* Slightly lighter neutral */}
//             Deep dive into our development practices, methodologies, and technical expertise.
//           </p>
//         </div>

//         <div className="space-y-6">
//           {faqItems.map((item, index) => (
//             <div
//               key={index}
//               // Adjusted background for FAQ items for a more translucent, professional look
//               // Added a subtle backdrop-blur for a modern effect
//               className="bg-white/5 border border-purple-500 rounded-lg overflow-hidden shadow-2xl backdrop-blur-sm"
//             >
//               <button
//                 className="w-full flex justify-between items-center p-6 text-left focus:outline-none focus:ring-2 focus:ring-purple-400 rounded-lg transition-colors duration-200 hover:bg-white/10" // Added hover effect
//                 onClick={() => toggleFAQ(index)}
//                 aria-expanded={openIndex === index}
//                 aria-controls={`faq-answer-${index}`}
//               >
//                 <span className="text-lg font-semibold text-neutral-100">
//                   {item.question}
//                 </span>
//                 <span className="text-purple-400">
//                   {openIndex === index ? <FaMinus size={20} /> : <FaPlus size={20} />}
//                 </span>
//               </button>
//               {openIndex === index && (
//                 <div
//                   id={`faq-answer-${index}`}
//                   role="region"
//                   aria-labelledby={`faq-question-${index}`}
//                   className="px-6 pb-6 pt-2 text-neutral-300 border-t border-white/10" // Adjusted border and text color
//                 >
//                   <p className='my-4'>{item.answer}</p>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }