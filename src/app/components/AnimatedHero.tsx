import React from 'react';

const AnimatedHero = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-purple-50 to-blue-50 py-16">
      {/* Animated Background Text */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10">
        <div className="animate-scroll-right whitespace-nowrap text-8xl font-bold text-gray-400">
          INNOVATIVE SOLUTIONS INNOVATIVE SOLUTIONS INNOVATIVE SOLUTIONS
        </div>
      </div>
      
      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-6">
            Craft Your Perfect
            <span className="block animate-pulse">Resume</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-700 mb-8 animate-fade-in-up animation-delay-300">
            Transform your career with AI-powered resume building
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-600">
            <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full font-semibold hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-xl">
              Start Building Now
            </button>
            <button className="px-8 py-4 border-2 border-purple-600 text-purple-600 rounded-full font-semibold hover:bg-purple-600 hover:text-white transition-all duration-300">
              View Templates
            </button>
          </div>
        </div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 animate-float">
        <div className="w-16 h-16 bg-purple-200 rounded-full opacity-60"></div>
      </div>
      <div className="absolute bottom-20 right-10 animate-float animation-delay-1000">
        <div className="w-12 h-12 bg-blue-200 rounded-full opacity-60"></div>
      </div>
      <div className="absolute top-1/2 left-20 animate-float animation-delay-500">
        <div className="w-8 h-8 bg-yellow-200 rounded-full opacity-60"></div>
      </div>
    </div>
  );
};

export default AnimatedHero;