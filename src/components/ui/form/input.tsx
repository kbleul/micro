"use client";
import { Input } from "@/components/ui/input";
import cn from "@/utils/class-names";
import { useField, ErrorMessage } from "formik";
import appendAsterisk from "./asterrisk";
interface FormikInputProps {
  label: string;
  name: string;
  disabled?: boolean;
  type?:
    | "number"
    | "text"
    | "date"
    | "datetime-local"
    | "email"
    | "month"
    | "search"
    | "tel"
    | "time"
    | "time24"
    | "url"
    | "week"
    | undefined;
  placeholder?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  className?: string;
  inputClassName?: string;
  color?:
    | "DEFAULT"
    | "primary"
    | "secondary"
    | "danger"
    | "info"
    | "success"
    | "warning"
    | undefined;
    isRequired?: boolean;
    labelClassName?: string
}




const FormikInput: React.FC<FormikInputProps> = ({
  label,
  type = "text",
  name,
  placeholder,
  prefix,
  suffix,
  className,
  inputClassName,
  color,
  disabled = false,
  isRequired = false, 
  labelClassName

}) => {
  const [field] = useField(name);
  return (
    <div className={cn("w-full", className)}>
      <div className="mt-1">
        <Input
          autoComplete="off"
          {...field}
          // @ts-ignore
          type={type}
          label={appendAsterisk(label, isRequired)}
          name={name}
          prefix={prefix}
          suffix={suffix}
          placeholder={placeholder}
          className={cn("[&>label>span]:font-medium ", className)}
          inputClassName={cn("text-sm ", inputClassName)}
          color={color}
          disabled={disabled}
          labelClassName={cn()}
        />
        <ErrorMessage
          name={name}
          component="div"
          className={"text-xs capitalize text-red-500 pt-1 font-medium"}
        />
      </div>
    </div>
  );
};

export default FormikInput;
