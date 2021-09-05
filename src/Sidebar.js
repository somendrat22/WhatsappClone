import React, {useEffect, useState} from 'react';
import { Avatar, IconButton } from '@material-ui/core';
import DonutLargeIcon from "@material-ui/icons/DonutLargeRounded";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVertOutlined";
import { SearchOutlined } from '@material-ui/icons';
import './Sidebar.css'
import SidebarChats from './SidebarChats';
import db from "./firebase"
import {useStateValue} from "./StateProvider";
function Sidebar(){
    const [rooms, setRooms] = useState([]);
    const [{user}, dispatch] = useStateValue();
    useEffect(() => {
        const unsubscribe  = db.collection("rooms").onSnapshot(snapshot => (
            setRooms(snapshot.docs.map(doc => (
                {
                    id : doc.id,
                    data : doc.data(),
                }
            )))
        ));

        return () => {
            unsubscribe();
        }

    }, [])

    return (
        <div className = "sidebar">
           <div className = "sidebar__header">
                <Avatar src = {user?.photoURL}></Avatar>
                <div className = "sidebar__headerRight">
                    <IconButton>
                        <DonutLargeIcon></DonutLargeIcon>
                    </IconButton>
                    <IconButton>
                        <ChatIcon></ChatIcon>
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon></MoreVertIcon>
                    </IconButton>
                </div>
           </div>

            <div className = "sidebar__search">
                <div className = "sidebar__searchContainer">
                <SearchOutlined></SearchOutlined>
                <input placeholder = "Search or start new chat"></input>
                </div>
            </div>

            <div className = "sidebar__chats">
                <SidebarChats addNewChat></SidebarChats>
                {rooms.map(room => (
                    <SidebarChats key = {room.id} id = {room.id} name = {room.data.name}></SidebarChats>
                ))}
            </div>

        </div>
    );
};

export default Sidebar;