const { test, expect } = require('@playwright/test');
require('dotenv').config();
const { getAuthToken, postOrder, getSimList } = require('../utils/apiUtils');

test.describe('Aitale Partner API Automation', () => {
    let token;

    const clientId = process.env.CLIENT_ID;
    const clientSecret = process.env.CLIENT_SECRET;
    const authUrl = process.env.AUTH_URL;
    const orderUrl = process.env.ORDER_URL;
    const simListUrl = process.env.SIM_LIST_URL;

    test.beforeAll('Get the Auth token', async () => {
        const { accessToken, response } = await getAuthToken(authUrl, clientId, clientSecret);
        expect(response.status).toBe(200);
        token = accessToken;
        expect(token).toBeDefined();
    });

    test('POST an order for 6 merhaba-7days 1gb eSIMs', async () => {
        const orderData = {
            quantity: 6,
            package_id: 'merhaba-7days-1gb',
            type: 'sim'
        };

        const { response, data } = await postOrder(orderUrl, token, orderData);
            
        // Assert the status code
        expect(response.status).toBe(200); // Check for 200 OK
            
        // Assert the response data
        expect(data).toBeDefined();
        expect(data.data.quantity).toBe(6);
        expect(data.data.package_id).toBe('merhaba-7days-1gb');
        expect(data.data.type).toBe('sim');
        expect(data.data.sims.length).toBe(6); 
    });

     // Fetch the list of SIMs and verify that it contains 6 eSIMs of the specific package
     test('GET list of SIMs and verify 6 eSIMs', async () => {
        const { response, data } = await getSimList(simListUrl, token);
        expect(response).toBeDefined();
        console.log('Response:', data);

    });
});
