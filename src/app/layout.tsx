import React from 'react';

import type { Metadata } from 'next';
import localFont from 'next/font/local';

import ReactQueryProvider from '@/apis/components/ReactQueryProvider';
import AsyncBoundary from '@/components/common/AsyncBoundary';
import { PAGE_DESCRIPTIONS, PAGE_TITLES } from '@/libs/constants/title';
import { DropdownProvider } from '@/libs/contexts/DropdownContext';
import { LoginContextProvider } from '@/libs/contexts/LoginContext';
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
  title: PAGE_TITLES.default,
  description: PAGE_DESCRIPTIONS.default
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
            <LoginContextProvider>
              <DropdownProvider>
                <ReactQueryProvider>
                  <ModalProvider>{children}</ModalProvider>
                  <div id="modal-root" />
                </ReactQueryProvider>
              </DropdownProvider>
            </LoginContextProvider>
          </AsyncBoundary>
        </PasswordFindProvider>
        {/* <KakaoScript /> */}
      </body>
    </html>
  );
}
