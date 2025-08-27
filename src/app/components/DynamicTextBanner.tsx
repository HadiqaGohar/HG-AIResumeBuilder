import React from 'react';

const DynamicTextBanner = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 py-16">
      {/* Multiple Scrolling Text Layers */}
      <div className="absolute inset-0">
        {/* First Layer - Moving Right */}
        <div className="absolute top-0 flex whitespace-nowrap animate-scroll-right opacity-20">
          <div className="flex items-center space-x-12">
            {Array.from({ length: 6 }, (_, i) => (
              <span key={i} className="text-7xl font-bold text-purple-400 tracking-wider">
                INNOVATIVE SOLUTIONS
              </span>
            ))}
          </div>
        </div>
        
        {/* Second Layer - Moving Left */}
        <div className="absolute top-20 flex whitespace-nowrap animate-scroll-left opacity-15">
          <div className="flex items-center space-x-12">
            {Array.from({ length: 6 }, (_, i) => (
              <span key={i} className="text-6xl font-bold text-blue-400 tracking-wider">
                CREATIVE DESIGN
              </span>
            ))}
          </div>
        </div>
        
        {/* Third Layer - Moving Right Slower */}
        <div className="absolute bottom-0 flex whitespace-nowrap animate-scroll-right-slow opacity-10">
          <div className="flex items-center space-x-12">
            {Array.from({ length: 6 }, (_, i) => (
              <span key={i} className="text-8xl font-bold text-indigo-400 tracking-wider">
                PROFESSIONAL RESUMES
              </span>
            ))}
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Transform Your Career
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-700 mb-8 animate-fade-in-up animation-delay-300">
            Create stunning resumes with our innovative AI-powered platform
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-600">
            <button className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full font-semibold hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-xl relative overflow-hidden">
              <span className="relative z-10">Get Started Now</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            
            <button className="px-8 py-4 border-2 border-purple-600 text-purple-600 rounded-full font-semibold hover:bg-purple-600 hover:text-white transition-all duration-300 hover:scale-105 transform">
              Explore Templates
            </button>
          </div>
        </div>
        
        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in-up animation-delay-1000">
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-600 mb-2">25K+</div>
            <div className="text-gray-600">Happy Users</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">50+</div>
            <div className="text-gray-600">Templates</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-indigo-600 mb-2">95%</div>
            <div className="text-gray-600">Success Rate</div>
          </div>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-purple-200 rounded-full opacity-60 animate-float"></div>
      <div className="absolute bottom-10 right-10 w-16 h-16 bg-blue-200 rounded-full opacity-60 animate-float animation-delay-500"></div>
      <div className="absolute top-1/2 right-20 w-12 h-12 bg-indigo-200 rounded-full opacity-60 animate-float animation-delay-1000"></div>
    </div>
  );
};

export default DynamicTextBanner;