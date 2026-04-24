'use client'

import React from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'

import Pagination, { PaginationProps } from '../pagination'

const AppPagination = (props: PaginationProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const query: Record<string, string | string[]> = {}
  if (searchParams) {
    const seen: Record<string, true> = {}
    searchParams.forEach((_value, key) => {
      if (seen[key]) return
      seen[key] = true
      const values = searchParams.getAll(key)
      query[key] = values.length > 1 ? values : values[0]
    })
  }

  return (
    <Pagination
      {...props}
      routing={{
        pathname: pathname ?? '',
        query,
        push: (url) => {
          router.push(url)
        }
      }}
    />
  )
}

export default AppPagination
