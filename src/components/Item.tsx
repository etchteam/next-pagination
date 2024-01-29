import React from 'react';

interface ItemProps {
  readonly children: React.ReactNode;
  readonly theme: { [key: string]: any };
  [key: string]: any;
}

export default function Item({ children, theme }: ItemProps) {
  return <li className={theme['next-pagination__item']}>{children}</li>;
}
