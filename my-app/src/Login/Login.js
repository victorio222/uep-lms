import React, { useState } from 'react';
import './Login.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    async function login(username, password) {
        try {
            const response = await fetch('http://localhost:8080/users/login',{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({username, password}),
            });

            const role = await response.text();

            console.log("Role get: ", role);

            return role;      
        } catch(error){
            console.error('Error logging in', error)
            throw error;
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const role = await login(username, password);
            console.log("Login as:", role);

            if (role.match("student")) {
                alert("Welcome, Student!");
                navigate('/calendar');
            } else if (role.match("admin")) {
                alert("Welcome, Admin!");
                navigate('/messages');
            } else if (role.match("teacher")){
                alert("Welcome, Teacher!");
                navigate('/dashboard');
            }
            
        } catch(error){
            console.error("Error happened", error)
        }

        console.log('Logging in:', { username, password });
        setUsername('');
        setPassword('');
        setError('');
    };

    
    return (
        <div className='login-container'>
            <div className='container'>
                <header className='login-header text-center'>
                    <h1>LOGIN</h1>
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
