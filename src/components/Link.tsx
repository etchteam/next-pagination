import classNames from 'classnames';
import { Component } from 'react';

interface LinkProps {
  readonly children: React.ReactNode;
  readonly label: string;
  readonly theme: { [key: string]: string | undefined };
  readonly current?: boolean;
  readonly disabled?: boolean;
  [key: string]: unknown;
}

export default class Link extends Component<LinkProps> {
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
