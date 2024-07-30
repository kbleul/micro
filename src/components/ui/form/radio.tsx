import cn from "@/utils/class-names";
import { ErrorMessage, useField } from "formik";
import { StylesConfig } from "react-select";
import { Radio, RadioGroup } from "rizzui";
import Spinner from "../spinner";
import { useState } from "react";

interface RadioProps {
  label: string;
  name: string;
  options: any[]; // Replace 'any' with the type of your options array
  defaultValue?: any;
  onChange: (value: any) => void;
  disabled?: boolean;
  isLoading?: boolean;
  isMutipleAnswer?: boolean;
  className?: string;
  size?: "DEFAULT" | "xl" | "sm" | "lg" | undefined;
}

const RadioSelect: React.FC<RadioProps> = ({
  label,
  name,
  options,
  defaultValue,
  onChange,
  disabled = false,
  isLoading = false,
  isMutipleAnswer = false,
  className,
  size = "sm",
}) => {
  const [value, setValue] = useState("");

  return (
    <article className={cn("w-full", className)}>
      <label
        className={` block 
       font-medium
       leading-3
       capitalize
       text-base mb-1.5
     `}
      >
        {label}
      </label>
      <section className="mt-1">
        <div>
          {isLoading && (
            <div className="w-full flex justify-center">
              <Spinner size="sm" />
            </div>
          )}
          {!isLoading && (
            <RadioGroup
              value={value}
              setValue={(val) => {
                console.dir(val);
                onChange(val);
                setValue(val);
              }}
              className="flex flex-wrap gap-4"
            >
              {options.map((option: any) => (
                <Radio
                  className="font-semibold text=xl"
                  key={option.id}
                  label={option.choice_text.english}
                  value={option.id}
                  disabled={disabled}
                  size={size}
                  variant="outline"
                />
              ))}
            </RadioGroup>
          )}
        </div>

        <ErrorMessage
          name={name}
          component="section"
          className={"text-xs capitalize text-red-500"}
        />
      </section>
    </article>
  );
};

export default RadioSelect;
