import React from 'react'
import "../Register/Profile.css"
import emailwithnotebook from "../../images/emailwithnotebook.png";


const Emailconfirm = () => {
  return (
    <div className='email_confirm'>
      <div className="confirm-image">
        <img src={emailwithnotebook} alt="img" />
      </div>
      <div style={{marginTop:'15rem'}}>
        <h3>Almost there!</h3>
        <p>Let's confirm your email address.</p>
        <p>Go to your email to finish registration process.</p>
      </div>
      
    </div>
  )
}

export default Emailconfirm
