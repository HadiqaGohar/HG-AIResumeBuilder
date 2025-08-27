"use client";
import React, { useState } from "react";
import { IoSendSharp } from "react-icons/io5";
import { BiLogoPlayStore } from "react-icons/bi";
import { SiApple } from "react-icons/si";
import { TiSocialFacebook } from "react-icons/ti";
import { CiTwitter } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa";
import { RiLinkedinLine } from "react-icons/ri";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import ComingSoonModal from "./ComingSoonModal";

function Footer() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [subscriberCount, setSubscriberCount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalPlatform, setModalPlatform] = useState<"playstore" | "appstore">(
    "playstore"
  );

  // Fetch subscriber count on component mount
  React.useEffect(() => {
    fetchSubscriberCount();
  }, []);

  const fetchSubscriberCount = async () => {
    try {
      const response = await fetch("/api/newsletter");
      if (response.ok) {
        const data = await response.json();
        setSubscriberCount(data.subscribers);
      }
    } catch (error) {
      console.error("Error fetching subscriber count:", error);
    }
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter your email address");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        setEmail("");
        fetchSubscriberCount(); // Update subscriber count
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      toast.error("Failed to subscribe. Please try again.");
      console.error("Subscription error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <footer className="bg-black text-white py-10">
      <div className="container mx-auto max-w-screen-2xl px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {/* Subscribe Section */}
        <div>
          <h2 className="text-xl font-bold">HG-Resume-Builder</h2>
          {/* Decorative Bar */}
          <div className="flex justify- mb-10">
            <div className="bg-gradient-to-r from-purple-500 via-blue-500 to-teal-500 rounded-full w-1/2 h-1 transform transition-all duration-500 hover:scale-110" />
          </div>
          <h3 className="text-lg font-semibold mt-4">Stay Updated</h3>
          <p className="text-sm mt-2">
            Get tips and templates delivered to your inbox
          </p>
          {subscriberCount > 0 && (
            <p className="text-xs text-gray-400 mt-1">
              Join {subscriberCount} other subscribers
            </p>
          )}
          <form onSubmit={handleSubscribe} className="mt-4">
            <div className="relative flex items-center w-full">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full pl-4 pr-12 py-2 text-sm text-white bg-transparent border border-gray-300 rounded-md focus:ring focus:ring-blue-500 focus:outline-none disabled:opacity-50"
                disabled={isLoading}
                required
              />
              <button
                type="submit"
                disabled={isLoading}
                className="absolute right-2 p-1 text-gray-400 hover:text-white transition-colors disabled:opacity-50"
              >
                {isLoading ? (
                  <AiOutlineLoading3Quarters className="text-xl animate-spin" />
                ) : (
                  <IoSendSharp className="text-xl" />
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Support Section */}
        <div>
          <h2 className="text-xl font-bold">Support</h2>
          <p className="text-sm mt-3">Karachi, Pakistan.</p>
          <Link
            href="mailto:hadiqagohar12@gmail.com"
            className="text-sm mt-2 block hover:text-purple-400 transition-colors"
          >
            hadiqagohar12@gmail.com
          </Link>
          <Link
            href="tel:+12345-12345-1234"
            className="text-sm mt-2 block hover:text-purple-400 transition-colors"
          >
            +12345-12345-1234
          </Link>
        </div>

        {/* Account Section */}
        <div>
          <h2 className="text-xl font-bold">Account</h2>
          <ul className="mt-4 space-y-2">
            <li>
              <Link href="/profile">My Account</Link>
            </li>
            <li>
              <Link href="/about">About Auth</Link>
            </li>
            {/* <li>
              <Link href="/resume/customize">Resume</Link>
            </li> */}
            <li>
              <Link href="/template">Template</Link>
            </li>
            <li>
              <Link href="/upload-resume">Upload Resume</Link>
            </li>
            <li>
              <Link href="/admin/notifications">Admin Panel</Link>
            </li>
          </ul>
        </div>

        {/* Quick Link Section */}
        <div>
          <h2 className="text-xl font-bold">Quick Link</h2>
          <ul className="mt-4 space-y-2">
            <li>
              <Link href="/privacy-policy">Privacy Policy</Link>
            </li>
            <li>
              <Link href="/term">Terms Of Use</Link>
            </li>
            <li>
              <Link href="/faq">FAQ</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        {/* Download App Section */}
        <div>
          <h2 className="text-xl font-bold">Get the App</h2>
          <p className="text-sm mt-4">Build resumes on-the-go</p>
          <div className="flex items-center mt-4">
            {/* Placeholder for QR Code */}
            <div className="w-24 h-24 bg-gray-400 rounded mr-4">
              <Image
                src="/hg.png"
                alt="HG Resume Builder"
                height={96}
                width={96}
              />
            </div>
            <div className="space-y-2">
              {/* Google Play - Coming Soon */}
              <div
                className="flex items-center border border-gray-600 rounded p-2 cursor-pointer hover:border-purple-500 transition-colors opacity-75"
                onClick={() => {
                  setModalPlatform("playstore");
                  setShowModal(true);
                }}
              >
                <BiLogoPlayStore className="text-2xl mr-2" />
                <div>
                  <p className="text-xs">COMING SOON</p>
                  <p className="font-semibold">Google Play</p>
                </div>
              </div>
              {/* App Store - Coming Soon */}
              <div
                className="flex items-center border border-gray-600 rounded p-2 cursor-pointer hover:border-purple-500 transition-colors opacity-75"
                onClick={() => {
                  setModalPlatform("appstore");
                  setShowModal(true);
                }}
              >
                <SiApple className="text-2xl mr-2" />
                <div>
                  <p className="text-xs">COMING SOON</p>
                  <p className="font-semibold">App Store</p>
                </div>
              </div>
            </div>
          </div>
          {/* Social Media Icons */}
          <div className="flex space-x-4 mt-6">
            <Link
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <TiSocialFacebook className="text-2xl cursor-pointer hover:text-blue-500 transition-colors" />
            </Link>
            <Link
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <CiTwitter className="text-2xl cursor-pointer hover:text-blue-400 transition-colors" />
            </Link>
            <Link
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="text-2xl cursor-pointer hover:text-pink-500 transition-colors" />
            </Link>
            <Link
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <RiLinkedinLine className="text-2xl cursor-pointer hover:text-blue-600 transition-colors" />
            </Link>
          </div>
        </div>
      </div>
      {/* Powered by Hadiqa Gohar and Place Logo */}
      <div className="text-center text-sm mt-6">
        {/* <p>&copy; 2024 Hadiqa Gohar | Powered by <span className="font-semibold">Place</span> Logo</p> */}
        <p>
          {/* &copy; {new Date().getFullYear()} Hadiqa Gohar | Built with ❤️ by AI */}
          &copy; {new Date().getFullYear()} Kiro Hackathon | Powered by Hadiqa Gohar | Built with ❤️ by AI 

          Resume Builder
        </p>
      </div>

      {/* Coming Soon Modal */}
      <ComingSoonModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        platform={modalPlatform}
      />
    </footer>
  );
}

export default Footer;
