import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Register.css";
import NavB from '../components/NavB';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('https://innercalm-network-server.onrender.com/registeruser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, phone, password, cpassword }),
            });

            const data = await response.json();

            if (response.ok) {
                // Registration successful
                console.log(data.message);
                navigate('/login'); // Redirect to login page after successful registration
            } else {
                // Registration failed
                setError(data.error);
            }
        } catch (err) {
            console.log(err);
            setError('Failed to register');
        }
    };

    const handleLoginLink = () => {
        navigate('/login');
    };

    return (
        <>
            <NavB />
            <div className="register-page">
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleRegister}>
                    <h2>Register</h2>
                    <label>
                        Name:
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                    </label>
                    <label>
                        Email:
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </label>
                    <label>
                        Phone:
                        <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                    </label>
                    <label>
                        Password:
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </label>
                    <label>
                        Confirm Password:
                        <input type="password" value={cpassword} onChange={(e) => setCPassword(e.target.value)} required />
                    </label>
                    <button type="submit">Register</button>
                </form>
                <p className='userloginlogin'>Already a user? <span onClick={handleLoginLink}>Log in</span></p>
            </div>
        </>
    );
};

export default Register;
