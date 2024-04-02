import axios from 'axios'
import React, { useEffect } from 'react'
import MemberItem from '../Mentors/MemberItem'
import { getPersonList } from '../../actions/memberAction'
import { connect, useSelector } from 'react-redux'

const Mentees = ({getPersonList}) => {

  
  useEffect(() => {
    getPersonList()
  },[])
  
  const {person} = useSelector(state => state.person)
  console.log('person', person)
  const mentees = person.filter(item => !item.can_ask_for_help)
  
  return (
    <div className="center-container">
            <div className="profile-container">
                <h1>Mentees</h1>
                {mentees.map(item => <MemberItem user={item} />)}
            </div>
        </div>
  )
}
export default connect(null, { getPersonList })(Mentees);


