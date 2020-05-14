import React from 'react'
import PropTypes from 'prop-types'

import styles from '../index.css'

export default function List({ children }) {
  return <ul className={styles['next-pagination__list']}>{children}</ul>
}

List.propTypes = {
  children: PropTypes.node.isRequired
}
