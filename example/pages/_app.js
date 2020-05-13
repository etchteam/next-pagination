import React from 'react';

import 'next-pagination/dist/index.css'

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
