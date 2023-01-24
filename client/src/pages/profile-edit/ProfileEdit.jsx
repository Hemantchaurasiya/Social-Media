import {useState } from 'react';
import "./profileEdit.css";
import apiInstance from '../../http';
import { setAuth } from '../../store/authSlice';
import { useSelector,useDispatch } from 'react-redux';
import Navbar from "../../components/navbar/Navbar";
import storage from "../../api/firebase";
import { ref ,uploadBytes} from "firebase/storage";

function ProfileEdit() {
    const dispatch = useDispatch();
    const { user: currentUser } = useSelector((state) => state.auth);
    var [user, setuser] = useState(currentUser);
    const [res, setres] = useState("");
    const [profilePic, setProfilePic] = useState(null);
    const [coverPic, setCoverPic] = useState(null);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            if(profilePic){
                const fileName = Date.now() + profilePic.name;
                user = {...user,profilePicture:fileName};
                const storageRef = ref(storage,`/items/${fileName}`);
                uploadBytes(storageRef, profilePic).then((snapshot) => {
                console.log('Uploaded file!');
                });
            }
            if(coverPic){
                const coverfileName = Date.now() + coverPic.name;
                user = {...user,coverPicture:coverfileName};
                const coverstorageRef = ref(storage,`/items/${coverfileName}`);
                uploadBytes(coverstorageRef, coverPic).then((snapshot) => {
                console.log('Uploaded file!');
                });
            }
            
            const res = await apiInstance.put(`user/${user._id}`,{user:user,userId:user._id});
            setres(res.data);
            // get user new data
            const {data} = await apiInstance.get(`user?userId=${user._id}`);
            console.log(data);
            // localstorage update
            const access_token = JSON.parse(localStorage.getItem("user")).access_token;
            const refresh_token = JSON.parse(localStorage.getItem("user")).refresh_token;
            const userData = data;
            localStorage.setItem("user", JSON.stringify({userData,access_token,refresh_token}));
            // state update
            dispatch(setAuth({user:data}));
        } catch (error) {
            console.log(error);
        }
    }

    const handleChange = ({ target }) => {
        const { name, value } = target;
        setuser({ ...user, [name]: value });
    };

    return (
        <>
            <Navbar />
            <div style={{ display:"flex",justifyContent:"center",marginTop:"30px" ,backgroundColor:"white"}}>
                <form onSubmit={submitHandler}>
                    <div style={{display:"flex"}}>
                    <div>
                        <span className="span">Profile Picture : </span>
                        <input type="file" id="profilePicture" accept=".png,.jpeg,.jpg"
                                onChange={(e) => setProfilePic(e.target.files[0])}
                        />
                        <div>
                            <span className="span">First Name : </span>
                            <input name="firstname" value={user.firstname} onChange={handleChange} className="inputbox" type="text" />
                        </div>

                        <div>
                            <span className="span">Last Name : </span>
                            <input name="lastname" value={user.lastname} onChange={handleChange} className="inputbox" type="text" />
                        </div>

                        <div>
                            <span className="span">Date Of Birth : </span>
                            <input name="dob" value={user.dob} onChange={handleChange} className="inputbox" type="date" />
                        </div>

                        <div>
                            <span className="span">Gender : </span>
                            <input name="gender" value={user.gender} onChange={handleChange} className="inputbox" type="text" />
                        </div>

                        <div>
                            <span className="span">Relationship : </span>
                            <input name="relationship" value={user.relationship} onChange={handleChange} className="inputbox" type="text" />
                        </div>

                        <div>
                            <span className="span">Languages : </span>
                            <input name="languages" value={user.languages} onChange={handleChange} className="inputbox" type="text" />
                        </div>

                        <div>
                            <span className="span">Religion : </span>
                            <input name="religion" value={user.religion} onChange={handleChange} className="inputbox" type="text" />
                        </div>

                        <div>
                            <span className="span">Hobbies : </span>
                            <input name="hobbies" value={user.hobbies} onChange={handleChange} className="inputbox" type="text" />
                        </div>
                    </div>

                    <div>
                        <span className="span">Cover Picture : </span>
                        <input type="file" id="coverPicture" accept=".png,.jpeg,.jpg"
                                onChange={(e) => setCoverPic(e.target.files[0])}/>
                        <div>
                            <span className="span">Mobile : </span>
                            <input name="mobile" value={user.mobile} onChange={handleChange} minLength={10} maxLength={10} className="inputbox" type="text" />
                        </div>

                        <div>
                            <span className="span">LiveIn : </span>
                            <input name="liveIn" value={user.liveIn} onChange={handleChange} className="inputbox" type="text" />
                        </div>

                        <div>
                            <span className="span">From : </span>
                            <input name="from" value={user.from} onChange={handleChange} className="inputbox" type="text" />
                        </div>

                        <div>
                            <span className="span">City : </span>
                            <input name="city" value={user.city} onChange={handleChange} className="inputbox" type="text" />
                        </div>

                        <div>
                            <span className="span">State : </span>
                            <input name="state" value={user.state} onChange={handleChange} className="inputbox" type="text" />
                        </div>

                        <div>
                            <span className="span">Country : </span>
                            <input name="country" value={user.country} onChange={handleChange} className="inputbox" type="text" />
                        </div>

                        <div>
                            <span className="span">Work At : </span>
                            <input name="workAt" value={user.workAt} onChange={handleChange} className="inputbox" type="text" />
                        </div>

                        <div>
                            <span className="span">School/Collage : </span>
                            <input name="school" value={user.school} onChange={handleChange} className="inputbox" type="text" />
                        </div>
                    </div>
                    </div>
                    <button type="submit" className="submitButton">Update Profile</button>
                    <p style={{color:"green"}}>{res}</p>
                </form>
            </div>
        </>
    )
}

export default ProfileEdit;
