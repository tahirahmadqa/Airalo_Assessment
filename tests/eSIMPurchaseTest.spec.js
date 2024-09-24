const { test } = require('@playwright/test');
const AiraloPage = require('../page/AiraloPage');

test('Airalo eSIM Purchase Test - Playwright with POM', async ({ page }) => {
  const airaloPage = new AiraloPage(page);

  // Visit Airalo's homepage
  await airaloPage.visitHomepage();

  // Search for Japan
  await airaloPage.searchForJapan();

  // Select the first eSIM package (flexible for multiple options)
  await airaloPage.selectFirstESIMPackage();

  // Verify package details
  await airaloPage.verifyPackageDetails();
});