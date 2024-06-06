import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const { pathname } = request.nextUrl;
  const cookie = request.cookies.get('authToken'); // 백엔드와 상의 후 이름 변경
  const targetPage = url.searchParams.get('returnUrl') || '/';
  const isInvitePath = url.pathname.startsWith('/plan/'); // invite 페이지는 plan으로 시작함.

  if (!cookie && isInvitePath) {
    // 초대 받았는데 비로그인 상태일때 !
    url.pathname = '/login';
    url.search = `?returnUrl=${encodeURIComponent(targetPage)}`;
    return NextResponse.redirect(url);
  }

  if (pathname === '/') {
    const response = NextResponse.next();
    response.headers.set('X-Skip-Icons', 'true');
    return response;
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/']
};
