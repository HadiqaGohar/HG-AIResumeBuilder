"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useResumeStore } from "../../../../lib/store";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../app/components/ui/card";
import { Button } from "../../../app/components/ui/button";
import {
  FiStar,
  FiFilter,
  FiGrid,
  FiList,
  FiZap,
  FiTrendingUp,
  FiAward,
  FiSearch,
} from "react-icons/fi";

const aiTemplates = [
  {
    id: "1",
    name: "AI Classic Pro",
    description:
      "AI-optimized classic layout with smart formatting and ATS optimization.",
    image: "/Template/template1.png",
    isPro: false,
    category: "Professional",
    features: ["ATS Optimized", "Smart Formatting", "AI Enhanced"],
    popularity: 95,
    isWorking: true,
    aiFeatures: ["Auto-formatting", "Content suggestions", "Skill matching"],
  },
  {
    id: "2",
    name: "AI Modern Elite",
    description:
      "AI-driven modern design with intelligent content suggestions.",
    image: "/Template/template2.png",
    isPro: true,
    category: "Modern",
    features: ["AI Content", "Modern Design", "Color Adaptive"],
    popularity: 88,
    isWorking: true,
    aiFeatures: ["Smart layouts", "Dynamic colors", "Content optimization"],
  },
  {
    id: "3",
    name: "AI Professional Elite",
    description:
      "AI-enhanced professional layout with dark header and green accents.",
    image: "/Template/template3.png",
    isPro: false,
    category: "Professional",
    features: ["Dark Header", "Green Accents", "Two Column"],
    popularity: 89,
    isWorking: true,
    aiFeatures: [
      "Professional formatting",
      "Smart layouts",
      "Contact optimization",
    ],
  },
  {
    id: "4",
    name: "AI Executive Master",
    description: "AI-optimized executive template for senior professionals.",
    image: "/coming.png",
    isPro: true,
    category: "Executive",
    features: ["Executive Style", "Leadership Focus", "AI Optimized"],
    popularity: 82,
    isWorking: false,
    aiFeatures: [
      "Leadership highlights",
      "Executive formatting",
      "Achievement focus",
    ],
  },
  {
    id: "5",
    name: "AI Tech Specialist",
    description:
      "AI-powered template designed specifically for tech professionals.",
    image: "/coming.png",
    isPro: false,
    category: "Technology",
    features: ["Tech Focused", "Skills Highlight", "AI Enhanced"],
    popularity: 91,
    isWorking: false,
    aiFeatures: [
      "Tech skills analysis",
      "Project highlighting",
      "Code-friendly format",
    ],
  },
  {
    id: "6",
    name: "AI Startup Founder",
    description: "AI-driven template for entrepreneurs and startup founders.",
    image: "/coming.png",
    isPro: true,
    category: "Modern",
    features: ["Startup Ready", "Vision Focused", "AI Powered"],
    popularity: 73,
    isWorking: false,
    aiFeatures: ["Vision statements", "Startup metrics", "Growth highlights"],
  },
  {
    id: "7",
    name: "AI Academic Scholar",
    description:
      "AI-optimized template for researchers and academic professionals.",
    image: "/coming.png",
    isPro: false,
    category: "Professional",
    features: ["Academic Focus", "Research Highlight", "Publication Ready"],
    popularity: 79,
    isWorking: false,
    aiFeatures: [
      "Research formatting",
      "Publication lists",
      "Academic achievements",
    ],
  },
  {
    id: "8",
    name: "AI Sales Champion",
    description:
      "AI-driven template designed for sales and marketing professionals.",
    image: "/coming.png",
    isPro: true,
    category: "Modern",
    features: ["Sales Focused", "Achievement Metrics", "Results Driven"],
    popularity: 85,
    isWorking: false,
    aiFeatures: [
      "Sales metrics",
      "Achievement highlights",
      "Performance tracking",
    ],
  },
  {
    id: "9",
    name: "AI Healthcare Pro",
    description:
      "AI-enhanced template for healthcare and medical professionals.",
    image: "/coming.png",
    isPro: false,
    category: "Professional",
    features: ["Medical Focus", "Certification Highlight", "Patient Care"],
    popularity: 88,
    isWorking: false,
    aiFeatures: [
      "Medical formatting",
      "Certification tracking",
      "Care experience",
    ],
  },
  {
    id: "10",
    name: "AI Finance Expert",
    description: "AI-powered template for finance and banking professionals.",
    image: "/coming.png",
    isPro: true,
    category: "Executive",
    features: ["Finance Focus", "Analytical Skills", "Risk Management"],
    popularity: 81,
    isWorking: false,
    aiFeatures: [
      "Financial analysis",
      "Risk assessment",
      "Portfolio management",
    ],
  },
];

export default function AITemplates() {
  const { setTemplateId } = useResumeStore();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showOnlyWorking, setShowOnlyWorking] = useState(false);
  const [showOnlyPro, setShowOnlyPro] = useState(false);
  const [sortBy, setSortBy] = useState<
    "popularity" | "name" | "category" | "id"
  >("id");
  const [searchTerm, setSearchTerm] = useState("");

  const categories = [
    "all",
    "Professional",
    "Modern",
    "Creative",
    "Executive",
    "Technology",
  ];

  const filteredTemplates = aiTemplates
    .filter((template) => {
      const categoryMatch =
        selectedCategory === "all" || template.category === selectedCategory;
      const workingMatch = !showOnlyWorking || template.isWorking;
      const proMatch = !showOnlyPro || template.isPro;
      const searchMatch =
        searchTerm === "" ||
        template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.features.some((feature) =>
          feature.toLowerCase().includes(searchTerm.toLowerCase())
        );

      return categoryMatch && workingMatch && proMatch && searchMatch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "id":
          return parseInt(a.id) - parseInt(b.id);
        case "popularity":
          return b.popularity - a.popularity;
        case "name":
          return a.name.localeCompare(b.name);
        case "category":
          return a.category.localeCompare(b.category);
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6">
            <FiZap className="text-3xl text-white" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            AI-Powered Resume Templates
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
            Choose from our intelligent resume templates that adapt to your
            content and optimize for ATS systems
          </p>
          <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
            <div className="flex items-center">
              <FiZap className="mr-1 text-blue-500" />
              AI-Optimized
            </div>
            <div className="flex items-center">
              <FiTrendingUp className="mr-1 text-green-500" />
              ATS-Friendly
            </div>
            <div className="flex items-center">
              <FiAward className="mr-1 text-yellow-500" />
              Expert Designed
            </div>
          </div>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Advanced Filters and Controls */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-8 border border-white/20">
          <div className="flex flex-col space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search templates, features, or categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                <span className="text-sm font-medium text-gray-700 flex items-center mr-2">
                  <FiFilter className="mr-1" />
                  Category:
                </span>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      selectedCategory === category
                        ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {category === "all" ? "All Templates" : category}
                  </button>
                ))}
              </div>

              {/* Sort and View Controls */}
              <div className="flex items-center gap-4">
                <select
                  value={sortBy}
                  onChange={(e) =>
                    setSortBy(
                      e.target.value as
                        | "popularity"
                        | "name"
                        | "category"
                        | "id"
                    )
                  }
                  className="px-3 py-2 border border-gray-200 rounded-lg text-sm"
                >
                  <option value="id">Sort by Order (1,2,3...)</option>
                  <option value="popularity">Sort by Popularity</option>
                  <option value="name">Sort by Name</option>
                  <option value="category">Sort by Category</option>
                </select>

                <div className="flex items-center gap-2">
                  <label className="flex items-center text-sm">
                    <input
                      type="checkbox"
                      checked={showOnlyWorking}
                      onChange={(e) => setShowOnlyWorking(e.target.checked)}
                      className="mr-2 rounded"
                    />
                    Available only
                  </label>
                  <label className="flex items-center text-sm">
                    <input
                      type="checkbox"
                      checked={showOnlyPro}
                      onChange={(e) => setShowOnlyPro(e.target.checked)}
                      className="mr-2 rounded"
                    />
                    Pro only
                  </label>
                </div>

                <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 transition-colors ${
                      viewMode === "grid"
                        ? "bg-purple-600 text-white"
                        : "bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <FiGrid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 transition-colors ${
                      viewMode === "list"
                        ? "bg-purple-600 text-white"
                        : "bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <FiList className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Results Count */}
            <div className="text-sm text-gray-600">
              Showing {filteredTemplates.length} of {aiTemplates.length} AI
              templates
              {selectedCategory !== "all" && ` in ${selectedCategory}`}
              {searchTerm && ` matching "${searchTerm}"`}
            </div>
          </div>
        </div>

        {/* Template Grid/List */}
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              : "space-y-4"
          }
        >
          {filteredTemplates.map((template) => (
            <Card
              key={template.id}
              className={`group transition-all duration-300 hover:shadow-2xl hover:border-blue-500 hover:-translate-y-2 bg-white rounded-2xl overflow-hidden border-2 border-gray-100 ${
                viewMode === "list" ? "flex flex-row" : ""
              } ${!template.isWorking ? "opacity-75" : ""}`}
            >
              {/* Optimized Image Container */}
              <div
                className={`relative overflow-hidden ${
                  viewMode === "list"
                    ? "w-48 flex-shrink-0"
                    : "w-full h-[280px]"
                } ${
                  !template.isWorking
                    ? "bg-gradient-to-br from-gray-100 to-gray-200"
                    : "bg-gray-50"
                }`}
              >
                <Image
                  src={template.image}
                  alt={template.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className={`transition-transform duration-500 p-2 ${
                    template.isWorking
                      ? "object-contain group-hover:scale-105"
                      : "object-contain opacity-80 group-hover:scale-102"
                  }`}
                  priority={template.id === "1" || template.id === "2"}
                />

                {/* Coming Soon Overlay */}
                {!template.isWorking && (
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-500/20 via-transparent to-blue-500/20 flex items-center justify-center">
                    <div className="bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg border border-white/50">
                      <div className="text-center">
                        <div className="text-2xl mb-1">🚀</div>
                        <div className="text-sm font-bold text-gray-800">
                          Coming Soon
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Badges */}
                <div className="absolute top-3 right-3 flex flex-col gap-1">
                  {template.isPro && (
                    <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-2 py-1 rounded-full text-xs font-bold shadow-lg flex items-center">
                      <FiStar className="w-3 h-3 mr-1" />
                      PRO
                    </div>
                  )}
                  {template.isWorking && (
                    <div className="bg-gradient-to-r from-green-400 to-green-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg">
                      Available
                    </div>
                  )}
                </div>

                {/* Template ID & Popularity */}
                <div className="absolute top-3 left-3 flex flex-col gap-1">
                  <div className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                    {template.id}
                  </div>
                  <div className="bg-black/70 text-white px-2 py-1 rounded-full text-xs flex items-center">
                    <FiTrendingUp className="w-3 h-3 mr-1" />
                    {template.popularity}%
                  </div>
                </div>

                {/* Category Badge */}
                <div className="absolute bottom-3 left-3">
                  <span className="bg-purple-500/90 text-white px-2 py-1 rounded-full text-xs font-medium">
                    {template.category}
                  </span>
                </div>
              </div>

              {/* Card Content */}
              <div className={`p-4 ${viewMode === "list" ? "flex-1" : ""}`}>
                <CardHeader className="p-0 pb-2">
                  <CardTitle className="text-lg font-bold text-gray-900 flex items-center">
                    <div className="bg-gradient-to-r from-blue-400 to-purple-500 w-3 h-3 rounded-full mr-2 animate-pulse"></div>
                    <span>{template.name}</span>
                  </CardTitle>
                </CardHeader>

                <CardContent className="p-0">
                  <p className="text-gray-600 text-sm mb-3 h-10 overflow-hidden">
                    {template.description}
                  </p>

                  {/* AI Features */}
                  <div className="mb-3">
                    <div className="flex items-center mb-2">
                      <FiZap className="w-3 h-3 text-blue-500 mr-1" />
                      <span className="text-xs font-medium text-gray-700">
                        AI Features:
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {template.aiFeatures.slice(0, 2).map((feature, index) => (
                        <span
                          key={index}
                          className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full border border-blue-200"
                        >
                          {feature}
                        </span>
                      ))}
                      {template.aiFeatures.length > 2 && (
                        <span className="text-xs text-gray-500">
                          +{template.aiFeatures.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Regular Features */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {template.features.slice(0, 3).map((feature, index) => (
                        <span
                          key={index}
                          className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  {template.isWorking ? (
                    <Link href={`/upload-resume/ai-templates/${template.id}`}>
                      <Button
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-2.5 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                        onClick={() => setTemplateId(template.id)}
                      >
                        <span className="flex items-center justify-center">
                          <FiZap className="w-4 h-4 mr-2" />
                          Select AI Template
                        </span>
                      </Button>
                    </Link>
                  ) : (
                    <div className="relative">
                      <Button
                        className="w-full bg-gradient-to-r from-gray-200 to-gray-300 text-gray-600 cursor-not-allowed py-2.5 px-4 rounded-xl border-2 border-dashed border-gray-400"
                        disabled={true}
                      >
                        <span className="flex items-center justify-center">
                          🚀 Coming Soon
                        </span>
                      </Button>
                      <div className="absolute -top-1 -right-1 bg-gradient-to-r from-purple-500 to-blue-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">
                        New!
                      </div>
                    </div>
                  )}
                </CardContent>
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredTemplates.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🤖</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No AI templates found
            </h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your filters or search terms to find the perfect AI
              template.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("all");
                setShowOnlyWorking(false);
                setShowOnlyPro(false);
                setSearchTerm("");
              }}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* Coming Soon Notification */}
        {filteredTemplates.some((t) => !t.isWorking) && (
          <div className="mt-12 text-center">
            <div className="inline-flex items-center bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-dashed border-purple-300 rounded-2xl px-8 py-6 max-w-2xl">
              <div className="text-4xl mr-4">🔔</div>
              <div className="text-left">
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  Get Notified When New Templates Launch!
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                 {" We're working hard to bring you more AI-powered templates. Want to be the first to know?"}
                </p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg text-sm font-medium hover:from-purple-600 hover:to-blue-600 transition-all duration-300">
                    Notify Me
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Footer Stats */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-8 bg-white/80 backdrop-blur-sm rounded-2xl px-8 py-6 shadow-xl border border-white/20">
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {aiTemplates.length}
              </div>
              <div className="text-sm text-gray-600">AI Templates</div>
            </div>
            <div className="w-px h-12 bg-gray-300"></div>
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
                100%
              </div>
              <div className="text-sm text-gray-600">AI Optimized</div>
            </div>
            <div className="w-px h-12 bg-gray-300"></div>
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                ATS
              </div>
              <div className="text-sm text-gray-600">Friendly</div>
            </div>
            <div className="w-px h-12 bg-gray-300"></div>
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
                Free
              </div>
              <div className="text-sm text-gray-600">No Cost</div>
            </div>
          </div>

          <div className="mt-8 text-gray-600">
            <p className="mb-2">
              🤖 Powered by advanced AI algorithms for optimal resume
              performance
            </p>
            <p className="text-sm mb-4">
              More AI templates are being developed. Have suggestions?
              <Link
                href="/contact"
                className="text-purple-600 hover:underline font-semibold ml-1"
              >
                Let us know!
              </Link>
            </p>

            {/* Admin Links */}
            <div className="flex items-center justify-center space-x-4 pt-4 border-t border-gray-200">
              <Link
                href="/admin/notifications"
                className="text-xs text-gray-500 hover:text-purple-600 transition-colors"
              >
                📧 Email Subscribers
              </Link>
              <span className="text-gray-300">|</span>
              <Link
                href="/upload-resume/ai-templates"
                className="text-xs text-gray-500 hover:text-purple-600 transition-colors"
              >
                🤖 AI Templates
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
    </div>
  );
}
