import React from 'react'
import Pagination from '@etchteam/next-pagination/dist'

export default function Dynamic() {
  return (
    <main>
      <h1>Dynamic Pagination</h1>
      <p>
        This page demonstrates pagination working with dynamic urls.
        Feel free to change the url to '/whatever-you-like' and see that the pagination retains the url.
      </p>

      <Pagination total={1000} />
    </main>
  );
}
