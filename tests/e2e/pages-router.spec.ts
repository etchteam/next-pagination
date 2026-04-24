import { expect, test } from '@playwright/test'

test.describe('pages router', () => {
  test('renders the first page with previous disabled', async ({ page }) => {
    await page.goto('/')
    const nav = page.getByRole('navigation', { name: 'pagination' }).first()
    await expect(nav).toBeVisible()
    await expect(nav.getByLabel('Page 1, current page')).toBeVisible()
    await expect(nav.getByLabel('No previous page available')).toBeVisible()
  })

  test('clicking a page number updates the URL and current page', async ({ page }) => {
    await page.goto('/')
    const nav = page.getByRole('navigation', { name: 'pagination' }).first()
    await nav.getByLabel('Page 2', { exact: true }).click()
    await expect(page).toHaveURL(/\?page=2/)
    await expect(nav.getByLabel('Page 2, current page')).toBeVisible()
    await expect(nav.getByLabel('Previous page')).toBeVisible()
  })

  test('page size selector pushes size + resets to page 1', async ({ page }) => {
    await page.goto('/?page=3')
    const nav = page.getByRole('navigation', { name: 'pagination' }).first()
    await nav.getByLabel('per page').selectOption('40')
    await expect(page).toHaveURL(/size=40/)
    await expect(page).toHaveURL(/page=1/)
  })

  test('links to the app router example', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('link', { name: 'App Router pagination' }).click()
    await expect(page).toHaveURL('/app-example')
    await expect(page.getByRole('heading', { name: 'App Router Pagination' })).toBeVisible()
  })
})
