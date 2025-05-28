import React, { useEffect, useState } from "react";
import ProfileCard from "../../layout/ProfileCard";
import InputProfile from "../InputProfile";
import { useCookies } from "react-cookie";
import { mainRequestUrl } from "../../api/baseUrl";
import { toast } from "react-toastify";
import EditButtons from "../EditButtons";

function PersonalDetails({ user, editable = true }) {
  const [formData, setFormData] = useState({
    hobbies_and_interests: [],
    favourite_sports: [],
    preferred_music_genres: [],
    preferred_movies_tv_shows: [],
  });

  useEffect(() => {
    setFormData({
      hobbies_and_interests: user?.hobbies_and_interests || [],
      favourite_sports: user?.favourite_sports || [],
      preferred_music_genres: user?.preferred_music_genres || [],
      preferred_movies_tv_shows: user?.preferred_movies_tv_shows || [],
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
      const res = await fetch(mainRequestUrl("preferences"), {
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
    name="hobbies_and_interests"
    label="Hobbies & Interests (comma separated)"
    value={formData.hobbies_and_interests?.join(", ") || ""}
    onChange={(val) =>
      handleInputChange("hobbies_and_interests", val.split(",").map(s => s.trim()))
    }
    isReadOnly={editable}
  />
  <InputProfile
    name="favourite_sports"
    label="Favourite Sports (comma separated)"
    value={formData.favourite_sports?.join(", ") || ""}
    onChange={(val) =>
      handleInputChange("favourite_sports", val.split(",").map(s => s.trim()))
    }
    isReadOnly={editable}
  />
  <InputProfile
    name="preferred_music_genres"
    label="Preferred Music Genres (comma separated)"
    value={formData.preferred_music_genres?.join(", ") || ""}
    onChange={(val) =>
      handleInputChange("preferred_music_genres", val.split(",").map(s => s.trim()))
    }
    isReadOnly={editable}
  />
  <InputProfile
    name="preferred_movies_tv_shows"
    label="Preferred Movies/TV Shows (comma separated)"
    value={formData.preferred_movies_tv_shows?.join(", ") || ""}
    onChange={(val) =>
      handleInputChange("preferred_movies_tv_shows", val.split(",").map(s => s.trim()))
    }
    isReadOnly={editable}
  />
      </div>

      {!editable && <EditButtons onClick={updateProfile} />}
    </ProfileCard>
  );
}


export default PersonalDetails