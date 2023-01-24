import "./profile.css";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import apiInstance from '../../http';
import { useEffect,useState } from "react";
import { useParams } from "react-router";
import storage from "../../api/firebase";
import {ref ,getDownloadURL} from "firebase/storage";

function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({profilePicture:"",coverPicture:""});
  const username = useParams().username;
  const [Url, setUrl] = useState();
  const [coverPicUrl, setcoverPicUrl] = useState();
  
   useEffect(()=>{
    const fetchUser = async ()=>{
      const res = await apiInstance.get(`user?username=${username}`);
      setUser(res.data);
    };
    fetchUser();
  },[username]);

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

    const getCoverPicUrl = ()=>{
      if(user.coverPicture!==""){
        getDownloadURL(ref(storage, `gs://socialmedia-59503.appspot.com/items/${user.coverPicture}`))
        .then((url) => {
          setcoverPicUrl(url);
        })
        .catch((error) => {
          console.log(error)
        });
      }
    }
    getProfilePicUrl();
    getCoverPicUrl();
  }, [user]);
  
  return (
    <>
      <Navbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={user.coverPicture ? coverPicUrl : PF+"avtar.png"} 
                alt=""
              />
              <img
                className="profileUserImg"
                src={user.profilePicture ? Url : PF+"avtar.png"}
                alt=""
              />
            </div>
            <div className="profileInfo">
                <h4 className="profileInfoName">{username}</h4>
                <span className="profileInfoDesc">{user.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={username}/>
            {user._id===undefined?"":<Rightbar key={user._id} user={user}/>}
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
