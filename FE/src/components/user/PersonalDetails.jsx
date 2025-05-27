import React from 'react'
import ProfileCard from '../../layout/ProfileCard'
import InputProfile from '../InputProfile'

function PersonalDetails() {
  return (
    <ProfileCard>
     <div className="flex flex-col justify-start items-start md:px-10 py-5 gap-5">
      <InputProfile name={"salutation"} label={"salutation"} type='select' isRequired options={["Mr","Mrs","Ms"]}/>
      <InputProfile name={"first_name"} label={"First Name"} isRequired />
      <InputProfile name={"last_name"} label={"Last Name"} isRequired />
    </div>
  </ProfileCard>
  )
}

export default PersonalDetails