import React from 'react';

import { Pagination } from 'next-pagination'

export default function Home() {
  return (
    <main>
      <h1>Next Pagination</h1>
      <p>A semantic, accessible, responsive, robust, pagination component for sites built with Next.js.</p>
      <Pagination total={1000} />
    </main>
  );
}
