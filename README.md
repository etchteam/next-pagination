# next-pagination

> The best damn pagination component. For Next.js

[![NPM](https://img.shields.io/npm/v/next-pagination.svg)](https://www.npmjs.com/package/next-pagination) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save next-pagination
```

## Usage
This component is fairly self contained. You will need to pass the total number of potential results in order to calculate the number of pages to show.

```jsx
import React, { Component } from 'react'

import Pagination from 'next-pagination'

class Example extends Component {
  render() {
    return <Pagination total={1000} />
  }
}
```

## Theming
Next.js natively supports CSS modules, so this component supports injecting CSS module styles. Import the styles as you would for a normal component, but pass them as props.

```jsx
[...]
import styles from '/my/path/to/styles.module.css'

class Example extends Component {
  render() {
    return <Pagination total={1000} theme={styles} />
  }
}
```

## License

MIT © [etchteam](https://github.com/etchteam)
