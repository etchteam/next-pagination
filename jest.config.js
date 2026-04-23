/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'jsdom',
  testMatch: ['**/src/**/*.test.ts?(x)'],
  moduleNameMapper: {
    '\\.(css|scss|sass)$': '<rootDir>/jest.style-mock.js'
  },
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { tsconfig: { jsx: 'react' } }]
  }
}
