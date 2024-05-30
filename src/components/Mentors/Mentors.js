import axios from 'axios'
import React, { useEffect } from 'react'
import { getPersonList } from '../../actions/memberAction'
import { connect, useSelector } from 'react-redux'
import MemberItem from './MemberItem'
import './Mentors.css';
import ReactModal from 'react-modal'


const Mentors = ({getPersonList}) => {

  
  useEffect(() => {
    getPersonList()
  },[])
  
  const {person} = useSelector(state => state.person)
  // console.log('person', person)
  const mentors = person.filter(item => item.can_ask_for_help)
  
  return (
    <div >
            <div className="member-container ">
                {mentors.map(item => <MemberItem user={item} />)}
             
            </div>
        </div>
  )
}
export default connect(null, { getPersonList })(Mentors);


