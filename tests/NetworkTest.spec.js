const { test, expect, request } = require('@playwright/test');
const { APiUtils } = require('../utils/APiUtils');
const loginPayLoad = { userEmail: "anshika@gmail.com", userPassword: "Iamking@000" };
const orderPayLoad = { orders: [{ country: "India", productOrderedId: "6960eae1c941646b7a8b3ed3" }] };
const fakePayLoadOrders = { data: [], message: "No Orders" };


let response;
test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const apiUtils = new APiUtils(apiContext, loginPayLoad);
    response = await apiUtils.createOrder(orderPayLoad);

})


//create order is success
test('Place the order', async ({ page }) => {
    await page.addInitScript(value => {

        window.localStorage.setItem('token', value);
    }, response.token);
    await page.goto("https://rahulshettyacademy.com/client");
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*", async route => {
        //intercepting the response - API response -> faceresponse -> send to the browser -> render the data on UI
        const response = await page.request.fetch(route.request());
        let body = JSON.stringify(fakePayLoadOrders);

        route.fulfill(
            {
                response,
                body,

            }
        )
    }
    );


    await page.locator("button[routerlink*='myorders']").click();
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");
    console.log(await page.locator(".mt-4  ").textContent());



});

