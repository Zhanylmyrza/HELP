
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { verify } from "../../actions/auth";
import { connect } from "react-redux";
import "../Register/Profile.css"

const ActivationComponent = ({verify}) => {
  const [verified, setVerified] = useState(false);
  const { uid, token } = useParams();
  const navigate = useNavigate();

  const verify_account = () => {
    verify(uid, token);
    setVerified(true);
  };

  if (verified) {
    navigate("/login")
  }

  return (
    <div className="email_confirm">
      
      <p>Thank you for singing up with HELP! ,<br/> Please confirm your email address by clicking the link below </p>
      <button
          onClick={verify_account}
          style={{ marginTop: "50px" }}
          type="button"
          className="verify-button"
        >
          Confirm Email
        </button>
    </div>
  );
};


export default connect(null, {verify})(ActivationComponent);


