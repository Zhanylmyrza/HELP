
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { verify } from "../../actions/auth";
import { connect } from "react-redux";

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
    <div>
      <h1>Activation in progress...</h1>
      <button
          onClick={verify_account}
          style={{ marginTop: "50px" }}
          type="button"
          className="btn btn-primary"
        >
          Verify
        </button>
    </div>
  );
};


export default connect(null, {verify})(ActivationComponent);


