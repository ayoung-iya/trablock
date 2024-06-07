import React from 'react';

export interface DefaultCardProps extends React.HTMLAttributes<HTMLButtonElement> {
  imageUrl: string;
  title: string;
}

export interface ReviewCardProps extends DefaultCardProps {
  route: string[];
  user: { name: string; profileImg: string };
}
