// "use client";
// import Link from "next/link";

// export default function TemplateCards() {
//   const templates = [
//     { id: 1, name: "Modern Pro", image: "/templates/modern-pro.png", description: "A sleek, professional design for tech enthusiasts." },
//     { id: 2, name: "Classic Elegance", image: "/templates/classic.png", description: "Timeless layout with a touch of elegance." },
//     { id: 3, name: "Creative Bold", image: "/templates/creative.png", description: "Stand out with a vibrant, artistic style." },
//     { id: 4, name: "Minimalist", image: "/templates/minimal.png", description: "Clean and simple, perfect for any role." },
//   ];

//   return (
//     <section className="bg-white py-12 px-4 sm:px-6 md:px-8">
//       <style jsx>{`
//         @keyframes fadeInUp {
//           0% { opacity: 0; transform: translateY(20px); }
//           100% { opacity: 1; transform: translateY(0); }
//         }
//         @keyframes liftHover {
//           0% { transform: rotate(0deg) scale(1); }
//           100% { transform: rotate(2deg) scale(1.05); }
//         }
//         .animate-fadeInUp { animation: fadeInUp 0.6s ease-out; }
//         .hover\\:animate-liftHover:hover { animation: liftHover 0.3s ease-in-out forwards; }
//       `}</style>
//       <div className="max-w-7xl mx-auto text-center">
//         <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-8 animate-fadeInUp">
//           Explore Our Resume Templates
//         </h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//           {templates.map((template) => (
//             <div
//               key={template.id}
//               className="bg-white rounded-xl shadow-md p-6 border-2 border-purple-200 transition-all duration-300 hover:animate-liftHover"
//             >
//               <img
//                 src={template.image}
//                 alt={`${template.name} Template`}
//                 className="w-full h-40 object-cover rounded-lg mb-4"
//               />
//               <h3 className="text-xl font-semibold text-gray-900 mb-2">{template.name}</h3>
//               <p className="text-gray-600 text-sm mb-4">{template.description}</p>
//               <Link href={`/templates/${template.id}`}>
//                 <button
//                   type="button"
//                   className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300"
//                   aria-label={`View ${template.name} Template`}
//                 >
//                   View Template
//                 </button>
//               </Link>
//             </div>
//           ))}
//         </div>
//         <p className="text-gray-400 text-xs mt-6 animate-fadeInUp">
//           Last Updated: 04:43 PM PKT, Aug 03, 2025
//         </p>
//       </div>
//     </section>
//   );
// }