import React from "react";
import { Card, CardBody } from "@heroui/react";

function ProfileCard({ children }) {
  return (
    <Card className="w-full px-10">
      <CardBody className="px-5">{children}</CardBody>
    </Card>
  );
}

export default ProfileCard;
