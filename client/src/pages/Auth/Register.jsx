import { useRef, useState } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import "./style.css";
import { CircularProgress } from '@mui/material';

function Register() {
    const history = useHistory();
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const confirm_password = useRef();

    const [message, setmessage] = useState('');

    const handleClick = async (e) => {
        e.preventDefault();
        setmessage("-");
        if (password.current.value === confirm_password.current.value) {
            const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value,
                confirm_password: confirm_password.current.value,
            }
            try {
                const res = await axios.post(process.env.REACT_APP_API_URL + "auth/register", user);
                setmessage(res.data);
                history.push('/');
            } catch (error) {
                console.log(error);
                setmessage("something went wrong!");
            }
        } else {
            setmessage("password not match!");
        }
    }

    return (
        <>
            <div className="container">
                <div className="content">
                    <div className="left-content">
                        <div className="f-logo">
                            <h1 style={{ color: "blue", fontSize: "50px" }}>Social Network</h1>
                        </div>
                        <h2 className="f-quote">Social Network helps you connect and share with the people in your life.</h2>
                    </div>

                    <div className="right-content">
                        <div className="card">
                            <form onSubmit={handleClick}>
                                <div className="input-container">
                                    <input type="text" required ref={username} placeholder="Username" />
                                </div>

                                <div className="input-container">
                                    <input type="text" required ref={email} placeholder="Email address" />
                                </div>
                                <div className="input-container">
                                    <input type="password" required ref={password} placeholder="Password" />
                                </div>
                                <div className="input-container">
                                    <input type="password" required ref={confirm_password} placeholder="Confirm Password" />
                                </div>
                                <div className="login-btn-container">
                                    {message === '-' ? <button className="login-btn" type="submit"><CircularProgress /></button> : <button className="login-btn" type="submit">Register</button>}
                                </div>
                                {message === '' ? '' : <h3 style={{ marginLeft: "80px", color: "red" }}>{message}</h3>}
                            </form>

                            <div className="divider"></div>

                            <div className="create-new-account" style={{ textAlign: "center" }} >
                                <Link className="crt-new-ac" to="/login">Go to Login</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register;
