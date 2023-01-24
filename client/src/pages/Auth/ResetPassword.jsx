import { useRef, useState } from 'react';
import axios from "axios";
import { CircularProgress } from '@mui/material';

function ResetPassword() {
    const password = useRef();
    const confirm_password = useRef();
    const [message, setmessage] = useState('');

    const handleClick = async (e) => {
        e.preventDefault();
        setmessage("-")
        const user = {
            password: password.current.value,
            repeat_password: confirm_password.current.value,
        }
        try {
            const urlParams = new URLSearchParams(window.location.search);
            const token = urlParams.get('token');
            console.log(token);
            const res = await axios.post(process.env.REACT_APP_API_URL + `auth/get-reset-password?token=${token}`, user);
            setmessage(res.data);
        } catch (error) {
            console.log(error);
            setmessage("something went wrong!");
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
                                    <input type="password" required ref={password} placeholder="New Password" />
                                </div>
                                <div className="input-container">
                                    <input type="password" required ref={confirm_password} placeholder="Confirm New Password" />
                                </div>
                                <div className="login-btn-container">
                                    {message === '-' ? <button className="login-btn" type="submit"><CircularProgress /></button> : <button className="login-btn" type="submit">Reset Password</button>}
                                </div>
                                {message === '' ? '' : <h3 style={{ marginLeft: "80px", color: "green" }}>{message}</h3>}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ResetPassword;