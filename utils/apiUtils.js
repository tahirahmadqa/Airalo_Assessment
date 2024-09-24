const axios = require('axios');

// Helper function to get the auth token using Axios
const getAuthToken = async (authUrl, clientId, clientSecret) => {
    try {
        const response = await axios.post(authUrl, new URLSearchParams({
            'client_id': clientId,
            'client_secret': clientSecret,
            'grant_type': 'client_credentials'
        }), {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        return { accessToken: response.data.data.access_token, response }; // Return both access token and response
    } catch (error) {
        console.error('Error fetching token:', error);
        throw new Error('Authentication Failed');
    }
};


// Function to post an order
const postOrder = async (orderUrl, token, orderData) => {
    try {
        const response = await axios.post(orderUrl, orderData, {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        return { response, data: response.data }; 
    } catch (error) {
        console.error('Error posting order:', error);
        throw new Error('Order Posting Failed');
    }
};


// Helper function to get the SIM list
// Function to fetch the list of SIMs
const getSimList = async (simListUrl, token) => {
    try {
        const response = await axios.get(simListUrl, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json'
            }
        });
        return { response, data: response.data }; 
    } catch (error) {
        console.error('Error fetching SIM list:', error);
        throw new Error('SIM List Fetch Failed');
    }
};

module.exports = {
    getAuthToken,
    postOrder,
    getSimList
};
