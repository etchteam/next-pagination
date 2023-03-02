import React, { EventHandler, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import NextLink from 'next/link'
import Head from 'next/head'
import queryString from 'query-string'
import pickBy from 'lodash/pickBy'
import isEmpty from 'lodash/isEmpty'

import List from './components/List'
import Item from './components/Item'
import Link from './components/Link'
import Icon from './components/Icon'
import Select from './components/Select'

import { getSizes } from './lib/sizes'
import { getPageNumbers } from './lib/get-page-numbers'

import defaultTheme from './index.module.scss'

interface PaginationProps {
  /**
   * The total number of pages
   */
  total: number;
  /**
   * A CSS modules style object
   */
  theme?: { [key: string]: any };
  /**
   * An array of page size numbers
   */
  sizes?: number[];
  /**
   * Label for the page size dropdown
   */
  perPageText?: string;
  /**
   * Label for the invisible page size button
   */
  setPageSizeText?: string;
  /**
   * Extra props to pass to the next.js links
   */
  linkProps?: { [key: string]: any };
}

const Pagination = ({
  total,
  theme,
  sizes,
  perPageText,
  setPageSizeText,
  linkProps
}: PaginationProps) => {
  const styles = theme || defaultTheme
  const router = useRouter()
  const [hasRouter, setHasRouter] = useState(false)
  useEffect(() => {
    setHasRouter(true)
  }, [router])

  if (!hasRouter) return null
  const query = pickBy({ ...(router.query || {}) }, (q) => !isEmpty(q))
  const currentPage = Number(query.page || 1)
  // default|custom => evaluated sizes
  const cSizes = getSizes(sizes)
  const pageSize = Number(query.size) || cSizes[0]
  const isLastPage = currentPage * pageSize >= total
  const pageNumbers = getPageNumbers({ currentPage, pageSize, total })

  const path = router.pathname

  const url = (page: number | string) =>
    `?${queryString.stringify({
      ...query,
      page
    })}`

  return (
    <nav className={styles['next-pagination']} aria-label='pagination'>
      <Head>
        {/* SEO pagination helpers */}
        {currentPage !== 1 ? (
          <link rel='prev' href={`${path}${url(currentPage - 1)}`} />
        ) : null}
        {!isLastPage ? (
          <link rel='next' href={`${path}${url(currentPage + 1)}`} />
        ) : null}
      </Head>
      <List theme={styles}>
        <Item theme={styles}>
          {currentPage !== 1 ? (
            <NextLink
              href={url(currentPage - 1)}
              prefetch={false}
              passHref
              legacyBehavior
              {...linkProps}
            >
              <Link label='Previous page' theme={styles}>
                <Icon icon='chevron-left' />
              </Link>
            </NextLink>
          ) : (
            <Link label='No previous page available' disabled theme={styles}>
              <Icon icon='chevron-left' />
            </Link>
          )}
        </Item>
        {pageNumbers.map((pageNumber, i) =>
          pageNumber === '...' ? (
            <Item key={`${pageNumber}${i}`} hellip theme={styles}>
              <Link disabled label='ellipsis' theme={styles}>
                &hellip;
              </Link>
            </Item>
          ) : (
            <Item key={pageNumber} theme={styles}>
              {pageNumber === currentPage ? (
                <Link
                  label={`Page ${pageNumber}, current page`}
                  disabled
                  current
                  theme={styles}
                >
                  {pageNumber}
                </Link>
              ) : (
                <NextLink
                  href={url(pageNumber)}
                  prefetch={false}
                  passHref
                  legacyBehavior
                  {...linkProps}
                >
                  <Link label={`Page ${pageNumber}`} theme={styles}>
                    {pageNumber}
                  </Link>
                </NextLink>
              )}
            </Item>
          )
        )}
        <Item theme={styles}>
          {!isLastPage ? (
            <NextLink
              href={url(currentPage + 1)}
              prefetch={false}
              passHref
              legacyBehavior
              {...linkProps}
            >
              <Link label='Next page' theme={styles}>
                <Icon icon='chevron-right' />
              </Link>
            </NextLink>
          ) : (
            <Link label='No next page available' disabled theme={styles}>
              <Icon icon='chevron-right' />
            </Link>
          )}
        </Item>
      </List>

      <form method='GET' action='' className={styles['next-pagination__form']}>
        <input type='hidden' name='page' value={currentPage} />
        <label
          htmlFor='next-pagination__size'
          className={styles['next-pagination__label']}
        >
          {perPageText}
        </label>
        <Select
          key={pageSize}
          theme={styles}
          name='size'
          id='next-pagination__size'
          defaultValue={pageSize}
          onChange={(event: Event) => {
            const url = `${router.pathname}?${queryString.stringify({
              ...query,
              page: 1,
              size: (event.target as HTMLSelectElement).value
            })}`
            router.push(url)
          }}
        >
          {cSizes.map((size) => (
            <option key={size}>{size}</option>
          ))}
        </Select>
        <button className={styles['next-pagination__submit']} type='submit'>
          {setPageSizeText}
        </button>
      </form>
    </nav>
  )
}

Pagination.defaultProps = {
  total: 0,
  perPageText: 'per page',
  setPageSizeText: 'Set page size',
  sizes: undefined,
  linkProps: {}
}

export default Pagination
