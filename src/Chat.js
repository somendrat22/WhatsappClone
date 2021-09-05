import React, {useState, useEffect} from 'react'
import { SearchOutlined, InsertEmoticon, Mic } from '@material-ui/icons';
import MoreVert from "@material-ui/icons/MoreVert"
import { AttachFile } from '@material-ui/icons';
import "./Chat.css"
import { Avatar, IconButton } from '@material-ui/core'
import { useParams } from 'react-router-dom';
import db from './firebase';
import {useStateValue} from "./StateProvider";
import firebase from 'firebase';
function Chat() {
    const [seed, setSeed] = useState("");
    const [input, setInput] = useState("");
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState("");
    const [messages, setMessages] = useState([]);
    const [{user}, dispatch] = useStateValue();
    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
        if(roomId){
            db.collection("rooms").doc(roomId).onSnapshot( snapshot => (
                setRoomName(snapshot.data().name)
            ));

            db.collection("rooms").doc(roomId).collection("messages").orderBy("timestamp", "asc").onSnapshot(
                snapshot => (
                    setMessages(snapshot.docs.map(
                        doc => doc.data()
                    ))
                )
            )
        }
    },[roomId])
    useEffect(() => {
       
    },[])
    const sendMessage = (e) =>{
        e.preventDefault(); // prevents from refreshing

        db.collection("rooms").doc(roomId).collection("messages").add({
            message : input,
            name : user.displayName,
            timestamp : firebase.firestore.FieldValue.serverTimestamp()
        })

        setInput("");
    }
    return (
        <div className = "chat">
            <div className = "chat__header">
                <Avatar src = {`https://avatars.dicebear.com/api/human/${seed}.svg`}></Avatar>
                <div className = "chat__headerInfo">
                    <h3>{roomName}</h3>
                    <p>Last Seen{" "}
                    {new Date(messages[messages.length - 1]?.timestamp?.toDate()).toUTCString()}
                    </p>
                </div>
                <div className = "chat__headerRight">
                    <IconButton>
                        <SearchOutlined></SearchOutlined>
                    </IconButton>
                    <IconButton>
                        <AttachFile></AttachFile>
                    </IconButton>
                    <IconButton>
                        <MoreVert></MoreVert>
                    </IconButton>
                </div>
            </div>
            <div className = "chat__body">
                {messages.map(message => (
                    <p className = {`chat__message ${message.name == user.displayName &&'chat__reciever'}`}>
                    <span className = "chat__name">{message.name}</span>
                        {message.message}
                    <span className = "chat__timestamp">{new Date(message.timestamp?.toDate()).toUTCString()}</span>
                    </p>
                ))}
                
            </div>
            <div className = "chat__footer">
                <InsertEmoticon></InsertEmoticon>
                <form>
                    <input type= "text" value = {input} onChange = {(e) => setInput(e.target.value)} placeholder = "Type a message !!" ></input>
                    <button type = "submit" onClick = {sendMessage}>Send a message</button>
                </form>
                <Mic></Mic>
            </div>
        </div>
    )
}

export default Chat
