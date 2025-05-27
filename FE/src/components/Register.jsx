import { Button, Checkbox, Form, Input } from "@heroui/react";
import React, { useEffect, useState } from "react";
import InputBox from "./InputBox";
import { toast } from "react-toastify";
import { register } from "../api/baseUrl";

function Register({ onChange }) {
  const [form, setForm] = useState({
    user_id: "",
    password: "",
    confirm_password: "",
  });

  const [formValidated, setFormValidated] = useState(false);
  const [error, setError] = useState(false);

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

  const handleConfirmPassword = (e) => {
    const value = e.target.value;

    setForm((prev) => ({
      ...prev,
      confirm_password: value,
    }));

    setError(value !== form.password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    toast.success("Registration successful!")

    register()
  };

  useEffect(() => {
    const allValid = Object.values(form).every((val) => val.trim() !== "");
    const passwordsMatch = form.password === form.confirm_password;
    setFormValidated(allValid && passwordsMatch);
  }, [form]);

  

  return (
    <div>
      <Form
        onSubmit={handleSubmit}
        className="w-full max-w-lg  flex flex-col gap-5"
      >
        <InputBox
          name={"user_id"}
          placeholder={"johndoe@gmail.com"}
          label={"User Id"}
          isRequired={true}
          type={"email"}
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
        <InputBox
          name={"confirm_password"}
          placeholder={"Confirm Password"}
          label={"Confirm Password"}
          isRequired={true}
          type={"password"}
          onChange={handleConfirmPassword}
          onClear={() => handleClear("confirm_password")}
        />

        {error && (
          <div className="text-red-500 text-center w-full md:ml-16">
            Your passwords do not match
          </div>
        )}

        <div className="flex flex-col justify-end items-center md:items-start md:ml-52 gap-3 w-full">
          <Checkbox isDisabled={!formValidated}>Keep me logged in</Checkbox>

          <Button
            isDisabled={!formValidated}
            type="submit"
            className="w-32 uppercase bg-black text-white"
          >
            Register
          </Button>
        </div>
      </Form>

      <div className="mt-10 flex gap-2 justify-center md:ml-10">
        Have an account?
        <button className="underline cursor-pointer" onClick={onChange}>
         Login here
        </button>
      </div>
    </div>
  );
}

export default Register;
