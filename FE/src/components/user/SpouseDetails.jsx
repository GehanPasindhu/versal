import React from "react";
import ProfileCard from "../../layout/ProfileCard";
import InputProfile from "../InputProfile";

function SpouseDetails() {
  return (
    <ProfileCard>
        <div className="flex w-full flex-col justify-start items-start md:px-10 py-5 gap-5">
      <InputProfile name={"salutation"} label={"salutation"} type='select' options={["Mr","Mrs","Ms"]}/>
        <InputProfile name={"first_name"} label={"First Name"}  />
        <InputProfile name={"last_name"} label={"Last Name"}  />
      </div>
    </ProfileCard>
  );
}

export default SpouseDetails;
