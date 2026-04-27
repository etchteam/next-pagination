import React from 'react'

import '@etchteam/next-pagination/dist/index.css'
import '../styles/main.css'

export const metadata = {
  title: 'Next pagination (App Router)'
}

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  )
}
