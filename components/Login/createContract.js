require('dotenv').config(); // Load environment variables
const axios = require('axios');
const { MongoClient } = require('mongodb');
const readline = require('readline');

// Environment variables
const MASCHAIN_API_URL_CREATE_SMART = process.env.MASCHAIN_API_URL_CREATE_SMART;
const MASCHAIN_CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
const MASCHAIN_CLIENT_SECRET = process.env.NEXT_PUBLIC_CLIENT_SECRET;
const MONGO_URI = process.env.MONGO_URI;

// MongoDB client
const client = new MongoClient(MONGO_URI, { connectTimeoutMS: 10000 });

/**
 * Fetches the list of usernames and their wallet addresses from MongoDB.
 * @returns {Promise<Array>} - List of users with their usernames and wallet addresses.
 */
async function fetchUserWallets() {
    try {
        await client.connect();
        const db = client.db('User_wallet');
        const collection = db.collection('user_wallets');

        const users = await collection.find({}, { projection: { username: 1, walletAddress: 1 } }).toArray();
        return users;
    } catch (error) {
        console.error('Error fetching user wallets:', error.message);
        throw error;
    } finally {
        await client.close();
    }
}

/**
 * Prompts the user for input in the command line.
 * @param {string} query - The question to ask the user.
 * @returns {Promise<string>} - The user's response.
 */
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

/**
 * Displays a list of users and prompts for the user to select one.
 * @param {Array} users - List of users to display.
 * @returns {Promise<Object>} - The selected user with wallet address.
 */
async function selectUser(users) {
    if (users.length === 0) {
        throw new Error('No users found.');
    }

    console.log('Available users:');
    users.forEach((user, index) => {
        console.log(`${index + 1}. ${user.username} (Wallet Address: ${user.walletAddress})`);
    });

    const choice = parseInt(await promptUserInput('Select a user by number: '), 10);
    if (isNaN(choice) || choice < 1 || choice > users.length) {
        throw new Error('Invalid choice.');
    }

    return users[choice - 1];
}

/**
 * Creates a smart contract using MasChain's API.
 * @param {Object} contractDetails - Details of the contract to be created.
 * @param {number} [retryCount=0] - Number of retry attempts.
 */
async function createContract(contractDetails, retryCount = 0) {
    const maxRetries = 5; // Maximum number of retries
    const delay = 2000; // Delay in milliseconds between retries

    try {
        console.log('Creating new contract...');

        // Debugging: Log the contract details being sent
        console.log('Contract Details being sent to API:', JSON.stringify(contractDetails, null, 2));

        const response = await axios.post(MASCHAIN_API_URL_CREATE_SMART, contractDetails, {
            headers: {
                'client_id': MASCHAIN_CLIENT_ID,
                'client_secret': MASCHAIN_CLIENT_SECRET,
                'content-type': 'application/json'
            },
            timeout: 30000 // 30 seconds timeout
        });

        console.log('API Response:', response.data);

        const contract = response.data.result.contract;
        if (!contract) {
            throw new Error('Contract information is missing from the response.');
        }

        const contractId = contract.contract_id;
        if (!contractId) {
            throw new Error('Contract ID is missing from the contract object.');
        }

        await saveContractDetails(contractDetails, contractId);

        console.log('Contract created and details saved:', contractId);
    } catch (error) {
        if (error.response) {
            console.error('Error response data:', error.response.data); // Print the full error response
            if (error.response.status === 429 && retryCount < maxRetries) {
                console.warn('Rate limit exceeded. Retrying in ' + delay + 'ms...');
                await new Promise(resolve => setTimeout(resolve, delay));
                await createContract(contractDetails, retryCount + 1);
            } else {
                console.error('Error creating contract:', error.response.data);
            }
        } else {
            console.error('Error creating contract:', error.message);
        }
    }
}


/**
 * Saves the contract details to MongoDB.
 * @param {Object} contractDetails - Details of the contract to be saved.
 * @param {string} contractId - ID of the created contract.
 */
async function saveContractDetails(contractDetails, contractId) {
    try {
        await client.connect();
        const db = client.db('ContractDatabase');
        const collection = db.collection('contracts');

        const contractWithId = {
            ...contractDetails,
            contractId
        };

        await collection.insertOne(contractWithId);
        console.log('Contract details saved to MongoDB');
    } catch (error) {
        console.error('Error saving contract details:', error.message);
    } finally {
        await client.close();
    }
}

/**
 * Main function to run the contract creation process.
 */
async function main() {
    try {
        const users = await fetchUserWallets();
        const selectedUser = await selectUser(users);

        console.log('Selected User:', selectedUser);

        const contractDetails = {
            contractName: await promptUserInput('Enter contract name: '),
            businessType: await promptUserInput('Enter business type: '),
            registrationNumber: await promptUserInput('Enter registration number: '),
            validityPeriod: await promptUserInput('Enter validity period: '),
            additionalDetails: await promptUserInput('Enter additional details (optional): '),
            walletAddress: selectedUser.walletAddress // Use wallet address of the selected user
        };

        // Debugging: Log the final contract details before sending
        console.log('Final Contract Details:', JSON.stringify(contractDetails, null, 2));

        await createContract(contractDetails);
    } catch (error) {
        console.error('Error in the contract creation process:', error.message);
    }
}


main();

module.exports = { createContract };
