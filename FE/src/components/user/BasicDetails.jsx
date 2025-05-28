import React, { useEffect, useState } from "react";
import ProfileCard from "../../layout/ProfileCard";
import InputProfile from "../InputProfile";

function BasicDetails(user) {
  const [formData, setFormData] = useState({
    salutation: "",
    first_name: "",
    last_name: "",
    email_address: "",
  });

  useEffect(() => {
    setFormData({
      salutation: user?.user?.salutaion || "",
      first_name: user?.user?.firstname || "",
      last_name: user?.user?.lastname || "",
      email_address: user?.user?.email || "",
    });
  }, [user]);

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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
            <InputProfile
              name={"email_address"}
              label={"Email Address"}
              type="email"
              isRequired
              value={formData.email_address}
            />
          </div>
        </div>
      </ProfileCard>
    </>
  );
}

export default BasicDetails;
