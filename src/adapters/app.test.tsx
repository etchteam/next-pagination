import React from 'react'
import { render, screen, fireEvent, act } from '@testing-library/react'
import '@testing-library/jest-dom'

const mockPush = jest.fn()
let mockSearchParams: URLSearchParams | null
let mockPathname: string | null

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
  usePathname: () => mockPathname,
  useSearchParams: () => mockSearchParams
}))

import AppPagination from './app'

beforeEach(() => {
  mockPush.mockReset()
  mockSearchParams = new URLSearchParams()
  mockPathname = '/list'
})

describe('AppPagination', () => {
  it('renders page 1 with default search params', async () => {
    await act(async () => {
      render(<AppPagination total={100} />)
    })
    expect(screen.getByLabelText('Page 1, current page')).toBeInTheDocument()
  })

  it('reads a single-valued page param', async () => {
    mockSearchParams = new URLSearchParams('page=2')
    await act(async () => {
      render(<AppPagination total={100} />)
    })
    expect(screen.getByLabelText('Page 2, current page')).toBeInTheDocument()
  })

  it('preserves multi-valued query params (does not collapse to last value)', async () => {
    mockSearchParams = new URLSearchParams('tag=a&tag=b&page=2')
    await act(async () => {
      render(<AppPagination total={100} />)
    })
    expect(screen.getByLabelText('Page 2, current page')).toBeInTheDocument()
  })

  it('clamps invalid page values silently', async () => {
    mockSearchParams = new URLSearchParams('page=abc')
    await act(async () => {
      render(<AppPagination total={100} />)
    })
    expect(screen.getByLabelText('Page 1, current page')).toBeInTheDocument()
  })

  it('calls router.push with the expected URL when changing page size', async () => {
    mockSearchParams = new URLSearchParams('page=3')
    await act(async () => {
      render(<AppPagination total={1000} />)
    })
    const select = screen.getByLabelText('per page') as HTMLSelectElement
    fireEvent.change(select, { target: { value: '40' } })
    expect(mockPush).toHaveBeenCalledTimes(1)
    const url = mockPush.mock.calls[0][0] as string
    expect(url).toContain('size=40')
    expect(url).toContain('page=1')
    expect(url.startsWith('/list?')).toBe(true)
  })

  describe('null context', () => {
    let warnSpy: jest.SpyInstance

    beforeEach(() => {
      warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => undefined)
    })

    afterEach(() => {
      warnSpy.mockRestore()
    })

    it('renders nothing and warns when useSearchParams returns null', async () => {
      mockSearchParams = null
      const { container } = await act(async () =>
        render(<AppPagination total={100} />)
      )
      expect(container.firstChild).toBeNull()
      expect(warnSpy).toHaveBeenCalled()
    })

    it('renders nothing and warns when usePathname returns null', async () => {
      mockPathname = null
      const { container } = await act(async () =>
        render(<AppPagination total={100} />)
      )
      expect(container.firstChild).toBeNull()
      expect(warnSpy).toHaveBeenCalled()
    })
  })
})
