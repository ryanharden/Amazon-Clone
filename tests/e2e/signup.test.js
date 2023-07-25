const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  page.on('console', consoleObj => console.log(consoleObj.text()));
  await page.goto('http://localhost:3000/signup'); // Replace with the correct URL

  // Fill in the form
  await page.fill('#email-input', 'playtest3@gmail.com');
  await page.fill('#first-name-input', 'Test');
  await page.fill('#last-name-input', 'User');
  await page.fill('#password-input', 'password123');
  await page.fill('#confirm-password-input', 'password123');
  await page.click('#submit-button'); // simulate clicking the Submit button

  // Submit the form
//   await page.click('button[type="submit"]');

  // Wait for navigation to finish
  await Promise.all([
    page.click('#submit-button'), // The action that will trigger navigation
    page.waitForLoadState('networkidle') // Wait for the network to become idle
  ]);



  const url = await page.url(); // get the current url

  // Check if sign up was successful (by checking if url changed to home page, for example)
  if(url !== 'http://localhost:3000/') { // Replace with the correct URL
    console.error("Sign up failed");
  } else {
    console.log("Sign up Success")
  }

  await browser.close();
})();
