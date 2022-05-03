import React from 'react'
import classNames from 'classnames'

interface LinkProps {
  children: React.ReactNode;
  label: string;
  theme: { [key: string]: any };
  current?: boolean;
  disabled?: boolean;
  [key: string]: any;
}

export default class Link extends React.Component<LinkProps> {
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
