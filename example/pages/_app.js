import React from 'react';

import 'next-pagination/dist/index.css'
import '../styles/main.css'

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
