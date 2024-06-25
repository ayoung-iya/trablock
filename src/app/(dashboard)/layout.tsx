import React from 'react';

import GNB from '@/components/common/GNB';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto">
      <GNB />
      <main>{children}</main>
    </div>
  );
}
