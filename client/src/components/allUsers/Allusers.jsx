import "./allUsers.css";
import {useEffect,useState} from 'react';
import storage from "../../api/firebase";
import {ref ,getDownloadURL} from "firebase/storage";
import {Link} from "react-router-dom";

function Allusers({ user }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [Url, setUrl] = useState();
    
    useEffect(() => {
        const getPictureUrl = ()=>{
            if(user.profilePicture!==""){
                getDownloadURL(ref(storage, `gs://socialmedia-59503.appspot.com/items/${user.profilePicture}`))
                .then((url) => {
                  setUrl(url);
                })
                .catch((error) => {
                  console.log(error)
                });
            }
        }
        getPictureUrl();
      }, [user]);
    return (
        <>
        <Link to={`/profile/${user.username}`} style={{textDecoration:"none",color:"black"}} className="sidebarFriend">
            <img className="sidebarFriendImg" src={user.profilePicture ? Url : PF + "avtar.png"} alt="" />
            <span className="sidebarFriendName">{user.username}</span>
        </Link>
        </>
    );
}

export default Allusers;