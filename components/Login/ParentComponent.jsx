import React, { useState } from 'react';
import Index from './index';
import AddWallet from './addWallet';

const ParentComponent = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');

    const handleCreateWallet = () => {
        // Logic to create a wallet using username and email
        // This can be a function that calls a method in addWallet.js
    };

    return (
        <div>
            <Index 
                username={username} 
                setUsername={setUsername} 
                email={email} 
                setEmail={setEmail} 
                handleCreateWallet={handleCreateWallet}
            />
            <AddWallet username={username} email={email} />
        </div>
    );
};

export default ParentComponent;