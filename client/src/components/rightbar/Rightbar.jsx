import "./rightbar.css";
import { Users } from "../../dummyData";
import Online from "../online/Online";
import { useSelector} from 'react-redux';
import { useEffect, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import apiInstance from '../../http';
import { Link } from "react-router-dom";
import Allusers from "../allUsers/Allusers";
import Friend from "../friends/Friend";
import {useDispatch } from 'react-redux';
import { setAuth } from '../../store/authSlice';
import moment from "moment";

export default function Rightbar({ user }) {
  const dispatch = useDispatch();
  const {user:currentUser} = useSelector((state) => state.auth);
  const [friends, setFriend] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [Followers, setFollowers] = useState(0);
  const [Followings, setFollowings] = useState(0);
  const [followed, setfollowed] = useState(currentUser.followings.includes(user?._id));

  useEffect(() => {
    setfollowed(currentUser.followings.includes(user?._id));
  }, [currentUser, user?._id]);
  
  useEffect(() => {
    const getFriends = async () => {
      try{
          const friendList = await apiInstance.get("user/friends/" + user._id);
          setFriend(friendList.data);
          setFollowings(user.followings.length);
          setFollowers(user.followers.length);
      } catch (error) {
        console.log(error);
      }
    }
    getFriends();
  }, [user]);

  useEffect(() => {
    const getAllUsers = async () => {
      try {
          const UserList = await apiInstance.get("user/get-all-users/");
          setAllUsers(UserList.data);
      } catch (error) {
        console.log(error);
      }
    }
    getAllUsers();
  }, []);

  const followHandleClick = async () => {
    try {
      if (followed) {
        await apiInstance.put("user/" + user._id + "/unfollow", { userId: currentUser._id });
        // get user new data
        const {data} = await apiInstance.get(`user?userId=${currentUser._id}`);
        console.log(data);
        // localstorage update
        const access_token = JSON.parse(localStorage.getItem("user")).access_token;
        const refresh_token = JSON.parse(localStorage.getItem("user")).refresh_token;
        const userData = data;
        localStorage.setItem("user", JSON.stringify({userData,access_token,refresh_token}));
        // state update
        dispatch(setAuth({user:data}));
      } else {
        await apiInstance.put("user/" + user._id + "/follow", { userId: currentUser._id });
        // get user new data
        const {data} = await apiInstance.get(`user?userId=${currentUser._id}`);
        console.log(data);
        // localstorage update
        const access_token = JSON.parse(localStorage.getItem("user")).access_token;
        const refresh_token = JSON.parse(localStorage.getItem("user")).refresh_token;
        const userData = data;
        localStorage.setItem("user", JSON.stringify({userData,access_token,refresh_token}));
        // state update
        dispatch(setAuth({user:data}));
      }
    } catch (error) {
      console.log(error);
    }
  setfollowed(!followed);
}

  
  const HomeRightbar = () => {
    return (
      <>
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
        <h4 className="rightbarTitle">All Users</h4>
        <ul className="rightbarFriendList">
          {allUsers.map((u) => (
            <Allusers key={u._id} user={u} />
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
      {user.username !== currentUser.username && (
          <button className="rightbarfollowButton" onClick={followHandleClick}>
            {followed ? "UnFollow" : "Follow"}
            {followed ? <RemoveIcon /> : <AddIcon />}
          </button>
        )}
        {user.username === currentUser.username &&(
        <Link key={currentUser._id} to={`/profile-edit/${currentUser.username}`} style={{textDecoration:"none"}}><button className="rightbarEditButton">Update Profile</button></Link>
        )}
        <div className="rightbarInfo">

        <h4 className="rightbarTitle">User</h4>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Followers : </span>
            <span className="rightbarInfoValue">{Followers}</span>
          </div>

          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Followings : </span>
            <span className="rightbarInfoValue">{Followings}</span>
          </div>

          <h4 className="rightbarTitle">User info</h4>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Name : </span>
            <span className="rightbarInfoValue">{user.firstname+" " +user.lastname}</span>
          </div>

          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Date Of Birth : </span>
            <span className="rightbarInfoValue">{moment(user.dob).format("DD/MMM/YYYY")}</span>
          </div>

          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Gender : </span>
            <span className="rightbarInfoValue">{user.gender}</span>
          </div>

          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">{user.relationship}</span>
          </div>

          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Languages : </span>
            <span className="rightbarInfoValue">{user.languages}</span>
          </div>

          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Religion : </span>
            <span className="rightbarInfoValue">{user.religion}</span>
          </div>

          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Hobbies : </span>
            <span className="rightbarInfoValue">{user.hobbies}</span>
          </div>

          <h4 className="rightbarTitle">User Contacts</h4>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">email : </span>
            <span className="rightbarInfoValue">{user.email}</span>
          </div>

          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Mobile : </span>
            <span className="rightbarInfoValue">{user.mobile}</span>
          </div>
          
          <h4 className="rightbarTitle">User Address</h4>

          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Live In :</span>
            <span className="rightbarInfoValue">{user.liveIn}</span>
          </div>

          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>

          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>

          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">State :</span>
            <span className="rightbarInfoValue">{user.state}</span>
          </div>

          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Country :</span>
            <span className="rightbarInfoValue">{user.country}</span>
          </div>

          <h4 className="rightbarTitle">User Education</h4>

          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Work At :</span>
            <span className="rightbarInfoValue">{user.workAt}</span>
          </div>

          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">School/Collage :</span>
            <span className="rightbarInfoValue">{user.school}</span>
          </div>
        </div>

        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          {friends.map((friend) => (
            <Friend key={friend._id} friend={friend}/>
          ))}
        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar key={user._id} /> : <HomeRightbar />}
      </div>
    </div>
  );
}
