import React from 'react'
import PropTypes from 'prop-types'

import styles from '../index.css'

export default function Item({ children }) {
  return <li className={styles['next-pagination__item']}>{children}</li>
}

Item.propTypes = {
  children: PropTypes.node.isRequired
}
