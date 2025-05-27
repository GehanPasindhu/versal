import { Input, Radio, RadioGroup, Select, SelectItem } from "@heroui/react";
import React, { useState } from "react";

function InputProfile({
  name,
  label,
  placeholder,
  isRequired = false,
  type = "text",
  onChange,
  onClear,
  isReadOnly = true,
  options = [],
}) {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  return (
    <>
      <div className="flex flex-col justify-center items-start gap-3 w-[70dvw] md:w-full">
        <label className="w-full md:w-80 capitalize">
          {label} {isRequired ? <span className="text-red-500">*</span> : null}
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
            className="max-w-md w-full"
            name={name}
            placeholder={placeholder}
            isRequired={isRequired}
            type={isVisible ? "text" : "password"}
            onChange={onChange}
            isReadOnly={isReadOnly}
          />
        ) : type === "select" ? (
          <>
          <Select isDisabled={isReadOnly}    className="max-w-md w-full">
            {options?.map((selectOptions, index)=>(
              <SelectItem key={index}>
                {selectOptions}
              </SelectItem>
            ))}
          </Select>
          </>
        ) : type === "radio" ? (
          <>
            <RadioGroup isDisabled={isReadOnly} orientation="horizontal">
              {options?.map((radioOption, index) => (
                <Radio key={index} value={radioOption} className="pr-5">
                  {radioOption}
                </Radio>
              ))}
            </RadioGroup>
          </>
        ) : (
          <Input
            endContent={type === "password" ? passwordEndContent : null}
            className="max-w-md w-full"
            name={name}
            placeholder={placeholder}
            isRequired={isRequired}
            type={"text"}
            onChange={onChange}
            isClearable
            onClear={onClear}
           isDisabled={isReadOnly}
          />
        )}
      </div>
    </>
  );
}

export default InputProfile;
