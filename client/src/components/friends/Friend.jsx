import {useEffect,useState} from 'react';
import storage from "../../api/firebase";
import {ref ,getDownloadURL} from "firebase/storage";
import {Link} from "react-router-dom";

function Friend({friend}) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [Url, setUrl] = useState();
    useEffect(() => {
      const getProfilePicUrl = ()=>{
        if(friend.profilePicture!==""){
          getDownloadURL(ref(storage, `gs://socialmedia-59503.appspot.com/items/${friend.profilePicture}`))
          .then((url) => {
            setUrl(url);
          })
          .catch((error) => {
            console.log(error)
          });
        }
      }
      getProfilePicUrl();
    }, [friend])
    return (
      <>
        <Link key={friend._id} to={`/profile/${friend.username}`} style={{ textDecoration: "none" }}>
              <div className="rightbarFollowing">
                <img src={friend.profilePicture? Url: PF + "avtar.png"} alt="" className="rightbarFollowingImg"/>
                <span className="rightbarFollowingName" style={{marginLeft:"30px"}}>{friend.username}</span>
              </div>
        </Link>
        </>
    )
}

export default Friend;
