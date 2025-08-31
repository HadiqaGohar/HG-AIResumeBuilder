// "use client";
// import Link from "next/link";
// import Image from "next/image";
// import {
//   HiTemplate,
//   HiStar,
//   HiEye,
//   HiChevronLeft,
//   HiChevronRight,
// } from "react-icons/hi";
// import { useState } from "react";

// const activeTemplates = [
//   {
//     id: "1",
//     name: "Chameleon Pro Resume",
//     description:
//       "Clean, ATS-friendly design with customizable colors to match your personal brand.",
//     image: "/Template/template1.png",
//     category: "Professional",
//     features: ["ATS-Friendly", "Customizable Colors", "Professional Layout"],
//     link: "/template",
//   },
//   {
//     id: "2",
//     name: "Modern Professional",
//     description:
//       "Two-column, professional layout with modern styling and timeline design.",
//     image: "/Template/template2.png",
//     category: "Modern",
//     features: ["Two-Column Layout", "Timeline Design", "Clean Typography"],
//     link: "/template",
//   },
//   {
//     id: "3",
//     name: "Creative Sidebar",
//     description:
//       "Perfect for creative professionals with sidebar design and gradient colors.",
//     image: "/Template/template3.png",
//     category: "Creative",
//     features: ["Sidebar Design", "Gradient Colors", "Creative Layout"],
//     link: "/template",
//   },
// ];

// export default function ActiveTemplates() {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   // Create circular array for infinite scrolling
//   const getVisibleTemplates = (viewType = "desktop") => {
//     const totalTemplates = activeTemplates.length;
//     const visibleTemplates = [];
//     let count;

//     // Determine count based on view type
//     switch (viewType) {
//       case "mobile":
//         count = 1;
//         break;
//       case "tablet":
//         count = 2;
//         break;
//       case "desktop":
//       default:
//         count = 3;
//         break;
//     }

//     for (let i = 0; i < count; i++) {
//       const index = (currentIndex + i) % totalTemplates;
//       visibleTemplates.push(activeTemplates[index]);
//     }

//     return visibleTemplates;
//   };

//   const scrollLeft = () => {
//     setCurrentIndex(
//       (prev) => (prev - 1 + activeTemplates.length) % activeTemplates.length
//     );
//   };

//   const scrollRight = () => {
//     setCurrentIndex((prev) => (prev + 1) % activeTemplates.length);
//   };

//   return (
//     <section className="bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 py-16 px-4 sm:px-6 md:px-8">
//       <style jsx>{`
//         @keyframes fadeInUp {
//           0% {
//             opacity: 0;
//             transform: translateY(20px);
//           }
//           100% {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//         @keyframes liftHover {
//           0% {
//             transform: rotate(0deg) scale(1) translateZ(0);
//           }
//           100% {
//             transform: rotate(1deg) scale(1.05) translateZ(10px);
//           }
//         }
//         .animate-fadeInUp {
//           animation: fadeInUp 0.6s ease-out;
//         }
//         .template-card {
//           transition: all 0.3s ease;
//           height: auto;
//           min-height: 400px;
//         }
//         .template-card:hover {
//           transform: rotate(0deg) scale(1.03) translateZ(10px);
//           box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
//         }
//         .template-image {
//           transition: transform 0.3s ease;
//         }
//         .template-card:hover .template-image {
//           transform: scale(1.05);
//         }
//         .scrollbar-hide {
//           scrollbar-width: none;
//           -ms-overflow-style: none;
//         }
//         .scrollbar-hide::-webkit-scrollbar {
//           display: none;
//         }
//       `}</style>

//       <div className="max-w-7xl mx-auto text-center">
//         {/* Header Section */}
//         <div className="mb-12">
//           <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full mb-6">
//             <HiTemplate className="text-2xl text-white" />
//           </div>
//           <h2 className="text-3xl sm:text-5xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent mb-4 animate-fadeInUp">
//             Featured Resume Templates
//           </h2>
//           <p className="text-md md:text-xl text-gray-600 max-w-3xl mx-auto mb-6 animate-fadeInUp">
//             Choose from our most popular, professionally designed templates that
//             are ready to use
//           </p>
//           <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-600 mx-auto rounded-full"></div>
//         </div>

//         {/* Templates Carousel */}
//         <div className="relative mb-12 mx-4 md:mx-0">
//           {/* Left Arrow - Always Visible */}
//           <button
//             onClick={scrollLeft}
//             className="absolute left-2 md:-left-8 top-1/2 transform -translate-y-1/2 z-10 w-8 h-8 md:w-12 md:h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-xl border border-white/20 flex items-center justify-center transition-all duration-300 hover:bg-white hover:scale-110 text-purple-600 cursor-pointer"
//           >
//             <HiChevronLeft className="text-sm md:text-xl" />
//           </button>

//           {/* Right Arrow - Always Visible */}
//           <button
//             onClick={scrollRight}
//             className="absolute right-2 md:-right-8 top-1/2 transform -translate-y-1/2 z-10 w-8 h-8 md:w-12 md:h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-xl border border-white/20 flex items-center justify-center transition-all duration-300 hover:bg-white hover:scale-110 text-purple-600 cursor-pointer"
//           >
//             <HiChevronRight className="text-sm md:text-xl" />
//           </button>

//           {/* Templates Container - Desktop */}
//           <div className="hidden lg:grid lg:grid-cols-3 gap-8 px-16">
//             {getVisibleTemplates("desktop").map((template, index) => (
//               <div
//                 key={`desktop-${template.id}-${currentIndex}-${index}`}
//                 className="template-card bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden group transform transition-all duration-500 ease-in-out"
//                 style={{ animationDelay: `${index * 0.1}s` }}
//               >
//                 {/* Template Image */}
//                 <div className="relative h-48 text-sm bg-gray-100 overflow-hidden">
//                   <Image
//                     src={template.image}
//                     alt={template.name}
//                     fill
//                     sizes="33vw"
//                     className="template-image object-contain p-4"
//                   />

//                   {/* Template ID Badge */}
//                   <div className="absolute top-4 left-4">
//                     <div className="bg-gradient-to-r from-purple-500 to-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
//                       {template.id}
//                     </div>
//                   </div>

//                   {/* Category Badge */}
//                   <div className="absolute top-4 right-4">
//                     <span className="bg-white/90 backdrop-blur-sm text-purple-600 px-3 py-1 rounded-full text-xs font-medium shadow-lg">
//                       {template.category}
//                     </span>
//                   </div>

//                   {/* Hover Overlay */}
//                   <div className="absolute inset-0 bg-gradient-to-t from-purple-600/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
//                     <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
//                       <HiEye className="text-2xl text-purple-600" />
//                     </div>
//                   </div>
//                 </div>

//                 {/* Template Info */}
//                 <div className="p-6">
//                   <div className="flex items-center justify-between mb-2">
//                     <h3 className="text-lg font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
//                       {template.name}
//                     </h3>
//                     <div className="flex items-center text-yellow-500">
//                       <HiStar className="w-4 h-4" />
//                       <span className="text-sm text-gray-600 ml-1">
//                         Popular
//                       </span>
//                     </div>
//                   </div>

//                   <p className="text-gray-600 text-sm mb-4 line-clamp-2">
//                     {template.description}
//                   </p>

//                   {/* Features */}
//                   <div className="flex flex-wrap gap-1 mb-4">
//                     {template.features.slice(0, 2).map((feature, idx) => (
//                       <span
//                         key={idx}
//                         className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded-full"
//                       >
//                         {feature}
//                       </span>
//                     ))}
//                     {template.features.length > 2 && (
//                       <span className="text-xs text-gray-500">
//                         +{template.features.length - 2} more
//                       </span>
//                     )}
//                   </div>

//                   {/* Action Button */}
//                   <Link href={template.link}>
//                     <button className="w-full bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white py-2 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-medium">
//                       Use This Template
//                     </button>
//                   </Link>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Templates Container - Tablet */}
//           <div className="hidden md:grid lg:hidden md:grid-cols-2 gap-8 px-16">
//             {getVisibleTemplates("tablet").map((template, index) => (
//               <div
//                 key={`tablet-${template.id}-${currentIndex}-${index}`}
//                 className="template-card bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden group transform transition-all duration-500 ease-in-out"
//                 style={{ animationDelay: `${index * 0.1}s` }}
//               >
//                 {/* Template Image */}
//                 <div className="relative h-48 bg-gray-100 overflow-hidden">
//                   <Image
//                     src={template.image}
//                     alt={template.name}
//                     fill
//                     sizes="50vw"
//                     className="template-image object-contain p-4"
//                   />

//                   {/* Template ID Badge */}
//                   <div className="absolute top-4 left-4">
//                     <div className="bg-gradient-to-r from-purple-500 to-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
//                       {template.id}
//                     </div>
//                   </div>

//                   {/* Category Badge */}
//                   <div className="absolute top-4 right-4">
//                     <span className="bg-white/90 backdrop-blur-sm text-purple-600 px-3 py-1 rounded-full text-xs font-medium shadow-lg">
//                       {template.category}
//                     </span>
//                   </div>

//                   {/* Hover Overlay */}
//                   <div className="absolute inset-0 bg-gradient-to-t from-purple-600/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
//                     <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
//                       <HiEye className="text-2xl text-purple-600" />
//                     </div>
//                   </div>
//                 </div>

//                 {/* Template Info */}
//                 <div className="p-6">
//                   <div className="flex items-center justify-between mb-2">
//                     <h3 className="text-lg font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
//                       {template.name}
//                     </h3>
//                     <div className="flex items-center text-yellow-500">
//                       <HiStar className="w-4 h-4" />
//                       <span className="text-sm text-gray-600 ml-1">
//                         Popular
//                       </span>
//                     </div>
//                   </div>

//                   <p className="text-gray-600 text-sm mb-4 line-clamp-2">
//                     {template.description}
//                   </p>

//                   {/* Features */}
//                   <div className="flex flex-wrap gap-1 mb-4">
//                     {template.features.slice(0, 2).map((feature, idx) => (
//                       <span
//                         key={idx}
//                         className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded-full"
//                       >
//                         {feature}
//                       </span>
//                     ))}
//                     {template.features.length > 2 && (
//                       <span className="text-xs text-gray-500">
//                         +{template.features.length - 2} more
//                       </span>
//                     )}
//                   </div>

//                   {/* Action Button */}
//                   <Link href={template.link}>
//                     <button className="w-full bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white py-2 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-medium">
//                       Use This Template
//                     </button>
//                   </Link>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Templates Container - Mobile */}
//           <div className="md:hidden px-12">
//             {getVisibleTemplates("mobile").map((template, index) => (
//               <div
//                 key={`mobile-${template.id}-${currentIndex}-${index}`}
//                 className="template-card bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden group transform transition-all duration-500 ease-in-out"
//                 style={{ animationDelay: `${index * 0.1}s` }}
//               >
//                 {/* Template Image */}
//                 <div className="relative h-48 bg-gray-100 overflow-hidden">
//                   <Image
//                     src={template.image}
//                     alt={template.name}
//                     fill
//                     className="template-image object-contain p-4"
//                     sizes="100vw"
//                   />

//                   {/* Template ID Badge */}
//                   <div className="absolute top-4 left-4">
//                     <div className="bg-gradient-to-r from-purple-500 to-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
//                       {template.id}
//                     </div>
//                   </div>

//                   {/* Category Badge */}
//                   <div className="absolute top-4 right-4">
//                     <span className="bg-white/90 backdrop-blur-sm text-purple-600 px-3 py-1 rounded-full text-xs font-medium shadow-lg">
//                       {template.category}
//                     </span>
//                   </div>

//                   {/* Hover Overlay */}
//                   <div className="absolute inset-0 bg-gradient-to-t from-purple-600/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
//                     <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
//                       <HiEye className="text-2xl text-purple-600" />
//                     </div>
//                   </div>
//                 </div>

//                 {/* Template Info - Mobile Layout */}
//                 <div className="p-6">
//                   <div className="mb-3">
//                     <h3 className="text-lg font-bold text-gray-900 group-hover:text-purple-600 transition-colors mb-2">
//                       {template.name}
//                     </h3>
//                     <div className="flex items-center text-yellow-500">
//                       <HiStar className="w-4 h-4" />
//                       <span className="text-sm text-gray-600 ml-1">
//                         Popular
//                       </span>
//                     </div>
//                   </div>

//                   <p className="text-gray-600 text-sm mb-4 line-clamp-2">
//                     {template.description}
//                   </p>

//                   {/* Features */}
//                   <div className="flex flex-wrap gap-1 mb-4">
//                     {template.features.slice(0, 2).map((feature, idx) => (
//                       <span
//                         key={idx}
//                         className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded-full"
//                       >
//                         {feature}
//                       </span>
//                     ))}
//                     {template.features.length > 2 && (
//                       <span className="text-xs text-gray-500">
//                         +{template.features.length - 2} more
//                       </span>
//                     )}
//                   </div>

//                   {/* Action Button */}
//                   <Link href={template.link}>
//                     <button className="w-full bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white py-2 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-medium">
//                       Use This Template
//                     </button>
//                   </Link>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Carousel Indicators */}
//           <div className="flex justify-center mt-8 space-x-2">
//             {activeTemplates.map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => setCurrentIndex(index)}
//                 className={`w-3 h-3 rounded-full transition-all duration-300 ${
//                   index === currentIndex
//                     ? "bg-gradient-to-r from-purple-500 to-blue-600 scale-125"
//                     : "bg-gray-300 hover:bg-gray-400"
//                 }`}
//               />
//             ))}
//           </div>
//         </div>

//         {/* Call to Action */}
//         <div className="text-center animate-fadeInUp">
//           <p className="text-gray-600 mb-6">
//             Want to see more templates? Browse our complete collection
//           </p>
//           <div className="space-x-4">
//             <Link href="/template">
//               <button className="bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white px-8 py-3 rounded-full transition-all duration-300 font-semibold text-lg transform hover:scale-105 shadow-lg hover:shadow-xl">
//                 View All Templates
//               </button>
//             </Link>
//             <Link href="/upload-resume/ai-templates">
//               <button className="bg-white/80 backdrop-blur-sm border-2 border-purple-300 text-purple-600 hover:bg-purple-50 px-8 py-3 rounded-full transition-all duration-300 font-semibold text-lg transform hover:scale-105 shadow-lg hover:shadow-xl">
//                 Try AI Templates
//               </button>
//             </Link>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }





'use client';
import Link from "next/link";
import Image from "next/image";
import {
  HiTemplate,
  HiStar,
  HiEye,
  HiChevronLeft,
  HiChevronRight,
} from "react-icons/hi";
import { useState, useEffect } from "react";

const activeTemplates = [
  {
    id: "1",
    name: "Chameleon Pro Resume",
    description:
      "Clean, ATS-friendly design with customizable colors to match your personal brand.",
    image: "/Template/template1.png",
    category: "Professional",
    features: ["ATS-Friendly", "Customizable Colors", "Professional Layout"],
    link: "/template",
  },
  {
    id: "2",
    name: "Modern Professional",
    description:
      "Two-column, professional layout with modern styling and timeline design.",
    image: "/Template/template2.png",
    category: "Modern",
    features: ["Two-Column Layout", "Timeline Design", "Clean Typography"],
    link: "/template",
  },
  {
    id: "3",
    name: "Creative Sidebar",
    description:
      "Perfect for creative professionals with sidebar design and gradient colors.",
    image: "/Template/template3.png",
    category: "Creative",
    features: ["Sidebar Design", "Gradient Colors", "Creative Layout"],
    link: "/template",
  },
];

export default function ActiveTemplates() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Set isClient to true once component mounts on the client
    setIsClient(true);
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Create circular array for infinite scrolling
  const getVisibleTemplates = () => {
    const totalTemplates = activeTemplates.length;
    const visibleTemplates = [];
    
    // Default to desktop view during SSR
    let count = 3;
    
    // Only use window-based logic on client side
    if (isClient) {
      count = isMobile ? 1 : (window.innerWidth < 1024 ? 2 : 3);
    }

    for (let i = 0; i < count; i++) {
      const index = (currentIndex + i) % totalTemplates;
      visibleTemplates.push(activeTemplates[index]);
    }

    return visibleTemplates;
  };

  const scrollLeft = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + activeTemplates.length) % activeTemplates.length
    );
  };

  const scrollRight = () => {
    setCurrentIndex((prev) => (prev + 1) % activeTemplates.length);
  };

  return (
    <section className="bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 py-8 md:py-16 px-4 sm:px-6 md:px-8">
      <style jsx>{`
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes liftHover {
          0% {
            transform: rotate(0deg) scale(1) translateZ(0);
          }
          100% {
            transform: rotate(1deg) scale(1.05) translateZ(10px);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out;
        }
        .template-card {
          transition: all 0.3s ease;
          height: auto;
          min-height: 380px;
        }
        .template-card:hover {
          transform: rotate(0deg) scale(1.03) translateZ(10px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }
        .template-image {
          transition: transform 0.3s ease;
        }
        .template-card:hover .template-image {
          transform: scale(1.05);
        }
      `}</style>

      <div className="max-w-7xl mx-auto text-center">
        {/* Header Section */}
        <div className="mb-8 md:mb-12">
          <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full mb-4 md:mb-6">
            <HiTemplate className="text-xl md:text-2xl text-white" />
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent mb-3 md:mb-4 animate-fadeInUp">
            Featured Resume Templates
          </h2>
          <p className="text-sm md:text-md lg:text-xl text-gray-600 max-w-3xl mx-auto mb-4 md:mb-6 animate-fadeInUp">
            Choose from our most popular, professionally designed templates that
            are ready to use
          </p>
          <div className="w-16 md:w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-600 mx-auto rounded-full"></div>
        </div>

        {/* Templates Carousel */}
        <div className="relative mb-8 md:mb-12">
          {/* Left Arrow */}
          <button
            onClick={scrollLeft}
            className="absolute left-0 md:-left-8 top-1/2 transform -translate-y-1/2 z-10 w-8 h-8 md:w-10 md:h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-white/20 flex items-center justify-center transition-all duration-300 hover:bg-white hover:scale-110 text-purple-600 cursor-pointer"
            aria-label="Previous template"
          >
            <HiChevronLeft className="text-sm md:text-lg" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={scrollRight}
            className="absolute right-0 md:-right-8 top-1/2 transform -translate-y-1/2 z-10 w-8 h-8 md:w-10 md:h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-white/20 flex items-center justify-center transition-all duration-300 hover:bg-white hover:scale-110 text-purple-600 cursor-pointer"
            aria-label="Next template"
          >
            <HiChevronRight className="text-sm md:text-lg" />
          </button>

          {/* Templates Container */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 px-8 md:px-12 lg:px-16">
            {getVisibleTemplates().map((template, index) => (
              <div
                key={`${template.id}-${currentIndex}-${index}`}
                className="template-card bg-white/80 backdrop-blur-sm rounded-xl md:rounded-2xl shadow-lg border border-white/20 overflow-hidden group transform transition-all duration-500 ease-in-out"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Template Image */}
                <div className="relative h-40 md:h-48 bg-gray-100 overflow-hidden">
                  <Image
                    src={template.image}
                    alt={template.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="template-image object-contain p-3 md:p-4"
                    priority={index === 0}
                  />

                  {/* Template ID Badge */}
                  <div className="absolute top-2 md:top-4 left-2 md:left-4">
                    <div className="bg-gradient-to-r from-purple-500 to-blue-600 text-white w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center text-xs md:text-sm font-bold shadow-lg">
                      {template.id}
                    </div>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-2 md:top-4 right-2 md:right-4">
                    <span className="bg-white/90 backdrop-blur-sm text-purple-600 px-2 py-1 rounded-full text-xs font-medium shadow">
                      {template.category}
                    </span>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-600/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 md:p-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <HiEye className="text-xl md:text-2xl text-purple-600" />
                    </div>
                  </div>
                </div>

                {/* Template Info */}
                <div className="p-4 md:p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-base md:text-lg font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                      {template.name}
                    </h3>
                    <div className="flex items-center text-yellow-500">
                      <HiStar className="w-3 h-3 md:w-4 md:h-4" />
                      <span className="text-xs md:text-sm text-gray-600 ml-1">
                        Popular
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-600 text-xs md:text-sm mb-3 md:mb-4 line-clamp-2">
                    {template.description}
                  </p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-1 mb-3 md:mb-4">
                    {template.features.slice(0, 2).map((feature, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                    {template.features.length > 2 && (
                      <span className="text-xs text-gray-500">
                        +{template.features.length - 2} more
                      </span>
                    )}
                  </div>

                  {/* Action Button */}
                  <Link href={template.link}>
                    <button className="w-full bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white py-2 px-3 md:py-2 md:px-4 rounded-lg md:rounded-xl transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg text-sm md:text-base font-medium">
                      Use This Template
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Carousel Indicators */}
          <div className="flex justify-center mt-6 md:mt-8 space-x-2">
            {activeTemplates.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-gradient-to-r from-purple-500 to-blue-600 scale-125"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to template ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center animate-fadeInUp">
          <p className="text-gray-600 text-sm md:text-base mb-4 md:mb-6">
            Want to see more templates? Browse our complete collection
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4">
            <Link href="/template">
              <button className="bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white px-4 py-2 md:px-6 md:py-3 rounded-full transition-all duration-300 font-semibold text-sm md:text-base transform hover:scale-105 shadow-md hover:shadow-lg">
                View All Templates
              </button>
            </Link>
            <Link href="/upload-resume">
              <button className="bg-white/80 backdrop-blur-sm border border-purple-300 text-purple-600 hover:bg-purple-50 px-4 py-2 md:px-6 md:py-3 rounded-full transition-all duration-300 font-semibold text-sm md:text-base transform hover:scale-105 shadow-md hover:shadow-lg">
                Try AI Templates
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
