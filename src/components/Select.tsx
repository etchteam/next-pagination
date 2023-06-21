import React from 'react'
import PropTypes from 'prop-types'
import Icon from './Icon'

interface SelectProps {
  disabled?: boolean
  children: React.ReactNode
  theme: { [key: string]: any }
  [key: string]: any
}

const Select = ({ children, theme, disabled, ...props }: SelectProps) => (
  <div className={theme['next-pagination__select']}>
    <select {...props} disabled={disabled}>
      {children}
    </select>
    <span className={theme['next-pagination__select-suffix']}>
      <Icon icon='expand-more' />
    </span>
  </div>
)

export default Select
