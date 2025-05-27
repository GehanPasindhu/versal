import { Divider } from "@heroui/react";
import React from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { menuItems } from "../assets/menuItems";

function MainLayout({ children, showHandburger = true }) {
  const navigate = useNavigate();

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
      <div className="flex flex-row justify-between items-center gap-10 w-full">
        <div>Logo</div>

        {showHandburger && (
          <div>
            Handburgert
            {menuItems.map((menu, index) => (
              <>
                <div
                  key={index}
                  onClick={() => changePage(menu.value)}
                  className="uppercase cursor-pointer"
                >
                  {menu.name}
                </div>
              </>
            ))}

            <Divider className="my-10"/>

            <button className="uppercase cursor-pointer" onClick={logout}>
              Log out
            </button>
          </div>
        )}
      </div>
      {children}
    </div>
  );
}

export default MainLayout;
