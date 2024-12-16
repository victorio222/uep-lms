import React, { useState } from 'react';
import './Login.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username === '' || password === '') {
            setError('Please fill in all fields');
            return;
        }
        console.log('Logging in:', { username, password });
        setUsername('');
        setPassword('');
        setError('');
    };

    return (
        <div className='login-container'>
            <div className='container'>
                <header className='login-header'>
                    <h1>admin panel</h1>
                    <p>Learning Management System - iLearn</p>
                </header>
                <form onSubmit={handleSubmit}>
                    {error && <p className='error'>{error}</p>}
                    <div className='form-input'>
                        <input
                            required
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder=" "
                        />
                        <label>Student number</label>
                        <i className="fa-solid fa-user"></i>
                    </div>
                    <div className='form-input'>
                        <input
                            required
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder=" "
                        />
                        <label>Password <i>(01/01/2024)</i></label>
                        <i className="fa-solid fa-key"></i>
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
