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
