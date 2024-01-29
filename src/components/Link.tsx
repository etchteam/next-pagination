import classNames from 'classnames';
import React from 'react';

interface LinkProps {
  readonly children: React.ReactNode;
  readonly label: string;
  readonly theme: { [key: string]: any };
  readonly current?: boolean;
  readonly disabled?: boolean;
  [key: string]: any;
}

export default class Link extends React.Component<LinkProps> {
  render() {
    const { children, current, disabled, label, theme, ...props } = this.props;
    const cx = classNames(theme['next-pagination__link'], {
      [`${theme['next-pagination__link--current']}`]: current,
      [`${theme['next-pagination__link--disabled']}`]: disabled,
    });

    return (
      <a className={cx} aria-label={label} aria-current={current} {...props}>
        {children}
      </a>
    );
  }
}
