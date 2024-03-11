import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import "./Profile.css";

const user = {
    full_name: "Zhanylmyrza Bakirova",
    job_title:"Software Engeneer",
    education:"International Ala-Too University",
    experience:"4 year in IBM Company",
    skills:"Python, Django, Rest Framework, JS, React, PostgreSQL, JAVA, Spring",
    can_ask_for_help:"yes",
    free_times:"https://cal.com/zhanylmyrza/30min",
    cost_of_mentoring:"890",
    is_saved:"yes"
}

export const Profile = () => {
    const navigate = useNavigate()
    const userData = useSelector(state => state.auth.user)

    const onEditProfile = () => {
        navigate('/edit-profile')
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
        is_saved
    } = userData || {}; //userData

    console.log(email, full_name)

    console.log(userData)

    return (
        // <center>
        //     <h1>Account</h1>

        //     <h2>Profile</h2>
        //     <p>{full_name}</p>

        //     <h2>Job title</h2>
        //     <p>Java Developer</p>

        //     <h2>Rate</h2>
        //     <p>35 $</p>

        //     <h2>Email address</h2>
        //     <p>{email}</p>

        //     <button onClick={onEditProfile}>Edit Profile</button>
        // </center>
        <div className="center-container">
            <div className="profile-container">
                <img src={image} alt="Profile" className="profile-image" />
                
                <div className="profile-details">
                <h2 className="profile-name">{full_name}</h2>
                <p className="profile-job-title">{job_title}</p>
                <p className="profile-rate">{cost_of_mentoring} USD/hour</p>
                <p className="profile-email">{email}</p>
                </div>
                <button className="edit-profile-button" onClick={onEditProfile}>
                Edit Profile 
                </button>
            </div>
        </div>
    )
}