import axios from "axios";
import { useRef, useState } from "react";

function ResetPasswordEmail() {
    const email = useRef();
    const [message, setmessage] = useState('');

    const handleClick = async (e) => {
        const user = {
            email: email.current.value,
        }
        e.preventDefault();
        try {
            const res = await axios.post(process.env.REACT_APP_API_URL + "auth/send-email-reset-password", user);
            setmessage(res.data);
        } catch (error) {
            console.log(error);
            setmessage(error);
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

                    <div className="right-content" style={{ marginTop: "80px" }}>
                        <div className="card">
                            <form onSubmit={handleClick}>
                                <div className="input-container">
                                    <input type="text" required ref={email} placeholder="Email" />
                                </div>

                                <div className="login-btn-container">
                                    <button className="login-btn" type="submit">Send Email</button>
                                </div>
                                {message === '' ? '' : <h3 style={{ marginLeft: "10px", color: "green" }}>{message}</h3>}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ResetPasswordEmail;