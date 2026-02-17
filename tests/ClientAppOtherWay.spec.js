const { test, expect } = require('@playwright/test');
 
 
 
 
test('@Web Client App login', async ({ page }) => {
   //js file- Login js, DashboardPage
   const email = "anshika@gmail.com";
   const productName = 'ZARA COAT 3';
   const products = page.locator(".card-body");
   await page.goto("https://rahulshettyacademy.com/client");
   await page.getByPlaceholder("email@example.com").fill(email);
   await page.getByPlaceholder("enter your passsword").fill("Iamking@000");
   await page.getByRole("button", { name: "Login" }).click();
   await page.waitForLoadState('networkidle'); //not recomendetd
   await page.locator(".card-body b").first().waitFor();
  

   //Zara Coat 3
   // add to cart
   await page.locator(".card-body").filter({ hasText: productName }).getByRole("button", { name: "Add To Cart" }).click();
 
   await page.getByRole("listitem").getByRole("button", { name: "Cart" }).click();
   await page.locator("[routerlink*='cart']").click();

await page.locator("div li").first().waitFor();
await expect(page.getByText(productName)).toBeVisible();


await page.getByRole("button", { name: "Checkout" }).click();
await page.getByPlaceholder("Select Country").type("ind", { delay: 100 });
await page.getByRole("button", { name: " India" }).nth(1).click();



await expect (page.locator(".user__name [type='text']").first()).toHaveText(email);
await page.getByText("PLACE ORDER").click();

await expect(page.locator(".hero-primary")).toBeVisible();

})


