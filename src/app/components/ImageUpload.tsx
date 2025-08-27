'use client';
import React, { useRef, useState } from 'react';
import { FiCamera, FiUpload, FiX, FiRefreshCw, FiUser } from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import Image from 'next/image';

interface ImageUploadProps {
  currentImage?: string | null;
  onImageChange: (imageData: string | null) => void;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  label?: string;
  showLabel?: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  currentImage,
  onImageChange,
  size = 'md',
  className = '',
  label = 'Profile Picture',
  showLabel = true
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32'
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select a valid image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB');
      return;
    }

    setIsUploading(true);
    try {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64String = e.target?.result as string;
        onImageChange(base64String);
        toast.success('Image uploaded successfully!');
        setIsUploading(false);
      };
      reader.onerror = () => {
        toast.error('Failed to read image file');
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    } catch {
      toast.error('Failed to upload image');
      setIsUploading(false);
    }
  };

  const removeImage = () => {
    onImageChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    toast.success('Image removed');
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {showLabel && (
        <label className="flex items-center text-sm font-semibold text-gray-700">
          <FiCamera className="w-4 h-4 mr-2" />
          {label}
        </label>
      )}
      
      <div className="flex items-center space-x-4">
        {/* Image Preview */}
        <div className="relative">
          {currentImage ? (
            <div className={`${sizeClasses[size]} rounded-full overflow-hidden border-4 border-gray-200 shadow-lg relative group`}>
              <Image
                src={currentImage}
                alt="Profile"
                className="w-full h-full object-cover"
                width={80}
                height={80}
              />
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <FiCamera className="w-6 h-6 text-white" />
              </div>
              {/* Remove button */}
              <button
                onClick={removeImage}
                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg"
                title="Remove image"
              >
                <FiX className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <div className={`${sizeClasses[size]} rounded-full bg-gray-100 border-4 border-gray-200 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors`}
                 onClick={() => fileInputRef.current?.click()}>
              <FiUser className="w-8 h-8 text-gray-400" />
            </div>
          )}
        </div>

        {/* Upload Controls */}
        <div className="flex flex-col space-y-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            id="image-upload"
          />
          
          <label
            htmlFor="image-upload"
            className={`flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors cursor-pointer text-sm ${
              isUploading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isUploading ? (
              <>
                <FiRefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <FiUpload className="w-4 h-4 mr-2" />
                {currentImage ? 'Change Photo' : 'Upload Photo'}
              </>
            )}
          </label>
          
          <p className="text-xs text-gray-500">
            Max 5MB • JPG, PNG, GIF
          </p>
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;