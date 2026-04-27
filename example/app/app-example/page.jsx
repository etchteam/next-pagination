'use client'

import React, { Suspense } from 'react'
import { AppPagination } from '@etchteam/next-pagination/app'

import theme from '../../styles/theme.module.scss'

export default function AppExample() {
  return (
    <main>
      <h1>App Router Pagination</h1>
      <p>
        This page uses the <code>AppPagination</code> named export, which reads
        the route and search params from <code>next/navigation</code> instead of{' '}
        <code>next/router</code>.
      </p>

      <Suspense>
        <h2>Default theme</h2>
        <AppPagination total={1000} />

        <h2>Custom theme</h2>
        <AppPagination total={1000} theme={theme} />

        <h2>Custom page sizes</h2>
        <AppPagination total={1000} sizes={[5, 10, 25, 150]} />
      </Suspense>
    </main>
  )
}
