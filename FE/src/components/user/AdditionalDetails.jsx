import React, { useEffect, useState } from "react";
import ProfileCard from "../../layout/ProfileCard";
import InputProfile from "../InputProfile";
import { useCookies } from "react-cookie";
import { mainRequestUrl } from "../../api/baseUrl";
import { toast } from "react-toastify";
import EditButtons from "../EditButtons";

function AdditionalDetails({ user, editable = true }) {
  const [formData, setFormData] = useState({
    home_address: "",
    country: "",
    postcode: "",
    dob: "",
    gender: "",
    marital_status: "",
  });

  useEffect(() => {
    setFormData({
      home_address: user?.home_address || "",
      country: user?.country || "",
      postcode: user?.postcode || "",
      dob: user?.dob || "",
      gender: user?.gender || "Male",
      marital_status: user?.marital_status || "Single",
    });
  }, [user]);

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [cookies] = useCookies(["user_id"]);

  const updateProfile = async () => {
    try {
      const res = await fetch(mainRequestUrl("additional_details"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.user_id}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Registration successful!");
      } else {
        toast.error("Registration failed:", data.message);
      }
    } catch (error) {
      console.log("Error", error);
    }
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
          isReadOnly={editable}
        />
        <InputProfile
          name="country"
          label="Country"
          isRequired
          value={formData.country}
          onChange={(val) => handleInputChange("country", val)}
          isReadOnly={editable}
        />
        <InputProfile
          name="postcode"
          label="Post Code"
          isRequired
          value={formData.postcode}
          onChange={(val) => handleInputChange("postcode", val)}
          isReadOnly={editable}
        />
        <InputProfile
          name="date_of_birth"
          label="Date of Birth"
          value={formData.dob}
          onChange={(val) => handleInputChange("dob", val)}
          isReadOnly={editable}
        />
        <InputProfile
          name="gender"
          label="Gender"
          type="radio"
          options={["Male", "Female"]}
          value={formData.gender}
          onChange={(val) => handleInputChange("gender", val)}
          isReadOnly={editable}
        />
        <InputProfile
          name="marital_status"
          label="Marital Status"
          type="radio"
          options={["Single", "Married"]}
          value={formData.marital_status}
          onChange={(val) => handleInputChange("marital_status", val)}
          isReadOnly={editable}
        />
      </div>

      {!editable && <EditButtons onClick={updateProfile} />}
    </ProfileCard>
  );
}

export default AdditionalDetails;
