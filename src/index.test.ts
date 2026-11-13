import Pagination from '.'
import { getSizes } from './lib/sizes'
import { stringifyQuery } from './lib/stringify-query'
import assert from 'assert'

describe('Pagination', () => {
  it('is truthy', () => {
    expect(Pagination).toBeTruthy()
  })
})

// NOTE: [20,40,60,80,100] <= default sizes
describe('Custom Sizes', () => {
  it('should return an array', () => {
    // second argument is the default value
    assert.deepStrictEqual(getSizes(), [20, 40, 60, 80, 100])
    assert.deepStrictEqual(getSizes([10, 20, 10]), [10, 20])
  })
  it('should return default sizes', () => {
    // will return defaults
    assert.deepStrictEqual(getSizes([]), [20, 40, 60, 80, 100])
    assert.deepStrictEqual(
      getSizes(['', 10, 20] as any[]),
      [20, 40, 60, 80, 100]
    )
    assert.deepStrictEqual(getSizes([{}, {}] as any[]), [20, 40, 60, 80, 100])
  })
})

describe('Stringify Query', () => {
  it('should join keys and values', () => {
    assert.strictEqual(stringifyQuery({ q: 'a b', page: 2 }), 'q=a+b&page=2')
  })
  it('should repeat the key for array values', () => {
    assert.strictEqual(
      stringifyQuery({ tag: ['a', 'b'], page: 1 }),
      'tag=a&tag=b&page=1'
    )
  })
})
