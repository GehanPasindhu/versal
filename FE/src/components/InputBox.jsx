import { Input } from "@heroui/react";
import React, { useState } from "react";

function InputBox({
  name,
  label,
  placeholder,
  isRequired = false,
  type = "text",
  onChange,
  onClear,
}) {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <>

    <div className="flex flex-col md:flex-row justify-center items-start gap-3 w-full">
        <label className="w-80 md:text-right capitalize">
          {label} {isRequired? <span className="text-red-500">*</span> : null}
        </label>
        {type === "password" ? (
        <Input
          endContent={
            <button
              aria-label="toggle password visibility"
              className="focus:outline-none cursor-pointer"
              type="button"
              onClick={toggleVisibility}
            >
              <img
                src={isVisible ? "./images/eye.png" : "./images/hidden.png"}
                className="w-[16px]  pointer-events-none"
              />
            </button>
          }
          className="max-w-xs"
          name={name}
          placeholder={placeholder}
          isRequired={isRequired}
          type={isVisible ? "text" : "password"}
          onChange={onChange}
          classname="w-full"
        />
      ) : (
        <Input
          endContent={type === "password" ? passwordEndContent : null}
          className="max-w-xs"
          name={name}
          placeholder={placeholder}
          isRequired={isRequired}
          type={"text"}
          onChange={onChange}
          classname="w-full"
          isClearable
          onClear={onClear}
        />
      )}
    </div>
     
    </>
  );
}

export default InputBox;
