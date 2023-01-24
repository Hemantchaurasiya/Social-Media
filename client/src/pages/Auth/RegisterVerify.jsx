import React, { useState, useEffect } from 'react';
import axios from 'axios';

function RegisterVerify() {
    const [message, setmessage] = useState('wait few second...');

    useEffect(() => {
        const registerVerify = async () => {
            try {
                const urlParams = new URLSearchParams(window.location.search);
                const token = urlParams.get('token');
                const { data } = await axios.get(process.env.REACT_APP_API_URL + `auth/verify-email?token=${token}`);
                setmessage(data);
            } catch (error) {
                console.log(error);
                setmessage(error);
            }
        }
        registerVerify();
    }, []);

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

                    <div className="right-content" style={{ marginTop: "130px", color: "green" }}>
                        <div className="card">
                            <h1>{message}</h1>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RegisterVerify;
