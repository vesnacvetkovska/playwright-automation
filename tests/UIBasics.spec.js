const { test, expect } = require('@playwright/test');
 
 
 
 
test('UI Controls', async ({ page }) => {
   await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
   const userName = page.locator('#username');
   const signIn = page.locator('#signInBtn');
   const documentLink = page.locator("[href*='documents-request']");
   await userName.fill("rahulshettyacademy");
   await page.locator("[type='password']").type("Learning@830$3mK2");
   const dropdown = page.locator("select.form-control");
   await dropdown.selectOption("consult");
   await page.locator(".radiotextsty").last().click();
   await page.locator("#okayBtn").click(); 
   console.log( await page.locator(".radiotextsty").last().isChecked());
   await expect(page.locator(".radiotextsty").last()).toBeChecked();
   await page.locator("#terms").check();
   await expect(page.locator("#terms")).toBeChecked();
   await page.locator("#terms").uncheck();
   expect(await page.locator("#terms").isChecked()).toBeFalsy();
   await expect(documentLink).toHaveAttribute("class", "blinkingText");
   
  // await page.pause();
   //
   //await signIn.click();

 // expect(confirmMessage).toContain("Success!");
  // await expect(page).toHaveURL("https://rahulshettyacademy.com/angularpractice/shop");   
})
 
test('Child Windows handling', async ({ browser }) => 
   {
   const context = await browser.newContext();
   const page= await context.newPage();
   page.route("**/*.css", route => route.abort());
   const userName = page.locator('#username');
   await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
   const documentLink = page.locator("[href*='documents-request']");

   const [newPage]= await Promise.all(
   [
      context.waitForEvent("page"),
      documentLink.click(),
   ])

    const text = await newPage.locator(".red").textContent();
    const textArray = text.split("@");
    const domain = textArray[1].split(" ")[0];
   //console.log(domain);
   await page.locator("#username").fill(domain);
   console.log( await page.locator("#username").inputValue());


})
