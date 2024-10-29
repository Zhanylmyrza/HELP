// import React from 'react';

import { connect, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import { logout } from "../../actions/auth";
import NoPhoto from "../../components/NoPhoto/NoPhoto";
// import './Mentors.css';
import '../../components/Mentors/Mentors.css';

const Profile = ({logout}) => {
    const navigate = useNavigate()

    const userData = useSelector(state => state.auth.user)

    const onEditProfile = () => {
        navigate('/edit-profile')
    }
    
    const onLogout = () => {
        logout()
        navigate('/')
    }

    const {
        email, 
        full_name, 
        image, 
        job_title, 
        education, 
        experience, 
        skills, 
        can_ask_for_help, 
        free_times, 
        cost_of_mentoring, 
        is_saved,
        // currency,
    } = userData || {}; 
    console.log('Currency image', image)
    return (
        
        <div className="center-container" >
            <div className="profile-container" 
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100vh',
                padding: '20px',
                boxSizing: 'border-box',
                marginTop:'0px'
            }} >
                
                <span className='imgFullname'>
                {image ? <img src={image} className="card-image" style={{height:'100px', width:'100px'}} />
                : <NoPhoto className="container-no-profile" fullName={full_name} style={{height:'100px', width:'100px'}} />}

                <h2 className="profile-info">{full_name}</h2>

                </span>
               
                <h3>{job_title}</h3>
                <span className='container-vmestoToggle'>
                    <span className='row'>
                        <label> Education: </label>
                        <p>{education}</p>
                    </span>
                    
                    <span className='row'>
                        <label> Experience: </label>
                        <p>{experience}</p>
                    </span>
                    
                    <span className='row'>
                        <label> Skills: </label>
                        <p>{skills}</p>
                    </span>
                    
                    <span className='row'>
                        <label> Free times: </label>
                        <p>{free_times}</p>
                    </span>
                    
                    {/* <span className='row'>
                        <label> Cost of mentoring: </label>
                        <p>{cost_of_mentoring} {currency}/hour</p>
                    </span> */}

                     <span className='row'>
                        <label> Cost of mentoring: </label>
                        <p>{cost_of_mentoring} USD/hour</p>
                    </span>

                    
                    <span className='row'>
                        <label> Email: </label>
                        <p>{email}</p>
                    </span>
                    
                </span>
{/* 
                <div className="profile-image-container">
                    {image ? <img src={image} alt="profile" className="profile-image" /> 
                    : <NoPhoto fullName={full_name} />}
                    
                </div>

                <p><strong>Full name:</strong> {full_name}</p>
                <p><strong>Job title:</strong> {job_title}</p>
                <p><strong>Education:</strong> {education}</p>
                <p><strong>Experience:</strong> {experience}</p>
                <p><strong>Skills:</strong> {skills}</p>
                <p><strong>Free times:</strong> {free_times}</p>
                <p><strong>Can ask for help:</strong> {can_ask_for_help}</p>
                <p><strong>Cost of mentoring:</strong> {cost_of_mentoring} {currency}/hour</p>
                <p><strong>Email:</strong> {email}</p> */}

                <span style={{ display: 'flex', justifyContent: 'space-between',alignItems: 'flex-end' }}>

                    <button className="edit-profile-button" onClick={onEditProfile}>
                    Edit Profile 
                    </button>
                    <button  className="edit-profile-button" onClick={onLogout}>
                    Logout 
                    </button>

                </span>
                
            </div>
        </div>
    )
}

export default connect(null, { logout})(Profile);

