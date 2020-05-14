import React from 'react'
import PropTypes from 'prop-types'

export default function Item({ children, theme }) {
  return <li className={theme['next-pagination__item']}>{children}</li>
}

Item.propTypes = {
  children: PropTypes.node.isRequired,
  theme: PropTypes.object.isRequired
}
