import React from 'react';

interface SkeletonListProps {
  count?: number;
  SkeletonComponent: React.ComponentType;
}

export default function SkeletonList({ count = 1, SkeletonComponent }: SkeletonListProps) {
  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <SkeletonComponent key={`skeleton-${i}`} />
      ))}
    </>
  );
}
