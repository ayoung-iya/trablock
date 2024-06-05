import React from 'react';

import GNB from '@/components/common/GNB';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <GNB />
      {children}
      <footer>푸터</footer>
    </section>
  );
}
