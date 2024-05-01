import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  const isPublicPath = path === '/login' || path === '/signup'
  const token = request.cookies.get('next-auth.session-token')

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/docs', request.nextUrl))
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login', request.nextUrl))
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/', '/docs', '/docs/:path*', '/login', '/signup'],
}
