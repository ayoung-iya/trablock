import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.pathname;

  if (url === '/') {
    const response = NextResponse.next();
    response.headers.set('X-Skip-Icons', 'true');
    return response;
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/']
};
