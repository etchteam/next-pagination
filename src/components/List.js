import React from 'react'
import PropTypes from 'prop-types'

export default function List({ children, theme }) {
  return <ul className={theme['next-pagination__list']}>{children}</ul>
}

List.propTypes = {
  children: PropTypes.node.isRequired,
  theme: PropTypes.object.isRequired
}
