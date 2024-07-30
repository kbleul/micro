"use client";
import { Textarea } from "@/components/ui/textarea";
import cn from "@/utils/class-names";
import { useField, ErrorMessage } from "formik";
interface FormikTextAreaProps {
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
}

const FormikTextArea: React.FC<FormikTextAreaProps> = ({
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
}) => {
  const [field] = useField(name);
  return (
    <div className={cn("w-full", className)}>
      <div className="mt-1">
        <Textarea
          autoComplete="off"
          {...field}
          label={label}
          name={name}
          placeholder={placeholder}
          className={cn("[&>label>span]:font-medium customScroll", className)}
          color={color}
          disabled={disabled}
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

export default FormikTextArea;
