const { test, expect } = require('@playwright/test')
test('Popup Validations', async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    // await page.goto("http://google.com");
    //await page.goBack();
    //await page.goForward();
    //await page.reload();

    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();
    await page.pause();
    //javascript events
    page.on("dialog", dialog => dialog.accept());
    await page.locator("#confirmbtn").click();

    //hover over mouse
    await page.locator('#mousehover').hover();
    await page.locator("text=Top").click();

    //frame handling

    const framesPage = page.frameLocator('#courses-iframe');
    await framesPage.locator("li a[href*='lifetime-access']:visible").click();
    const testCheck = await framesPage.locator(".text h2").textContent();
    console.log(testCheck.split(" ")[1]);


});
test('Screenshot & Visual comparison', async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#displayed-text").screenshot({ path: "element.png" });
    await page.locator("#hide-textbox").click();
    await page.screenshot({ path: "screenshot.png", fullPage: true });
    await expect(page.locator("#displayed-text")).toBeHidden();

});
//screenshot -> store-> screenshot -> compare
test('Visual testing', async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    expect(await page.screenshot()).toMatchSnapshot('landing.png');



});

