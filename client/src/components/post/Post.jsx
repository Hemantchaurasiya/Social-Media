import "./post.css";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { format } from "timeago.js";
import { useState, useEffect,useRef } from "react";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import apiInstance from '../../http';
import storage from "../../api/firebase";
import {ref ,getDownloadURL} from "firebase/storage";

export default function Post({ post }) {
  const [like, setLike] = useState(post.likes.length)
  const [isLiked, setIsLiked] = useState(false)
  const [user, setUser] = useState({});
  const { user: currentUser } = useSelector((state) => state.auth);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [Url, setUrl] = useState();
  const [ProfilePicUrl, setProfilePicUrl] = useState();
  const comment = useRef();

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes])

  useEffect(() => {
    const fetchUser = async () => {
      const res = await apiInstance.get(`user?userId=${post.userId}`);
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);

  useEffect(() => {
    getDownloadURL(ref(storage, `gs://socialmedia-59503.appspot.com/items/${post.img}`))
        .then((url) => {
          setUrl(url);
        })
        .catch((error) => {
          console.log(error)
        });
  }, [post.img]);

  useEffect(() => {
    const getProfilePicUrl = ()=>{
      if(user.profilePicture!=="" && user.profilePicture!==undefined){
        getDownloadURL(ref(storage, `gs://socialmedia-59503.appspot.com/items/${user.profilePicture}`))
        .then((url) => {
          setProfilePicUrl(url);
        })
        .catch((error) => {
          console.log(error)
        });
      }
    }
    getProfilePicUrl();
  }, [user])

  const likeHandler = () => {
    try {
      apiInstance.put("post/" + post._id + "/like", { userId: currentUser._id });

    } catch (error) {
      console.log(error);
    }
    setLike(isLiked ? like - 1 : like + 1)
    setIsLiked(!isLiked)
  }

  const commentHandle = async(e)=>{
    e.preventDefault();
    const newcomment = {
      postId:post._id,
      username:currentUser.username,
      desc:comment.current.value,
    }
    try {
      const {data} = await apiInstance.post("post/comment",newcomment);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${user.username}`}>
              <img
                className="postProfileImg"
                src={user.profilePicture ? ProfilePicUrl : PF + "avtar.png"}
                alt=""
              />
            </Link>
            <span className="postUsername">
              {user.username}
            </span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVertIcon />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img className="postImg" src={Url} alt="img" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img className="likeIcon" src={`${PF}like.png`} onClick={likeHandler} alt="" />
            <img className="likeIcon" src={`${PF}heart.png`} onClick={likeHandler} alt="" />
            <span className="postLikeCounter">{like}</span>
          </div>
          <button>View All Comments</button>
          <div className="postBottomRight">
            <form onSubmit={commentHandle}>
            <input className="postcommnetInput" ref={comment} type="text" placeholder="write comment" />
            <button type="submit" className="postCommentbtn"> comment</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
