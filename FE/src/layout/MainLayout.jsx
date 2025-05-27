import { Divider } from "@heroui/react";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { menuItems } from "../assets/menuItems";
import { motion, AnimatePresence } from "framer-motion";


function MainLayout({ children, showHandburger = true }) {
  const navigate = useNavigate();

  const [showNav, setShowNav] = useState(false);

  const [cookies, setCookie, removeCookie] = useCookies(["user_id"]);

  const logout = () => {
    removeCookie("user_id", { path: "/" });
    toast.warning("You have successfully logged out.");
    navigate("/");
  };

  const changePage = (page) => {
    navigate(`/${page}`);
  };

  return (
    <div className="bg-red-50 min-h-screen w-screen p-10 flex flex-col justify-start items-start gap-10">
      <div className="flex flex-row justify-between items-start gap-10 w-full">
        <img src="./images/mclogo.png" className="w-20" />

        {showHandburger && (
          <>
            <div
              className="flex flex-col justify-end items-end gap-0.5 cursor-pointer"
              onClick={() => setShowNav(true)}
            >
              <div className="w-6 h-1 bg-black/60 rounded-xl cursor-pointer"></div>
              <div className="w-5 h-1 bg-black/60 rounded-xl cursor-pointer"></div>
              <div className="w-4 h-1 bg-black/60 rounded-xl cursor-pointer"></div>
            </div>
          </>
        )}

        {showNav && (
        <AnimatePresence>
        {showNav && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{
              opacity: 0,
              x: 100,
              transition: { duration: 0.8, ease: "easeInOut" }
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute bg-white top-0 right-0 w-52 h-svh py-5 px-5 gap-10 shadow-lg"
          >
            <div
              className="relative cursor-pointer text-3xl text-right w-full font-semibold mb-4"
              onClick={() => setShowNav(false)}
            >
              x
            </div>
      
            {menuItems.map((menu, index) => (
              <div
                key={index}
                onClick={() => changePage(menu.value)}
                className="uppercase cursor-pointer"
              >
                {menu.name}
              </div>
            ))}
      
            <Divider className="my-10" />
      
            <button className="uppercase cursor-pointer" onClick={logout}>
              Log out
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      
        )}
      </div>
      {children}
    </div>
  );
}

export default MainLayout;
