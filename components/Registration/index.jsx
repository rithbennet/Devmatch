import React, { useState } from 'react';
//import './Registration.css'; // Import the CSS file for styling

function Registration() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Replace this with actual registration logic
    console.log('User registered:', { username, email, password });
    alert('Registration successful!');
  };

  return (
    <div className="registration-container">
      <h2 className="header">Register</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label className="label">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input"
            required
          />
        </div>
        <div className="form-group">
          <label className="label">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
            required
          />
        </div>
        <div className="form-group">
          <label className="label">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            required
          />
        </div>
        <button type="submit" className="button">Register</button>
      </form>
    </div>
  );
}

export default Registration;
