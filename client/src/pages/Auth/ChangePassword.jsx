import { useRef ,useState} from 'react';
import { useSelector} from 'react-redux';
import apiInstance from '../../http';

function ChangePassword() {
    const old_password = useRef();
    const password = useRef();
    const confirm_password = useRef();

    const [message, setmessage] = useState('');

    const {user} = useSelector((state) => state.auth);
    
    const handleClick = async(e)=>{
        e.preventDefault();
        const userData = {
            old_password:old_password.current.value,
            new_password:password.current.value,
            confirm_new_password:confirm_password.current.value
        }
        try {
            const res = await apiInstance.post(`auth/change-password/${user._id}`,userData);
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
                        <h1 style={{color:"blue",fontSize:"50px"}}>Social Network</h1>
                        </div>
                        <h2 className="f-quote">Social Network helps you connect and share with the people in your life.</h2>
                    </div>

                    <div className="right-content">
                        <div className="card">
                            <form onSubmit={handleClick}>
                                <div className="input-container">
                                    <input type="password" required ref={old_password} placeholder="Old Password" />
                                </div>
                                <div className="input-container">
                                    <input type="password" required ref={password} placeholder="New Password" />
                                </div>
                                <div className="input-container">
                                    <input type="password" required ref={confirm_password} placeholder="Confirm New Password" />
                                </div>
                                <div className="login-btn-container">
                                    <button class="login-btn" type="submit">Change Password</button>
                                </div>
                                {message===''?'':<p>{message}</p>}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChangePassword;
