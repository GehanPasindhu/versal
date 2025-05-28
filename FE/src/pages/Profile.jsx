import React, { useEffect, useState } from "react";
import MainLayout from "../layout/MainLayout";
import { Tab, Tabs } from "@heroui/react";
import BasicDetails from "../components/user/BasicDetails";
import AdditionalDetails from "../components/user/AdditionalDetails";
import SpouseDetails from "../components/user/SpouseDetails";
import PersonalDetails from "../components/user/PersonalDetails";
import { mainRequestUrl } from "../api/baseUrl";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";

function Profile() {
  const [hasSpouse, setHasSpouse] = useState(!false);
  const [userData, setUserData] = useState([]);
  const [token, setToken] = useState("")

  let tabItems = [
    {
      id: "basic_details",
      label: "Basic Details",
      content:({user}) => <BasicDetails user={user}/>,
    },
    {
      id: "additional_details",
      label: "Additional Details",
      content:({user}) =>  <AdditionalDetails user={user}/>,
    },
    hasSpouse && {
      id: "spouse_details",
      label: "Spouse Details",
      content: ({user})  => <SpouseDetails user={user}/>,
    },
    {
      id: "personal_preferences",
      label: "Personal Preferences",
      content: ({user}) => <PersonalDetails user={user}/>,
    },
  ].filter(Boolean);

  
const [cookies] = useCookies(["user_id"]);

const getUser = async (token) => {
  try {
    const response = await fetch(mainRequestUrl("user"), {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      toast.error(`Error: ${errorData.message || response.statusText}`);
      return;
    }

    const data = await response.json();
    setUserData(data.user);
  } catch (error) {
    toast.error("Failed to fetch user data");
  }
};

useEffect(() => {
  if (cookies.user_id) {
    getUser(cookies.user_id);
  }
}, [cookies.user_id]);

  return (
    <MainLayout>
      <div className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">
        My <span className="font-extrabold">Profile</span>
      </div>

      <div className="hidden md:block">
        <Tabs
          aria-label="My Profile"
          items={tabItems}
          size="md"
          className="w-80 md:w-full"
          isVertical
          variant="underlined"
        >
          {(item) => (
            <Tab
              key={item.id}
              title={
                <div className="w-60 text-left px-5 uppercase">
                  {item.label}
                </div>
              }
            >
              <div className="px-10">{item.content({user:userData})}</div>
            </Tab>
          )}
        </Tabs>
      </div>
      <div className="block md:hidden">
        <Tabs
          aria-label="My Profile"
          items={tabItems}
          size="md"
          className="w-80 md:w-full"
        >
          {(item) => (
            <Tab key={item.id} title={item.label}>
              {item.content({user:userData})}
            </Tab>
          )}
        </Tabs>
      </div>
    </MainLayout>
  );
}

export default Profile;
