/** @type {import('jest').Config} */
export default {
  testEnvironment: 'jsdom',
  testMatch: ['**/src/**/*.test.ts?(x)'],
  moduleNameMapper: {
    '\\.(css|scss|sass)$': '<rootDir>/jest.style-mock.cjs'
  },
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { tsconfig: { jsx: 'react' } }]
  }
}
