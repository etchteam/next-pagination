'use client'

import React from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'

import Pagination, { PaginationProps } from '../pagination'

const AppPagination = (props: PaginationProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  if (searchParams === null || pathname === null) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(
        '[next-pagination] AppPagination rendered without an app-router ' +
          'search-params/pathname context. Wrap it in <Suspense>. ' +
          'See https://nextjs.org/docs/app/api-reference/functions/use-search-params'
      )
    }
    return null
  }

  const query: Record<string, string | string[]> = {}
  const seen = new Set<string>()
  searchParams.forEach((_value, key) => {
    if (seen.has(key)) return
    seen.add(key)
    const values = searchParams.getAll(key)
    query[key] = values.length > 1 ? values : values[0]
  })

  return (
    <Pagination
      {...props}
      routing={{
        pathname,
        query,
        push: (url) => {
          router.push(url)
        }
      }}
    />
  )
}

export default AppPagination
