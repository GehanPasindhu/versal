import React, { useEffect, useState } from "react";
import ProfileCard from "../../layout/ProfileCard";
import InputProfile from "../InputProfile";

function SpouseDetails(user) {
  const [formData, setFormData] = useState({
    salutation: "",
    first_name: "",
    last_name: "",
  });

  useEffect(() => {
    setFormData({
      salutation: user?.user?.spouse_details?.salutaion || "",
      first_name: user?.user?.spouse_details?.firstname || "",
      last_name: user?.user?.spouse_details?.lastname || "",
    });
  }, [user]);

  return (
    <ProfileCard>
      <div className="flex w-full flex-col justify-start items-start md:px-10 py-5 gap-5">
      <InputProfile
              name={"salutation"}
              label={"salutation"}
              type="select"
              isRequired
              options={["Mr", "Mrs", "Ms"]}
              value={formData.salutation}
            />
            <InputProfile
              name={"first_name"}
              label={"First Name"}
              isRequired
              value={formData.first_name}
            />
            <InputProfile
              name={"last_name"}
              label={"Last Name"}
              isRequired
              value={formData.last_name}
            />
      </div>
    </ProfileCard>
  );
}

export default SpouseDetails;
