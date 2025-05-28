import React, { useEffect, useState } from "react";
import ProfileCard from "../../layout/ProfileCard";
import InputProfile from "../InputProfile";

function AdditionalDetails({ user }) {
  const [formData, setFormData] = useState({
    home_address: "",
    country: "",
    post_code: "",
    date_of_birth: "",
    gender: "",
    marital_status: "",
  });

  useEffect(() => {
    setFormData({
      home_address: user?.user?.home_address || "",
      country: user?.user?.country || "",
      post_code: user?.user?.postcode || "",
      date_of_birth: user?.user?.dob || "",
      gender: user?.user?.gender || "Male",
      marital_status: user?.user?.marital_status || "Single",
    });
  }, [user]);

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <ProfileCard>
      <div className="flex w-full flex-col justify-start items-start md:px-10 py-5 gap-5">
        <InputProfile
          name="home_address"
          label="Home Address"
          isRequired
          value={formData.home_address}
          onChange={(val) => handleInputChange("home_address", val)}
          
        />
        <InputProfile
          name="country"
          label="Country"
          isRequired
          value={formData.country}
          onChange={(val) => handleInputChange("country", val)}
          
        />
        <InputProfile
          name="post_code"
          label="Post Code"
          isRequired
          value={formData.post_code}
          onChange={(val) => handleInputChange("post_code", val)}
          
        />
        <InputProfile
          name="date_of_birth"
          label="Date of Birth"
          value={formData.date_of_birth}
          onChange={(val) => handleInputChange("date_of_birth", val)}
          
        />
        <InputProfile
          name="gender"
          label="Gender"
          type="radio"
          options={["Male", "Female"]}
          value={formData.gender}
          onChange={(val) => handleInputChange("gender", val)}
          
        />
        <InputProfile
          name="marital_status"
          label="Marital Status"
          type="radio"
          options={["Single", "Married"]}
          value={formData.marital_status}
          onChange={(val) => handleInputChange("marital_status", val)}
          
        />
      </div>
    </ProfileCard>
  );
}

export default AdditionalDetails;
