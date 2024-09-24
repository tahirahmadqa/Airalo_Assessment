const fetch = require('node-fetch');

async function getAccessToken(clientId, clientSecret) {
  const url = 'https://sandbox-partners-api.airalo.com/v2/token';
  const body = {
    client_id: clientId,
    client_secret: clientSecret,
    grant_type: 'client_credentials',
  };

  const response = await fetch(url, {
    method: 'POST',
    headers:   
 {
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body:   
 new URLSearchParams(body),
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch access token: ${await response.text()}`);
  }

  const data = await response.json();
  return data.access_token;
}