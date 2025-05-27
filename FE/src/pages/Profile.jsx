import React, { useState } from "react";
import MainLayout from "../layout/MainLayout";
import { Tab, Tabs } from "@heroui/react";
import BasicDetails from "../components/user/BasicDetails";
import AdditionalDetails from "../components/user/AdditionalDetails";
import SpouseDetails from "../components/user/SpouseDetails";
import PersonalDetails from "../components/user/PersonalDetails";

function Profile() {
  const [hasSpouse, setHasSpouse] = useState(!false);

  let tabItems = [
    {
      id: "basic_details",
      label: "Basic Details",
      content: <BasicDetails />,
    },
    {
      id: "additional_details",
      label: "Additional Details",
      content: <AdditionalDetails />,
    },
    hasSpouse && {
      id: "spouse_details",
      label: "Spouse Details",
      content: <SpouseDetails />,
    },
    {
      id: "personal_preferences",
      label: "Personal Preferences",
      content: <PersonalDetails />,
    },
  ].filter(Boolean);

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
              <div className="px-10">
              {item.content}
              </div>
            
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
              {item.content}
            </Tab>
          )}
        </Tabs>
      </div>
    </MainLayout>
  );
}

export default Profile;
