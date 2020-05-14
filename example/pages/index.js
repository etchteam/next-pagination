import React from 'react';

import { Pagination } from 'next-pagination'

import theme from '../styles/theme.module.css'

export default function Home() {
  return (
    <main>
      <h1>Next Pagination</h1>
      <p>A semantic, accessible, responsive, robust, pagination component for sites built with Next.js.</p>
      <Pagination total={1000} />

      <h2>Custom theme</h2>
      <Pagination total={1000} theme={theme} />
    </main>
  );
}
