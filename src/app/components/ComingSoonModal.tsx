"use client";

import React from "react";
import { FiX, FiSmartphone, FiMail } from "react-icons/fi";

interface ComingSoonModalProps {
  isOpen: boolean;
  onClose: () => void;
  platform: "playstore" | "appstore";
}

export default function ComingSoonModal({
  isOpen,
  onClose,
  platform,
}: ComingSoonModalProps) {
  if (!isOpen) return null;

  const platformName =
    platform === "playstore" ? "Google Play Store" : "Apple App Store";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <FiX className="text-xl" />
        </button>

        <div className="text-center">
          <div className="mb-4">
            <FiSmartphone className="text-4xl text-purple-600 mx-auto mb-2" />
            <h3 className="text-xl font-bold text-gray-900">
              Mobile App Coming Soon!
            </h3>
          </div>

          {/* <p className="text-gray-600 mb-6">
            We're working hard to bring HG Resume Builder to {platformName}. 
            Subscribe to our newsletter to be the first to know when it's available!
          </p> */}
          <p className="text-gray-600 mb-6">
            We&apos;re working hard to bring HG Resume Builder to {platformName}
            . Subscribe to our newsletter to be the first to know when it&apos;s
            available!
          </p>

          <div className="space-y-3">
            <button
              onClick={onClose}
              className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Got it, thanks!
            </button>

            <button
              onClick={() => {
                onClose();
                // Scroll to newsletter section
                const newsletterSection = document.querySelector("footer");
                newsletterSection?.scrollIntoView({ behavior: "smooth" });
              }}
              className="w-full border border-purple-600 text-purple-600 py-2 px-4 rounded-lg hover:bg-purple-50 transition-colors flex items-center justify-center space-x-2"
            >
              <FiMail className="text-sm" />
              <span>Subscribe for Updates</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
