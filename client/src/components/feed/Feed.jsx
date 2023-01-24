import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import { useState,useEffect } from "react";
import { useSelector} from 'react-redux';
import apiInstance from '../../http';

export default function Feed({username}) {
  const [posts,setPosts] = useState([]);
  const {user} = useSelector((state) => state.auth);

  useEffect(()=>{
    const fetchPosts = async()=>{
      const res = username ? await apiInstance.get("post/profile/"+username):
      await apiInstance.get("post/timeline/"+user._id);
      setPosts(res.data.sort((p1,p2)=>{
        return new Date(p2.createdAt) - new Date(p1.createdAt);
      }));
    };
    fetchPosts();

  },[username,user._id]);

  return (
    <div className="feed">
      <div className="feedWrapper">
      {/* {(username === user.username) && <Share />} */}
      <Share/>
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
}
