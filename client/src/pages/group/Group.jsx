import { useState, useEffect } from 'react';
import "./group.css";
import Navbar from "../../components/navbar/Navbar";
import apiInstance from '../../http';
import GroupCard from '../../components/group/GroupCard';

function Group() {
    const [Groups, setGroups] = useState([]);

    useEffect(() => {
        const getAllGroups = async () => {
            try {
                const { data } = await apiInstance.get("group/get-all-groups");
                setGroups(data);
            } catch (error) {
                console.log(error);
            }
        }
        getAllGroups();
    }, []);

    return (
        <>
            <Navbar />
            <div className="container" style={{ backgroundColor: "white", marginLeft: "70px", marginBottom: "20px" }}>
                <ul>
                    <li>
                        {Groups.map((group) => {
                            return(<GroupCard key={group._id} group={group}/>)
                        })}
                    </li>
                </ul>
            </div>
        </>
    )
}

export default Group;
