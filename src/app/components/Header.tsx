"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import {
  FiHome,
  FiUpload,
  FiUser,
  FiPhone,
  FiMail,
  FiZap,
} from "react-icons/fi";
import AuthButton from "./AuthButton";
import ClientOnly from "./ClientOnly";

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              width={130}
              height={70}
              src="/ai-resume-builder.png"
              alt="HG Resume Craft"
              className="w-[100px] h-[50px] lg:w-[110px] lg:h-[60px] xl:w-[130px] xl:h-[70px] object-contain"
            />
          </Link>

          {/* Navigation for desktop */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link
              href="/"
              className="flex items-center text-gray-700 hover:text-blue-600  transition-colors font-medium"
            >
              <FiHome className="w-4 h-4 mr-2" /> Home
            </Link>

            <Link
              href="/upload-resume"
              className="flex items-center text-gray-700 hover:text-blue-600 transition-colors"
            >
              <FiUpload className="w-4 h-4 mr-2" /> Upload Resume
            </Link>
            <Link
              href="/dashboard"
              className="flex items-center text-gray-700 hover:text-blue-600 transition-colors"
            >
              <FiUser className="w-4 h-4 mr-2" /> Dashboard
            </Link>
            <Link
              href="/contact"
              className="flex items-center text-gray-700 hover:text-blue-600 transition-colors"
            >
              <FiPhone className="w-4 h-4 mr-2" /> Contact
            </Link>
          </nav>

          {/* CTA Buttons desktop */}
          <div className="hidden lg:flex items-center space-x-4">
            <ClientOnly
              fallback={
                <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse" />
              }
            >
              <AuthButton />
            </ClientOnly>
            <Link href="/contact">
              <button className="flex items-center px-5 py-2.5 bg-white border rounded-full text-black transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                <FiUser className="w-4 h-4 mr-2" /> Contact Us
              </button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(true)}
              className="p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar for mobile */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40">
          <div className="fixed top-0 right-0 w-64 h-full bg-white shadow-lg p-6 flex flex-col space-y-6">
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="self-end p-2 text-gray-600 hover:text-red-500"
            >
              ✖
            </button>

            {/* Nav Links */}
            <Link
              href="/"
              className="flex items-center text-purple-600 hover:text-purple-700 font-medium"
              onClick={() => setIsOpen(false)}
            >
              <FiMail className="w-4 h-4 mr-2" /> Home
            </Link>
{/*             <Link
              href="/upload-resume"
              className="flex items-center text-blue-600 hover:text-blue-700"
              onClick={() => setIsOpen(false)}
            >
              <FiZap className="w-4 h-4 mr-2" /> AI Templates
            </Link> */}
            <Link
              href="/upload-resume"
              className="flex items-center text-gray-700 hover:text-blue-600"
              onClick={() => setIsOpen(false)}
            >
              <FiUpload className="w-4 h-4 mr-2" /> Upload Resume
            </Link>
            <Link
              href="/dashboard"
              className="flex items-center text-gray-700 hover:text-blue-600"
              onClick={() => setIsOpen(false)}
            >
              <FiUser className="w-4 h-4 mr-2" /> Dashboard
            </Link>
            <Link
              href="/contact"
              className="flex items-center text-gray-700 hover:text-blue-600"
              onClick={() => setIsOpen(false)}
            >
              <FiPhone className="w-4 h-4 mr-2" /> Contact
            </Link>
            {/* Buttons */}
            <div className="w-full" onClick={() => setIsOpen(false)}>
              <ClientOnly
                fallback={
                  <div className="w-full h-10 bg-gray-200 rounded-lg animate-pulse" />
                }
              >
                <AuthButton />
              </ClientOnly>
            </div>
            <Link href="/contact" onClick={() => setIsOpen(false)}>
              <button className="w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl">
                <FiUser className="w-4 h-4 mr-2" /> Contact Us
              </button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
