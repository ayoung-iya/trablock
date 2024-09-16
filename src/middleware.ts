import { NextRequest, NextResponse } from 'next/server';

import SEARCH_PARAMS from '@/libs/constants/searchParams';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.pathname;
  const accessToken = request.cookies.get('authorization-token');

  if (url === '/') {
    const response = NextResponse.next();
    response.headers.set('X-Skip-Icons', 'true');

    return response;
  }

  if (
    accessToken &&
    (url === '/signup' ||
      url === '/login' ||
      url === '/kakaoLogin' ||
      url === '/find-password-email' ||
      url === '/find-password-question' ||
      url === '/find-password-newpassword')
  ) {
    return NextResponse.redirect(
      new URL(request.nextUrl.searchParams.get(SEARCH_PARAMS.returnUrl) || '/', request.url)
    );
  }

  if (
    !accessToken &&
    url !== '/signup' &&
    url !== '/login' &&
    url !== '/kakaoLogin' &&
    url !== '/find-password-email' &&
    url !== '/find-password-question' &&
    url !== '/find-password-newpassword'
  ) {
    // 아예 로그인 경력이 없을 때
    const redirectURL = new URL('/login', request.url);
    const returnURL = request.nextUrl.pathname + request.nextUrl.search;
    redirectURL.searchParams.set(SEARCH_PARAMS.returnUrl, returnURL);

    const response = NextResponse.redirect(redirectURL);
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|icons/favicon.ico|icon).*)']
};
