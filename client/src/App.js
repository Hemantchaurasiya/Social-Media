import { BrowserRouter as Router,Switch,Route} from "react-router-dom";
import { useSelector,useDispatch } from 'react-redux';
import { setAuth } from './store/authSlice';
import Register from "./pages/Auth/Register";
import RegisterVerify from "./pages/Auth/RegisterVerify";
import Login from "./pages/Auth/Login";
import ChangePassword from "./pages/Auth/ChangePassword";
import ResetPasswordEmail from "./pages/Auth/ResetPasswordEmail";
import ResetPassword from "./pages/Auth/ResetPassword";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Messenger from "./pages/messenger/Messenger";
import ProfileEdit from "./pages/profile-edit/ProfileEdit";
import Feed from "./pages/feed/FeedPage";
import Group from "./pages/group/Group";
import CreateGroup from "./pages/group/CreateGroup";

function App() {
  const dispatch = useDispatch();
  const updateUserState = ()=>{
    const user = JSON.parse(localStorage.getItem("user"));
    if(user){
      dispatch(setAuth({ user: user.userData }));
    }
    return(<Login/>);
  }
  const {user} = useSelector((state) => state.auth);
  if(!user){
    updateUserState();
  }
  return(
    <>
      <Router>
        <Switch>
        <Route path="/register"> <Register/> </Route>

        <Route path="/register-verification"> <RegisterVerify/> </Route>

        <Route path="/login"> <Login/> </Route>

        <Route path="/change-password"> <ChangePassword/> </Route>

        <Route path="/reset-password-email"> <ResetPasswordEmail/> </Route>

        <Route path="/reset-password-link"> <ResetPassword/> </Route>

        <Route exact path="/"> {user ? <Home/> : <Login/>} </Route>

        <Route path="/feed"> {user ? <Feed/> : <Login/>} </Route>

        <Route path="/profile/:username">{user ? <Profile/>:<Login/>}</Route>

        <Route path="/profile-edit/:username">{user ? <ProfileEdit/>:<Login/>}</Route>

        <Route path="/conversation">{user ? <Messenger/>:<Login/>}</Route>

        <Route path="/group">{user ? <Group/>:<Login/>}</Route>

        <Route path="/create-group">{user ? <CreateGroup/>:<Login/>}</Route>

        </Switch>
      </Router>
    </>
  )
}

export default App;