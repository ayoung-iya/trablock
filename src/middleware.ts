import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.pathname;

  const accessToken = request.cookies.get('authorization-token');

  if (url === '/') {
    const response = NextResponse.next();
    response.headers.set('X-Skip-Icons', 'true');
    return response;
  }
  if (!accessToken) {
    // 아예 로그인 경력이 없을 때
    return NextResponse.redirect('localhost://3000/login');
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/']
};
