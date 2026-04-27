# next-pagination

> The best damn pagination component. For Next.js

[![NPM](https://img.shields.io/npm/v/@etchteam/next-pagination.svg)](https://www.npmjs.com/package/@etchteam/next-pagination) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

TL;DR Just show me the [DEMO](https://etchteam.github.io/next-pagination)

<img src="https://raw.githubusercontent.com/etchteam/next-pagination/master/example/public/example.png" alt="An example of the pagination UI in use" />

## Why use this pagination module?

- **Accessible.** Semantic HTML and fully marked up with appropriate aria roles for assisted browsing.
- **Usable.** The base CSS styles account for keyboard focus states and fat finger touch targets.
- **Responsive.** Works on all devices.
- **Themeable.** Make it look however you want.
- **Self contained.** There's only one required prop to get going. The rest of the logic is handled for you.
- **Works with Next.** Supports both the pages router and the app router.

## Install

```bash
npm install --save @etchteam/next-pagination
```

## Usage
This component is fairly self contained. You will need to pass the **total number of potential results** in order to calculate the number of pages to show.

The package ships three entrypoints:

| Import path                              | Export(s)                                       | Use when                       |
| ---------------------------------------- | ----------------------------------------------- | ------------------------------ |
| `@etchteam/next-pagination`              | default `PagesPagination`, named `PagesPagination` + `AppPagination` | Either router (back-compat).   |
| `@etchteam/next-pagination/pages`        | default `PagesPagination`                       | Pages router only — avoids pulling in `next/navigation` and the `'use client'` directive. |
| `@etchteam/next-pagination/app`          | default `AppPagination`                         | App router only — avoids pulling in `next/router` / `next/head`. |

You will need to import the CSS, either in your `_app.js`, in your app router root layout, or in your Sass build.

```jsx
import '@etchteam/next-pagination/dist/index.css'
```

When used, the pagination component will reload the same route with added pagination query params.

- `page` for the page number the user is on.
- `size` for the number of results per page.

e.g. `?page=4&size=20`

The **default page** is 1. The **default size** is 20. Invalid values in the URL (`?page=abc`, `?page=-1`, `?page=99999`) are clamped to the valid range.

You'll need to load the actual data from your API yourself. We're only here for the front-end!

### Pages router

```jsx
import Pagination from '@etchteam/next-pagination/pages'

export default function Example() {
  return <Pagination total={1000} />
}
```

The pages-router adapter also injects `<link rel="prev|next">` SEO hints into `<head>` via `next/head`.

### App router

`AppPagination` reads the route via `next/navigation` and must be rendered inside a `<Suspense>` boundary (a Next.js requirement of `useSearchParams`).

```jsx
'use client'

import { Suspense } from 'react'
import { AppPagination } from '@etchteam/next-pagination/app'

export default function Example() {
  return (
    <Suspense>
      <AppPagination total={1000} />
    </Suspense>
  )
}
```

`AppPagination` does **not** emit `<link rel="prev|next">` SEO hints — `next/head` is pages-router only and Next's metadata APIs are server-only, so prev/next links can't be written from a client component. If you need them, render them server-side from your route's `generateMetadata`.

## Props

| Name                     | Type       | Description                               |
| ------------------------ | ---------- | ----------------------------------------- |
| `total`                  | `Number`    | **Required.** The total number of pages.                                              |
| `theme`                  | `Object`    | A CSS modules style object.                                                           |
| `sizes`                  | `Array`     | An array of page size numbers                                                         |
| `perPageText`            | `String`    | Label for the page size dropdown                                                      |
| `setPageSizeText`        | `String`    | Label for the invisible page size button                                              |
| `linkProps`              | `Object`    | Extra props to pass to the link component                                             |
| `linkComponent`          | `Component` | Custom link component. Defaults to `next/link`. Receives `href` + a legacy-behaviour anchor child. |

## Theming

### CSS custom properties (recommended)

The component exposes every theme value as a CSS custom property scoped to `.next-pagination`. Override any of them in your own stylesheet:

```css
.my-container .next-pagination {
  --next-pagination-interactive-color: hotpink;
  --next-pagination-border-radius: 8px;
}
```

Available variables:

```
--next-pagination-interactive-color
--next-pagination-spacing-vertical
--next-pagination-spacing-horizontal
--next-pagination-spacing-vertical-sm
--next-pagination-spacing-horizontal-sm
--next-pagination-border-width
--next-pagination-border-radius
--next-pagination-line-height
--next-pagination-item-background
--next-pagination-item-background-current
--next-pagination-item-background-disabled
--next-pagination-item-color
--next-pagination-item-color-current
--next-pagination-item-color-disabled
--next-pagination-item-border-color
--next-pagination-select-background
--next-pagination-select-border-color
--next-pagination-select-border-color-hover
```

### Full class-name override

For deeper customisation, pass a CSS modules style object via the `theme` prop:

```jsx
import styles from '/my/path/to/styles.module.css'

class Example extends Component {
  render() {
    return <Pagination total={1000} theme={styles} />
  }
}
```

The theme uses BEM class naming with the base class `next-pagination`. The file `/src/index.module.css` shows the full class list.

## Custom link component

By default the component renders navigation links with `next/link`. If you need to wrap or replace it (e.g. to add a custom prefetch strategy, swap in an app-router variant, or inject a shared analytics wrapper), pass your own via `linkComponent`:

```jsx
import NextLink from 'next/link'

const TrackedLink = (props) => (
  <NextLink {...props} onClick={() => track('pagination')} />
)

<Pagination total={1000} linkComponent={TrackedLink} />
```

The component must accept `href`, `prefetch`, `passHref`, `legacyBehavior`, and a single anchor child.

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
