import React, { useEffect, useRef, useState } from "react";
import ProfileCard from "../../layout/ProfileCard";
import InputProfile from "../InputProfile";
import { toast } from "react-toastify";
import { mainRequestUrl } from "../../api/baseUrl";
import { useCookies } from "react-cookie";
import EditButtons from "../EditButtons";

function BasicDetails({ user, editable = true }) {
  const [imageSrc, setImageSrc] = useState("./images/user.png");
  const fileInputRef = useRef();

  const [formData, setFormData] = useState({
    profilepic: "",
    salutation: "",
    firstname: "",
    lastname: "",
    email: "",
  });

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }

    const imageUrl = URL.createObjectURL(file);
    setImageSrc(imageUrl);

    const formDataImage = new FormData();
    formDataImage.append("files", file);

    try {
      const subdir = "profile_pics";

      const response = await fetch(
        mainRequestUrl(`upload?subdir=${subdir}`),

        {
          method: "POST",

          body: formDataImage,
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log("Uploaded file path:", data.filePath);
        setFormData((prev) => ({
          ...prev,
          profilepic: data.filePath,
        }));
      } else {
        console.error("Upload failed:", data.message);
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current.click();
  };

  useEffect(() => {
    setFormData({
      profilepic: user?.profilepic || "",
      salutation: user?.salutation || "",
      firstname: user?.firstname || "",
      lastname: user?.lastname || "",
      email: user?.email || "",
    });

    if (user?.profilepic) {
      setImageSrc(user?.profilepic);
    }
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
      const res = await fetch(mainRequestUrl("basic_details"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.user_id}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Profile updated successful!");
      } else {
        toast.error("Profile updated failed:", data.message);
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <>
      <ProfileCard>
        <div className="flex w-full flex-col md:flex-row justify-start items-center md:items-start md:px-10 py-5 gap-20">
          <div className="relative w-40 h-40 bg-gray-100 rounded-full overflow-hidden flex items-center justify-center">
            <img
              src={imageSrc}
              alt="Profile"
              className="w-full h-full object-cover rounded-full"
            />
            {!editable && (
              <button
                onClick={triggerFileSelect}
                className="absolute bottom-2 z-[50] right-12 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded hover:bg-opacity-80"
              >
                Upload
              </button>
            )}

            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageChange}
              className="hidden"
            />
          </div>

          <div className="flex flex-col justify-start items-start gap-2">
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
            <InputProfile
              name={"email"}
              label={"Email Address"}
              type="email"
              isRequired
              value={formData.email}
              onChange={(val) => handleInputChange("email", val)}
              isReadOnly={editable}
            />
          </div>
        </div>

        {!editable && <EditButtons onClick={updateProfile} />}
      </ProfileCard>
    </>
  );
}

export default BasicDetails;
