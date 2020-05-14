import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import styles from '../index.css'

export default class Link extends React.Component {
  render() {
    const { children, current, disabled, label, ...props } = this.props
    const cx = classNames(styles['next-pagination__link'], {
      [`${styles['next-pagination__link--current']}`]: current,
      [`${styles['next-pagination__link--disabled']}`]: disabled
    })

    return (
      <a className={cx} aria-label={label} aria-current={current} {...props}>
        {children}
      </a>
    )
  }
}

Link.propTypes = {
  children: PropTypes.node.isRequired,
  current: PropTypes.bool,
  disabled: PropTypes.bool,
  label: PropTypes.string.isRequired
}
