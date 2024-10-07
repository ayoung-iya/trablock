import React from 'react';

import GNB from '@/components/common/GNB';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GNB />
      <main className="mx-5 my-5 max-w-[1200px] md:mx-auto md:px-7">{children}</main>
    </>
  );
}
