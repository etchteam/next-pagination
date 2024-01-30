import { Fragment } from 'react';

// Icons from: https://material.io/resources/icons/?style=round

type IconName = 'chevron-left' | 'chevron-right' | 'expand-more';

function path(icon: IconName) {
  switch (icon) {
    case 'chevron-left':
      return (
        <Fragment>
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path
            fill="currentColor"
            d="M14.71 6.71c-.39-.39-1.02-.39-1.41 0L8.71 11.3c-.39.39-.39 1.02 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L10.83 12l3.88-3.88c.39-.39.38-1.03 0-1.41z"
          />
        </Fragment>
      );
    case 'chevron-right':
      return (
        <Fragment>
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path
            fill="currentColor"
            d="M9.29 6.71c-.39.39-.39 1.02 0 1.41L13.17 12l-3.88 3.88c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0l4.59-4.59c.39-.39.39-1.02 0-1.41L10.7 6.7c-.38-.38-1.02-.38-1.41.01z"
          />
        </Fragment>
      );
    case 'expand-more':
      return (
        <Fragment>
          <path d="M24 24H0V0h24v24z" fill="none" opacity=".87" />
          <path
            fill="currentColor"
            d="M15.88 9.29L12 13.17 8.12 9.29c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0l4.59-4.59c.39-.39.39-1.02 0-1.41-.39-.38-1.03-.39-1.42 0z"
          />
        </Fragment>
      );
    default:
      return '';
  }
}

export default function Icon({ icon }: Readonly<{ icon: IconName }>) {
  return (
    <svg
      className="next-pagination__icon"
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="24"
      height="24"
    >
      {path(icon)}
    </svg>
  );
}
