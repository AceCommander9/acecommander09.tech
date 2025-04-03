import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Add CORS headers for Socket.IO
  if (request.nextUrl.pathname.startsWith("/api/socket")) {
    const response = NextResponse.next()
    response.headers.append("Access-Control-Allow-Origin", "*")
    response.headers.append("Access-Control-Allow-Methods", "GET,POST,OPTIONS")
    response.headers.append("Access-Control-Allow-Headers", "Content-Type")
    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/api/socket/:path*"],
}

