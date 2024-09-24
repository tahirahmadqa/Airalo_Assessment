// pages/AiraloPage.js
const { expect } = require('@playwright/test');

class AiraloPage {
  constructor(page) {
    this.page = page;
  }

  async visitHomepage() {
    await this.page.goto('https://www.airalo.com/');
  }

  async searchForJapan() {
    await this.page.fill('[data-testid="search-input"]', 'Japan');
    await this.page.click('[data-testid="Japan-name"]')
  }

  async selectFirstESIMPackage() {
    await this.page.locator('[data-testid="sim-package-item"]').first().click();
  }

  async verifyPackageDetails() {
    const packageDetails = await this.page.locator('[data-testid="sim-detail-header"]');
    await expect(packageDetails).toBeVisible();

    await expect(packageDetails).toContainText('Moshi Moshi', { selector: '[data-testid="sim-detail-operator-title"]' });
    await expect(packageDetails).toContainText('Japan', { selector: '[data-testid="COVERAGE-value"]' });
    await expect(packageDetails).toContainText('1 GB', { selector: '[data-testid="DATA-value"]' });
    await expect(packageDetails).toContainText('7 Days', { selector: '[data-testid="VALIDITY-value"]' });
    await expect(packageDetails).toContainText('$4.50', { selector: '[data-testid="PRICE-value"]' });
  }
}

module.exports = AiraloPage;