import React, { useEffect, useState } from 'react'
import NextLink from 'next/link'
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

import defaultTheme from './index.module.css'

export interface PaginationProps {
  /**
   * The total number of pages
   */
  total: number
  /**
   * A CSS modules style object
   */
  theme?: { [key: string]: any }
  /**
   * An array of page size numbers
   */
  sizes?: number[]
  /**
   * Label for the page size dropdown
   */
  perPageText?: string
  /**
   * Label for the invisible page size button
   */
  setPageSizeText?: string
  /**
   * Extra props to pass to the link component
   */
  linkProps?: { [key: string]: any }
  /**
   * Component used to render navigation links. Defaults to next/link.
   * Must accept `href` and a single anchor child (legacy-behaviour style).
   */
  linkComponent?: React.ComponentType<any>
}

export interface RoutingAdapter {
  pathname: string
  query: Record<string, string | string[] | undefined>
  push: (url: string) => void
  /**
   * Optional component used to inject SEO `<link rel="prev|next">` into the
   * document head. Pages router passes `next/head`; app router omits it
   * because client components cannot write to `<head>`.
   */
  Head?: React.ComponentType<{ children: React.ReactNode }>
}

interface InternalProps extends PaginationProps {
  routing: RoutingAdapter
}

const Pagination = ({
  total,
  theme,
  sizes,
  perPageText = 'per page',
  setPageSizeText = 'Set page size',
  linkProps = {},
  linkComponent: LinkComponent = NextLink,
  routing
}: InternalProps) => {
  const styles = theme || defaultTheme
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null
  const query = pickBy({ ...routing.query }, (q) => !isEmpty(q))
  const currentPage = Number(query.page || 1)
  const cSizes = getSizes(sizes)
  const pageSize = Number(query.size) || cSizes[0]
  const isLastPage = currentPage * pageSize >= total
  const pageNumbers = getPageNumbers({ currentPage, pageSize, total })

  const path = routing.pathname

  const url = (page: number | string) =>
    `?${queryString.stringify({
      ...query,
      page
    })}`

  const Head = routing.Head

  return (
    <nav className={styles['next-pagination']} aria-label='pagination'>
      {Head ? (
        <Head>
          {/* SEO pagination helpers */}
          {currentPage !== 1 ? (
            <link rel='prev' href={`${path}${url(currentPage - 1)}`} />
          ) : null}
          {!isLastPage ? (
            <link rel='next' href={`${path}${url(currentPage + 1)}`} />
          ) : null}
        </Head>
      ) : null}
      <List theme={styles}>
        <Item theme={styles}>
          {currentPage !== 1 ? (
            <LinkComponent
              href={url(currentPage - 1)}
              prefetch={false}
              passHref
              legacyBehavior
              {...linkProps}
            >
              <Link label='Previous page' theme={styles}>
                <Icon icon='chevron-left' />
              </Link>
            </LinkComponent>
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
                <LinkComponent
                  href={url(pageNumber)}
                  prefetch={false}
                  passHref
                  legacyBehavior
                  {...linkProps}
                >
                  <Link label={`Page ${pageNumber}`} theme={styles}>
                    {pageNumber}
                  </Link>
                </LinkComponent>
              )}
            </Item>
          )
        )}
        <Item theme={styles}>
          {!isLastPage ? (
            <LinkComponent
              href={url(currentPage + 1)}
              prefetch={false}
              passHref
              legacyBehavior
              {...linkProps}
            >
              <Link label='Next page' theme={styles}>
                <Icon icon='chevron-right' />
              </Link>
            </LinkComponent>
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
            const next = `${path}?${queryString.stringify({
              ...query,
              page: 1,
              size: (event.target as HTMLSelectElement).value
            })}`
            routing.push(next)
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

export default Pagination
