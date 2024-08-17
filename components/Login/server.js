import express from 'express';
import bodyParser from 'body-parser';
import { createWallet } from './addWallet';

const app = express();
const port = 3001; // or any other port you choose

app.use(bodyParser.json());

app.post('/api/register', async (req, res) => {
    try {
        const user = req.body;
        await createWallet(user);
        res.status(200).json({ message: 'Wallet created and user details saved successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create wallet or save user details.' });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
