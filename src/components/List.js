import React from 'react'
import PropTypes from 'prop-types'

export default function List({ children }) {
  return <ul className='next-pagination__list'>{children}</ul>
}

List.propTypes = {
  children: PropTypes.node.isRequired
}
