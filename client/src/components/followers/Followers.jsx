import {Link} from "react-router-dom";
import storage from "../../api/firebase";
import {ref ,getDownloadURL} from "firebase/storage";
import {useEffect,useState} from 'react';

function Followers({user}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER
  const [Url, setUrl] = useState();

    useEffect(() => {
      const getProfilePicUrl = ()=>{
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
      getProfilePicUrl();
    }, [user]);
  return (
    <>
      <Link to={`/profile/${user.username}`} className="sidebarFriend" style={{textDecoration:"none",color:"black"}}>
        <img className="sidebarFriendImg" src={user.profilePicture?Url:PF+"avtar.png"} alt="" />
        <span  className="sidebarFriendName">{user.username}</span>
      </Link>
    </>
  )
}

export default Followers;