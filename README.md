# next-pagination

> The best damn pagination component. For Next.js

[![NPM](https://img.shields.io/npm/v/next-pagination.svg)](https://www.npmjs.com/package/next-pagination) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

TL;DR Just show me the [DEMO](https://etchteam.github.io/next-pagination)

<img src="https://raw.githubusercontent.com/etchteam/next-pagination/master/example/public/example.png" alt="An example of the pagination UI in use" />

## Why use this pagination module?

- **Accessible.** Semantic HTML and fully marked up with appropriate aria roles for assisted browsing.
- **Usable.** The base CSS styles account for keyboard focus states and fat finger touch targets.
- **Responsive.** Works on all devices.
- **Themeable.** Make it look however you want.
- **Self contained.** There's only one required prop to get going. The rest of the logic is handled for you.
- **Works with Next.** Integrated with the Next.js router.

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

You will need to import the CSS, either in your `_app.js`, or in your Sass build.

```jsx
import 'next-pagination/dist/index.css'
```

When used, the pagination component will reload the same route with added pagination query params.

- `page` for the page number the user is on.
- `size` for the number of results per page.

e.g. ?page=4&size=20

The **default page** is 1. The **default size** is 20.

You'll need to load the actual data from your API yourself. We're only here for the front-end!

## Props

| Name                     | Type       | Description                               |
| ------------------------ | ---------- | ----------------------------------------- |
| `total`                  | `Number`   | **Required.** The total number of pages.  |
| `theme`                  | `Object`   | A CSS modules style object.               |
| `sizes`                  | `Array`    | An array of page size numbers             |

## Theming
Next.js natively supports **CSS modules**, so this component supports injecting CSS module styles.

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

The theme uses BEM class naming with the base class `next-pagination`. The file `/src/index.module.scss` should give you a solid idea of what's needed.

## Contribute

This package was created with [create-react-library](https://github.com/transitive-bullshit/create-react-library#readme).

### Setup

To get set up you'll need to run `npm install && cd example && npm install`

## Development

In the root folder, run `npm run start`
**At the same time**, in the example folder, run `npm run dev`
Then head over to `localhost:3000` to see the example running.

## Deploy the example

In the root folder run `npm run deploy` to deploy the example to github pages on the `gh-pages` branch of your repo.

## Publish to npm

Feeling confident? Run `npm publish` to send the latest version to npm.

## License

MIT © [etchteam](https://github.com/etchteam)
