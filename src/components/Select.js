import React from 'react'
import PropTypes from 'prop-types'
import Icon from './Icon'

const Select = ({ children, theme, ...props }) => (
  <div className={theme['next-pagination__select']}>
    <select {...props}>{children}</select>
    <span className={theme['next-pagination__select-suffix']}>
      <Icon icon='expand-more' />
    </span>
  </div>
)

Select.propTypes = {
  theme: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired
}

export default Select
