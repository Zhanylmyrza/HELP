import React, { useEffect, useState } from "react";
import "./EditProfile.css"; 
import { connect, useSelector } from "react-redux";
import { update_profile } from "../../actions/auth";
import { useNavigate } from "react-router-dom";
import NoPhoto from "../../components/NoPhoto/NoPhoto";


const  EditProfile = ({update_profile}) => {
  const navigate = useNavigate();

  const profile = useSelector(state => state.auth.user)
  console.log('profile',profile)

  const [profileData, setProfileData] = useState({

    id: profile.id || null,
    full_name: profile.full_name || "",
    image: profile.image || "",
    job_title: profile.job_title || "",
    education: profile.education || "",
    experience: profile.experience || "",
    skills: profile.skills || "",
    can_ask_for_help: profile.can_ask_for_help || "no",
    free_times: profile.free_times || "",
    cost_of_mentoring: profile.cost_of_mentoring || 0,
    is_saved: profile.is_saved || false,
    email: profile.email || "",
    currency: profile.currency || "KGS",
  });

  const [image, setImage] = useState(profileData.image)

  useEffect(() => {
    if(typeof profileData.image !== 'string'){
      const imageUrl = URL.createObjectURL(profileData.image);

      setImage(imageUrl)
    }
  },[profileData.image])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleCurrencyChange = (e) => {
    setProfileData((prevData) => ({
      ...prevData,
      currency: e.target.value,
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    update_profile({
      ...profileData,
      image: typeof profileData.image === 'string' ? null : profileData.image
    }, profile.id);


    navigate("/profile");
  };

  const handleImage = (e) => {
    setProfileData((prevData) => ({
      ...prevData,
      image: e.target.files[0],
    }));
  } 

  return (
    <div className="profile-container" style={{width:'40rem', marginTop:'20px'}}>
      <form className="profile-form" onSubmit={handleSubmit} >
        
        <div className="profile-image-container">
            {image ? <img src={image} alt="profile" className="profile-image" /> 
            : <NoPhoto fullName={profileData.full_name} />}
            <input
              type="file"
              onChange={handleImage}
              className="profile-image-input"
            />
        </div>
        <input
            type="text"
            id="full_name"
            name="full_name"
            className="input-field"
            value={profileData.full_name}
            onChange={handleChange}
            placeholder="Full Name"
        />


        <input
          type="text"
          name="job_title"
          className="input-field"
          value={profileData.job_title}
          onChange={handleChange}
          placeholder="Job Title"
        />

        <input
          type="text"
          name="education"
          className="input-field"
          value={profileData.education}
          onChange={handleChange}
          placeholder="Education"
        />  

        <input
          type="text"
          name="experience"
          className="input-field"
          value={profileData.experience}
          onChange={handleChange}
          placeholder="Experience"
        />

        <input
          type="text"
          name="skills"
          className="input-field"
          value={profileData.skills}
          onChange={handleChange}
          placeholder="Skills"
        />

        <label className="label-text" htmlFor="can_ask_for_help">
          Can People Ask for Help?
          <select
            name="can_ask_for_help"
            value={profileData.can_ask_for_help}
            onChange={handleChange}
            className="select-field"
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </label>

        <input
          type="text"
          name="free_times"
          className="input-field"
          value={profileData.free_times}
          onChange={handleChange}
          placeholder="Write Free Times or link for https://app.cal.com/"
        />
      
        <input
          type="text"  
          pattern="[0-9]*"  
          inputMode="numeric"
          name="cost_of_mentoring"
          className="input-field"
          defaultValue={0}
          value={profileData.cost_of_mentoring}
          onChange={handleChange}
          placeholder="Cost of Mentoring per hour"
        />

        
        <select id="currency" name="currency" onChange={handleCurrencyChange}>
          <option value="kgs">KGS</option>
          <option value="usd">USD</option>
        </select>
        <p>/hour</p>

        <button type="submit" className="save-button">
          Save Profile
        </button>
      </form>
    </div>
  );
};

export default connect(null, { update_profile })(EditProfile);



