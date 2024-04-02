import React, { useState } from 'react';
import './Mentors.css'; // Import the CSS file

const MemberItem = ({ user }) => {
    const [showDetails, setShowDetails] = useState(false);

    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };

    return (
        <div className="card">
            <img src={user.image} className="profile-image" />
            <div className="card">
                <h2>{user.full_name}</h2>
                <h3>{user.job_title}</h3>
            </div>
            {showDetails && (
                <div className="card">
                    <p>{user.education}</p>
                    <p>{user.experience}</p>
                    <p>{user.skills}</p>
                    <p>{user.free_times}</p>
                    <p>{user.cost_of_mentoring} {user.currency}/hour</p>
                    <p>{user.email}</p>
                </div>
            )}
            <button onClick={toggleDetails}>
                {showDetails ? 'Show less' : 'Show more'}
            </button>
        </div>
    );
};

export default MemberItem;
