import { defineConfig, devices } from '@playwright/test'

const PORT = 3000
const BASE_URL = `http://localhost:${PORT}`

export default defineConfig({
  testDir: 'tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    baseURL: BASE_URL,
    trace: 'on-first-retry'
  },
  projects: [{ name: 'chromium', use: devices['Desktop Chrome'] }],
  webServer: {
    // CI runs the production bundle (build + start) so the suite exercises
    // the same output users ship; local dev keeps the fast `next dev` loop.
    command: process.env.CI
      ? 'npm --prefix example run build:server && npm --prefix example run start'
      : 'npm --prefix example run dev',
    url: BASE_URL,
    reuseExistingServer: !process.env.CI,
    timeout: 180_000
  }
})
