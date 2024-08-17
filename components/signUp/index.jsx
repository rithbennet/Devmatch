import React, { useState } from 'react';
import styles from './styles.module.scss';

export default function Signup() {
    // State to manage the form fields and messages
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        companyRegistrationNumber: '',
        phoneNumber: '',
    });
    const [successMessage, setSuccessMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        
        const { username, email, password, companyRegistrationNumber, phoneNumber } = formData;

        if (!username || !email || !password || !companyRegistrationNumber || !phoneNumber) {
            setErrorMessage(true);
            setSuccessMessage(false);
        } else {
            setErrorMessage(false);
            setSuccessMessage(true);

            // Clear form fields after a delay
            setTimeout(() => {
                setFormData({
                    username: '',
                    email: '',
                    password: '',
                    companyRegistrationNumber: '',
                    phoneNumber: '',
                });
            }, 2000);
        }

        // Hide messages after 4 seconds
        setTimeout(() => {
            setErrorMessage(false);
            setSuccessMessage(false);
        }, 4000);
    };

    return (
        <div className={styles.container}>
            <div className={styles.loginConsole}>
                <div className={styles.inter_semiBold}>Sign Up Now!</div>
            
                <form onSubmit={handleSubmit}>
                    <div>
                        <label className={styles.inter_regular}>Username<br /></label>
                        <div className={styles.formContainer}>
                            <input
                                className={styles.inter_regular2}
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label className={styles.inter_regular}>Email<br /></label>
                        <div className={styles.formContainer}>
                            <input
                                className={styles.inter_regular2}
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label className={styles.inter_regular}>Password<br /></label>
                        <div className={styles.formContainer}>
                            <input
                                className={styles.inter_regular2}
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label className={styles.inter_regular}>Company Registration Number<br /></label>
                        <div className={styles.formContainer}>
                            <input
                                className={styles.inter_regular2}
                                type="number"
                                name="companyRegistrationNumber"
                                value={formData.companyRegistrationNumber}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label className={styles.inter_regular}>Phone Number<br /></label>
                        <div className={styles.formContainer}>
                            <input
                                className={styles.inter_regular2}
                                type="tel"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>
                    
                    <button className={styles.submit} type="submit">
                        <div className={styles.overlay}>
                            <div className={styles.submitText}>Sign Up!</div>
                        </div>
                    </button>
                </form>

                {successMessage && (
                    <div className={styles.successMessage}>Form submitted successfully!</div>
                )}
                {errorMessage && (
                    <div className={styles.errorMessage}>Please fill out all fields!</div>
                )}
            </div>
        </div>
    );
}
