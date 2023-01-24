import {useState,useEffect} from 'react';
import "./navbar.css";
import { Link } from 'react-router-dom';
import NotificationImportantIcon from '@mui/icons-material/NotificationImportant';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import ChatIcon from '@mui/icons-material/Chat';
import { useSelector,useDispatch } from 'react-redux';
import { setAuth } from '../../store/authSlice';
import apiInstance from '../../http';
import storage from "../../api/firebase";
import {ref ,getDownloadURL} from "firebase/storage";

function Navbar() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [Url, setUrl] = useState();

  const Logout = async (e) => {
    e.preventDefault();
    try {
      let refresh_token = JSON.parse(localStorage.getItem("user")).refresh_token;
      const { data } = await apiInstance.post(process.env.REACT_APP_API_URL + "auth/logout", { refresh_token });
      localStorage.removeItem("user");
      dispatch(setAuth({ user: null }));
      return data;
    } catch (error) {
      console.log(error);
    }
  }

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
  }, [user])

  return (
    <>
      <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">facebook</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <SearchIcon className="searchIcon" />
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
        <Link to="/change-password" style={{textDecoration:"none",color:"white"}} className="topbarLink">ChangePassword</Link>
        <Link to="/" onClick={Logout} style={{textDecoration:"none",color:"white"}} className="topbarLink">Logout</Link>
        </div>
    
        <Link to={`/profile/${user.username}`}>
          <img
            src={
              user.profilePicture
                ? Url
                : PF + "avtar.png"
            }
            alt=""
            className="topbarImg"
          />
        </Link>
      </div>
    </div>
    </>
  )
}

export default Navbar;
