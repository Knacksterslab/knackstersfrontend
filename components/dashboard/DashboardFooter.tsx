'use client'

import Link from 'next/link'

export default function DashboardFooter() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-12">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          {/* Left side - Copyright */}
          <p className="text-gray-600 font-lato">
            © 2026 Knacksters. All rights reserved.
          </p>

          {/* Right side - Links */}
          <div className="flex items-center gap-6 text-gray-600">
            <Link 
              href="/support" 
              className="hover:text-orange-500 transition-colors font-lato"
            >
              Support
            </Link>
            <Link 
              href="/faq" 
              className="hover:text-orange-500 transition-colors font-lato"
            >
              FAQ
            </Link>
            <Link 
              href="/terms" 
              className="hover:text-orange-500 transition-colors font-lato"
            >
              Terms
            </Link>
            <Link 
              href="/privacy" 
              className="hover:text-orange-500 transition-colors font-lato"
            >
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

