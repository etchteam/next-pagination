import React from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

import Pagination, { PaginationProps } from '../pagination'

const PagesPagination = (props: PaginationProps) => {
  const router = useRouter()
  return (
    <Pagination
      {...props}
      routing={{
        pathname: router.pathname,
        query: router.query,
        push: (url) => {
          router.push(url)
        },
        Head
      }}
    />
  )
}

export default PagesPagination
