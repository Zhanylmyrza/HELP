// import React, { useState } from 'react';
// import './Mentors.css'; // Import the CSS file

// const MemberItem = ({ user }) => {
//     const [showDetails, setShowDetails] = useState(false);

//     const toggleDetails = () => {
//         setShowDetails(!showDetails);
//     };

//     return (
//         <div className="card">
//             <img src={user.image} className="profile-image" />
            
//             <h2>{user.full_name}</h2>
//             <h3>{user.job_title}</h3>
            
//             {showDetails && (
//                 <span>
//                     <p>{user.education}</p>
//                     <p>{user.experience}</p>
//                     <p>{user.skills}</p>
//                     <p>{user.free_times}</p>
//                     <p>{user.cost_of_mentoring} {user.currency}/hour</p>
//                     <p>{user.email}</p>
//                 </span>
//             )}
//             <button onClick={toggleDetails}>
//                 {showDetails ? 'Show less' : 'Show more'}
//             </button>
//         </div>
//     );
// };

// export default MemberItem;
import React, { useState } from 'react';
import './Mentors.css'; // Import the CSS file

const MemberItem = ({ user }) => {
    const [showDetails, setShowDetails] = useState(false);

    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };

    return (
        <div className="card" onClick={toggleDetails}>
            <img src={user.image} className="profile-image" />
            
            <h2>{user.full_name}</h2>
            <h3>{user.job_title}</h3>
            
            {showDetails && (
                <span>
                    <p>{user.education}</p>
                    <p>{user.experience}</p>
                    <p>{user.skills}</p>
                    <p>{user.free_times}</p>
                    <p>{user.cost_of_mentoring} {user.currency}/hour</p>
                    <p>{user.email}</p>
                </span>
            )}

            <span className="button-container">
                <button onClick={(e) => { e.stopPropagation(); }}>Message</button>
                <button onClick={(e) => { e.stopPropagation(); }}>Save</button>
            </span>

        </div>
    );
};

export default MemberItem;

