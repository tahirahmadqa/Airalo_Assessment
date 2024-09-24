const { expect } = require('@playwright/test');
const getAccessToken = require('../page/auth');
class AiraloAPI {
  constructor(page) {
    this.page = page;
  }

  async getAccessToken(clientId, clientSecret) {
    // Call the function from step 1
    return getAccessToken(clientId, clientSecret);
  }

  async createOrder(accessToken, orderData) {
    const response = await this.page.request.post('/v2/orders', {
      data: orderData,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response;
  }

  async getESIMs(accessToken, params) {
    const url = new URL('https://sandbox-partners-api.airalo.com/v2/sims');
    url.searchParams.set('include', params.include);
    url.searchParams.set('limit', params.limit);

    const response = await this.page.request.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response;
  }
}

module.exports = AiraloAPI;