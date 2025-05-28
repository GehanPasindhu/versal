import { Button, Checkbox, Form, Input } from "@heroui/react";
import React, { useEffect, useState } from "react";
import InputBox from "./InputBox";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { mainRequestUrl } from "../api/baseUrl";

function Login({ onChange }) {
  const [form, setForm] = useState({
    user_id: "",
    password: "",
  });

  const [formValidated, setFormValidated] = useState(false);
  const [checkboxchecked, setCheckBoxChecked] = useState(false)

  const [cookies, setCookie] = useCookies(["user_id"]);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClear = (name) => {
    setForm((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(mainRequestUrl("login"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        const data = await res.json();
        toast.success(data.message);

        const oneYear = 60 * 60 * 24 * 365;

        setCookie("user_id", data.token, {
          path: "/",
          maxAge: oneYear,
          sameSite: "strict",
          secure: false,
        });

        if(checkboxchecked){
          setCookie("checkedUser", data.token, {
            path: "/",
            maxAge: oneYear,
            sameSite: "strict",
            secure: false,
          });
        }

        navigate("/profile");
      } else {

        const errorData = await res.json();
        toast.error("Login failed: " + (errorData.message || "Unknown error"));
      }
    } catch (error) {
      toast.error(error);
    }

  };

  useEffect(() => {
    const allValid = Object.values(form).every((val) => val.trim() !== "");
    setFormValidated(allValid);
  }, [form]);


  const checkBoxChange = (e) =>{
    setCheckBoxChecked(!checkboxchecked)
  }

  return (
    <div>
      <Form
        onSubmit={handleSubmit}
        className="w-full max-w-lg  flex flex-col gap-5"
      >
        <InputBox
          name={"user_id"}
          placeholder={"User ID"}
          label={"User Id"}
          isRequired={true}
          type={"text"}
          onChange={handleChange}
          value={form.user_id}
          onClear={() => handleClear("user_id")}
        />

        <InputBox
          name={"password"}
          placeholder={"Password"}
          label={"Password"}
          isRequired={true}
          type={"password"}
          onChange={handleChange}
          value={form.password}
          onClear={() => handleClear("password")}
        />

        <div className="flex flex-col justify-end items-center md:justify-center md:items-start md:ml-52  gap-3 w-full">
          <Checkbox isDisabled={!formValidated} onValueChange={checkBoxChange}>Keep me logged in</Checkbox>

          <Button
            isDisabled={!formValidated}
            type="submit"
            className="w-32 uppercase bg-black text-white"
          >
            Login
          </Button>
        </div>
      </Form>

      <div className="mt-10 flex gap-2 justify-center md:ml-10">
        No account?
        <button className="underline cursor-pointer" onClick={onChange}>
          Register here
        </button>
      </div>
    </div>
  );
}

export default Login;
