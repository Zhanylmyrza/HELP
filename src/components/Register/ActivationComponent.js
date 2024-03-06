// ActivationComponent.jsx

import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ActivationComponent = () => {
  const { uid, token } = useParams();
  console.log(uid, token);
  useEffect(() => {
    const activateUser = async () => {
      try {
        await axios.post("http://127.0.0.1:8000/auth/users/activation/", {
          uid,
          token,
        });
        console.log("User activation successful!");
        // Redirect or perform other actions after successful activation
      } catch (error) {
        console.error("Error activating user:", error.response.data);
        // Handle error (display error message, etc.)
      }
    };
    activateUser();
  }, [uid, token]);

  return (
    <div>
      <h1>Activation in progress...</h1>
      {/* You can add a loading spinner or other UI elements here */}
    </div>
  );
};

export default ActivationComponent;



// import React, { useState } from "react";
// import { Link, Navigate, useParams } from "react-router-dom";
// import { connect } from "react-redux";
// import { verify } from "../../actions/auth";

// const ActivationComponent = ({ verify }) => {
//   const [verified, setVerified] = useState(false);
//   const { uid, token } = useParams();

//   const verify_account = () => {
//     verify(uid, token);
//     setVerified(true);
//   };

//   if (verified) {
//     return <Navigate to="/" />;
//   }

//   return (
//     <div className="container">
//       <div
//         className="d-flex flex-column justify-content-center align-items-center"
//         style={{ marginTop: "200px" }}
//       >
//         <h1>Verify your Account:</h1>
//         <button
//           onClick={verify_account}
//           style={{ marginTop: "50px" }}
//           type="button"
//           className="btn btn-primary"
//         >
//           Verify
//         </button>
//       </div>
//     </div>
//   );
// };

// export default connect(null, { verify })(ActivationComponent);

// import React, { useState } from "react";
// import { Link, Navigate, useParams } from "react-router-dom";
// import { connect } from "react-redux";
// import { verify } from "../actions/auth";

// const ActivationComponent = ({ verify }) => {
//   const [verified, setVerified] = useState(false);
//   const { uid, token } = useParams();

//   const verify_account = () => {
//     verify(uid, token);
//     setVerified(true);
//   };

//   if (verified) {
//     return <Navigate to="/" />;
//   }

//   return (
//     <div className="container">
//       <div
//         style={{ marginTop: "200px" }}
//       >
//         <h1>Verify your Account:</h1>
//         <button
//           onClick={verify_account}
//           style={{ marginTop: "50px" }}
//           type="button"
//           className="btn btn-primary"
//         >
//           Verify
//         </button>
//       </div>
//     </div>
//   );
// };

// export default connect(null, { verify })(ActivationComponent);
