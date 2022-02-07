import React from 'react';
import Link from 'next/link';

import Pagination from '@etchteam/next-pagination/dist'

import theme from '../styles/theme.module.scss'

export default function Home() {
  return (
    <main>
      <h1>Next Pagination</h1>
      <p>A semantic, accessible, responsive, robust, pagination component for sites built with Next.js.</p>

      <h2>Why use this pagination module?</h2>

      <ul>
        <li><strong>Accessible.</strong> Semantic HTML and fully marked up with appropriate aria roles for assisted browsing.</li>
        <li><strong>Usable.</strong> The base CSS styles account for keyboard focus states and fat finger touch targets.</li>
        <li><strong>Responsive.</strong> Works on all devices.</li>
        <li><strong>Themeable.</strong> Make it look however you want.</li>
        <li><strong>Self contained.</strong> There's only one required prop to get going. The rest of the logic is handled for you.</li>
        <li><strong>Works with Next.</strong> Integrated with the Next.js router.</li>
      </ul>

      <h2>Default theme</h2>
      <Pagination total={1000} />

      <h2>Custom theme</h2>
      <Pagination total={1000} theme={theme} />

      <h2>Custom page sizes</h2>
      <Pagination total={1000} sizes={[5, 10, 25, 150]} />

      <h2>Other examples</h2>
      <p>
        <Link href="/[dynamic]" as="/dynamic-test">
          <a>Dynamic pagination</a>
        </Link>
      </p>
    </main>
  );
}
