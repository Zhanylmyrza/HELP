import axios from 'axios'
import React, { useEffect } from 'react'
import MemberItem from '../Mentors/MemberItem'
import { getPersonList } from '../../actions/memberAction'
import { connect, useSelector } from 'react-redux'
import './Mentees.css';

const Mentees = ({getPersonList}) => {

  
  useEffect(() => {
    getPersonList()
  },[])
  
  const {person} = useSelector(state => state.person)
  console.log('person', person)
  const mentees = person.filter(item => !item.can_ask_for_help)
  
  return (
    <div className="member-container">
      {mentees.map(item => <MemberItem user={item} />)}
    </div>
  )
}
export default connect(null, { getPersonList })(Mentees);


