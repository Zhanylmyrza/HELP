// Profile.jsx

import React, { useState } from "react";
import "./Profile.css"; // Import the CSS file

const Profile = () => {
  const [profileData, setProfileData] = useState({
    full_name: "",
    image: "",
    job_title: "",
    education: "",
    experience: "",
    skills: "",
    can_ask_for_help: "yes",
    free_times: "",
    cost_of_mentoring: "",
    is_saved: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    // Handle the file upload logic here
    // For now, just update the state with the file name
    setProfileData((prevData) => ({
      ...prevData,
      image: file ? file.name : "",
    }));
  };

  return (
    <div className="profile-container">
      <form className="profile-form">
        <input
          type="text"
          id="full_name"
          name="full_name"
          className="input-field"
          value={profileData.full_name}
          onChange={handleChange}
          placeholder="Full Name"
        />

        <label className="upload-label">Upload Image:</label>
        <div className="upload-field">
          <input
            type="file"
            accept="image/*"
            id="image"
            name="image"
            className="input-field"
            onChange={handleImageChange}
          />
           <label htmlFor="image" className="upload-button">
              Upload
            </label>
        </div>

        <input
          type="text"
          name="job_title"
          className="input-field"
          value={profileData.job_title}
          onChange={handleChange}
          placeholder="Job Title"
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
          name="cost_of_mentoring"
          className="input-field"
          value={profileData.cost_of_mentoring}
          onChange={handleChange}
          placeholder="Cost of Mentoring"
        />

        {/* <input
          type="checkbox"
          name="is_saved"
          checked={profileData.is_saved}
          onChange={() =>
            setProfileData((prevData) => ({
              ...prevData,
              is_saved: !prevData.is_saved,
            }))
          }
          id="is_saved"
        /> */}
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
        </label>

        <button type="submit" className="save-button">
          Save Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;
