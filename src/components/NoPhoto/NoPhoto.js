// import React from 'react'
// import './NoPhoto.css' 

// const NoPhoto = ({fullName}) => {
//   const [firstName, lastName] = fullName.split(" ")

//   return (
//     <p className='container-no-profile' >
//         <h1 >{`${(firstName || "").charAt(0).toUpperCase()}${(lastName || '').charAt(0).toUpperCase()}`}</h1>
//     </p>
//   )
// }
// export default NoPhoto;


import React from 'react';
import './NoPhoto.css';

const NoPhoto = ({ fullName, forContactPage }) => {
  const [firstName, lastName] = fullName.split(" ");

  const containerClass = forContactPage ? 'contacts-no-profile' : 'container-no-profile';

  return (
    <p className={containerClass}>
      <h1>{`${(firstName || "").charAt(0).toUpperCase()}${(lastName || '').charAt(0).toUpperCase()}`}</h1>
    </p>
  );
}

export default NoPhoto;
