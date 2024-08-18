require('dotenv').config(); // Load environment variables

const axios = require('axios');

const API_URL_WALLET = process.env.NEXT_PUBLIC_API_URL_WALLET; 
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
const CLIENT_SECRET = process.env.NEXT_PUBLIC_CLIENT_SECRET;

async function listWallets() {
    try {
        console.log('Making API request to list wallets...');
        console.log('API URL:', API_URL_WALLET);
        console.log('Client Key:', CLIENT_ID);
        console.log('Client Secret:', CLIENT_SECRET);

        const response = await axios.get(API_URL_WALLET, {
            headers: {
                'client_id': CLIENT_ID,
                'client_secret': CLIENT_SECRET,
                'content-type': 'application/json'
            }
        });

        // Process the response
        console.log('Status:', response.data.status);
        console.log('Wallets:', response.data.result);
    } catch (error) {
        console.error('Error fetching wallets:', error.response ? error.response.data : error.message);
    }
}

listWallets();
