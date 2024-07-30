import React from "react";
import Select, { StylesConfig } from "react-select";
import { useField, ErrorMessage } from "formik";
import cn from "@/utils/class-names";
interface SelectProps {
  label: string;
  name: string;
  options: any[]; // Replace 'any' with the type of your options array
  defaultValue?: any;
  isSearchable?: boolean;
  placeholder?: string;
  onChange: (value: any) => void;
  formatOptionLabel?: (option: any) => React.ReactNode;
  onBlur?: () => void;
  getOptionLabel: (option: any) => string;
  getOptionValue: (option: any) => string;
  noOptionsMessage: () => string;
  disabled?: boolean;
  isLoading?: boolean;
  isMulti?: boolean;
  className?: string;
}

const CustomSelect: React.FC<SelectProps> = ({
  label,
  name,
  options,
  defaultValue,
  getOptionLabel,
  getOptionValue,
  formatOptionLabel,
  isSearchable = false,
  placeholder,
  onChange,
  onBlur,
  noOptionsMessage,
  disabled,
  isLoading = false,
  isMulti = true,
  className,
}) => {
  const [, , helpers] = useField(name);
  const { setValue, setTouched } = helpers;
  const handleSelectChange = (selectedOption: any) => {
    setValue(selectedOption);
    onChange(selectedOption);
  };
  const handleBlur = () => {
    setTouched(true);
    onBlur && onBlur();
  };
  const customStyles = (): StylesConfig => ({
    control: (base: any, state: any) => ({
      ...base,
      background: "white", // Set background color to black for the dark theme
      borderRadius: state.isFocused ? "5px" : "5px",
      borderColor: state.isFocused ? "#00BA63" : "darkgray",
      color: "black",
      padding: 2,

      fontWeight: "500",
    }),
    menu: (base: any) => ({
      ...base,
      color: "black",
      background: "white",
      fontWeight: "500",
    }),
    menuList: (base: any) => ({
      ...base,
      background: "white", // Set background color to black for the dark theme
      color: "black",
      fontWeight: "500",
    }),
    option: (base: any) => ({
      ...base,
      background: "white",
      color: "black",
      fontWeight: "500",
    }),
    multiValue: (base: any) => ({
      ...base,
      background: "#008579 ",
      color: "black", // You can set the text color to be light for both themes
    }),
    singleValue: (base: any) => ({
      ...base,
      color: "black", // Set the text color for the selected value
    }),
  });

  return (
    <div className={cn("w-full", className)}>
      <label
        className={` block 
       font-medium
       leading-3
       capitalize
       text-sm mb-1.5
     `}
      >
        {label}
      </label>
      <div className="mt-1">
        <Select
          // {...field}
          name={name}
          options={options}
          isMulti={isMulti}
          defaultValue={defaultValue}
          isSearchable={isSearchable}
          placeholder={placeholder}
          styles={customStyles()}
          onChange={handleSelectChange}
          getOptionLabel={getOptionLabel}
          getOptionValue={getOptionValue}
          onBlur={handleBlur}
          className="w-full font-medium"
          noOptionsMessage={noOptionsMessage}
          isDisabled={disabled}
          isLoading={isLoading}
          formatOptionLabel={formatOptionLabel}
          // isClearable={true}
        />
        <ErrorMessage
          name={name}
          component="div"
          className={"text-xs capitalize text-red-500"}
        />
      </div>
    </div>
  );
};

export default CustomSelect;
