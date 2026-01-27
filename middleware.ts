import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Public routes that should NOT require authentication (even though in (app) group)
  const publicPaths = [
    '/schedule',      // Public booking flows (includes /schedule/client and /schedule/talent)
    '/signup',        // Registration page
    '/talent-network', // Talent application form
  ]
  
  // Protected route patterns - these require authentication
  const protectedPaths = [
    '/client-dashboard',
    '/manager-dashboard',
    '/talent-dashboard',
    '/admin-dashboard',
    '/support',
    '/tasks-projects',
    '/billing',
  ]
  
  // Check if path is explicitly public
  const isPublic = publicPaths.some(path => pathname.startsWith(path))
  if (isPublic) {
    return NextResponse.next()
  }
  
  // Check if current path is protected
  const isProtected = protectedPaths.some(path => pathname.startsWith(path))
  
  if (!isProtected) {
    return NextResponse.next()
  }
  
  // Check for SuperTokens session cookie
  // The cookie name may vary based on your SuperTokens config
  const sessionCookie = request.cookies.get('sAccessToken') || 
                       request.cookies.get('sFrontToken')
  
  if (!sessionCookie) {
    // No session - redirect to login with return URL
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/client-dashboard/:path*',
    '/manager-dashboard/:path*',
    '/talent-dashboard/:path*',
    '/admin-dashboard/:path*',
    '/support',
    '/tasks-projects',
    '/billing',
  ],
}
