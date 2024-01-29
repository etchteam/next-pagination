import Head from 'next/head';
import React from 'react';

import '@etchteam/next-pagination/dist/index.css';
import '../styles/main.css';

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Head>
        <title>Next pagination</title>
      </Head>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
