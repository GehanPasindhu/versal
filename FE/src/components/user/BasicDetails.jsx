import React from "react";
import ProfileCard from "../../layout/ProfileCard";
import InputProfile from "../InputProfile";

function BasicDetails() {
  return (
    <>
      <ProfileCard>
        <div className="flex w-full flex-col md:flex-row justify-start items-center md:items-start md:px-10 py-5 gap-20">
          <div className="w-40 h-40 bg-gray-100 rounded-full flex">
            <img src="./images/user.png" className="object-full rounded-full" />
          </div>
          <div className="flex flex-col justify-start items-start gap-2">
            <InputProfile
              name={"salutation"}
              label={"salutation"}
              type="select"
              isRequired
              options={["Mr", "Mrs", "Ms"]}
            />
            <InputProfile name={"first_name"} label={"First Name"} isRequired />
            <InputProfile name={"last_name"} label={"Last Name"} isRequired />
            <InputProfile
              name={"email_address"}
              label={"Email Address"}
              type="email"
              isRequired
            />
          </div>
        </div>
      </ProfileCard>
    </>
  );
}

export default BasicDetails;
