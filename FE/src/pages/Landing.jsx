import React, { useEffect, useState } from "react";
import Login from "../components/Login";
import Register from "../components/Register";
import MainLayout from "../layout/MainLayout";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

function Landing() {
  const [loginPage, setLoginPage] = useState(true);

  const [cookies] = useCookies(["user_id"]);
  const navigate = useNavigate();

  useEffect(() => {
    if (cookies.user_id) {
      navigate("/home");
    }
  }, [cookies, navigate]);

  return (
    <>
      <MainLayout showHandburger={false}>
        <div className="w-full justify-center items-center flex flex-col gap-5 ">
          <div className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl py-10">
            Welcome to <span className="font-extrabold">myApp</span>
          </div>

          {loginPage ? (
            <Login onChange={() => setLoginPage(false)} />
          ) : (
            <Register onChange={() => setLoginPage(true)} />
          )}
        </div>
      </MainLayout>
    </>
  );
}

export default Landing;
