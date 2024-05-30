import React from 'react';

interface PlanBadgeProps {
  text: string;
}

export default function PlanBadge({ text }: PlanBadgeProps) {
  return <div className="m-1 inline-flex items-center rounded-md bg-gray-200 px-4 py-2">{text}</div>;
}
