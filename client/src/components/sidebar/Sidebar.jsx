import "./sidebar.css";
import HomeIcon from '@mui/icons-material/Home';
import ChatIcon from '@mui/icons-material/Chat';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import GroupsIcon from '@mui/icons-material/Groups';
import RssFeedIcon from '@mui/icons-material/RssFeed';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { useEffect,useState } from "react";
import Followers from "../followers/Followers";
import {Link} from "react-router-dom";
import apiInstance from '../../http';
import {useSelector } from 'react-redux';

export default function Sidebar() {
  const {user:currentUser} = useSelector((state) => state.auth);
  const [FollowersList, setFollowers] = useState([]);

  useEffect(()=>{
    const getFollowers = async()=>{
      try {
        const {data} = await apiInstance.get(`user/followers/${currentUser._id}`);
        setFollowers(data);
      } catch (error) {
        console.log(error);
      }
    }
    getFollowers();
  },[currentUser]);

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <Link to="/" className="sidebarListItem" style={{textDecoration:"none"}}>
            <HomeIcon className="sidebarIcon" />
            <span className="sidebarListItemText">Home</span>
          </Link>

          <Link to={`/profile/${currentUser.username}`} className="sidebarListItem" style={{textDecoration:"none"}}>
            <AccountBoxIcon className="sidebarIcon" />
            <span className="sidebarListItemText">Profile</span>
          </Link>

          <Link to="/feed" className="sidebarListItem" style={{textDecoration:"none"}}>
            <RssFeedIcon className="sidebarIcon" />
            <span className="sidebarListItemText">Feed</span>
          </Link>
          
          <Link to="/conversation" className="sidebarListItem" style={{textDecoration:"none"}}>
            <ChatIcon className="sidebarIcon" />
            <span className="sidebarListItemText">Chats</span>
          </Link>
          
          <Link to="/group" className="sidebarListItem" style={{textDecoration:"none"}}>
            <GroupsIcon className="sidebarIcon" />
            <span className="sidebarListItemText">Groups</span>
          </Link>

          <Link to="/create-group" className="sidebarListItem" style={{textDecoration:"none"}}>
            <GroupsIcon className="sidebarIcon" />
            <span className="sidebarListItemText">Create Groups</span>
          </Link>

          <Link to="/" className="sidebarListItem" style={{textDecoration:"none"}}>
            <HelpOutlineIcon className="sidebarIcon" />
            <span className="sidebarListItemText">Questions</span>
          </Link>

        </ul>
        <hr className="sidebarHr" />
        <h4 className="sidebarTitle">Your Followers</h4>
        <ul className="sidebarFriendList">
          {FollowersList.map((follower) => (
            <Followers key={follower._id} user={follower} />
          ))}
        </ul>
      </div>
    </div>
  );
}
