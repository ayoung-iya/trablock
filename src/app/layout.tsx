import React from 'react';

import type { Metadata } from 'next';
import localFont from 'next/font/local';

import ReactQueryProvider from '@/apis/components/ReactQueryProvider';
import AsyncBoundary from '@/components/common/AsyncBoundary';
import KakaoScript from '@/components/social/KaKaoScript';
import { DropdownProvider } from '@/libs/contexts/DropdownContext';
import ModalProvider from '@/libs/contexts/ModalProvider';
import { PasswordFindProvider } from '@/libs/contexts/passwordFindContext';
import '@/styles/globals.css';
import 'react-day-picker/dist/style.css';

declare global {
  interface Window {
    Kakao: any;
  }
}
const pretendard = localFont({
  src: '../../public/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920'
});

export const metadata: Metadata = {
  title: '트래블록',
  description: '소중한 여행 계획, 트래블록으로 완성하세요'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link rel="icon" href="/icons/favicon.ico" />
      </head>
      <body className={pretendard.className}>
        <PasswordFindProvider>
          <AsyncBoundary>
            <DropdownProvider>
              <ReactQueryProvider>
                <ModalProvider>{children}</ModalProvider>
                <div id="modal-root" />
              </ReactQueryProvider>
            </DropdownProvider>
          </AsyncBoundary>
        </PasswordFindProvider>
        <KakaoScript />
      </body>
    </html>
  );
}
