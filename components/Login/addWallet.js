require('dotenv').config(); // Load environment variables
const axios = require('axios');
const { MongoClient } = require('mongodb');
const readline = require('readline');

// Environment variables
const API_URL_WALLET = process.env.NEXT_PUBLIC_APU_URL_WALLET_CREATE;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
const CLIENT_SECRET = process.env.NEXT_PUBLIC_CLIENT_SECRET;
const MONGO_URI = process.env.MONGO_URI; // Add MongoDB URI to your .env file

// MongoDB client with timeout
const client = new MongoClient(MONGO_URI, { connectTimeoutMS: 10000 });

async function createWallet(user, retryCount = 0) {
    const maxRetries = 5; // Maximum number of retries
    const delay = 2000; // Delay in milliseconds between retries

    try {
        console.log('Creating new wallet for user...');

        // Construct the request body
        const requestBody = {
            name: user.username,
            email: user.email,
            ic: user.companyRegistrationNumber,
            phone: user.phone || null
        };

        const response = await axios.post(API_URL_WALLET, requestBody, {
            headers: {
                'client_id': CLIENT_ID,
                'client_secret': CLIENT_SECRET,
                'content-type': 'application/json'
            },
            timeout: 30000 // 30 seconds timeout
        });

        console.log('API Response:', response.data);

        const wallet = response.data.result.wallet;
        if (!wallet) {
            throw new Error('Wallet information is missing from the response.');
        }

        const walletId = wallet.wallet_id;
        if (!walletId) {
            throw new Error('Wallet ID is missing from the wallet object.');
        }

        await saveUserWallet(user, walletId, wallet.wallet_address); // Updated to include wallet address

        console.log('Wallet created and user details saved:', walletId);
    } catch (error) {
        if (error.response && error.response.status === 429 && retryCount < maxRetries) {
            console.warn('Rate limit exceeded. Retrying in ' + delay + 'ms...');
            await new Promise(resolve => setTimeout(resolve, delay));
            await createWallet(user, retryCount + 1);
        } else {
            console.error('Error creating wallet:', error.response ? error.response.data : error.message);
        }
    }
}

async function saveUserWallet(user, walletId, walletAddress) {
    try {
        await client.connect();
        const db = client.db('User_wallet');
        const collection = db.collection('user_wallets');

        const userWithWallet = {
            ...user,
            walletId,
            walletAddress // Include wallet address
        };

        await collection.insertOne(userWithWallet);
        console.log('User details saved to MongoDB');
    } catch (error) {
        console.error('Error saving user details:', error.message);
    } finally {
        await client.close();
    }
}

// Function to prompt user input
function promptUserInput(query) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise(resolve => rl.question(query, answer => {
        rl.close();
        resolve(answer);
    }));
}

async function main() {
    const user = {
        username: await promptUserInput('Enter username: '),
        email: await promptUserInput('Enter email: '),
        password: await promptUserInput('Enter password: '),
        companyRegistrationNumber: await promptUserInput('Enter company registration number: '),
        phone: await promptUserInput('Enter phone number (optional): ')
    };

    await createWallet(user);
}

main();
