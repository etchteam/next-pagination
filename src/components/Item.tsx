import React from 'react'

interface ItemProps {
  children: React.ReactNode;
  theme: { [key: string]: any };
  [key: string]: any;
}

export default function Item({ children, theme }: ItemProps) {
  return <li className={theme['next-pagination__item']}>{children}</li>
}
