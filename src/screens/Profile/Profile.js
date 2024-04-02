import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import "./Profile.css";

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
        is_saved,
        currency,
    } = userData || {}; 
    console.log('Currency', currency)
    return (
        
        <div className="center-container">
            <div className="profile-container">
                
                <img src={image} className="profile-image" />
                

                <h2>{full_name}</h2>
                <h2>{job_title}</h2>
                <p>{education}</p>
                <p>{experience}</p>
                <p>{skills}</p>
                <p>{free_times}</p>
                <p>{can_ask_for_help}</p>
                <p>{cost_of_mentoring} {currency}/hour</p>
                <p>{email}</p>

                <button className="edit-profile-button" onClick={onEditProfile}>
                Edit Profile 
                </button>
            </div>
        </div>
    )
}
