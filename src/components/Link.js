import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

export default class Link extends React.Component {
  render() {
    const { children, current, disabled, label, theme, ...props } = this.props
    const cx = classNames(theme['next-pagination__link'], {
      [`${theme['next-pagination__link--current']}`]: current,
      [`${theme['next-pagination__link--disabled']}`]: disabled
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
  label: PropTypes.string.isRequired,
  theme: PropTypes.object.isRequired
}
