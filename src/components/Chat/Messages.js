import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import '../Messages/Messages.css'
import { useChatScroll } from '../../utils/useChatScroll';

export const Messages = ({receiver, isReceiverOnline, messages, socket}) => {
    const ref = useChatScroll(messages)
    console.log('MESSAGES', messages)

    const [messageText, setMessageText] = useState("")

    const currentUser = useSelector(state => state.auth.user)

    const handleMessageSubmit = () => {
        if (socket && receiver) {
            socket.send(JSON.stringify({
                'message': messageText,
                'username': currentUser.email,
                'receiver': receiver.email,
            }));
        }
        setMessageText("");
    };

    const handleKeyUp = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
          
           const message = messageText.trim()
            if (message !== '') {
                if (socket && receiver) {
                    socket.send(JSON.stringify({
                        'message': message,
                        'username': currentUser.email,
                        'receiver': receiver?.email,
                    }));
                }
                setMessageText("");
            }
        }
    };

    const renderMessages = () => {
        return messages.map((message, index) => {
            return <li class={message.sender === currentUser.email ? "replies" : "sent"} key={index}>
                <img src={message.sender === currentUser.email ? currentUser.image : receiver?.image} alt="" />
                <p>{message.message}</p>
            </li>   
    })};

    return (
        <div >
            <div class="divous contact-profile">
                <img src={receiver?.image} alt="" class="contact-image" style={{height: '25px', width: '25px'}} />
                <p class="ml-2" style={{color: '#283761', marginTop:'5px', marginRight: '10px'}}>{receiver?.email}   |  </p>
                <p style={{color: '#283761', marginTop:'5px'}} >{isReceiverOnline ? 'Online' : 'Offline'}</p>           
            </div>
            <div className="chat-messages-row">
                            <div className="messages chat-messages" style={{ backgroundColor: '#283761', overflowY: 'scroll' }} ref={ref}>
                                <ul className="chat-messages-ul" >
                                    {renderMessages()}
                                </ul>
                            </div>   
                        <div class="message-input">                        
                            <input type="text" 
                                placeholder="Write your message..." 
                                value={messageText} 
                                onChange={(e) => setMessageText(e.target.value)}
                                onKeyUp={handleKeyUp}
                            />

                            <i class="fa fa-paperclip attachment" aria-hidden="true"></i>
                            <button class="submit" onClick={handleMessageSubmit} ><i class="fa fa-paper-plane" aria-hidden="true"></i> Send </button>                        
                        </div>

                      
                </div>        
        </div>
    );
};




// const [users, setUsers] = useState([]);
//     const [messages, setMessages] = useState([]);
//     const [currentUser, setCurrentUser] = useState(null);

//     useEffect(() => {
//         // Fetch users and messages from API endpoint
//         // Example: axios.get('/api/users').then(response => setUsers(response.data));
//         // Example: axios.get('/api/messages').then(response => setMessages(response.data));

//         // For demo purposes, initializing some dummy data
//         const dummyUsers = [{ email: 'user1@example.com' }, { email: 'user2@example.com' }];
//         const dummyMessages = [{ message: 'Hello', sender: 'user1@example.com', timestamp: new Date() }];

//         setUsers(dummyUsers);
//         setMessages(dummyMessages);

//         // Simulating current user
//         setCurrentUser({ email: 'user1@example.com' });
//     }, []);

