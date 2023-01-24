import { useRef,useState} from 'react';
import axios from 'axios';
import { setAuth } from '../../store/authSlice';
import { useDispatch } from 'react-redux';
import {Link,useHistory} from "react-router-dom";
import { CircularProgress } from '@mui/material';

function Login() {
    const email = useRef();
    const password = useRef();
    const [message, setmessage] = useState('');
    const dispatch = useDispatch();
    const history = useHistory();

    const handleClick = async(e)=>{
        setmessage("-");
        e.preventDefault();
        const user = {
            email:email.current.value,
            password:password.current.value,
        }
        try {
            const {data} = await axios.post(process.env.REACT_APP_API_URL+"auth/login",user);
            const access_token = data.access_token;
            const refresh_token = data.refresh_token;
            const userData = data.userData;
            dispatch(setAuth({user:userData}));
            localStorage.setItem("user", JSON.stringify({userData,access_token,refresh_token}));
            history.push('/');
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
                            <h1 style={{color:"blue",fontSize:"50px"}}>Social Network</h1>
                        </div>
                        <h2 className="f-quote">Social Network helps you connect and share with the people in your life.</h2>
                    </div>

                    <div className="right-content">
                        <div className="card">
                            <form onSubmit={handleClick}>
                                <div className="input-container">
                                    <input type="text" required ref={email} placeholder="Email address" />
                                </div>
                                <div className="input-container">
                                    <input type="password" required ref={password} placeholder="Password" />
                                </div>
                                <div className="login-btn-container">
                                    {message ==='-' ?<button className="login-btn" type="submit"><CircularProgress/></button>: <button className="login-btn" type="submit">Log In</button> }
                                </div>
                                {message===''?'':<h3 style={{marginLeft:"80px" ,color:"red"}}>{message}</h3>}
                            </form>

                            <div className="forgotten-password">
                                <Link to="/reset-password-email">Forgotten Password?</Link>
                            </div>

                            <div className="divider"></div>

                            <div className="create-new-account" style={{textAlign:"center"}} >
                                <Link className="crt-new-ac" to="/register">Create New Account</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;
