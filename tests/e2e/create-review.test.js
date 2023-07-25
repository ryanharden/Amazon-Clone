const { chromium } = require('playwright');

let browser;
let page;

beforeAll(async () => {
  browser = await chromium.launch();
});

afterAll(async () => {
  await browser.close();
});

beforeEach(async () => {
  page = await browser.newPage();
});

afterEach(async () => {
  await page.close();
});

describe('Product Review Creation', () => {
  it('Should create a new product review', async () => {
    await page.goto('http://localhost:3000/products/1');  // Update with your website's URL

    // Assuming a login is necessary
    await page.fill('#username-input', '');
    await page.fill('#password-input', 'test-password');
    await page.click('#login-button');

    // Navigate to the product page
    await page.click(`#product-${productId}`);  // Update 'productId' with the actual id or path

    // Fill the review form
    await page.fill('#review-rating', '5');
    await page.fill('#review-headline', 'Great product!');
    await page.fill('#review-body', 'I had an amazing experience with this product.');

    // Submit the review form
    await page.click('#submit-review-button');

    // Assert the review was created successfully
    await page.waitForResponse(response => {
      return response.url() === `http://localhost:3000/products/${productId}/reviews` && response.status() === 200;
    });

    const reviews = await page.$eval('#reviews-list', reviewsContainer => {
      return Array.from(reviewsContainer.children, review => review.textContent);
    });

    expect(reviews).toContain('Great product!');
  });
});
