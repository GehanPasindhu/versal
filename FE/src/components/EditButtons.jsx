import React from "react";
import { useNavigate } from "react-router-dom";

function EditButtons({ onClick }) {

    const navigate = useNavigate();

    const navigateBack = () =>{
        navigate("/profile");
    }

  return (
    <div className="flex flex-row justify-end items-center gap-2 md:px-1 my-5 pt-4">
      <button className="bg-green-300 text-gray-500 text-xs p-3 px-5 font-semibold rounded-xl uppercase cursor-pointer" type="submit" onClick={onClick}>
        Save and update
      </button>
      <button className="bg-yellow-500 text-white p-3 text-xs px-5 font-semibold rounded-xl uppercase cursor-pointer" onClick={navigateBack}>Cancel</button>
    </div>
  );
}

export default EditButtons;
