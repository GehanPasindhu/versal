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
  value = "",
}) {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleChange = (e) => {
    if (onChange) onChange(e.target.value);
  };
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
            onChange={handleChange}
            value={value}
            isReadOnly={isReadOnly}
            aria-label={label}
          />
        ) : type === "select" ? (
          <>
            <Select
              aria-label={label}
              selectedKeys={[value]}
              onChange={(e) => onChange && onChange(e.target.value)}
              isDisabled={isReadOnly}
              className="max-w-md w-full"
            >
              {options?.map((selectOptions, index) => (
                <SelectItem key={index} value={selectOptions}>
                  {selectOptions}
                </SelectItem>
              ))}
            </Select>
          </>
        ) : type === "radio" ? (
          <>
            <RadioGroup
              value={value}
              aria-label={label}
              onChange={(e) => onChange && onChange(e.target.value)}
              isDisabled={isReadOnly}
              orientation="horizontal"
            >
              {options?.map((radioOption, index) => (
                <Radio key={index} value={radioOption} className="pr-5">
                  {radioOption}
                </Radio>
              ))}
            </RadioGroup>
          </>
        ) : (
          <Input
            aria-label={label}
            endContent={type === "password" ? passwordEndContent : null}
            className="max-w-md w-full"
            name={name}
            placeholder={placeholder}
            isRequired={isRequired}
            type={"text"}
            isClearable
            onClear={onClear}
            isDisabled={isReadOnly}
            onChange={handleChange}
            value={value}
          />
        )}
      </div>
    </>
  );
}

export default InputProfile;
