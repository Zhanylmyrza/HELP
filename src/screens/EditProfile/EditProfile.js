// Profile.jsx

import React, { useState } from "react";
import "./EditProfile.css"; 
import { connect, useSelector } from "react-redux";
import { update_profile } from "../../actions/auth";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const profile1 = {
  email: "saikal@gmail.com",
  full_name: "Zhanylmyrza Bakirova",
  job_title:"Software Engeneer",
  education:"International Ala-Too University",
  experience:"4 year in IBM Company",
  skills:"Python, Django, Rest Framework, JS, React, PostgreSQL, JAVA, Spring",
  can_ask_for_help:"yes",
  free_times:"https://cal.com/zhanylmyrza/30min",
  cost_of_mentoring:"890",
  is_saved:"yes",
  // image: "https://gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
}

const  EditProfile = ({update_profile}) => {
  const navigate = useNavigate();

  const profile = useSelector(state => state.auth.user)
  console.log('profile1', profile)

  const initialValues = {
    full_name: profile.full_name || "",
    // image: profile.image || "",
    job_title: profile.job_title || "",
    education: profile.education || "",
    experience: profile.experience || "",
    skills: profile.skills || "",
    can_ask_for_help: profile.can_ask_for_help || "yes",
    free_times: profile.free_times || "",
    cost_of_mentoring: profile.cost_of_mentoring || "",
    is_saved: profile.is_saved || false,
  }

  const [profileData, setProfileData] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  console.log('image', profileData.image)

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    // Handle the file upload here (you might want to use FormData and send it to a server)

    // For now, just update the state with the file name
    setProfileData((prevData) => ({
      ...prevData,
      image: file ? file.name : "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Add any additional logic you want to perform on form submission
    console.log("Form submitted!", profileData);
    console.log("profileData", profileData, profile.email)
    try {
      update_profile(profileData, profile.email);
      navigate('/profile')
    } catch (err){
      console.log('---->>>> err',err)
      console.log(err)
    }
  };


  return (
    <div className="profile-container">
      <form className="profile-form" onSubmit={handleSubmit}>
        <input
          type="text"
          id="full_name"
          name="full_name"
          className="input-field"
          value={profileData.full_name}
          onChange={handleChange}
          placeholder="Full Name"
        />

        <label >Upload Image:</label>
        <div>
        <img src={profileData.image} />
          <input
            type="file"
            accept="image/*"
            id="image"
            name="image"
            onChange={handleImageChange}
          />
          <button type="submit" >
            Upload
          </button>
        </div>

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
          value={profileData.cost_of_mentoring}
          onChange={handleChange}
          placeholder="Cost of Mentoring per hour"
        />
        <select id="currency" name="currency">
          <option value="kgs">KGS</option>
          <option value="usd">USD</option>
        </select>
        <p>/hour</p>
      
{/*         
        <label htmlFor="is_saved" className="checkbox-label">
          Is Saved
          <select
            name="is_saved"
            value={profileData.is_saved}
            onChange={handleChange}
            className="select-field"
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </label> */}

        <button type="submit" className="save-button">
          Save Profile
        </button>
      </form>
    </div>
  );
};

export default connect(null, { update_profile })(EditProfile);

