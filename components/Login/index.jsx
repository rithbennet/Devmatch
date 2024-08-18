
import styles from "./styles.module.scss";
// UserForm.jsx
import React, { useState } from 'react';
import axios from 'axios'; // For sending HTTP requestsimport { Link } from 'react-router-dom';
import Link from 'next/link';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prepare data
        const userData = { username, password };

        try {
            // Send data to backend server
            await axios.post('/api/users', userData);
            // Clear the form or give feedback
            setUsername('');
            setPassword('');
            
            alert('User added successfully!');
        } catch (error) {
            console.error('Error adding user:', error);
            alert('Failed to add user.');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.loginConsole}>
                <div className={styles.inter_semiBold}>Login</div>
                <form onSubmit={handleSubmit}>
                    <div>
                        
                        <label className={styles.inter_regular}>Username<br></br></label>
                        <div className={styles.formContainer}>
                        <input className={styles.inter_regular2}
                            type="text" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                            required 
                        />
                        </div>
                    </div>
                    <div>
                        <label className={styles.inter_regular}>Password<br></br></label>
                        <div className={styles.formContainer}>
                        <input className={styles.inter_regular2}
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                        />
                        </div>
                    </div>
                    
                    
                    <button className={styles.submit} type="submit">
                            <div className={styles.submitText}>
                            Login
                            </div>
                        </button>
                     
                </form>

                <div className={styles.inter_regular}>
                    Don't have an account?
                    <Link href="/signup" className={styles.link}><
                    div>&nbsp;Sign Up!</div>
                    </Link>

                </div>

                
            </div>
        </div>
    );
};

export default Login;
=======
import { useState } from 'react';
import styles from './styles.module.scss';
import axios from 'axios';

export default function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [companyRegistrationNumber, setCompanyRegistrationNumber] = useState('');
    const [phone, setPhone] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userData = {
            username,
            email,
            password,
            companyRegistrationNumber,
            phone: phone || null
        };

        try {
            const response = await axios.post('./API/register', userData);
            alert(`Success: ${response.data.message}`);
        } catch (error) {
            alert(`Error: ${error.response ? error.response.data.message : error.message}`);
        }
    };

    return (
        <div className={styles.container}>
            <h1>Register</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
                {/* Form fields */}
                <div className={styles.formGroup}>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="companyRegistrationNumber">Company Registration Number:</label>
                    <input
                        type="text"
                        id="companyRegistrationNumber"
                        value={companyRegistrationNumber}
                        onChange={(e) => setCompanyRegistrationNumber(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="phone">Phone:</label>
                    <input
                        type="text"
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

