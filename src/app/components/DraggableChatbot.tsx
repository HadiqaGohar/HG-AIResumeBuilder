'use client';
import React, { useState, useRef, useEffect } from 'react';

const DraggableChatbot = () => {
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const [isDragging, setIsDragging] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const chatbotRef = useRef<HTMLDivElement>(null);

  // Handle mouse down - start dragging
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

  // Handle mouse move - dragging
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const newX = e.clientX - dragOffset.x;
        const newY = e.clientY - dragOffset.y;
        
        // Keep within screen bounds
        const maxX = window.innerWidth - 60;
        const maxY = window.innerHeight - 60;
        
        setPosition({
          x: Math.max(0, Math.min(newX, maxX)),
          y: Math.max(0, Math.min(newY, maxY))
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  // Handle touch events for mobile
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

  useEffect(() => {
    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging) {
        e.preventDefault();
        const touch = e.touches[0];
        const newX = touch.clientX - dragOffset.x;
        const newY = touch.clientY - dragOffset.y;
        
        const maxX = window.innerWidth - 60;
        const maxY = window.innerHeight - 60;
        
        setPosition({
          x: Math.max(0, Math.min(newX, maxX)),
          y: Math.max(0, Math.min(newY, maxY))
        });
      }
    };

    const handleTouchEnd = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, dragOffset]);

  return (
    <>
      {/* Draggable Chatbot Icon */}
      <div
        ref={chatbotRef}
        style={{
          position: 'fixed',
          left: `${position.x}px`,
          top: `${position.y}px`,
          zIndex: 1000,
        }}
        className={`w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-lg cursor-move flex items-center justify-center text-white text-xl hover:shadow-xl transition-all duration-300 ${
          isDragging ? 'scale-110' : 'hover:scale-105'
        }`}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onClick={() => !isDragging && setIsChatOpen(!isChatOpen)}
      >
        {isDragging ? '✋' : '💬'}
        
        {/* Drag Indicator */}
        {!isDragging && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
        )}
      </div>

      {/* Chat Window */}
      {isChatOpen && (
        <div
          style={{
            position: 'fixed',
            left: `${Math.min(position.x, window.innerWidth - 320)}px`,
            top: `${Math.max(position.y - 400, 20)}px`,
            zIndex: 999,
          }}
          className="w-80 h-96 bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden animate-fade-in-up"
        >
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                🤖
              </div>
              <div>
                <h3 className="font-semibold">Resume Assistant</h3>
                <p className="text-xs opacity-90">Online now</p>
              </div>
            </div>
            <button
              onClick={() => setIsChatOpen(false)}
              className="text-white hover:bg-white hover:bg-opacity-20 rounded-full w-8 h-8 flex items-center justify-center transition-colors"
            >
              ×
            </button>
          </div>

          {/* Chat Messages */}
          <div className="p-4 h-64 overflow-y-auto bg-gray-50">
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs">
                  🤖
                </div>
                <div className="bg-white p-3 rounded-lg shadow-sm max-w-xs">
                  <p className="text-sm text-gray-800">
                   {" Hi! I'm here to help you create the perfect resume. What would you like to know?"}
                  </p>
                </div>
              </div>
              
              <div className="flex justify-end">
                <div className="bg-blue-500 text-white p-3 rounded-lg max-w-xs">
                  <p className="text-sm">Hello! How do I get started?</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs">
                  🤖
                </div>
                <div className="bg-white p-3 rounded-lg shadow-sm max-w-xs">
                  <p className="text-sm text-gray-800">
                     {'Great! You can start by clicking "Create Resume" and choosing from our 50+ professional templates. Would you like me to guide you through the process?'}                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Chat Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
              <button className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                ➤
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Drag Instructions (show on first load) */}
      {!isDragging && position.x === 20 && position.y === 20 && (
        <div
          style={{
            position: 'fixed',
            left: `${position.x + 70}px`,
            top: `${position.y}px`,
            zIndex: 998,
          }}
          className="bg-gray-800 text-white text-xs px-3 py-2 rounded-lg shadow-lg animate-bounce"
        >
          Drag me to reposition!
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 border-4 border-transparent border-r-gray-800"></div>
        </div>
      )}
    </>
  );
};

export default DraggableChatbot;