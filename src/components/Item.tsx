interface ItemProps {
  readonly children: React.ReactNode;
  readonly theme: { [key: string]: string | undefined };
  [key: string]: unknown;
}

export default function Item({ children, theme }: Readonly<ItemProps>) {
  return <li className={theme['next-pagination__item']}>{children}</li>;
}
