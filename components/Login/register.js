import { createWallet } from '../../path/to/addWallet'; // Adjust the path to your addWallet.js

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const user = req.body;

        try {
            await createWallet(user);
            res.status(200).json({ message: 'User registered and wallet created successfully.' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
