import React from 'react'
import PropTypes from 'prop-types'

export default function Item({ children }) {
  return <li className='next-pagination__item'>{children}</li>
}

Item.propTypes = {
  children: PropTypes.node.isRequired
}
