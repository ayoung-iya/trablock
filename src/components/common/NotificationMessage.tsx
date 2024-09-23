import React from 'react';

export default function NotificationMessage({ children }: React.PropsWithChildren) {
  return <div className="flex h-24 items-center justify-center">{children}</div>;
}
