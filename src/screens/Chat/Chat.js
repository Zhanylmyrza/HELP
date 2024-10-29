import React, { useState, useEffect } from 'react';
import { Contacts } from '../../components/Chat/Contacts';
import {Messages} from '../../components/Chat/Messages';
import { connect, useSelector } from 'react-redux';
import { getPersonList } from '../../actions/memberAction';
import './Chat.css';
import axios from 'axios';
import NoPhoto from '../../components/NoPhoto/NoPhoto';
import { getChatHistory } from '../../actions/chat';
import { useLocation } from 'react-router-dom';

const Chat = ({  getPersonList, getChatHistory }) => {
    const location = useLocation();
    const data = location.state;

    const token = localStorage.getItem("access")
    const [socket, setSocket] = useState(null);

    const [messages, setMessages] = useState([])
    const [receiver, setReceiver] = useState(data);
    const [isReceiverOnline, setIsReceiverOnline] = useState(null);
    const [countBadge, setCountBadge] = useState(0);

    const { person:contacts} = useSelector(state => state.person)
    const { chatHistory } = useSelector(state => state.chat)
    const { user:currentUser } = useSelector(state => state.auth)



    useEffect(() => {
        getPersonList()
        receiver && getChatHistory(receiver.email)
    }, [receiver])

    useEffect(() => {
        console.log("chatHistory", chatHistory)
        setMessages(chatHistory)
    }, [chatHistory, receiver])


    useEffect(() => {
        const ws = new WebSocket(
            `ws://${'localhost:8000'}/ws/chat/${receiver?.id}/?token=${token}`
        );
    // useEffect(() => {
    //     const ws = new WebSocket(
    //         `ws://${'34.132.9.23'}/ws/chat/${receiver?.id}/?token=${token}`
    //     );

        ws.onopen = function(e) {
            console.log("CONNECTION ESTABLISHED");
        }
 
        ws.onmessage = function(e) {
            console.log('ON MESSAGE')
            const data = JSON.parse(e.data);

            setMessages(prevState => [...prevState, {sender: data.username, message:data.message}])
            console.log('DATATTTT', data)
        }

        ws.onclose = function(e) {
            console.log("CONNECTION LOST");
        }

        ws.onerror = function(e) {
            console.log("ERROR OCCURRED");
        }

       
        setSocket(ws);

        return () => {
          
            ws.close();
        };
    }, [receiver, token]);

    useEffect(() => {
        const notifySocket = new WebSocket(
            `ws://${'localhost:8000'}/ws/chat/notify/?token=${token}`
        );
    // useEffect(() => {
    //     const notifySocket = new WebSocket(
    //         `ws://${'34.132.9.23'}/ws/chat/notify/?token=${token}`
    //     );


        notifySocket.onopen = function(e) {
            console.log("CONNECTED TO NOTIFICATION");
        }

        notifySocket.onmessage = function(e) {
            const data = JSON.parse(e.data);
            console.log('NOTIFY ON MESSAGE', data)
            setCountBadge(data.count);
        }

        notifySocket.onclose = function(e) {
            console.log("DISCONNECTED FROM NOTIFICATION");
        }

        return () => {
            notifySocket.close();
        };
    }, []);

    useEffect(() => {
        const onlineStatus = new WebSocket(
            `ws://${'localhost:8000'}/ws/chat/online/?token=${token}`
        );
    // useEffect(() => {
    //     const onlineStatus = new WebSocket(
    //         `ws://${'34.132.9.23'}/ws/chat/online/?token=${token}`
    //     );

        onlineStatus.onopen = function(e) {
            console.log("CONNECTED TO ONLINE CONSUMER");
            onlineStatus.send(JSON.stringify({
                'username': currentUser?.email,
                'type': 'open'
            }));
        }

        onlineStatus.onclose = function(e) {
            console.log("DISCONNECTED FROM ONLINE CONSUMER");
        }

        onlineStatus.onmessage = function(e) {
            const data = JSON.parse(e.data);
            if (data.username !== currentUser.email) {
                if (data.online_status) {
                    setIsReceiverOnline(true)
                } else {
                    setIsReceiverOnline(false)
                }
            }
        }

        const handleBeforeUnload = (e) => {
            onlineStatus.send(JSON.stringify({
                'username': currentUser.email,
                'type': 'offline'
            }));
          };
      
        window.addEventListener('beforeunload', handleBeforeUnload);
        
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
            onlineStatus.close();
        };
    }, [currentUser]);
    
    const onContactSelect =(user) => {
        
        console.log('receiver',user)
        console.log('token', token)
        
        setReceiver(user)

        // Chat API
    }

    console.log('countBadge', countBadge)

    return (
    <span id='bdy'>

        <div class="divous" id="frame">
            <div class="divous" id="sidepanel">
                <div class="divous" id="profile">
                    <div class="divous wrap">
                    {currentUser.image ? <img id="profile-img"  src={currentUser.image} className="online" />
                        : <NoPhoto forContactPage={true} fullName={currentUser.full_name}  />}
                        <p>{currentUser.full_name}</p>
                        <i class="fa fa-chevron-down expand-button" aria-hidden="true"></i>
                        <div class="divous" id="status-options">
                            <ul  style={{color: '#283761', marginTop:'10px'}}>
                                <li id="status-online" class="active"><span class="status-circle"></span> <p>Online</p></li>
                                <li id="status-offline"><span class="status-circle"></span> <p>Offline</p></li>
                            </ul>
                        </div>
                        
                    </div>
                </div>

                <div class="divous" id="contacts">
                    <ul>             
                        <Contacts users={contacts} onContactSelect={onContactSelect} />
                    </ul>
                </div>

            </div>
            <div class="divous content">
               {receiver && <Messages socket={socket} receiver={receiver} isReceiverOnline={isReceiverOnline} messages={messages}/>}
            </div>
        </div>
    </span>
            
    );
};

export default connect(null, { getPersonList, getChatHistory })(Chat);

