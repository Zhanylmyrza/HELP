import React from 'react'
import { useSelector } from 'react-redux'
import './Saved.css'
import MemberItem from '../../components/Mentors/MemberItem'

const Saved = () => {
  const user = useSelector(state => state.auth.user)
  const savedUsers = user?.saved_persons

  console.log('useruser',  savedUsers)

  return (
    <div className='saved_container'>
      {savedUsers && savedUsers?.map((item) => <MemberItem user={item} showSaveButton={false}/>)}
    </div>
  )
}

export default Saved;

