
// // // // 'use client';

// // // // import React, { useState } from 'react';

// // // // import Link from 'next/link';
// // // // import Image from 'next/image';
// // // // import { useRouter } from 'next/navigation';
// // // // import { useSession } from 'next-auth/react';

// // // // import { useResumeStore } from '../../../lib/store';
// // // // import { templateConfigs } from '../../../lib/templateConfig';


// // // // // SEO structured data for template page
// // // // const templatePageStructuredData = {
// // // //   "@context": "https://schema.org",
// // // //   "@type": "CollectionPage",
// // // //   "name": "Resume Templates - HG Resume Builder",
// // // //   "description": "Choose from professional resume templates designed by experts. ATS-friendly, customizable, and perfect for any industry.",
// // // //   "url": "https://hg-resume-builder.vercel.app/template",
// // // //   "mainEntity": {
// // // //     "@type": "ItemList",
// // // //     "name": "Resume Templates",
// // // //     "numberOfItems": templateConfigs.length,
// // // //     "itemListElement": templateConfigs.map((template, index) => ({
// // // //       "@type": "CreativeWork",
// // // //       "position": index + 1,
// // // //       "name": template.name,
// // // //       "description": template.description,
// // // //       "category": template.category,
// // // //       "image": `https://hg-resume-builder.vercel.app${template.image}`,
// // // //       "offers": {
// // // //         "@type": "Offer",
// // // //         "price": "0",
// // // //         "priceCurrency": "USD",
// // // //         "availability": template.isWorking ? "https://schema.org/InStock" : "https://schema.org/PreOrder"
// // // //       }
// // // //     }))
// // // //   },
// // // //   "breadcrumb": {
// // // //     "@type": "BreadcrumbList",
// // // //     "itemListElement": [
// // // //       {
// // // //         "@type": "ListItem",
// // // //         "position": 1,
// // // //         "name": "Home",
// // // //         "item": "https://hg-resume-builder.vercel.app/"
// // // //       },
// // // //       {
// // // //         "@type": "ListItem",
// // // //         "position": 2,
// // // //         "name": "Templates",
// // // //         "item": "https://hg-resume-builder.vercel.app/template"
// // // //       }
// // // //     ]
// // // //   }
// // // // };
// // // // import { Button } from '../components/ui/button';
// // // // import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
// // // // import { FiStar, FiFilter, FiGrid, FiList, FiSearch, FiTrendingUp, FiAward, FiZap } from 'react-icons/fi';
// // // // import ResumeOptionModal from '../components/ResumeOptionModal';

// // // // export default function Templates() {
// // // //   const router = useRouter();
// // // //   const { 
// // // //     // data : session, 
// // // //     status } = useSession();
// // // //   const { setTemplateId } = useResumeStore();
// // // //   const [selectedCategory, setSelectedCategory] = useState<string>('all');
// // // //   const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
// // // //   const [showOnlyWorking, setShowOnlyWorking] = useState(false);
// // // //   const [showOnlyPro, setShowOnlyPro] = useState(false);
// // // //   const [sortBy, setSortBy] = useState<"popularity" | "name" | "category" | "id">("id");
// // // //   const [searchTerm, setSearchTerm] = useState("");
// // // //   const [showModal, setShowModal] = useState(false);
// // // //   const [selectedTemplateId, setSelectedTemplateId] = useState<string>('');

// // // //   // Redirect to signin if not authenticated
// // // //   React.useEffect(() => {
// // // //     if (status === 'unauthenticated') {
// // // //       router.push('/auth/signin');
// // // //     }
// // // //   }, [status, router]);

// // // //   // Show loading while checking authentication
// // // //   if (status === 'loading') {
// // // //     return (
// // // //       <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
// // // //         <div className="text-center">
// // // //           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
// // // //           <p className="text-gray-600">Loading...</p>
// // // //         </div>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   // Don't render if not authenticated
// // // //   if (status === 'unauthenticated') {
// // // //     return null;
// // // //   }

// // // //   const categories = ['all', 'Professional', 'Modern', 'Creative', 'Executive', 'Technology'];

// // // //   const filteredTemplates = templateConfigs
// // // //     .filter(template => {
// // // //       const categoryMatch = selectedCategory === 'all' || template.category === selectedCategory;
// // // //       const workingMatch = !showOnlyWorking || template.isWorking;
// // // //       const proMatch = !showOnlyPro || template.isPro;
// // // //       const searchMatch = searchTerm === '' || 
// // // //         template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
// // // //         template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
// // // //         (template.features && template.features.some(feature => 
// // // //           feature.toLowerCase().includes(searchTerm.toLowerCase())
// // // //         ));

// // // //       return categoryMatch && workingMatch && proMatch && searchMatch;
// // // //     })
// // // //     .sort((a, b) => {
// // // //       switch (sortBy) {
// // // //         case "id":
// // // //           return parseInt(a.id) - parseInt(b.id);
// // // //         case "popularity":
// // // //           return (b.popularity || 0) - (a.popularity || 0);
// // // //         case "name":
// // // //           return a.name.localeCompare(b.name);
// // // //         case "category":
// // // //           return (a.category || '').localeCompare(b.category || '');
// // // //         default:
// // // //           return 0;
// // // //       }
// // // //     });

// // // //   const handleTemplateSelect = (templateId: string) => {
// // // //     console.log('Selecting template:', templateId);
// // // //     setTemplateId(templateId);
// // // //     setSelectedTemplateId(templateId);
// // // //     setShowModal(true);
// // // //   };

// // // //   return (
// // // //     <>
// // // //       {/* SEO structured data */}
// // // //       <script
// // // //         type="application/ld+json"
// // // //         dangerouslySetInnerHTML={{ __html: JSON.stringify(templatePageStructuredData) }}
// // // //       />
      
// // // //       <main className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-8">
// // // //       <div className="max-w-7xl mx-auto">

// // // //         {/* Header Section */}
// // // //         <div className="text-center mb-12">
// // // //           <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full mb-6">
// // // //             <FiZap className="text-3xl text-white" />
// // // //           </div>
// // // //           <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent mb-4">
// // // //             Professional Resume Templates
// // // //           </h1>
// // // //           <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
// // // //             Choose from our professionally designed templates that are ATS-friendly and perfect for any industry
// // // //           </p>
// // // //           <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
// // // //             <div className="flex items-center">
// // // //               <FiZap className="mr-1 text-purple-500" />
// // // //               Professional Design
// // // //             </div>
// // // //             <div className="flex items-center">
// // // //               <FiTrendingUp className="mr-1 text-green-500" />
// // // //               ATS-Friendly
// // // //             </div>
// // // //             <div className="flex items-center">
// // // //               <FiAward className="mr-1 text-yellow-500" />
// // // //               Expert Crafted
// // // //             </div>
// // // //           </div>
// // // //           <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-600 mx-auto mt-6 rounded-full"></div>
// // // //         </div>

// // // //         {/* Advanced Filters and Controls */}
// // // //         <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-8 border border-white/20">
// // // //           <div className="flex flex-col space-y-4">
// // // //             {/* Search Bar */}
// // // //             <div className="relative">
// // // //               <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
// // // //               <input
// // // //                 type="text"
// // // //                 placeholder="Search templates, features, or categories..."
// // // //                 value={searchTerm}
// // // //                 onChange={(e) => setSearchTerm(e.target.value)}
// // // //                 className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
// // // //               />
// // // //             </div>

// // // //             <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
// // // //               {/* Category Filter */}
// // // //               <div className="flex flex-wrap gap-2">
// // // //                 <span className="text-sm font-medium text-gray-700 flex items-center mr-2">
// // // //                   <FiFilter className="mr-1" />
// // // //                   Category:
// // // //                 </span>
// // // //                 {categories.map((category) => (
// // // //                   <button
// // // //                     key={category}
// // // //                     onClick={() => setSelectedCategory(category)}
// // // //                     className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
// // // //                       selectedCategory === category
// // // //                         ? "bg-gradient-to-r from-purple-500 to-blue-600 text-white shadow-lg"
// // // //                         : "bg-gray-100 text-gray-700 hover:bg-gray-200"
// // // //                     }`}
// // // //                   >
// // // //                     {category === 'all' ? 'All Templates' : category}
// // // //                   </button>
// // // //                 ))}
// // // //               </div>

// // // //               {/* Sort and View Controls */}
// // // //               <div className="flex items-center gap-4">
// // // //                 <select
// // // //                   value={sortBy}
// // // //                   onChange={(e) =>
// // // //                     setSortBy(
// // // //                       e.target.value as "popularity" | "name" | "category" | "id"
// // // //                     )
// // // //                   }
// // // //                   className="px-3 py-2 border border-gray-200 rounded-lg text-sm"
// // // //                 >
// // // //                   <option value="id">Sort by Order (1,2,3...)</option>
// // // //                   <option value="popularity">Sort by Popularity</option>
// // // //                   <option value="name">Sort by Name</option>
// // // //                   <option value="category">Sort by Category</option>
// // // //                 </select>

// // // //                 <div className="flex items-center gap-2">
// // // //                   <label className="flex items-center text-sm">
// // // //                     <input
// // // //                       type="checkbox"
// // // //                       checked={showOnlyWorking}
// // // //                       onChange={(e) => setShowOnlyWorking(e.target.checked)}
// // // //                       className="mr-2 rounded"
// // // //                     />
// // // //                     Available only
// // // //                   </label>
// // // //                   <label className="flex items-center text-sm">
// // // //                     <input
// // // //                       type="checkbox"
// // // //                       checked={showOnlyPro}
// // // //                       onChange={(e) => setShowOnlyPro(e.target.checked)}
// // // //                       className="mr-2 rounded"
// // // //                     />
// // // //                     Pro only
// // // //                   </label>
// // // //                 </div>

// // // //                 <div className="flex border border-gray-300 rounded-lg overflow-hidden">
// // // //                   <button
// // // //                     onClick={() => setViewMode('grid')}
// // // //                     className={`p-2 transition-colors ${
// // // //                       viewMode === 'grid'
// // // //                         ? "bg-purple-600 text-white"
// // // //                         : "bg-white text-gray-700 hover:bg-gray-50"
// // // //                     }`}
// // // //                   >
// // // //                     <FiGrid className="w-4 h-4" />
// // // //                   </button>
// // // //                   <button
// // // //                     onClick={() => setViewMode('list')}
// // // //                     className={`p-2 transition-colors ${
// // // //                       viewMode === 'list'
// // // //                         ? "bg-purple-600 text-white"
// // // //                         : "bg-white text-gray-700 hover:bg-gray-50"
// // // //                     }`}
// // // //                   >
// // // //                     <FiList className="w-4 h-4" />
// // // //                   </button>
// // // //                 </div>
// // // //               </div>
// // // //             </div>

// // // //             {/* Results Count */}
// // // //             <div className="text-sm text-gray-600">
// // // //               Showing {filteredTemplates.length} of {templateConfigs.length} templates
// // // //               {selectedCategory !== 'all' && ` in ${selectedCategory}`}
// // // //               {searchTerm && ` matching "${searchTerm}"`}
// // // //             </div>
// // // //           </div>
// // // //         </div>

// // // //         {/* Template Grid/List */}
// // // //         <div className={
// // // //           viewMode === 'grid' 
// // // //             ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
// // // //             : 'space-y-4'
// // // //         }>
// // // //           {filteredTemplates.map((template) => (
// // // //             <Card
// // // //               key={template.id}
// // // //               className={`group transition-all duration-300 hover:shadow-2xl hover:border-purple-500 hover:-translate-y-2 bg-white rounded-2xl overflow-hidden border-2 border-gray-100 ${
// // // //                 viewMode === 'list' ? 'flex flex-row' : ''
// // // //               } ${!template.isWorking ? 'opacity-75' : ''}`}
// // // //             >
// // // //               <div className={`relative overflow-hidden ${
// // // //                 viewMode === 'list'
// // // //                   ? 'w-48 flex-shrink-0'
// // // //                   : 'w-full h-[280px]'
// // // //               } ${
// // // //                 !template.isWorking
// // // //                   ? 'bg-gradient-to-br from-gray-100 to-gray-200'
// // // //                   : 'bg-gray-50'
// // // //               }`}>
// // // //                 <Image
// // // //                   src={template.image}
// // // //                   alt={template.name}
// // // //                   fill
// // // //                   sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
// // // //                   className={`transition-transform duration-500 p-2 ${
// // // //                     template.isWorking
// // // //                       ? 'object-contain group-hover:scale-105'
// // // //                       : 'object-contain opacity-80 group-hover:scale-102'
// // // //                   }`}
// // // //                 />

// // // //                 {/* Coming Soon Overlay */}
// // // //                 {!template.isWorking && (
// // // //                   <div className="absolute inset-0 bg-gradient-to-t from-purple-500/20 via-transparent to-blue-500/20 flex items-center justify-center">
// // // //                     <div className="bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg border border-white/50">
// // // //                       <div className="text-center">
// // // //                         <div className="text-2xl mb-1">🚀</div>
// // // //                         <div className="text-sm font-bold text-gray-800">
// // // //                           Coming Soon
// // // //                         </div>
// // // //                       </div>
// // // //                     </div>
// // // //                   </div>
// // // //                 )}

// // // //                 {/* Gradient Overlay */}
// // // //                 <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

// // // //                 {/* Badges */}
// // // //                 <div className="absolute top-3 right-3 flex flex-col gap-1">
// // // //                   {template.isPro && (
// // // //                     <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-2 py-1 rounded-full text-xs font-bold shadow-lg flex items-center">
// // // //                       <FiStar className="w-3 h-3 mr-1" />
// // // //                       PRO
// // // //                     </div>
// // // //                   )}
// // // //                   {template.isWorking && (
// // // //                     <div className="bg-gradient-to-r from-green-400 to-green-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg">
// // // //                       Available
// // // //                     </div>
// // // //                   )}
// // // //                 </div>

// // // //                 {/* Template ID & Popularity */}
// // // //                 <div className="absolute top-3 left-3 flex flex-col gap-1">
// // // //                   <div className="bg-purple-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
// // // //                     {template.id}
// // // //                   </div>
// // // //                   {template.popularity && (
// // // //                     <div className="bg-black/70 text-white px-2 py-1 rounded-full text-xs flex items-center">
// // // //                       <FiTrendingUp className="w-3 h-3 mr-1" />
// // // //                       {template.popularity}%
// // // //                     </div>
// // // //                   )}
// // // //                 </div>

// // // //                 {/* Category Badge */}
// // // //                 <div className="absolute bottom-3 left-3">
// // // //                   <span className="bg-purple-500/90 text-white px-2 py-1 rounded-full text-xs font-medium">
// // // //                     {template.category}
// // // //                   </span>
// // // //                 </div>
// // // //               </div>

// // // //               <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
// // // //                 <CardHeader className="p-0 pb-2">
// // // //                   <CardTitle className="text-lg font-bold text-gray-900 flex items-center">
// // // //                     <div className="bg-gradient-to-r from-purple-400 to-blue-500 w-3 h-3 rounded-full mr-2 animate-pulse"></div>
// // // //                     <span>{template.name}</span>
// // // //                   </CardTitle>
// // // //                 </CardHeader>

// // // //                 <CardContent className="p-0">
// // // //                   <p className="text-gray-600 text-sm mb-3 line-clamp-2">{template.description}</p>
                  
// // // //                   {/* Features */}
// // // //                   {template.features && template.features.length > 0 && (
// // // //                     <div className="mb-4">
// // // //                       <div className="flex flex-wrap gap-1">
// // // //                         {template.features.slice(0, 3).map((feature, index) => (
// // // //                           <span
// // // //                             key={index}
// // // //                             className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
// // // //                           >
// // // //                             {feature}
// // // //                           </span>
// // // //                         ))}
// // // //                         {template.features.length > 3 && (
// // // //                           <span className="text-xs text-gray-500">
// // // //                             +{template.features.length - 3} more
// // // //                           </span>
// // // //                         )}
// // // //                       </div>
// // // //                     </div>
// // // //                   )}

// // // //                   {template.isWorking ? (
// // // //                     <Button
// // // //                       className="w-full bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 hover:shadow-lg"
// // // //                       onClick={() => handleTemplateSelect(template.id)}
// // // //                     >
// // // //                       Select Template
// // // //                     </Button>
// // // //                   ) : (
// // // //                     <Button
// // // //                       className="w-full bg-gray-200 text-gray-600 cursor-not-allowed py-2 px-4 rounded-lg"
// // // //                       disabled={true}
// // // //                     >
// // // //                       Coming Soon
// // // //                     </Button>
// // // //                   )}
// // // //                 </CardContent>
// // // //               </div>
// // // //             </Card>
// // // //           ))}
// // // //         </div>

// // // //         {/* Empty State */}
// // // //         {filteredTemplates.length === 0 && (
// // // //           <div className="text-center py-16">
// // // //             <div className="text-6xl mb-4">🔍</div>
// // // //             <h3 className="text-xl font-semibold text-gray-800 mb-2">No templates found</h3>
// // // //             <p className="text-gray-600 mb-4">
// // // //               Try adjusting your filters or search terms to find the perfect template.
// // // //             </p>
// // // //             <button
// // // //               onClick={() => {
// // // //                 setSelectedCategory('all');
// // // //                 setShowOnlyWorking(false);
// // // //                 setShowOnlyPro(false);
// // // //                 setSearchTerm('');
// // // //               }}
// // // //               className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-600 text-white rounded-xl hover:from-purple-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
// // // //             >
// // // //               Clear All Filters
// // // //             </button>
// // // //           </div>
// // // //         )}



// // // //         {/* Enhanced Footer Stats */}
// // // //         <div className="mt-16 text-center">
// // // //           <div className="inline-flex items-center space-x-8 bg-white/80 backdrop-blur-sm rounded-2xl px-8 py-6 shadow-xl border border-white/20">
// // // //             <div className="text-center">
// // // //               <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
// // // //                 {templateConfigs.length}
// // // //               </div>
// // // //               <div className="text-sm text-gray-600">Templates</div>
// // // //             </div>
// // // //             <div className="w-px h-12 bg-gray-300"></div>
// // // //             <div className="text-center">
// // // //               <div className="text-3xl font-bold bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
// // // //                 100%
// // // //               </div>
// // // //               <div className="text-sm text-gray-600">Professional</div>
// // // //             </div>
// // // //             <div className="w-px h-12 bg-gray-300"></div>
// // // //             <div className="text-center">
// // // //               <div className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
// // // //                 ATS
// // // //               </div>
// // // //               <div className="text-sm text-gray-600">Friendly</div>
// // // //             </div>
// // // //             <div className="w-px h-12 bg-gray-300"></div>
// // // //             <div className="text-center">
// // // //               <div className="text-3xl font-bold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
// // // //                 Free
// // // //               </div>
// // // //               <div className="text-sm text-gray-600">No Cost</div>
// // // //             </div>
// // // //           </div>

// // // //           <div className="mt-8 text-gray-600">
// // // //             <p className="mb-2">
// // // //               🎨 Professionally designed templates for optimal resume performance
// // // //             </p>
// // // //             <p className="text-sm mb-4">
// // // //               More templates are being developed. Have suggestions?
// // // //               <Link
// // // //                 href="/contact"
// // // //                 className="text-purple-600 hover:underline font-semibold ml-1"
// // // //               >
// // // //                 Let us know!
// // // //               </Link>
// // // //             </p>
            
// // // //             {/* Admin Links */}
// // // //             <div className="flex items-center justify-center space-x-4 pt-4 border-t border-gray-200">
// // // //               <Link
// // // //                 href="/admin/notifications"
// // // //                 className="text-xs text-gray-500 hover:text-purple-600 transition-colors"
// // // //               >
// // // //                 📧 Email Subscribers
// // // //               </Link>
// // // //               <span className="text-gray-300">|</span>
// // // //               <Link
// // // //                 href="/upload-resume/ai-templates"
// // // //                 className="text-xs text-gray-500 hover:text-purple-600 transition-colors"
// // // //               >
// // // //                 🤖 AI Templates
// // // //               </Link>
// // // //               <span className="text-gray-300">|</span>
// // // //               <Link
// // // //                 href="/template"
// // // //                 className="text-xs text-gray-500 hover:text-purple-600 transition-colors"
// // // //               >
// // // //                 📄 Regular Templates
// // // //               </Link>
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       </div>

// // // //       {/* Resume Option Modal */}
// // // //       <ResumeOptionModal
// // // //         isOpen={showModal}
// // // //         onClose={() => setShowModal(false)}
// // // //         templateId={selectedTemplateId}
// // // //       />
// // // //     </main>
// // // //     </>
// // // //   );
// // // // }



// // // 'use client';

// // // import React, { useState } from 'react';
// // // import Link from 'next/link';
// // // import Image from 'next/image';
// // // import { useRouter } from 'next/navigation';
// // // import { useSession } from 'next-auth/react';
// // // import { useResumeStore } from '../../../lib/store';
// // // import { templateConfigs } from '../../../lib/templateConfig';
// // // import { Button } from '../components/ui/button';
// // // import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
// // // import { FiStar, FiFilter, FiGrid, FiList, FiSearch, FiTrendingUp, FiAward, FiZap } from 'react-icons/fi';

// // // // SEO structured data for template page
// // // const templatePageStructuredData = {
// // //   "@context": "https://schema.org",
// // //   "@type": "CollectionPage",
// // //   "name": "Resume Templates - HG Resume Builder",
// // //   "description": "Choose from professional resume templates designed by experts. ATS-friendly, customizable, and perfect for any industry.",
// // //   "url": "https://hg-resume-builder.vercel.app/template",
// // //   "mainEntity": {
// // //     "@type": "ItemList",
// // //     "name": "Resume Templates",
// // //     "numberOfItems": templateConfigs.length,
// // //     "itemListElement": templateConfigs.map((template, index) => ({
// // //       "@type": "CreativeWork",
// // //       "position": index + 1,
// // //       "name": template.name,
// // //       "description": template.description,
// // //       "category": template.category,
// // //       "image": `https://hg-resume-builder.vercel.app${template.image}`,
// // //       "offers": {
// // //         "@type": "Offer",
// // //         "price": "0",
// // //         "priceCurrency": "USD",
// // //         "availability": template.isWorking ? "https://schema.org/InStock" : "https://schema.org/PreOrder"
// // //       }
// // //     }))
// // //   },
// // //   "breadcrumb": {
// // //     "@type": "BreadcrumbList",
// // //     "itemListElement": [
// // //       {
// // //         "@type": "ListItem",
// // //         "position": 1,
// // //         "name": "Home",
// // //         "item": "https://hg-resume-builder.vercel.app/"
// // //       },
// // //       {
// // //         "@type": "ListItem",
// // //         "position": 2,
// // //         "name": "Templates",
// // //         "item": "https://hg-resume-builder.vercel.app/template"
// // //       }
// // //     ]
// // //   }
// // // };

// // // export default function Templates() {
// // //   const router = useRouter();
// // //   const { status } = useSession();
// // //   const { setTemplateId } = useResumeStore();
// // //   const [selectedCategory, setSelectedCategory] = useState<string>('all');
// // //   const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
// // //   const [showOnlyWorking, setShowOnlyWorking] = useState(false);
// // //   const [showOnlyPro, setShowOnlyPro] = useState(false);
// // //   const [sortBy, setSortBy] = useState<"popularity" | "name" | "category" | "id">("id");
// // //   const [searchTerm, setSearchTerm] = useState("");

// // //   // Redirect to signin if not authenticated
// // //   React.useEffect(() => {
// // //     if (status === 'unauthenticated') {
// // //       router.push('/auth/signin');
// // //     }
// // //   }, [status, router]);

// // //   // Show loading while checking authentication
// // //   if (status === 'loading') {
// // //     return (
// // //       <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
// // //         <div className="text-center">
// // //           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
// // //           <p className="text-gray-600">Loading...</p>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   // Don't render if not authenticated
// // //   if (status === 'unauthenticated') {
// // //     return null;
// // //   }

// // //   const categories = ['all', 'Professional', 'Modern', 'Creative', 'Executive', 'Technology'];

// // //   const filteredTemplates = templateConfigs
// // //     .filter(template => {
// // //       const categoryMatch = selectedCategory === 'all' || template.category === selectedCategory;
// // //       const workingMatch = !showOnlyWorking || template.isWorking;
// // //       const proMatch = !showOnlyPro || template.isPro;
// // //       const searchMatch = searchTerm === '' || 
// // //         template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
// // //         template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
// // //         (template.features && template.features.some(feature => 
// // //           feature.toLowerCase().includes(searchTerm.toLowerCase())
// // //         ));

// // //       return categoryMatch && workingMatch && proMatch && searchMatch;
// // //     })
// // //     .sort((a, b) => {
// // //       switch (sortBy) {
// // //         case "id":
// // //           return parseInt(a.id) - parseInt(b.id);
// // //         case "popularity":
// // //           return (b.popularity || 0) - (a.popularity || 0);
// // //         case "name":
// // //           return a.name.localeCompare(b.name);
// // //         case "category":
// // //           return (a.category || '').localeCompare(b.category || '');
// // //         default:
// // //           return 0;
// // //       }
// // //     });

// // //   const handleTemplateSelect = (templateId: string) => {
// // //     console.log('Selecting template:', templateId);
// // //     setTemplateId(templateId);
// // //     router.push('/dashboard');
// // //   };

// // //   return (
// // //     <>
// // //       {/* SEO structured data */}
// // //       <script
// // //         type="application/ld+json"
// // //         dangerouslySetInnerHTML={{ __html: JSON.stringify(templatePageStructuredData) }}
// // //       />
      
// // //       <main className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-8">
// // //         <div className="max-w-7xl mx-auto">
// // //           {/* Header Section */}
// // //           <div className="text-center mb-12">
// // //             <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full mb-6">
// // //               <FiZap className="text-3xl text-white" />
// // //             </div>
// // //             <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent mb-4">
// // //                {/* Professional Resume Templates */}
// // //                   AI-Powered Resume Templates
// // //             </h1>
// // //             <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
                  
// // //               Choose from our professionally designed templates that are ATS-friendly and perfect for any industry
// // //             </p>
// // //             <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
// // //               <div className="flex items-center">
// // //                 <FiZap className="mr-1 text-blue-500" />
// // //                 {/* Professional Design */}
// // //                     AI-Optimized
// // //               </div>
// // //               <div className="flex items-center">
// // //                 <FiTrendingUp className="mr-1 text-green-500" />
// // //                 ATS-Friendly
// // //               </div>
// // //               <div className="flex items-center">
// // //                 <FiAward className="mr-1 text-yellow-500" />
// // //                 Expert Crafted
// // //               </div>
// // //             </div>
// // //             <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-600 mx-auto mt-6 rounded-full"></div>
// // //           </div>

// // //           {/* Advanced Filters and Controls */}
// // //           <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-8 border border-white/20">
// // //             <div className="flex flex-col space-y-4">
// // //               {/* Search Bar */}
// // //               <div className="relative">
// // //                 <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
// // //                 <input
// // //                   type="text"
// // //                   placeholder="Search templates, features, or categories..."
// // //                   value={searchTerm}
// // //                   onChange={(e) => setSearchTerm(e.target.value)}
// // //                   className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
// // //                 />
// // //               </div>

// // //               <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
// // //                 {/* Category Filter */}
// // //                 <div className="flex flex-wrap gap-2">
// // //                   <span className="text-sm font-medium text-gray-700 flex items-center mr-2">
// // //                     <FiFilter className="mr-1" />
// // //                     Category:
// // //                   </span>
// // //                   {categories.map((category) => (
// // //                     <button
// // //                       key={category}
// // //                       onClick={() => setSelectedCategory(category)}
// // //                       className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
// // //                         selectedCategory === category
// // //                           ? "bg-gradient-to-r from-purple-500 to-blue-600 text-white shadow-lg"
// // //                           : "bg-gray-100 text-gray-700 hover:bg-gray-200"
// // //                       }`}
// // //                     >
// // //                       {category === 'all' ? 'All Templates' : category}
// // //                     </button>
// // //                   ))}
// // //                 </div>

// // //                 {/* Sort and View Controls */}
// // //                 <div className="flex items-center gap-4">
// // //                   <select
// // //                     value={sortBy}
// // //                     onChange={(e) =>
// // //                       setSortBy(
// // //                         e.target.value as "popularity" | "name" | "category" | "id"
// // //                       )
// // //                     }
// // //                     className="px-3 py-2 border border-gray-200 rounded-lg text-sm"
// // //                   >
// // //                     <option value="id">Sort by Order (1,2,3...)</option>
// // //                     <option value="popularity">Sort by Popularity</option>
// // //                     <option value="name">Sort by Name</option>
// // //                     <option value="category">Sort by Category</option>
// // //                   </select>

// // //                   <div className="flex items-center gap-2">
// // //                     <label className="flex items-center text-sm">
// // //                       <input
// // //                         type="checkbox"
// // //                         checked={showOnlyWorking}
// // //                         onChange={(e) => setShowOnlyWorking(e.target.checked)}
// // //                         className="mr-2 rounded"
// // //                       />
// // //                       Available only
// // //                     </label>
// // //                     <label className="flex items-center text-sm">
// // //                       <input
// // //                         type="checkbox"
// // //                         checked={showOnlyPro}
// // //                         onChange={(e) => setShowOnlyPro(e.target.checked)}
// // //                         className="mr-2 rounded"
// // //                       />
// // //                       Pro only
// // //                     </label>
// // //                   </div>

// // //                   <div className="flex border border-gray-300 rounded-lg overflow-hidden">
// // //                     <button
// // //                       onClick={() => setViewMode('grid')}
// // //                       className={`p-2 transition-colors ${
// // //                         viewMode === 'grid'
// // //                           ? "bg-purple-600 text-white"
// // //                           : "bg-white text-gray-700 hover:bg-gray-50"
// // //                       }`}
// // //                     >
// // //                       <FiGrid className="w-4 h-4" />
// // //                     </button>
// // //                     <button
// // //                       onClick={() => setViewMode('list')}
// // //                       className={`p-2 transition-colors ${
// // //                         viewMode === 'list'
// // //                           ? "bg-purple-600 text-white"
// // //                           : "bg-white text-gray-700 hover:bg-gray-50"
// // //                       }`}
// // //                     >
// // //                       <FiList className="w-4 h-4" />
// // //                     </button>
// // //                   </div>
// // //                 </div>
// // //               </div>

// // //               {/* Results Count */}
// // //               <div className="text-sm text-gray-600">
// // //                 Showing {filteredTemplates.length} of {templateConfigs.length} AI templates
// // //                 {selectedCategory !== 'all' && ` in ${selectedCategory}`}
// // //                 {searchTerm && ` matching "${searchTerm}"`}
// // //               </div>
// // //             </div>
// // //           </div>

// // //           {/* Template Grid/List */}
// // //           <div className={
// // //             viewMode === 'grid' 
// // //               ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
// // //               : 'space-y-4'
// // //           }>
// // //             {filteredTemplates.map((template) => (
// // //               <Card
// // //                 key={template.id}
// // //                 className={`group transition-all duration-300 hover:shadow-2xl hover:border-purple-500 hover:-translate-y-2 bg-white rounded-2xl overflow-hidden border-2 border-gray-100 ${
// // //                   viewMode === 'list' ? 'flex flex-row' : ''
// // //                 } ${!template.isWorking ? 'opacity-75' : ''}`}
// // //               >
// // //                 <div className={`relative overflow-hidden ${
// // //                   viewMode === 'list'
// // //                     ? 'w-48 flex-shrink-0'
// // //                     : 'w-full h-[280px]'
// // //                 } ${
// // //                   !template.isWorking
// // //                     ? 'bg-gradient-to-br from-gray-100 to-gray-200'
// // //                     : 'bg-gray-50'
// // //                 }`}>
// // //                   <Image
// // //                     src={template.image}
// // //                     alt={template.name}
// // //                     fill
// // //                     sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
// // //                     className={`transition-transform duration-500 p-2 ${
// // //                       template.isWorking
// // //                         ? 'object-contain group-hover:scale-105'
// // //                         : 'object-contain opacity-80 group-hover:scale-102'
// // //                     }`}
// // //                   />

// // //                   {/* Coming Soon Overlay */}
// // //                   {!template.isWorking && (
// // //                     <div className="absolute inset-0 bg-gradient-to-t from-purple-500/20 via-transparent to-blue-500/20 flex items-center justify-center">
// // //                       <div className="bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg border border-white/50">
// // //                         <div className="text-center">
// // //                           <div className="text-2xl mb-1">🚀</div>
// // //                           <div className="text-sm font-bold text-gray-800">
// // //                             Coming Soon
// // //                           </div>
// // //                         </div>
// // //                       </div>
// // //                     </div>
// // //                   )}

// // //                   {/* Gradient Overlay */}
// // //                   <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

// // //                   {/* Badges */}
// // //                   <div className="absolute top-3 right-3 flex flex-col gap-1">
// // //                     {template.isPro && (
// // //                       <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-2 py-1 rounded-full text-xs font-bold shadow-lg flex items-center">
// // //                         <FiStar className="w-3 h-3 mr-1" />
// // //                         PRO
// // //                       </div>
// // //                     )}
// // //                     {template.isWorking && (
// // //                       <div className="bg-gradient-to-r from-green-400 to-green-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg">
// // //                         Available
// // //                       </div>
// // //                     )}
// // //                   </div>

// // //                   {/* Template ID & Popularity */}
// // //                   <div className="absolute top-3 left-3 flex flex-col gap-1">
// // //                     <div className="bg-purple-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
// // //                       {template.id}
// // //                     </div>
// // //                     {template.popularity && (
// // //                       <div className="bg-black/70 text-white px-2 py-1 rounded-full text-xs flex items-center">
// // //                         <FiTrendingUp className="w-3 h-3 mr-1" />
// // //                         {template.popularity}%
// // //                       </div>
// // //                     )}
// // //                   </div>

// // //                   {/* Category Badge */}
// // //                   <div className="absolute bottom-3 left-3">
// // //                     <span className="bg-purple-500/90 text-white px-2 py-1 rounded-full text-xs font-medium">
// // //                       {template.category}
// // //                     </span>
// // //                   </div>
// // //                 </div>

// // //                 <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
// // //                   <CardHeader className="p-0 pb-2">
// // //                     <CardTitle className="text-lg font-bold text-gray-900 flex items-center">
// // //                       <div className="bg-gradient-to-r from-purple-400 to-blue-500 w-3 h-3 rounded-full mr-2 animate-pulse"></div>
// // //                       <span>{template.name}</span>
// // //                     </CardTitle>
// // //                   </CardHeader>

// // //                   <CardContent className="p-0">
// // //                     <p className="text-gray-600 text-sm mb-3 line-clamp-2">{template.description}</p>
                    
// // //                     {/* Features */}
// // //                     {template.features && template.features.length > 0 && (
// // //                       <div className="mb-4">
// // //                         <div className="flex flex-wrap gap-1">
// // //                           {template.features.slice(0, 3).map((feature, index) => (
// // //                             <span
// // //                               key={index}
// // //                               className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
// // //                             >
// // //                               {feature}
// // //                             </span>
// // //                           ))}
// // //                           {template.features.length > 3 && (
// // //                             <span className="text-xs text-gray-500">
// // //                               +{template.features.length - 3} more
// // //                             </span>
// // //                           )}
// // //                         </div>
// // //                       </div>
// // //                     )}

// // //                     {template.isWorking ? (
// // //                       <Button
// // //                         className="w-full bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 hover:shadow-lg"
// // //                         onClick={() => handleTemplateSelect(template.id)}
// // //                       >
// // //                         Select Template
// // //                       </Button>
// // //                     ) : (
// // //                       <Button
// // //                         className="w-full bg-gray-200 text-gray-600 cursor-not-allowed py-2 px-4 rounded-lg"
// // //                         disabled={true}
// // //                       >
// // //                         Coming Soon
// // //                       </Button>
// // //                     )}
// // //                   </CardContent>
// // //                 </div>
// // //               </Card>
// // //             ))}
// // //           </div>

// // //           {/* Empty State */}
// // //           {filteredTemplates.length === 0 && (
// // //             <div className="text-center py-16">
// // //               <div className="text-6xl mb-4">🔍</div>
// // //               <h3 className="text-xl font-semibold text-gray-800 mb-2">No templates found</h3>
// // //               <p className="text-gray-600 mb-4">
// // //                 Try adjusting your filters or search terms to find the perfect template.
// // //               </p>
// // //               <button
// // //                 onClick={() => {
// // //                   setSelectedCategory('all');
// // //                   setShowOnlyWorking(false);
// // //                   setShowOnlyPro(false);
// // //                   setSearchTerm('');
// // //                 }}
// // //                 className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-600 text-white rounded-xl hover:from-purple-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
// // //               >
// // //                 Clear All Filters
// // //               </button>
// // //             </div>
// // //           )}

// // //           {/* Enhanced Footer Stats */}
// // //           <div className="mt-16 text-center">
// // //             <div className="inline-flex items-center space-x-8 bg-white/80 backdrop-blur-sm rounded-2xl px-8 py-6 shadow-xl border border-white/20">
// // //               <div className="text-center">
// // //                 <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
// // //                   {templateConfigs.length}
// // //                 </div>
// // //                 <div className="text-sm text-gray-600">AI Templates</div>
// // //               </div>
// // //               <div className="w-px h-12 bg-gray-300"></div>
// // //               <div className="text-center">
// // //                 <div className="text-3xl font-bold bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
// // //                   100%
// // //                 </div>
// // //                 <div className="text-sm text-gray-600">AI Optimized</div>
// // //               </div>
// // //               <div className="w-px h-12 bg-gray-300"></div>
// // //               <div className="text-center">
// // //                 <div className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
// // //                   ATS
// // //                 </div>
// // //                 <div className="text-sm text-gray-600">Friendly</div>
// // //               </div>
// // //               <div className="w-px h-12 bg-gray-300"></div>
// // //               <div className="text-center">
// // //                 <div className="text-3xl font-bold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
// // //                   Free
// // //                 </div>
// // //                 <div className="text-sm text-gray-600">No Cost</div>
// // //               </div>
// // //             </div>

// // //             <div className="mt-8 text-gray-600">
// // //               <p className="mb-2">
// // // {/*                 🎨 Professionally designed templates for optimal resume performance */}
// // //                     🤖 Powered by advanced AI algorithms for optimal resume performance
// // //               </p>
// // //               <p className="text-sm mb-4">
// // // {/*                 More templates are being developed. Have suggestions? */}
// // //                     More AI templates are being developed. Have suggestions?
// // //                 <Link
// // //                   href="/contact"
// // //                   className="text-purple-600 hover:underline font-semibold ml-1"
// // //                 >
// // //                   Let us know!
// // //                 </Link>
// // //               </p>
              
// // //               {/* Admin Links */}
// // //               <div className="flex items-center justify-center space-x-4 pt-4 border-t border-gray-200">
// // //                 <Link
// // //                   href="/admin/notifications"
// // //                   className="text-xs text-gray-500 hover:text-purple-600 transition-colors"
// // //                 >
// // //                   📧 Email Subscribers
// // //                 </Link>
// // //                 <span className="text-gray-300">|</span>
// // //                 <Link
// // //                   href="/template"
// // //                   className="text-xs text-gray-500 hover:text-purple-600 transition-colors"
// // //                 >
// // //                   📄 Regular Templates
// // //                 </Link>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </main>
// // //     </>
// // //   );
// // // }


// // 'use client';

// // import React, { useState } from 'react';
// // import Link from 'next/link';
// // import Image from 'next/image';
// // import { useRouter } from 'next/navigation';
// // import { useSession } from 'next-auth/react';
// // import { useResumeStore } from '../../../lib/store';
// // import { templateConfigs } from '../../../lib/templateConfig';
// // import { Button } from '../components/ui/button';
// // import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
// // import { FiStar, FiFilter, FiGrid, FiList, FiSearch, FiTrendingUp, FiAward, FiZap } from 'react-icons/fi';

// // // SEO structured data for template page
// // const templatePageStructuredData = {
// //   "@context": "https://schema.org",
// //   "@type": "CollectionPage",
// //   "name": "Resume Templates - HG Resume Builder",
// //   "description": "Choose from professional resume templates designed by experts. ATS-friendly, customizable, and perfect for any industry.",
// //   "url": "https://hg-resume-builder.vercel.app/template",
// //   "mainEntity": {
// //     "@type": "ItemList",
// //     "name": "Resume Templates",
// //     "numberOfItems": templateConfigs.length,
// //     "itemListElement": templateConfigs.map((template, index) => ({
// //       "@type": "CreativeWork",
// //       "position": index + 1,
// //       "name": template.name,
// //       "description": template.description,
// //       "category": template.category,
// //       "image": `https://hg-resume-builder.vercel.app${template.image}`,
// //       "offers": {
// //         "@type": "Offer",
// //         "price": "0",
// //         "priceCurrency": "USD",
// //         "availability": template.isWorking ? "https://schema.org/InStock" : "https://schema.org/PreOrder"
// //       }
// //     }))
// //   },
// //   "breadcrumb": {
// //     "@type": "BreadcrumbList",
// //     "itemListElement": [
// //       {
// //         "@type": "ListItem",
// //         "position": 1,
// //         "name": "Home",
// //         "item": "https://hg-resume-builder.vercel.app/"
// //       },
// //       {
// //         "@type": "ListItem",
// //         "position": 2,
// //         "name": "Templates",
// //         "item": "https://hg-resume-builder.vercel.app/template"
// //       }
// //     ]
// //   }
// // };

// // export default function Templates() {
// //   const router = useRouter();
// //   const { status } = useSession();
// //   const { setTemplateId } = useResumeStore();
// //   const [selectedCategory, setSelectedCategory] = useState<string>('all');
// //   const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
// //   const [showOnlyWorking, setShowOnlyWorking] = useState(false);
// //   const [showOnlyPro, setShowOnlyPro] = useState(false);
// //   const [sortBy, setSortBy] = useState<"popularity" | "name" | "category" | "id">("id");
// //   const [searchTerm, setSearchTerm] = useState("");

// //   // Redirect to signin if not authenticated
// //   React.useEffect(() => {
// //     if (status === 'unauthenticated') {
// //       router.push('/auth/signin');
// //     }
// //   }, [status, router]);

// //   // Show loading while checking authentication
// //   if (status === 'loading') {
// //     return (
// //       <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
// //         <div className="text-center">
// //           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
// //           <p className="text-gray-600">Loading...</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   // Don't render if not authenticated
// //   if (status === 'unauthenticated') {
// //     return null;
// //   }

// //   const categories = ['all', 'Professional', 'Modern', 'Creative', 'Executive', 'Technology'];

// //   const filteredTemplates = templateConfigs
// //     .filter(template => {
// //       const categoryMatch = selectedCategory === 'all' || template.category === selectedCategory;
// //       const workingMatch = !showOnlyWorking || template.isWorking;
// //       const proMatch = !showOnlyPro || template.isPro;
// //       const searchMatch = searchTerm === '' || 
// //         template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //         template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //         (template.features && template.features.some(feature => 
// //           feature.toLowerCase().includes(searchTerm.toLowerCase())
// //         ));

// //       return categoryMatch && workingMatch && proMatch && searchMatch;
// //     })
// //     .sort((a, b) => {
// //       switch (sortBy) {
// //         case "id":
// //           return parseInt(a.id) - parseInt(b.id);
// //         case "popularity":
// //           return (b.popularity || 0) - (a.popularity || 0);
// //         case "name":
// //           return a.name.localeCompare(b.name);
// //         case "category":
// //           return (a.category || '').localeCompare(b.category || '');
// //         default:
// //           return 0;
// //       }
// //     });

// //   const handleTemplateSelect = (templateId: string) => {
// //     console.log('Selecting template:', templateId);
// //     setTemplateId(templateId);
// //     router.push('/dashboard');
// //   };

// //   return (
// //     <>
// //       {/* SEO structured data */}
// //       <script
// //         type="application/ld+json"
// //         dangerouslySetInnerHTML={{ __html: JSON.stringify(templatePageStructuredData) }}
// //       />
      
// //       <main className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-8">
// //         <div className="max-w-7xl mx-auto">
// //           {/* Header Section */}
// //           <div className="text-center mb-12">
// //             <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full mb-6">
// //               <FiZap className="text-3xl text-white" />
// //             </div>
// //             <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent mb-4">
// //               AI-Powered Resume Templates
// //             </h1>
// //             <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
// //               Choose from our intelligent resume templates that adapt to your content and optimize for ATS systems
// //             </p>
// //             <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
// //               <div className="flex items-center">
// //                 <FiZap className="mr-1 text-purple-500" />
// //                 AI-Optimized
// //               </div>
// //               <div className="flex items-center">
// //                 <FiTrendingUp className="mr-1 text-green-500" />
// //                 ATS-Friendly
// //               </div>
// //               <div className="flex items-center">
// //                 <FiAward className="mr-1 text-yellow-500" />
// //                 Expert Crafted
// //               </div>
// //             </div>
// //             <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-600 mx-auto mt-6 rounded-full"></div>
// //           </div>

// //           {/* Advanced Filters and Controls */}
// //           <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-8 border border-white/20">
// //             <div className="flex flex-col space-y-4">
// //               {/* Search Bar */}
// //               <div className="relative">
// //                 <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
// //                 <input
// //                   type="text"
// //                   placeholder="Search templates, features, or categories..."
// //                   value={searchTerm}
// //                   onChange={(e) => setSearchTerm(e.target.value)}
// //                   className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
// //                 />
// //               </div>

// //               <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
// //                 {/* Category Filter */}
// //                 <div className="flex flex-wrap gap-2">
// //                   <span className="text-sm font-medium text-gray-700 flex items-center mr-2">
// //                     <FiFilter className="mr-1" />
// //                     Category:
// //                   </span>
// //                   {categories.map((category) => (
// //                     <button
// //                       key={category}
// //                       onClick={() => setSelectedCategory(category)}
// //                       className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
// //                         selectedCategory === category
// //                           ? "bg-gradient-to-r from-purple-500 to-blue-600 text-white shadow-lg"
// //                           : "bg-gray-100 text-gray-700 hover:bg-gray-200"
// //                       }`}
// //                     >
// //                       {category === 'all' ? 'All Templates' : category}
// //                     </button>
// //                   ))}
// //                 </div>

// //                 {/* Sort and View Controls */}
// //                 <div className="flex items-center gap-4">
// //                   <select
// //                     value={sortBy}
// //                     onChange={(e) =>
// //                       setSortBy(
// //                         e.target.value as "popularity" | "name" | "category" | "id"
// //                       )
// //                     }
// //                     className="px-3 py-2 border border-gray-200 rounded-lg text-sm"
// //                   >
// //                     <option value="id">Sort by Order (1,2,3...)</option>
// //                     <option value="popularity">Sort by Popularity</option>
// //                     <option value="name">Sort by Name</option>
// //                     <option value="category">Sort by Category</option>
// //                   </select>

// //                   <div className="flex items-center gap-2">
// //                     <label className="flex items-center text-sm">
// //                       <input
// //                         type="checkbox"
// //                         checked={showOnlyWorking}
// //                         onChange={(e) => setShowOnlyWorking(e.target.checked)}
// //                         className="mr-2 rounded"
// //                       />
// //                       Available only
// //                     </label>
// //                     <label className="flex items-center text-sm">
// //                       <input
// //                         type="checkbox"
// //                         checked={showOnlyPro}
// //                         onChange={(e) => setShowOnlyPro(e.target.checked)}
// //                         className="mr-2 rounded"
// //                       />
// //                       Pro only
// //                     </label>
// //                   </div>

// //                   <div className="flex border border-gray-300 rounded-lg overflow-hidden">
// //                     <button
// //                       onClick={() => setViewMode('grid')}
// //                       className={`p-2 transition-colors ${
// //                         viewMode === 'grid'
// //                           ? "bg-purple-600 text-white"
// //                           : "bg-white text-gray-700 hover:bg-gray-50"
// //                       }`}
// //                     >
// //                       <FiGrid className="w-4 h-4" />
// //                     </button>
// //                     <button
// //                       onClick={() => setViewMode('list')}
// //                       className={`p-2 transition-colors ${
// //                         viewMode === 'list'
// //                           ? "bg-purple-600 text-white"
// //                           : "bg-white text-gray-700 hover:bg-gray-50"
// //                       }`}
// //                     >
// //                       <FiList className="w-4 h-4" />
// //                     </button>
// //                   </div>
// //                 </div>
// //               </div>

// //               {/* Results Count */}
// //               <div className="text-sm text-gray-600">
// //                 Showing {filteredTemplates.length} of {templateConfigs.length} AI templates
// //                 {selectedCategory !== 'all' && ` in ${selectedCategory}`}
// //                 {searchTerm && ` matching "${searchTerm}"`}
// //               </div>
// //             </div>
// //           </div>

// //           {/* Template Grid/List */}
// //           <div className={
// //             viewMode === 'grid' 
// //               ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
// //               : 'space-y-4'
// //           }>
// //             {filteredTemplates.map((template) => (
// //               <Card
// //                 key={template.id}
// //                 className={`group transition-all duration-300 hover:shadow-2xl hover:border-purple-500 hover:-translate-y-2 bg-white rounded-2xl overflow-hidden border-2 border-gray-100 ${
// //                   viewMode === 'list' ? 'flex flex-row' : ''
// //                 } ${!template.isWorking ? 'opacity-75' : ''}`}
// //               >
// //                 <div className={`relative overflow-hidden ${
// //                   viewMode === 'list'
// //                     ? 'w-48 flex-shrink-0'
// //                     : 'w-full h-[280px]'
// //                 } ${
// //                   !template.isWorking
// //                     ? 'bg-gradient-to-br from-gray-100 to-gray-200'
// //                     : 'bg-gray-50'
// //                 }`}>
// //                   <Image
// //                     src={template.image}
// //                     alt={template.name}
// //                     fill
// //                     sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
// //                     className={`transition-transform duration-500 p-2 ${
// //                       template.isWorking
// //                         ? 'object-contain group-hover:scale-105'
// //                         : 'object-contain opacity-80 group-hover:scale-102'
// //                     }`}
// //                   />

// //                   {/* Coming Soon Overlay */}
// //                   {!template.isWorking && (
// //                     <div className="absolute inset-0 bg-gradient-to-t from-purple-500/20 via-transparent to-blue-500/20 flex items-center justify-center">
// //                       <div className="bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg border border-white/50">
// //                         <div className="text-center">
// //                           <div className="text-2xl mb-1">🚀</div>
// //                           <div className="text-sm font-bold text-gray-800">
// //                             Coming Soon
// //                           </div>
// //                         </div>
// //                       </div>
// //                     </div>
// //                   )}

// //                   {/* Gradient Overlay */}
// //                   <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

// //                   {/* Badges */}
// //                   <div className="absolute top-3 right-3 flex flex-col gap-1">
// //                     {template.isPro && (
// //                       <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-2 py-1 rounded-full text-xs font-bold shadow-lg flex items-center">
// //                         <FiStar className="w-3 h-3 mr-1" />
// //                         PRO
// //                       </div>
// //                     )}
// //                     {template.isWorking && (
// //                       <div className="bg-gradient-to-r from-green-400 to-green-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg">
// //                         Available
// //                       </div>
// //                     )}
// //                   </div>

// //                   {/* Template ID & Popularity */}
// //                   <div className="absolute top-3 left-3 flex flex-col gap-1">
// //                     <div className="bg-purple-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
// //                       {template.id}
// //                     </div>
// //                     {template.popularity && (
// //                       <div className="bg-black/70 text-white px-2 py-1 rounded-full text-xs flex items-center">
// //                         <FiTrendingUp className="w-3 h-3 mr-1" />
// //                         {template.popularity}%
// //                       </div>
// //                     )}
// //                   </div>

// //                   {/* Category Badge */}
// //                   <div className="absolute bottom-3 left-3">
// //                     <span className="bg-purple-500/90 text-white px-2 py-1 rounded-full text-xs font-medium">
// //                       {template.category}
// //                     </span>
// //                   </div>
// //                 </div>

// //                 <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
// //                   <CardHeader className="p-0 pb-2">
// //                     <CardTitle className="text-lg font-bold text-gray-900 flex items-center">
// //                       <div className="bg-gradient-to-r from-purple-400 to-blue-500 w-3 h-3 rounded-full mr-2 animate-pulse"></div>
// //                       <span>{template.name}</span>
// //                     </CardTitle>
// //                   </CardHeader>

// //                   <CardContent className="p-0">
// //                     <p className="text-gray-600 text-sm mb-3 line-clamp-2">{template.description}</p>
                    
// //                     {/* Features */}
// //                     {template.features && template.features.length > 0 && (
// //                       <div className="mb-4">
// //                         <div className="flex flex-wrap gap-1">
// //                           {template.features.slice(0, 3).map((feature, index) => (
// //                             <span
// //                               key={index}
// //                               className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
// //                             >
// //                               {feature}
// //                             </span>
// //                           ))}
// //                           {template.features.length > 3 && (
// //                             <span className="text-xs text-gray-500">
// //                               +{template.features.length - 3} more
// //                             </span>
// //                           )}
// //                         </div>
// //                       </div>
// //                     )}

// //                     {template.isWorking ? (
// //                       <Button
// //                         className="w-full bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 hover:shadow-lg"
// //                         onClick={() => handleTemplateSelect(template.id)}
// //                       >
// //                         Select AI Template
// //                       </Button>
// //                     ) : (
// //                       <Button
// //                         className="w-full bg-gray-200 text-gray-600 cursor-not-allowed py-2 px-4 rounded-lg"
// //                         disabled={true}
// //                       >
// //                         Coming Soon
// //                       </Button>
// //                     )}
// //                   </CardContent>
// //                 </div>
// //               </Card>
// //             ))}
// //           </div>

// //           {/* Empty State */}
// //           {filteredTemplates.length === 0 && (
// //             <div className="text-center py-16">
// //               <div className="text-6xl mb-4">🔍</div>
// //               <h3 className="text-xl font-semibold text-gray-800 mb-2">No AI templates found</h3>
// //               <p className="text-gray-600 mb-4">
// //                 Try adjusting your filters or search terms to find the perfect AI template.
// //               </p>
// //               <button
// //                 onClick={() => {
// //                   setSelectedCategory('all');
// //                   setShowOnlyWorking(false);
// //                   setShowOnlyPro(false);
// //                   setSearchTerm('');
// //                 }}
// //                 className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-600 text-white rounded-xl hover:from-purple-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
// //               >
// //                 Clear All Filters
// //               </button>
// //             </div>
// //           )}

// //           {/* Coming Soon Notification */}
// //           {filteredTemplates.some((t) => !t.isWorking) && (
// //             <div className="mt-12 text-center">
// //               <div className="inline-flex items-center bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-dashed border-purple-300 rounded-2xl px-8 py-6 max-w-2xl">
// //                 <div className="text-4xl mr-4">🔔</div>
// //                 <div className="text-left">
// //                   <h3 className="text-lg font-bold text-gray-800 mb-2">
// //                     Get Notified When New Templates Launch!
// //                   </h3>
// //                   <p className="text-gray-600 text-sm mb-3">
// //                     We&apos;re working hard to bring you more AI-powered templates. Want to be the first to know?
// //                   </p>
// //                   <div className="flex gap-2">
// //                     <input
// //                       type="email"
// //                       placeholder="Enter your email"
// //                       className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
// //                     />
// //                     <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg text-sm font-medium hover:from-purple-600 hover:to-blue-600 transition-all duration-300">
// //                       Notify Me
// //                     </button>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //           )}

// //           {/* Enhanced Footer Stats */}
// //           <div className="mt-16 text-center">
// //             <div className="inline-flex items-center space-x-8 bg-white/80 backdrop-blur-sm rounded-2xl px-8 py-6 shadow-xl border border-white/20">
// //               <div className="text-center">
// //                 <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
// //                   {templateConfigs.length}
// //                 </div>
// //                 <div className="text-sm text-gray-600">AI Templates</div>
// //               </div>
// //               <div className="w-px h-12 bg-gray-300"></div>
// //               <div className="text-center">
// //                 <div className="text-3xl font-bold bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
// //                   100%
// //                 </div>
// //                 <div className="text-sm text-gray-600">AI Optimized</div>
// //               </div>
// //               <div className="w-px h-12 bg-gray-300"></div>
// //               <div className="text-center">
// //                 <div className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
// //                   ATS
// //                 </div>
// //                 <div className="text-sm text-gray-600">Friendly</div>
// //               </div>
// //               <div className="w-px h-12 bg-gray-300"></div>
// //               <div className="text-center">
// //                 <div className="text-3xl font-bold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
// //                   Free
// //                 </div>
// //                 <div className="text-sm text-gray-600">No Cost</div>
// //               </div>
// //             </div>

// //             <div className="mt-8 text-gray-600">
// //               <p className="mb-2">
// //                 🤖 Powered by advanced AI algorithms for optimal resume performance
// //               </p>
// //               <p className="text-sm mb-4">
// //                 More AI templates are being developed. Have suggestions?
// //                 <Link
// //                   href="/contact"
// //                   className="text-purple-600 hover:underline font-semibold ml-1"
// //                 >
// //                   Let us know!
// //                 </Link>
// //               </p>
              
// //               {/* Admin Links */}
// //               <div className="flex items-center justify-center space-x-4 pt-4 border-t border-gray-200">
// //                 <Link
// //                   href="/admin/notifications"
// //                   className="text-xs text-gray-500 hover:text-purple-600 transition-colors"
// //                 >
// //                   📧 Email Subscribers
// //                 </Link>
// //                 <span className="text-gray-300">|</span>
// //                 <Link
// //                   href="/template"
// //                   className="text-xs text-gray-500 hover:text-purple-600 transition-colors"
// //                 >
// //                   📄 Regular Templates
// //                 </Link>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </main>
// //     </>
// //   );
// // }


// 'use client';

// import React, { useState } from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
// import { useRouter } from 'next/navigation';
// import { useSession } from 'next-auth/react';
// import { useResumeStore } from '../../../lib/store';
// import { templateConfigs } from '../../../lib/templateConfig';
// import { Button } from '../components/ui/button';
// import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
// import { FiStar, FiFilter, FiGrid, FiList, FiSearch, FiTrendingUp, FiAward, FiZap } from 'react-icons/fi';
// import toast from 'react-hot-toast';

// // SEO structured data for template page
// const templatePageStructuredData = {
//   "@context": "https://schema.org",
//   "@type": "CollectionPage",
//   "name": "Resume Templates - HG Resume Builder",
//   "description": "Choose from professional resume templates designed by experts. ATS-friendly, customizable, and perfect for any industry.",
//   "url": "https://hg-resume-builder.vercel.app/template",
//   "mainEntity": {
//     "@type": "ItemList",
//     "name": "Resume Templates",
//     "numberOfItems": templateConfigs.length,
//     "itemListElement": templateConfigs.map((template, index) => ({
//       "@type": "CreativeWork",
//       "position": index + 1,
//       "name": template.name,
//       "description": template.description,
//       "category": template.category,
//       "image": `https://hg-resume-builder.vercel.app${template.image}`,
//       "offers": {
//         "@type": "Offer",
//         "price": "0",
//         "priceCurrency": "USD",
//         "availability": template.isWorking ? "https://schema.org/InStock" : "https://schema.org/PreOrder"
//       }
//     }))
//   },
//   "breadcrumb": {
//     "@type": "BreadcrumbList",
//     "itemListElement": [
//       {
//         "@type": "ListItem",
//         "position": 1,
//         "name": "Home",
//         "item": "https://hg-resume-builder.vercel.app/"
//       },
//       {
//         "@type": "ListItem",
//         "position": 2,
//         "name": "Templates",
//         "item": "https://hg-resume-builder.vercel.app/template"
//       }
//     ]
//   }
// };

// export default function Templates() {
//   const router = useRouter();
//   const { status } = useSession();
//   const { setTemplateId } = useResumeStore();
//   const [selectedCategory, setSelectedCategory] = useState<string>('all');
//   const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
//   const [showOnlyWorking, setShowOnlyWorking] = useState(false);
//   const [showOnlyPro, setShowOnlyPro] = useState(false);
//   const [sortBy, setSortBy] = useState<"popularity" | "name" | "category" | "id">("id");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [notifyEmail, setNotifyEmail] = useState("");
//   const [isNotifying, setIsNotifying] = useState(false);

//   // Redirect to signin if not authenticated
//   React.useEffect(() => {
//     if (status === 'unauthenticated') {
//       router.push('/auth/signin');
//     }
//   }, [status, router]);

//   // Show loading while checking authentication
//   if (status === 'loading') {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading...</p>
//         </div>
//       </div>
//     );
//   }

//   // Don't render if not authenticated
//   if (status === 'unauthenticated') {
//     return null;
//   }

//   const categories = ['all', 'Professional', 'Modern', 'Creative', 'Executive', 'Technology'];

//   const filteredTemplates = templateConfigs
//     .filter(template => {
//       const categoryMatch = selectedCategory === 'all' || template.category === selectedCategory;
//       const workingMatch = !showOnlyWorking || template.isWorking;
//       const proMatch = !showOnlyPro || template.isPro;
//       const searchMatch = searchTerm === '' || 
//         template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         (template.features && template.features.some(feature => 
//           feature.toLowerCase().includes(searchTerm.toLowerCase())
//         ));

//       return categoryMatch && workingMatch && proMatch && searchMatch;
//     })
//     .sort((a, b) => {
//       switch (sortBy) {
//         case "id":
//           return parseInt(a.id) - parseInt(b.id);
//         case "popularity":
//           return (b.popularity || 0) - (a.popularity || 0);
//         case "name":
//           return a.name.localeCompare(b.name);
//         case "category":
//           return (a.category || '').localeCompare(b.category || '');
//         default:
//           return 0;
//       }
//     });

//   const handleTemplateSelect = (templateId: string) => {
//     console.log('Selecting template:', templateId);
//     setTemplateId(templateId);
//     router.push('/dashboard');
//   };

//   const handleNotifyMe = async () => {
//     if (!notifyEmail.trim()) {
//       toast.error("Please enter your email");
//       return;
//     }

//     setIsNotifying(true);
//     try {
//       const response = await fetch('/api/notifications', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ 
//           email: notifyEmail.trim(), 
//           type: 'template_updates',
//           timestamp: new Date().toISOString()
//         }),
//       });

//       const data = await response.json();
      
//       if (response.ok) {
//         toast.success("You'll be notified when new templates launch!");
//         setNotifyEmail("");
//       } else {
//         toast.error(data.error || "Failed to subscribe for notifications");
//       }
//     } catch (error) {
//       toast.error("Failed to subscribe. Please try again.");
//       console.error("Notification subscription error:", error);
//     } finally {
//       setIsNotifying(false);
//     }
//   };

//   return (
//     <>
//       {/* SEO structured data */}
//       <script
//         type="application/ld+json"
//         dangerouslySetInnerHTML={{ __html: JSON.stringify(templatePageStructuredData) }}
//       />
      
//       <main className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-8">
//         <div className="max-w-7xl mx-auto">
//           {/* Header Section */}
//           <div className="text-center mb-12">
//             <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full mb-6">
//               <FiZap className="text-3xl text-white" />
//             </div>
//             <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent mb-4">
//               AI-Powered Resume Templates
//             </h1>
//             <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
//               Choose from our intelligent resume templates that adapt to your content and optimize for ATS systems
//             </p>
//             <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
//               <div className="flex items-center">
//                 <FiZap className="mr-1 text-purple-500" />
//                 AI-Optimized
//               </div>
//               <div className="flex items-center">
//                 <FiTrendingUp className="mr-1 text-green-500" />
//                 ATS-Friendly
//               </div>
//               <div className="flex items-center">
//                 <FiAward className="mr-1 text-yellow-500" />
//                 Expert Crafted
//               </div>
//             </div>
//             <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-600 mx-auto mt-6 rounded-full"></div>
//           </div>

//           {/* Advanced Filters and Controls */}
//           <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-8 border border-white/20">
//             <div className="flex flex-col space-y-4">
//               {/* Search Bar */}
//               <div className="relative">
//                 <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                 <input
//                   type="text"
//                   placeholder="Search templates, features, or categories..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                 />
//               </div>

//               <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
//                 {/* Category Filter */}
//                 <div className="flex flex-wrap gap-2">
//                   <span className="text-sm font-medium text-gray-700 flex items-center mr-2">
//                     <FiFilter className="mr-1" />
//                     Category:
//                   </span>
//                   {categories.map((category) => (
//                     <button
//                       key={category}
//                       onClick={() => setSelectedCategory(category)}
//                       className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
//                         selectedCategory === category
//                           ? "bg-gradient-to-r from-purple-500 to-blue-600 text-white shadow-lg"
//                           : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                       }`}
//                     >
//                       {category === 'all' ? 'All Templates' : category}
//                     </button>
//                   ))}
//                 </div>

//                 {/* Sort and View Controls */}
//                 <div className="flex items-center gap-4">
//                   <select
//                     value={sortBy}
//                     onChange={(e) =>
//                       setSortBy(
//                         e.target.value as "popularity" | "name" | "category" | "id"
//                       )
//                     }
//                     className="px-3 py-2 border border-gray-200 rounded-lg text-sm"
//                   >
//                     <option value="id">Sort by Order (1,2,3...)</option>
//                     <option value="popularity">Sort by Popularity</option>
//                     <option value="name">Sort by Name</option>
//                     <option value="category">Sort by Category</option>
//                   </select>

//                   <div className="flex items-center gap-2">
//                     <label className="flex items-center text-sm">
//                       <input
//                         type="checkbox"
//                         checked={showOnlyWorking}
//                         onChange={(e) => setShowOnlyWorking(e.target.checked)}
//                         className="mr-2 rounded"
//                       />
//                       Available only
//                     </label>
//                     <label className="flex items-center text-sm">
//                       <input
//                         type="checkbox"
//                         checked={showOnlyPro}
//                         onChange={(e) => setShowOnlyPro(e.target.checked)}
//                         className="mr-2 rounded"
//                       />
//                       Pro only
//                     </label>
//                   </div>

//                   <div className="flex border border-gray-300 rounded-lg overflow-hidden">
//                     <button
//                       onClick={() => setViewMode('grid')}
//                       className={`p-2 transition-colors ${
//                         viewMode === 'grid'
//                           ? "bg-purple-600 text-white"
//                           : "bg-white text-gray-700 hover:bg-gray-50"
//                       }`}
//                     >
//                       <FiGrid className="w-4 h-4" />
//                     </button>
//                     <button
//                       onClick={() => setViewMode('list')}
//                       className={`p-2 transition-colors ${
//                         viewMode === 'list'
//                           ? "bg-purple-600 text-white"
//                           : "bg-white text-gray-700 hover:bg-gray-50"
//                       }`}
//                     >
//                       <FiList className="w-4 h-4" />
//                     </button>
//                   </div>
//                 </div>
//               </div>

//               {/* Results Count */}
//               <div className="text-sm text-gray-600">
//                 Showing {filteredTemplates.length} of {templateConfigs.length} AI templates
//                 {selectedCategory !== 'all' && ` in ${selectedCategory}`}
//                 {searchTerm && ` matching "${searchTerm}"`}
//               </div>
//             </div>
//           </div>

//           {/* Template Grid/List */}
//           <div className={
//             viewMode === 'grid' 
//               ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
//               : 'space-y-4'
//           }>
//             {filteredTemplates.map((template) => (
//               <Card
//                 key={template.id}
//                 className={`group transition-all duration-300 hover:shadow-2xl hover:border-purple-500 hover:-translate-y-2 bg-white rounded-2xl overflow-hidden border-2 border-gray-100 ${
//                   viewMode === 'list' ? 'flex flex-row' : ''
//                 } ${!template.isWorking ? 'opacity-75' : ''}`}
//               >
//                 <div className={`relative overflow-hidden ${
//                   viewMode === 'list'
//                     ? 'w-48 flex-shrink-0'
//                     : 'w-full h-[280px]'
//                 } ${
//                   !template.isWorking
//                     ? 'bg-gradient-to-br from-gray-100 to-gray-200'
//                     : 'bg-gray-50'
//                 }`}>
//                   <Image
//                     src={template.image}
//                     alt={template.name}
//                     fill
//                     sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
//                     className={`transition-transform duration-500 p-2 ${
//                       template.isWorking
//                         ? 'object-contain group-hover:scale-105'
//                         : 'object-contain opacity-80 group-hover:scale-102'
//                     }`}
//                   />

//                   {/* Coming Soon Overlay */}
//                   {!template.isWorking && (
//                     <div className="absolute inset-0 bg-gradient-to-t from-purple-500/20 via-transparent to-blue-500/20 flex items-center justify-center">
//                       <div className="bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg border border-white/50">
//                         <div className="text-center">
//                           <div className="text-2xl mb-1">🚀</div>
//                           <div className="text-sm font-bold text-gray-800">
//                             Coming Soon
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   )}

//                   {/* Gradient Overlay */}
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

//                   {/* Badges */}
//                   <div className="absolute top-3 right-3 flex flex-col gap-1">
//                     {template.isPro && (
//                       <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-2 py-1 rounded-full text-xs font-bold shadow-lg flex items-center">
//                         <FiStar className="w-3 h-3 mr-1" />
//                         PRO
//                       </div>
//                     )}
//                     {template.isWorking && (
//                       <div className="bg-gradient-to-r from-green-400 to-green-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg">
//                         Available
//                       </div>
//                     )}
//                   </div>

//                   {/* Template ID & Popularity */}
//                   <div className="absolute top-3 left-3 flex flex-col gap-1">
//                     <div className="bg-purple-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
//                       {template.id}
//                     </div>
//                     {template.popularity && (
//                       <div className="bg-black/70 text-white px-2 py-1 rounded-full text-xs flex items-center">
//                         <FiTrendingUp className="w-3 h-3 mr-1" />
//                         {template.popularity}%
//                       </div>
//                     )}
//                   </div>

//                   {/* Category Badge */}
//                   <div className="absolute bottom-3 left-3">
//                     <span className="bg-purple-500/90 text-white px-2 py-1 rounded-full text-xs font-medium">
//                       {template.category}
//                     </span>
//                   </div>
//                 </div>

//                 <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
//                   <CardHeader className="p-0 pb-2">
//                     <CardTitle className="text-lg font-bold text-gray-900 flex items-center">
//                       <div className="bg-gradient-to-r from-purple-400 to-blue-500 w-3 h-3 rounded-full mr-2 animate-pulse"></div>
//                       <span>{template.name}</span>
//                     </CardTitle>
//                   </CardHeader>

//                   <CardContent className="p-0">
//                     <p className="text-gray-600 text-sm mb-3 line-clamp-2">{template.description}</p>
                    
//                     {/* Features */}
//                     {template.features && template.features.length > 0 && (
//                       <div className="mb-4">
//                         <div className="flex flex-wrap gap-1">
//                           {template.features.slice(0, 3).map((feature, index) => (
//                             <span
//                               key={index}
//                               className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
//                             >
//                               {feature}
//                             </span>
//                           ))}
//                           {template.features.length > 3 && (
//                             <span className="text-xs text-gray-500">
//                               +{template.features.length - 3} more
//                             </span>
//                           )}
//                         </div>
//                       </div>
//                     )}

//                     {template.isWorking ? (
//                       <Button
//                         className="w-full bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 hover:shadow-lg"
//                         onClick={() => handleTemplateSelect(template.id)}
//                       >
//                         Select AI Template
//                       </Button>
//                     ) : (
//                       <Button
//                         className="w-full bg-gray-200 text-gray-600 cursor-not-allowed py-2 px-4 rounded-lg"
//                         disabled={true}
//                       >
//                         Coming Soon
//                       </Button>
//                     )}
//                   </CardContent>
//                 </div>
//               </Card>
//             ))}
//           </div>

//           {/* Empty State */}
//           {filteredTemplates.length === 0 && (
//             <div className="text-center py-16">
//               <div className="text-6xl mb-4">🔍</div>
//               <h3 className="text-xl font-semibold text-gray-800 mb-2">No AI templates found</h3>
//               <p className="text-gray-600 mb-4">
//                 Try adjusting your filters or search terms to find the perfect AI template.
//               </p>
//               <button
//                 onClick={() => {
//                   setSelectedCategory('all');
//                   setShowOnlyWorking(false);
//                   setShowOnlyPro(false);
//                   setSearchTerm('');
//                 }}
//                 className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-600 text-white rounded-xl hover:from-purple-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
//               >
//                 Clear All Filters
//               </button>
//             </div>
//           )}

//           {/* Coming Soon Notification */}
//           {filteredTemplates.some((t) => !t.isWorking) && (
//             <div className="mt-12 text-center">
//               <div className="inline-flex items-center bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-dashed border-purple-300 rounded-2xl px-8 py-6 max-w-2xl">
//                 <div className="text-4xl mr-4">🔔</div>
//                 <div className="text-left">
//                   <h3 className="text-lg font-bold text-gray-800 mb-2">
//                     Get Notified When New Templates Launch!
//                   </h3>
//                   <p className="text-gray-600 text-sm mb-3">
//                     We&apos;re working hard to bring you more AI-powered templates. Want to be the first to know?
//                   </p>
//                   <div className="flex gap-2">
//                     <input
//                       type="email"
//                       value={notifyEmail}
//                       onChange={(e) => setNotifyEmail(e.target.value)}
//                       placeholder="Enter your email"
//                       className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                       disabled={isNotifying}
//                     />
//                     <button 
//                       onClick={handleNotifyMe}
//                       disabled={isNotifying}
//                       className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg text-sm font-medium hover:from-purple-600 hover:to-blue-600 transition-all duration-300 disabled:opacity-50"
//                     >
//                       {isNotifying ? "Subscribing..." : "Notify Me"}
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Enhanced Footer Stats */}
//           <div className="mt-16 text-center">
//             <div className="inline-flex items-center space-x-8 bg-white/80 backdrop-blur-sm rounded-2xl px-8 py-6 shadow-xl border border-white/20">
//               <div className="text-center">
//                 <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
//                   {templateConfigs.length}
//                 </div>
//                 <div className="text-sm text-gray-600">AI Templates</div>
//               </div>
//               <div className="w-px h-12 bg-gray-300"></div>
//               <div className="text-center">
//                 <div className="text-3xl font-bold bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
//                   100%
//                 </div>
//                 <div className="text-sm text-gray-600">AI Optimized</div>
//               </div>
//               <div className="w-px h-12 bg-gray-300"></div>
//               <div className="text-center">
//                 <div className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
//                   ATS
//                 </div>
//                 <div className="text-sm text-gray-600">Friendly</div>
//               </div>
//               <div className="w-px h-12 bg-gray-300"></div>
//               <div className="text-center">
//                 <div className="text-3xl font-bold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
//                   Free
//                 </div>
//                 <div className="text-sm text-gray-600">No Cost</div>
//               </div>
//             </div>

//             <div className="mt-8 text-gray-600">
//               <p className="mb-2">
//                 🤖 Powered by advanced AI algorithms for optimal resume performance
//               </p>
//               <p className="text-sm mb-4">
//                 More AI templates are being developed. Have suggestions?
//                 <Link
//                   href="/contact"
//                   className="text-purple-600 hover:underline font-semibold ml-1"
//                 >
//                   Let us know!
//                 </Link>
//               </p>
              
//               {/* Admin Links */}
//               <div className="flex items-center justify-center space-x-4 pt-4 border-t border-gray-200">
//                 <Link
//                   href="/admin/notifications"
//                   className="text-xs text-gray-500 hover:text-purple-600 transition-colors"
//                 >
//                   📧 Email Subscribers
//                 </Link>
//                 <span className="text-gray-300">|</span>
//                 <Link
//                   href="/template"
//                   className="text-xs text-gray-500 hover:text-purple-600 transition-colors"
//                 >
//                   📄 Regular Templates
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//     </>
//   );
// }


'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useResumeStore } from '../../../lib/store';
import { templateConfigs } from '../../../lib/templateConfig';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { FiStar, FiFilter, FiGrid, FiList, FiSearch, FiTrendingUp, FiAward, FiZap } from 'react-icons/fi';
import toast from 'react-hot-toast';

// SEO structured data for template page
const templatePageStructuredData = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Resume Templates - HG Resume Builder",
  "description": "Choose from professional resume templates designed by experts. ATS-friendly, customizable, and perfect for any industry.",
  "url": "https://hg-resume-builder.vercel.app/template",
  "mainEntity": {
    "@type": "ItemList",
    "name": "Resume Templates",
    "numberOfItems": templateConfigs.length,
    "itemListElement": templateConfigs.map((template, index) => ({
      "@type": "CreativeWork",
      "position": index + 1,
      "name": template.name,
      "description": template.description,
      "category": template.category,
      "image": `https://hg-resume-builder.vercel.app${template.image}`,
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD",
        "availability": template.isWorking ? "https://schema.org/InStock" : "https://schema.org/PreOrder"
      }
    }))
  },
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://hg-resume-builder.vercel.app/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Templates",
        "item": "https://hg-resume-builder.vercel.app/template"
      }
    ]
  }
};

export default function Templates() {
  const router = useRouter();
  const { status } = useSession();
  const { setTemplateId } = useResumeStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showOnlyWorking, setShowOnlyWorking] = useState(false);
  const [showOnlyPro, setShowOnlyPro] = useState(false);
  const [sortBy, setSortBy] = useState<"popularity" | "name" | "category" | "id">("id");
  const [searchTerm, setSearchTerm] = useState("");
  const [notifyEmail, setNotifyEmail] = useState("");
  const [isNotifying, setIsNotifying] = useState(false);

  // Redirect to signin if not authenticated
  React.useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  // Show loading while checking authentication
  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render if not authenticated
  if (status === 'unauthenticated') {
    return null;
  }

  const categories = ['all', 'Professional', 'Modern', 'Creative', 'Executive', 'Technology'];

  const filteredTemplates = templateConfigs
    .filter(template => {
      const categoryMatch = selectedCategory === 'all' || template.category === selectedCategory;
      const workingMatch = !showOnlyWorking || template.isWorking;
      const proMatch = !showOnlyPro || template.isPro;
      const searchMatch = searchTerm === '' || 
        template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (template.features && template.features.some(feature => 
          feature.toLowerCase().includes(searchTerm.toLowerCase())
        ));

      return categoryMatch && workingMatch && proMatch && searchMatch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "id":
          return parseInt(a.id) - parseInt(b.id);
        case "popularity":
          return (b.popularity || 0) - (a.popularity || 0);
        case "name":
          return a.name.localeCompare(b.name);
        case "category":
          return (a.category || '').localeCompare(b.category || '');
        default:
          return 0;
      }
    });

  const handleTemplateSelect = (templateId: string) => {
    console.log('Selecting template:', templateId);
    setTemplateId(templateId);
    router.push('/dashboard');
  };

  const handleNotifyMe = async () => {
    if (!notifyEmail.trim()) {
      toast.error("Please enter your email");
      return;
    }

    setIsNotifying(true);
    try {
      const response = await fetch('/api/notifications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email: notifyEmail.trim(), 
          type: 'template_updates',
          timestamp: new Date().toISOString()
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        toast.success("You'll be notified when new templates launch!");
        setNotifyEmail("");
      } else {
        toast.error(data.error || "Failed to subscribe for notifications");
      }
    } catch (error) {
      toast.error("Failed to subscribe. Please try again.");
      console.error("Notification subscription error:", error);
    } finally {
      setIsNotifying(false);
    }
  };

  return (
    <>
      {/* SEO structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(templatePageStructuredData) }}
      />
      
      <main className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4 sm:p-6 md:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-8 md:mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full mb-4 md:mb-6">
              <FiZap className="text-2xl md:text-3xl text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent mb-3 md:mb-4">
              AI-Powered Resume Templates
            </h1>
            <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto mb-4 md:mb-6">
              Choose from our intelligent resume templates that adapt to your content and optimize for ATS systems
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-xs md:text-sm text-gray-500">
              <div className="flex items-center">
                <FiZap className="mr-1 text-purple-500" />
                AI-Optimized
              </div>
              <div className="flex items-center">
                <FiTrendingUp className="mr-1 text-green-500" />
                ATS-Friendly
              </div>
              <div className="flex items-center">
                <FiAward className="mr-1 text-yellow-500" />
                Expert Crafted
              </div>
            </div>
            <div className="w-16 md:w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-600 mx-auto mt-4 md:mt-6 rounded-full"></div>
          </div>

          {/* Advanced Filters and Controls */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl md:rounded-2xl shadow-lg md:shadow-xl p-4 md:p-6 mb-6 md:mb-8 border border-white/20">
            <div className="flex flex-col space-y-4">
              {/* Search Bar */}
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search templates, features, or categories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 md:py-3 border border-gray-200 rounded-lg md:rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm md:text-base"
                />
              </div>

              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                {/* Category Filter */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <span className="text-sm font-medium text-gray-700 flex items-center mr-2 mb-2 sm:mb-0">
                    <FiFilter className="mr-1" />
                    Category:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-200 ${
                          selectedCategory === category
                            ? "bg-gradient-to-r from-purple-500 to-blue-600 text-white shadow-md md:shadow-lg"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {category === 'all' ? 'All' : category}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sort and View Controls */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 md:gap-4">
                  <select
                    value={sortBy}
                    onChange={(e) =>
                      setSortBy(
                        e.target.value as "popularity" | "name" | "category" | "id"
                      )
                    }
                    className="px-3 py-2 border border-gray-200 rounded-lg text-xs md:text-sm"
                  >
                    <option value="id">Sort by Order</option>
                    <option value="popularity">Sort by Popularity</option>
                    <option value="name">Sort by Name</option>
                    <option value="category">Sort by Category</option>
                  </select>

                  <div className="flex items-center gap-3">
                    <label className="flex items-center text-xs md:text-sm">
                      <input
                        type="checkbox"
                        checked={showOnlyWorking}
                        onChange={(e) => setShowOnlyWorking(e.target.checked)}
                        className="mr-1 md:mr-2 rounded"
                      />
                      Available
                    </label>
                    <label className="flex items-center text-xs md:text-sm">
                      <input
                        type="checkbox"
                        checked={showOnlyPro}
                        onChange={(e) => setShowOnlyPro(e.target.checked)}
                        className="mr-1 md:mr-2 rounded"
                      />
                      Pro
                    </label>
                  </div>

                  <div className="flex border border-gray-300 rounded-lg overflow-hidden self-start">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 transition-colors ${
                        viewMode === 'grid'
                          ? "bg-purple-600 text-white"
                          : "bg-white text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <FiGrid className="w-3 h-3 md:w-4 md:h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 transition-colors ${
                        viewMode === 'list'
                          ? "bg-purple-600 text-white"
                          : "bg-white text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <FiList className="w-3 h-3 md:w-4 md:h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Results Count */}
              <div className="text-xs md:text-sm text-gray-600">
                Showing {filteredTemplates.length} of {templateConfigs.length} AI templates
                {selectedCategory !== 'all' && ` in ${selectedCategory}`}
                {searchTerm && ` matching "${searchTerm}"`}
              </div>
            </div>
          </div>

          {/* Template Grid/List */}
          <div className={
            viewMode === 'grid' 
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6'
              : 'space-y-4'
          }>
            {filteredTemplates.map((template) => (
              <Card
                key={template.id}
                className={`group transition-all duration-300 hover:shadow-xl md:hover:shadow-2xl hover:border-purple-400 md:hover:border-purple-500 hover:-translate-y-1 md:hover:-translate-y-2 bg-white rounded-xl md:rounded-2xl overflow-hidden border border-gray-100 md:border-2 ${
                  viewMode === 'list' ? 'flex flex-col sm:flex-row' : ''
                } ${!template.isWorking ? 'opacity-75' : ''}`}
              >
                <div className={`relative overflow-hidden ${
                  viewMode === 'list'
                    ? 'sm:w-48 flex-shrink-0 h-48 sm:h-auto'
                    : 'w-full h-[200px] sm:h-[240px] md:h-[280px]'
                } ${
                  !template.isWorking
                    ? 'bg-gradient-to-br from-gray-100 to-gray-200'
                    : 'bg-gray-50'
                }`}>
                  <Image
                    src={template.image}
                    alt={template.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className={`transition-transform duration-500 p-2 ${
                      template.isWorking
                        ? 'object-contain group-hover:scale-105'
                        : 'object-contain opacity-80 group-hover:scale-102'
                    }`}
                  />

                  {/* Coming Soon Overlay */}
                  {!template.isWorking && (
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-500/20 via-transparent to-blue-500/20 flex items-center justify-center">
                      <div className="bg-white/90 backdrop-blur-sm rounded-lg md:rounded-xl px-3 py-1 md:px-4 md:py-2 shadow-md md:shadow-lg border border-white/50">
                        <div className="text-center">
                          <div className="text-xl md:text-2xl mb-1">🚀</div>
                          <div className="text-xs md:text-sm font-bold text-gray-800">
                            Coming Soon
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Badges */}
                  <div className="absolute top-2 right-2 md:top-3 md:right-3 flex flex-col gap-1">
                    {template.isPro && (
                      <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-2 py-1 rounded-full text-xs font-bold shadow-md md:shadow-lg flex items-center">
                        <FiStar className="w-2 h-2 md:w-3 md:h-3 mr-1" />
                        PRO
                      </div>
                    )}
                    {template.isWorking && (
                      <div className="bg-gradient-to-r from-green-400 to-green-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-md md:shadow-lg">
                        Available
                      </div>
                    )}
                  </div>

                  {/* Template ID & Popularity */}
                  <div className="absolute top-2 left-2 md:top-3 md:left-3 flex flex-col gap-1">
                    <div className="bg-purple-500 text-white w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center text-xs md:text-sm font-bold shadow-md md:shadow-lg">
                      {template.id}
                    </div>
                    {template.popularity && (
                      <div className="bg-black/70 text-white px-1 py-0.5 md:px-2 md:py-1 rounded-full text-xs flex items-center">
                        <FiTrendingUp className="w-2 h-2 md:w-3 md:h-3 mr-1" />
                        {template.popularity}%
                      </div>
                    )}
                  </div>

                  {/* Category Badge */}
                  <div className="absolute bottom-2 left-2 md:bottom-3 md:left-3">
                    <span className="bg-purple-500/90 text-white px-2 py-0.5 md:px-2 md:py-1 rounded-full text-xs font-medium">
                      {template.category}
                    </span>
                  </div>
                </div>

                <div className={`p-3 md:p-4 ${viewMode === 'list' ? 'sm:flex-1' : ''}`}>
                  <CardHeader className="p-0 pb-1 md:pb-2">
                    <CardTitle className="text-base md:text-lg font-bold text-gray-900 flex items-center">
                      <div className="bg-gradient-to-r from-purple-400 to-blue-500 w-2 h-2 md:w-3 md:h-3 rounded-full mr-2 animate-pulse"></div>
                      <span>{template.name}</span>
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="p-0">
                    <p className="text-gray-600 text-xs md:text-sm mb-2 md:mb-3 line-clamp-2">{template.description}</p>
                    
                    {/* Features */}
                    {template.features && template.features.length > 0 && (
                      <div className="mb-3 md:mb-4">
                        <div className="flex flex-wrap gap-1">
                          {template.features.slice(0, 3).map((feature, index) => (
                            <span
                              key={index}
                              className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 md:px-2 md:py-1 rounded-full"
                            >
                              {feature}
                            </span>
                          ))}
                          {template.features.length > 3 && (
                            <span className="text-xs text-gray-500">
                              +{template.features.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {template.isWorking ? (
                      <Button
                        className="w-full bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white font-medium py-1.5 md:py-2 px-3 md:px-4 rounded-lg md:rounded-lg transition-all duration-200 hover:shadow-md text-xs md:text-sm"
                        onClick={() => handleTemplateSelect(template.id)}
                      >
                        Select AI Template
                      </Button>
                    ) : (
                      <Button
                        className="w-full bg-gray-200 text-gray-600 cursor-not-allowed py-1.5 md:py-2 px-3 md:px-4 rounded-lg md:rounded-lg text-xs md:text-sm"
                        disabled={true}
                      >
                        Coming Soon
                      </Button>
                    )}
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>

          {/* Empty State */}
          {filteredTemplates.length === 0 && (
            <div className="text-center py-12 md:py-16">
              <div className="text-4xl md:text-6xl mb-3 md:mb-4">🔍</div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-1 md:mb-2">No AI templates found</h3>
              <p className="text-gray-600 text-sm md:text-base mb-3 md:mb-4">
                Try adjusting your filters or search terms to find the perfect AI template.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setShowOnlyWorking(false);
                  setShowOnlyPro(false);
                  setSearchTerm('');
                }}
                className="px-4 py-2 md:px-6 md:py-3 bg-gradient-to-r from-purple-500 to-blue-600 text-white rounded-lg md:rounded-xl hover:from-purple-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 text-sm md:text-base"
              >
                Clear All Filters
              </button>
            </div>
          )}

          {/* Coming Soon Notification */}
          {filteredTemplates.some((t) => !t.isWorking) && (
            <div className="mt-8 md:mt-12 text-center">
              <div className="inline-flex flex-col sm:flex-row items-center bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-dashed border-purple-300 rounded-xl md:rounded-2xl px-4 py-4 md:px-8 md:py-6 max-w-2xl">
                <div className="text-3xl md:text-4xl mr-0 sm:mr-4 mb-2 sm:mb-0">🔔</div>
                <div className="text-center sm:text-left">
                  <h3 className="text-base md:text-lg font-bold text-gray-800 mb-1 md:mb-2">
                    Get Notified When New Templates Launch!
                  </h3>
                  <p className="text-gray-600 text-xs md:text-sm mb-2 md:mb-3">
                    We&apos;re working hard to bring you more AI-powered templates. Want to be the first to know?
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="email"
                      value={notifyEmail}
                      onChange={(e) => setNotifyEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-xs md:text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      disabled={isNotifying}
                    />
                    <button 
                      onClick={handleNotifyMe}
                      disabled={isNotifying}
                      className="px-3 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg text-xs md:text-sm font-medium hover:from-purple-600 hover:to-blue-600 transition-all duration-300 disabled:opacity-50"
                    >
                      {isNotifying ? "Subscribing..." : "Notify Me"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Enhanced Footer Stats */}
          <div className="mt-12 md:mt-16 text-center">
            <div className="inline-flex flex-wrap items-center justify-center gap-4 md:gap-8 bg-white/80 backdrop-blur-sm rounded-xl md:rounded-2xl px-4 py-4 md:px-8 md:py-6 shadow-lg md:shadow-xl border border-white/20">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  {templateConfigs.length}
                </div>
                <div className="text-xs md:text-sm text-gray-600">AI Templates</div>
              </div>
              <div className="hidden md:block w-px h-8 md:h-12 bg-gray-300"></div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
                  100%
                </div>
                <div className="text-xs md:text-sm text-gray-600">AI Optimized</div>
              </div>
              <div className="hidden md:block w-px h-8 md:h-12 bg-gray-300"></div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                  ATS
                </div>
                <div className="text-xs md:text-sm text-gray-600">Friendly</div>
              </div>
              <div className="hidden md:block w-px h-8 md:h-12 bg-gray-300"></div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
                  Free
                </div>
                <div className="text-xs md:text-sm text-gray-600">No Cost</div>
              </div>
            </div>

            <div className="mt-6 md:mt-8 text-gray-600 text-sm md:text-base">
              <p className="mb-1 md:mb-2">
                🤖 Powered by advanced AI algorithms for optimal resume performance
              </p>
              <p className="text-xs md:text-sm mb-3 md:mb-4">
                More AI templates are being developed. Have suggestions?
                <Link
                  href="/contact"
                  className="text-purple-600 hover:underline font-semibold ml-1"
                >
                  Let us know!
                </Link>
              </p>
              
              {/* Admin Links */}
              <div className="flex items-center justify-center space-x-3 md:space-x-4 pt-3 md:pt-4 border-t border-gray-200">
                <Link
                  href="/admin/notifications"
                  className="text-xs text-gray-500 hover:text-purple-600 transition-colors"
                >
                  📧 Email Subscribers
                </Link>
                <span className="text-gray-300">|</span>
                <Link
                  href="/template"
                  className="text-xs text-gray-500 hover:text-purple-600 transition-colors"
                >
                  📄 Regular Templates
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
