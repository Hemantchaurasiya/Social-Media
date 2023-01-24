import "./share.css";
import CancelIcon from '@mui/icons-material/Cancel';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import RoomIcon from '@mui/icons-material/Room';
import LabelIcon from '@mui/icons-material/Label';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import apiInstance from "../../http";
import { useSelector} from 'react-redux';
import { useEffect,useState,useRef } from "react";
import storage from "../../api/firebase";
import { ref ,uploadBytes,getDownloadURL} from "firebase/storage";

export default function Share() {
  const {user} = useSelector((state) => state.auth);
  const desc = useRef();
  const [file,setFile] = useState(null);
  const [Url, setUrl] = useState();
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  
  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };
    if (file) {
      const fileName = Date.now() + file.name;
      newPost.img = fileName;
      try {
        // file upload in firebase store
        const storageRef = ref(storage,`/items/${fileName}`);
        uploadBytes(storageRef, file).then((snapshot) => {
          window.location.reload();
        });
      } catch (err) {console.log(err)}
    }
    try {
      await apiInstance.post("post", newPost);
    } catch (err) {}
  };

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
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            className="shareProfileImg"
            src={
              user.profilePicture
                ? Url
                : PF + "avtar.png"
            }
            alt=""
          />
          <input
            placeholder={"What's in your mind " + user.username + " ?"}
            className="shareInput"
            ref={desc}
          />
        </div>
        <hr className="shareHr" />
        {file && (
          <div className="shareImgContainer">
            <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
            <CancelIcon className="shareCancelImg" onClick={() => setFile(null)} />
          </div>
        )}
        <form className="shareBottom" onSubmit={submitHandler}>
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <PermMediaIcon htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Photo or Video</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
            <div className="shareOption">
              <LabelIcon htmlColor="blue" className="shareIcon" />
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <RoomIcon htmlColor="green" className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotionsIcon htmlColor="goldenrod" className="shareIcon" />
              <span className="shareOptionText">Feelings</span>
            </div>
          </div>
          <button className="shareButton" type="submit">
            Share
          </button>
        </form>
      </div>
    </div>
  );
}
