import React from 'react';

const InnovativeBanner = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-gray-100 to-gray-200 py-8">
      {/* Scrolling Background Text */}
      <div className="flex whitespace-nowrap animate-scroll-right">
        <div className="flex items-center space-x-8">
          <span className="text-6xl md:text-8xl font-bold text-gray-300 tracking-wider">
            INNOVATIVE SOLUTIONS
          </span>
          <span className="text-6xl md:text-8xl font-bold text-gray-300 tracking-wider">
            INNOVATIVE SOLUTIONS
          </span>
          <span className="text-6xl md:text-8xl font-bold text-gray-300 tracking-wider">
            INNOVATIVE SOLUTIONS
          </span>
          <span className="text-6xl md:text-8xl font-bold text-gray-300 tracking-wider">
            INNOVATIVE SOLUTIONS
          </span>
        </div>
      </div>
      
      {/* Overlay Content */}
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-10">
        <div className="text-center animate-fade-in-up">
          <h2 className="text-4xl md:text-6xl font-bold text-purple-600 mb-4">
            Build Your Future
          </h2>
          <p className="text-xl md:text-2xl text-gray-700 font-medium">
            With AI-Powered Resume Solutions
          </p>
        </div>
      </div>
    </div>
  );
};

export default InnovativeBanner;