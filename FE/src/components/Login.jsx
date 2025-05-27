import { Button, Checkbox, Form, Input } from "@heroui/react";
import React, { useEffect, useState } from "react";
import InputBox from "./InputBox";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";

function Login({ onChange }) {
  const [form, setForm] = useState({
    user_id: "",
    password: "",
  });

  const [formValidated, setFormValidated] = useState(false);

  const [cookies, setCookie] = useCookies(["user_id"]);

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

  const handleSubmit = (e) => {
    e.preventDefault();

    const oneYear = 60 * 60 * 24 * 365;

    setCookie("user_id", "gehan123", {
      path: "/",
      maxAge: oneYear,
      sameSite: 'strict',
      secure: false,
    });

    toast.success("Login successful!")
  };

  useEffect(() => {
    const allValid = Object.values(form).every((val) => val.trim() !== "");
    setFormValidated(allValid);
  }, [form]);

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
          <Checkbox isDisabled={!formValidated}>Keep me logged in</Checkbox>

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
