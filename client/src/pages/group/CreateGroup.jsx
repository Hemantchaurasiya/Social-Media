import { useState,useRef } from 'react'
import apiInstance from '../../http';
import CachedIcon from '@mui/icons-material/Cached';
import Navbar from "../../components/navbar/Navbar";
import { useSelector} from 'react-redux';
import storage from "../../api/firebase";
import {ref,uploadBytes} from "firebase/storage";

function CreateGroup() {
    const [message, setmessage] = useState("");
    const {user} = useSelector((state) => state.auth);
    const [file,setFile] = useState(null);
    const name = useRef();
    const desc = useRef();

    const handleClick = async(e) => {
        setmessage("-");
        e.preventDefault();
        const newRoom = {
            userId:user._id,
            name:name.current.value,
            desc:desc.current.value
        }
        if (file) {
            const fileName = Date.now() + file.name;
            newRoom.photo = fileName;
            try {
              // file upload in firebase store
              const storageRef = ref(storage,`/items/${fileName}`);
              uploadBytes(storageRef, file).then((snapshot) => {
                console.log('Uploaded file!');
                window.location.reload();
            });
            } catch (err) {console.log(err)}
        }
        try {
            const { data } = await apiInstance.post("group",newRoom);
            setmessage(data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
        <Navbar/>
        <h2 style={{display:"flex",flex:"0.80",justifyContent:"center",marginTop:"50px"}}>Create New Group</h2>
        <div style={{display:"flex",flex:"0.80",justifyContent:"center",marginTop:"50px"}}>
            <form onSubmit={handleClick}>
                <span>Upload Group Photo : </span>
                <input type="file" id="file" accept=".png,.jpeg,.jpg" onChange={(e) => setFile(e.target.files[0])} />
                <div className="input-container">
                    <input type="text" required ref={name} placeholder="Room Name"/>
                </div>

                <div className="input-container">
                    <input type="text" required ref={desc} placeholder="Room Description"/>
                </div>
                
                <div className="login-btn-container">
                    {message === '-' ? <button className="login-btn" type="submit"><CachedIcon /></button> : <button className="login-btn" type="submit">Create Room</button>}
                </div>
                {message === '' ? '' : <h3 style={{ marginLeft: "80px", color: "green" }}>{message}</h3>}
            </form>
        </div>
        </>
    )
}

export default CreateGroup;
