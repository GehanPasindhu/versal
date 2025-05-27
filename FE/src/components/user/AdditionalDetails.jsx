import React from "react";
import ProfileCard from "../../layout/ProfileCard";
import InputProfile from "../InputProfile";

function AdditionalDetails() {
  return (
    <ProfileCard>
      <div className="flex w-full flex-col justify-start items-start md:px-10 py-5 gap-5">
        <div className="flex flex-col md:flex-row justify-start items-start gap-10">
          <InputProfile
            name={"home_address"}
            label={"Home Address"}
            isRequired
          />
          <InputProfile name={"country"} label={"country"} isRequired />
        </div>
        <div className="flex flex-col md:flex-row justify-start items-start gap-10">
          <InputProfile name={"post_code"} label={"Post Code"} isRequired />
          <InputProfile
            name={"date_of_birth"}
            label={"Date of Birth"}
          />
        </div>
        <div className="flex flex-col md:flex-row justify-start items-start gap-10">
          <InputProfile
            name={"gender"}
            label={"Gender"}
            type="radio"
            options={["Male", "Female"]}
          />
          <InputProfile
            name={"marital_status"}
            label={"Marital Status"}
            type="radio"
            options={["Single", "Married"]}
          />
        </div>
      </div>
    </ProfileCard>
  );
}

export default AdditionalDetails;
