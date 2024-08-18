import React, { useState } from 'react';
import axios from 'axios';

const RegisterUser = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [companyRegNumber, setCompanyRegNumber] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/register', {
                username,
                email,
                password,
                companyRegNumber
            });

            console.log('Registration successful:', response.data);
        } catch (error) {
            console.error('Error during registration:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Username:</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
            </div>
            <div>
                <label>Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div>
                <label>Company Registration Number:</label>
                <input type="text" value={companyRegNumber} onChange={(e) => setCompanyRegNumber(e.target.value)} required />
            </div>
            <button type="submit">Register</button>
        </form>
    );
};

export default RegisterUser;
