import React from 'react'
import PropTypes from 'prop-types'

interface ListProps {
  children: React.ReactNode;
  theme: { [key: string]: any };
}

export default function List({ children, theme }: ListProps) {
  return <ul className={theme['next-pagination__list']}>{children}</ul>
}
