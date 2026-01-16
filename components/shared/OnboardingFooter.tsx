import Link from 'next/link'

export default function OnboardingFooter() {
  return (
    <footer className="bg-white border-t border-gray-200 py-6 mt-auto">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-600">
          {/* Copyright */}
          <p className="font-lato">© 2026 Knacksters. All rights reserved.</p>
          
          {/* Legal Links */}
          <div className="flex items-center gap-6">
            <Link href="/terms" className="hover:text-orange-500 transition-colors font-lato">
              Terms
            </Link>
            <Link href="/privacy" className="hover:text-orange-500 transition-colors font-lato">
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
