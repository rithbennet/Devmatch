require('dotenv').config(); // Load environment variables

const axios = require('axios');

const apiUrl = process.env.NEXT_PUBLIC_API_URL; 
const clientKey = process.env.NEXT_PUBLIC_CLIENT_ID;
const clientSecret = process.env.NEXT_PUBLIC_CLIENT_SECRET;

async function getSmartContracts() {
    try {
        console.log('Making API request...');
        console.log('API URL:', apiUrl);
        console.log('Client Key:', clientKey);
        console.log('Client Secret:', clientSecret);

        const response = await axios.get(apiUrl, {
            headers: {
                'client_id': clientKey,
                'client_secret': clientSecret,
                'content-type': 'application/json'
            }
        });

        // Process the response
        console.log('Status:', response.data.status);
        console.log('Smart Contracts:', response.data.result);
    } catch (error) {
        console.error('Error fetching smart contracts:', error.response ? error.response.data : error.message);
    }
}

getSmartContracts();
