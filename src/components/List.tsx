import React from 'react';

interface ListProps {
  readonly children: React.ReactNode;
  readonly theme: { [key: string]: any };
}

export default function List({ children, theme }: ListProps) {
  return <ul className={theme['next-pagination__list']}>{children}</ul>;
}
