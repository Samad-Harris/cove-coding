import { test, expect, Page } from '@playwright/test';

/**
 * End-to-End coverage for the Room Reservation list
 *
 * What we verify:
 * 1. Page renders filter controls and a list of reservation cards
 * 2. Selecting a Room filters the list
 * 3. Selecting a Date + Room narrows the list further
 * 4. We show an empty-state message when no match is found
 * 5. Loading state is shown while fetching data
 * 6. Error state is shown when fetching fails
 *
 * Selectors come from the aria-labels we added in the components layer.
 */

/**
 * A small selectors map so we have one source of truth and descriptive names.
 */
const selectors = {
  dateInput: (page: Page) => page.getByPlaceholder('Select a date'),
  roomSelect: (page: Page) => page.getByLabel('Room selector'),
  loadingBanner: (page: Page) => page.getByText('Loading reservations…'),
  emptyBanner: (page: Page) => page.getByText('No reservations found for the chosen filters.'),
  errorBanner: (page: Page) => page.getByText('Failed to load reservations.'),
  retryBtn: (page: Page) => page.getByLabel('Retry loading reservations'),
  cards: (page: Page) => page.getByTestId('reservation-card'),
};

/**
 * Utility that waits until the backend data is loaded.
 */
async function waitForData(page: Page) {
  await selectors.loadingBanner(page).waitFor({ state: 'hidden', timeout: 10_000 });
}

// ---------------------------------------------------------------------------
// Test suite
// ---------------------------------------------------------------------------

test.describe('Reservations page (/)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await waitForData(page);
  });

  test('renders filter controls and at least one reservation card', async ({ page }) => {
    await expect(selectors.dateInput(page)).toBeVisible();
    await expect(selectors.roomSelect(page)).toBeVisible();
    await expect(selectors.cards(page)).not.toHaveCount(0);
  });

  test('filters by room correctly', async ({ page }) => {
    await selectors.roomSelect(page).selectOption({ label: 'Room A' });

    const filteredCards = selectors.cards(page);
    await expect(filteredCards).not.toHaveCount(0);
    // Get all text contents and verify each contains "Room A"
    const cardTexts = await filteredCards.allTextContents();
    expect(cardTexts.length).toBeGreaterThan(0);
    cardTexts.forEach(text => {
      expect(text).toContain('Room A');
    });
  });

  test('filters by date + room and shows empty state when no match', async ({ page }) => {
    await selectors.dateInput(page).fill('2022-06-05');
    await selectors.roomSelect(page).selectOption({ label: 'Room A' });

    await expect(selectors.emptyBanner(page)).toBeVisible();

    await selectors.roomSelect(page).selectOption({ label: 'Room B' });
    const cardList = selectors.cards(page);
    await expect(cardList).toHaveCount(1);
    await expect(cardList.first()).toContainText('Room B');
  });

  test('shows loading state while fetching data', async ({ page }) => {
    await page.reload({ waitUntil: 'domcontentloaded' }); // fresh navigation to see spinner
    await expect(selectors.loadingBanner(page)).toBeVisible();
    await waitForData(page);
    await expect(selectors.cards(page)).not.toHaveCount(0);
  });

  test('shows error state when fetching fails', async ({ page, context }) => {
    await context.route('**/reservations', route =>
      route.fulfill({ status: 500, body: 'Internal Server Error' })
    );

    await page.reload();
    await waitForData(page);

    await expect(selectors.errorBanner(page)).toBeVisible();
    await expect(selectors.retryBtn(page)).toBeVisible();
  });

  test.describe('Responsive layout', () => {
    // iPhone-12 dimensions for the whole describe
    test.use({ viewport: { width: 390, height: 844 } });

    test('cards render on a mobile viewport', async ({ page }) => {
      await page.reload();
      await waitForData(page);
      await expect(selectors.cards(page)).not.toHaveCount(0);
    });
  });
});