import React, { useEffect, useState } from "react";
import ProfileCard from "../../layout/ProfileCard";
import InputProfile from "../InputProfile";
import { toast } from "react-toastify";
import { mainRequestUrl } from "../../api/baseUrl";
import { useCookies } from "react-cookie";
import EditButtons from "../EditButtons";

function SpouseDetails({ user, editable = true }) {
  const [formData, setFormData] = useState({
    salutation: "",
    firstname: "",
    lastname: "",
  });

  useEffect(() => {
    setFormData({
      salutation: user?.spouse_details?.salutation || "",
      firstname: user?.spouse_details?.firstname || "",
      lastname: user?.spouse_details?.lastname || "",
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
      const res = await fetch(mainRequestUrl("spouse_details"), {
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
          name={"salutation"}
          label={"salutation"}
          type="select"
          isRequired
          options={["Mr", "Mrs", "Ms"]}
          value={formData.salutation}
          isReadOnly={editable}
          onChange={(val) => handleInputChange("salutation", val)}
        />
        <InputProfile
          name={"firstname"}
          label={"First Name"}
          isRequired
          value={formData.firstname}
          onChange={(val) => handleInputChange("firstname", val)}
          isReadOnly={editable}
        />
        <InputProfile
          name={"lastname"}
          label={"Last Name"}
          isRequired
          value={formData.lastname}
          onChange={(val) => handleInputChange("lastname", val)}
          isReadOnly={editable}
        />
      </div>

      {!editable && <EditButtons onClick={updateProfile} />}
    </ProfileCard>
  );
}

export default SpouseDetails;
