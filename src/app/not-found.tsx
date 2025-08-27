import Link from 'next/link'
import { FiHome, FiArrowLeft, FiSearch } from 'react-icons/fi'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500">
            404
          </h1>
        </div>
        
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Page Not Found
        </h2>
        
        <p className="text-gray-600 mb-8">
{"          Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or you entered the wrong URL."}
        </p>
        
        <div className="space-y-4">
          <Link 
            href="/"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105"
          >
            <FiHome className="mr-2" />
            Go Home
          </Link>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/template"
              className="inline-flex items-center px-4 py-2 border border-purple-300 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors"
            >
              <FiSearch className="mr-2" />
              Browse Templates
            </Link>
            
            <Link 
              href="/dashboard"
              className="inline-flex items-center px-4 py-2 border border-blue-300 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
            >
              <FiArrowLeft className="mr-2" />
              Resume Builder
            </Link>
          </div>
        </div>
        
        <div className="mt-12 text-sm text-gray-500">
          <p>Need help? <Link href="/contact" className="text-purple-600 hover:underline">Contact us</Link></p>
        </div>
      </div>
    </div>
  )
}