# next-pagination

> The best damn pagination component. For Next.js

[![NPM](https://img.shields.io/npm/v/next-pagination.svg)](https://www.npmjs.com/package/next-pagination) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

TL;DR Just show me the [DEMO](https://etchteam.github.io/next-pagination)

## Why use this pagination module?

- Accessible. Semantic HTML and fully marked up with appropriate aria roles for assisted browsing.
- Usable. The base CSS styles account for keyboard focus states and fat finger touch targets.
- Responsive. Works on all devices.
- Self contained. There's only one required prop to get going. The rest of the logic is handled for you.
- Works with Next. Integrated with the Next.js router.

## Install

```bash
npm install --save next-pagination
```

## Usage
This component is fairly self contained. You will need to pass the **total number of potential results** in order to calculate the number of pages to show.

```jsx
import React, { Component } from 'react'

import Pagination from 'next-pagination'

class Example extends Component {
  render() {
    return <Pagination total={1000} />
  }
}
```

When used, the pagination component will reload the same route with added pagination query params.

- `page` for the page number the user is on.
- `size` for the number of results per page.

## Theming
Next.js natively supports CSS modules, so this component supports injecting CSS module styles.

Import the styles as you would for a normal component, but pass them as props.

```jsx
[...]
import styles from '/my/path/to/styles.module.css'

class Example extends Component {
  render() {
    return <Pagination total={1000} theme={styles} />
  }
}
```

The theme uses BEM class naming with the base class `next-pagination`. The file `/src/index.css` should give you a solid idea of what's needed.

## Props

| Name                     | Type       | Description                               |
| ------------------------ | ---------- | ----------------------------------------- |
| `total`                  | `Number`   | **Required.** The total number of pages.  |
| `theme`                  | `Object`   | A CSS modules style object.               |

## License

MIT © [etchteam](https://github.com/etchteam)
