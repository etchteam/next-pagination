import React from 'react'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import NextLink from 'next/link'
import queryString from 'query-string'
import pickBy from 'lodash/pickBy'
import isEmpty from 'lodash/isEmpty'

import List from './components/List'
import Item from './components/Item'
import Link from './components/Link'
import Icon from './components/Icon'

import styles from './index.css'

const getPageNumbers = ({
  currentPage,
  pageSize,
  total,
  pageNumbersToShow = 3
}) => {
  const lastPageNumber = Math.ceil(total / pageSize);
  const currentPageNumber =
    currentPage <= lastPageNumber ? currentPage : lastPageNumber
  const maxPagesBeforeCurrentPage = Math.floor(pageNumbersToShow / 2)
  const maxPagesAfterCurrentPage = Math.ceil(pageNumbersToShow / 2) - 1
  let startPage = 1
  let endPage = lastPageNumber

  if (lastPageNumber <= 1) {
    return [] // Don't show numbers if there's only 1 page
  }

  if (currentPageNumber <= maxPagesBeforeCurrentPage) { // near the start
    startPage = 1
    endPage = pageNumbersToShow
  } else if (currentPageNumber + maxPagesAfterCurrentPage >= lastPageNumber) { // near the end
    startPage = lastPageNumber - pageNumbersToShow + 1
  } else {
    // somewhere in the middle
    startPage = currentPageNumber - maxPagesBeforeCurrentPage
    endPage = currentPageNumber + maxPagesAfterCurrentPage
  }

  let pageNumbers = Array.from(Array(endPage + 1 - startPage).keys())
    .map((pageNumber) => startPage + pageNumber)
    .filter((pageNumber) => pageNumber <= lastPageNumber)

  if (pageNumbers[0] > 1) {
    pageNumbers = [1, '...', ...pageNumbers]
  }

  if (pageNumbers[pageNumbers.length - 1] !== lastPageNumber) {
    pageNumbers = [...pageNumbers, '...', lastPageNumber]
  }

  return pageNumbers
}

export const Pagination = ({ total }) => {
  const router = useRouter()
  if (!router) return null
  const query = pickBy({ ...(router.query || {}) }, (q) => !isEmpty(q))
  const currentPage = Number(query.page || 1)
  const pageSize = Number(query.size || 20)
  const isLastPage = currentPage * pageSize >= total
  const pageNumbers = getPageNumbers({ currentPage, pageSize, total })

  return (
    <nav className={styles['next-pagination']} aria-label='pagination'>
      <List>
        <Item>
          {currentPage !== 1 ? (
            <NextLink
              href={`?${queryString.stringify({
                ...query,
                page: currentPage - 1
              })}`}
              passHref
            >
              <Link label='Previous page'>
                <Icon icon='chevron-left' />
              </Link>
            </NextLink>
          ) : (
            <Link label='No previous page available' disabled>
              <Icon icon='chevron-left' />
            </Link>
          )}
        </Item>
        {pageNumbers.map((pageNumber, i) =>
          pageNumber === '...' ? (
            <Item key={`${pageNumber}${i}`} hellip>
              <Link disabled label="ellipsis">
                &hellip;
              </Link>
            </Item>
          ) : (
            <Item key={pageNumber}>
              {pageNumber === currentPage ? (
                <Link
                  label={`Page ${pageNumber}, current page`}
                  disabled
                  current
                >
                  {pageNumber}
                </Link>
              ) : (
                <NextLink
                  href={`?${queryString.stringify({
                    ...query,
                    page: pageNumber
                  })}`}
                  passHref
                >
                  <Link label={`Page ${pageNumber}`}>{pageNumber}</Link>
                </NextLink>
              )}
            </Item>
          )
        )}
        <Item>
          {!isLastPage ? (
            <NextLink
              href={`?${queryString.stringify({
                ...query,
                page: currentPage + 1
              })}`}
              passHref
            >
              <Link label='Next page'>
                <Icon icon='chevron-right' />
              </Link>
            </NextLink>
          ) : (
            <Link label='No next page available' disabled>
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
          per page
        </label>
        <select
          className={styles['next-pagination__select']}
          name='size'
          id='next-pagination__size'
          defaultValue={pageSize}
          onChange={(e) => {
            const url = `${router.pathname}?${queryString.stringify({
              ...query,
              page: 1,
              size: e.target.value
            })}`
            router.push(url)
          }}
        >
          <option>20</option>
          <option>40</option>
          <option>60</option>
          <option>80</option>
          <option>100</option>
        </select>
        <button className={styles['next-pagination__submit']} type='submit'>
          Set page size
        </button>
      </form>
    </nav>
  )
}

Pagination.propTypes = {
  total: PropTypes.number.isRequired
}

Pagination.defaultProps = {
  total: 0
}
