import React from 'react';

import { Pagination } from 'next-pagination'

export default function Home() {
  return (
    <div>
      <h1>Pagination</h1>
      <Pagination total={1000} />
    </div>
  );
}
