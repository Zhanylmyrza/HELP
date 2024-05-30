
import React, { useState } from 'react';
import './Mentors.css';
import NoPhoto from '../NoPhoto/NoPhoto';
import '../NoPhoto/NoPhoto.css'
import { useNavigate } from 'react-router-dom';
import { savePerson } from '../../actions/savePerson';
import { connect, useSelector } from 'react-redux';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';
import ReactModal from 'react-modal';

const MemberItem = ({user, showSaveButton= true, savePerson}) => {
    const [showDetails, setShowDetails] = useState(false);
    const navigate = useNavigate();

    const currentUser = useSelector(state => state.auth.user)
    console.log("STRANGE currentUser",currentUser)
    const isPersonAlreadySaved = currentUser && currentUser.saved_persons.some(person => person.id === user.id);

    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };

    const handleMessageClick = () => {
        navigate('/messages', {state: user})
    };

    const handleSaveClick = async () => {
        savePerson(user)
    };

    return (
        <div className="card" onClick={toggleDetails}>
            {user.image ? <img src={user.image} className="card-image" />
            : <NoPhoto className="container-no-profile" fullName={user.full_name} />}

            <h2>{user.full_name}</h2>
            <h3>{user.job_title}</h3>
            <div className="member-item-button-container">
                <button onClick={handleMessageClick}>Message</button>
                {showSaveButton && (isPersonAlreadySaved ? 
                <FaBookmark  style={{fontSize:25}} /> :
                <FaRegBookmark onClick={handleSaveClick} style={{fontSize:25}} />)}
            </div>

            <ReactModal isOpen={showDetails} 
            style={{
                overlay: {
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: 'rgba(0, 0, 0, 0.5)'
                },
                content: {
                  position: 'absolute',
                  left: 0, 
                  right: 0, 
                  marginLeft: 'auto', 
                  marginRight: 'auto', 
                  border: '1px solid #ccc',
                  background: '#fff',
                  overflow: 'auto',
                  WebkitOverflowScrolling: 'touch',
                  borderRadius: '4px',
                  outline: 'none',
                  padding: '20px',
                  width: '400px'
                }
              }}
              >

                <span className='imgFullname'>
                {user.image ? <img src={user.image} className="card-image" style={{height:'100px', width:'100px'}} />
                : <NoPhoto className="container-no-profile" fullName={user.full_name} style={{height:'100px', width:'100px'}} />}

                <h2 className="profile-info">{user.full_name}</h2>

                </span>
               
                <h3>{user.job_title}</h3>
                <span className='container-vmestoToggle'>
                    <span className='row'>
                        <label> Education: </label>
                        <p>{user.education}</p>
                    </span>
                    
                    <span className='row'>
                        <label> Experience: </label>
                        <p>{user.experience}</p>
                    </span>
                    
                    <span className='row'>
                        <label> Skills: </label>
                        <p>{user.skills}</p>
                    </span>
                    
                    <span className='row'>
                        <label> Free times: </label>
                        <p>{user.free_times}</p>
                    </span>
                    
                    <span className='row'>
                        <label> Cost of mentoring: </label>
                        <p>{user.cost_of_mentoring} {user.currency}/hour</p>
                    </span>
                    
                    <span className='row'>
                        <label> Email: </label>
                        <p>{user.email}</p>
                    </span>
                    
                </span>
                <div className="member-item-button-container">
                    <button onClick={handleMessageClick}>Message</button>
                    {showSaveButton && (isPersonAlreadySaved ? 
                    <FaBookmark  style={{fontSize:25}} /> :
                    <FaRegBookmark onClick={handleSaveClick} style={{fontSize:25}} />)}
                </div>
                </ReactModal>
        </div>
    );
};


export default connect(null, { savePerson })(MemberItem);

