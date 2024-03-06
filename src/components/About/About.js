import React from 'react';
import "./About.css";
import about from '../../images/about.png'

const About = () => {
  return (
    <div >
      <div className='container'>
        <img className='imgage' src={about} alt="about" />
      </div>
      
    </div>
  )
}

export default About
