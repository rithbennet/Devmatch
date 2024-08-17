import React, { useState } from 'react';
//import './Registration.css'; // Import the CSS file for styling

function Registration() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      
      try {
        const response = await fetch('API/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, email, password }),
        });
        const data = await response.json();
        
        if (response.ok) {
          setSuccess(data.message);
          setError(null);
        } else {
          setSuccess(null);
          setError(data.error);
        }
      } catch (err) {
        setError('Something went wrong');
        setSuccess(null);
      }
    };

 // Inline styles
 const styles = {
    registrationContainer: {
      width: '100%',
      maxWidth: '400px',
      margin: '0 auto',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    },
    header: {
      textAlign: 'center',
      marginBottom: '20px',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
    },
    formGroup: {
      marginBottom: '15px',
    },
    label: {
      display: 'block',
      marginBottom: '5px',
      fontWeight: 'bold',
    },
    input: {
      width: '100%',
      padding: '10px',
      borderRadius: '4px',
      border: '1px solid #ddd',
    },
    button: {
      padding: '10px',
      borderRadius: '4px',
      border: 'none',
      backgroundColor: '#0070f3',
      color: '#fff',
      fontSize: '16px',
      cursor: 'pointer',
    },
    buttonDisabled: {
      backgroundColor: '#ccc',
      cursor: 'not-allowed',
    },
    success: {
      color: 'green',
      textAlign: 'center',
    },
    error: {
      color: 'red',
      textAlign: 'center',
    },
  };

  return (
    <div style={styles.registrationContainer}>
      <h2 style={styles.header}>Register</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />
        </div>
        <button type="submit" style={styles.button}>Register</button>
        {success && <p style={styles.success}>{success}</p>}
        {error && <p style={styles.error}>{error}</p>}
      </form>
    </div>
  );

}

export default Registration;
