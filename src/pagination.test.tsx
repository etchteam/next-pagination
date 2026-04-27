import React from 'react'
import { render, screen, fireEvent, act } from '@testing-library/react'
import '@testing-library/jest-dom'

import Pagination, { RoutingAdapter } from './pagination'

const stubAdapter = (overrides: Partial<RoutingAdapter> = {}): RoutingAdapter => ({
  pathname: '/list',
  query: {},
  push: jest.fn(),
  ...overrides
})

describe('Pagination core', () => {
  it('renders the navigation landmark with both adapters absent before mount, then visible', async () => {
    await act(async () => {
      render(<Pagination total={100} routing={stubAdapter()} />)
    })
    expect(screen.getByRole('navigation', { name: 'pagination' })).toBeInTheDocument()
  })

  describe('page-1 boundary', () => {
    it('disables the previous-page link', async () => {
      await act(async () => {
        render(<Pagination total={100} routing={stubAdapter()} />)
      })
      expect(screen.getByLabelText('No previous page available')).toBeInTheDocument()
      expect(screen.queryByLabelText('Previous page')).not.toBeInTheDocument()
    })

    it('marks page 1 as the current page', async () => {
      await act(async () => {
        render(<Pagination total={100} routing={stubAdapter()} />)
      })
      expect(screen.getByLabelText('Page 1, current page')).toBeInTheDocument()
    })
  })

  describe('last-page boundary', () => {
    it('disables the next-page link when on the last page', async () => {
      await act(async () => {
        render(
          <Pagination
            total={100}
            routing={stubAdapter({ query: { page: '5' } })}
          />
        )
      })
      expect(screen.getByLabelText('No next page available')).toBeInTheDocument()
      expect(screen.queryByLabelText('Next page')).not.toBeInTheDocument()
    })
  })

  describe('invalid ?page= values are clamped silently', () => {
    it('treats non-numeric page as page 1', async () => {
      await act(async () => {
        render(
          <Pagination
            total={100}
            routing={stubAdapter({ query: { page: 'abc' } })}
          />
        )
      })
      expect(screen.getByLabelText('Page 1, current page')).toBeInTheDocument()
      expect(screen.getByLabelText('No previous page available')).toBeInTheDocument()
    })

    it('clamps page beyond range to the last page', async () => {
      await act(async () => {
        render(
          <Pagination
            total={100}
            routing={stubAdapter({ query: { page: '99999' } })}
          />
        )
      })
      expect(screen.getByLabelText('Page 5, current page')).toBeInTheDocument()
      expect(screen.getByLabelText('No next page available')).toBeInTheDocument()
    })

    it('treats negative page as page 1', async () => {
      await act(async () => {
        render(
          <Pagination
            total={100}
            routing={stubAdapter({ query: { page: '-3' } })}
          />
        )
      })
      expect(screen.getByLabelText('Page 1, current page')).toBeInTheDocument()
    })

    it('treats page=0 as page 1', async () => {
      await act(async () => {
        render(
          <Pagination
            total={100}
            routing={stubAdapter({ query: { page: '0' } })}
          />
        )
      })
      expect(screen.getByLabelText('Page 1, current page')).toBeInTheDocument()
    })

    it('uses the first value of a multi-valued page param', async () => {
      await act(async () => {
        render(
          <Pagination
            total={100}
            routing={stubAdapter({ query: { page: ['2', '3'] } })}
          />
        )
      })
      expect(screen.getByLabelText('Page 2, current page')).toBeInTheDocument()
    })
  })

  describe('invalid ?size= values fall back to default', () => {
    it('non-numeric size falls back to first valid size', async () => {
      await act(async () => {
        render(
          <Pagination
            total={100}
            routing={stubAdapter({ query: { size: 'banana' } })}
          />
        )
      })
      const select = screen.getByLabelText('per page') as HTMLSelectElement
      expect(select.value).toBe('20')
    })

    it('size not in sizes list falls back to first valid size', async () => {
      await act(async () => {
        render(
          <Pagination
            total={100}
            routing={stubAdapter({ query: { size: '999' } })}
          />
        )
      })
      const select = screen.getByLabelText('per page') as HTMLSelectElement
      expect(select.value).toBe('20')
    })
  })

  describe('invalid total renders an empty pagination strip', () => {
    it('treats negative total as zero', async () => {
      await act(async () => {
        render(<Pagination total={-5} routing={stubAdapter()} />)
      })
      expect(screen.getByLabelText('No previous page available')).toBeInTheDocument()
      expect(screen.getByLabelText('No next page available')).toBeInTheDocument()
    })

    it('treats undefined total as zero', async () => {
      await act(async () => {
        render(
          <Pagination total={undefined as unknown as number} routing={stubAdapter()} />
        )
      })
      expect(screen.getByLabelText('No previous page available')).toBeInTheDocument()
      expect(screen.getByLabelText('No next page available')).toBeInTheDocument()
    })
  })

  describe('label overrides', () => {
    it('renders perPageText and setPageSizeText overrides', async () => {
      await act(async () => {
        render(
          <Pagination
            total={100}
            perPageText='por página'
            setPageSizeText='Establecer'
            routing={stubAdapter()}
          />
        )
      })
      expect(screen.getByText('por página')).toBeInTheDocument()
      expect(screen.getByText('Establecer')).toBeInTheDocument()
    })
  })

  describe('custom linkComponent', () => {
    it('receives href, prefetch, passHref, legacyBehavior, plus linkProps spread', async () => {
      const seen: Record<string, unknown>[] = []
      const Custom = (props: Record<string, unknown>) => {
        seen.push(props)
        return <>{props.children as React.ReactNode}</>
      }
      await act(async () => {
        render(
          <Pagination
            total={100}
            routing={stubAdapter({ query: { page: '2' } })}
            linkComponent={Custom}
            linkProps={{ 'data-extra': 'yes' }}
          />
        )
      })
      const sample = seen.find((p) => p.href === '?page=1')
      expect(sample).toBeDefined()
      expect(sample).toMatchObject({
        prefetch: false,
        passHref: true,
        legacyBehavior: true,
        'data-extra': 'yes'
      })
    })
  })

  describe('page-size onChange', () => {
    it('calls routing.push with page=1 and the new size', async () => {
      const push = jest.fn()
      await act(async () => {
        render(
          <Pagination
            total={100}
            routing={stubAdapter({
              pathname: '/list',
              query: { page: '3' },
              push
            })}
          />
        )
      })
      const select = screen.getByLabelText('per page') as HTMLSelectElement
      fireEvent.change(select, { target: { value: '40' } })
      expect(push).toHaveBeenCalledTimes(1)
      const url = push.mock.calls[0][0] as string
      expect(url).toContain('size=40')
      expect(url).toContain('page=1')
      expect(url.startsWith('/list?')).toBe(true)
    })
  })

  describe('SEO Head injection (pages-router-shaped adapter)', () => {
    it('renders <link rel="prev"> on page 2 via adapter Head', async () => {
      const captured: React.ReactNode[] = []
      const Head: RoutingAdapter['Head'] = ({ children }) => {
        captured.push(children)
        return null
      }
      await act(async () => {
        render(
          <Pagination
            total={100}
            routing={stubAdapter({ query: { page: '2' }, Head })}
          />
        )
      })
      const flat = captured.flat() as React.ReactElement[]
      const prev = flat.find(
        (el) => React.isValidElement(el) && (el.props as { rel?: string }).rel === 'prev'
      )
      expect(prev).toBeDefined()
    })

    it('does not render prev link on page 1', async () => {
      const captured: React.ReactNode[] = []
      const Head: RoutingAdapter['Head'] = ({ children }) => {
        captured.push(children)
        return null
      }
      await act(async () => {
        render(<Pagination total={100} routing={stubAdapter({ Head })} />)
      })
      const flat = captured.flat() as React.ReactElement[]
      const prev = flat.find(
        (el) => React.isValidElement(el) && (el.props as { rel?: string }).rel === 'prev'
      )
      expect(prev).toBeUndefined()
    })
  })
})
