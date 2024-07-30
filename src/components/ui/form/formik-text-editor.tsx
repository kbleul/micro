"use client";
import { Input } from "@/components/ui/input";
import cn from "@/utils/class-names";
import { useField, ErrorMessage, useFormikContext } from "formik";
import QuillEditor from "../quill-editor";
interface FormikTextEditorProps {
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

const FormikTextEditor: React.FC<FormikTextEditorProps> = ({
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
  const { setFieldTouched, setFieldValue } = useFormikContext();
  return (
    <div className={cn("w-full", className)}>
      <div className="mt-1">
        <QuillEditor
          {...field}
          label={label}
          placeholder={placeholder}
          onBlur={() => setFieldTouched(name, true)}
          onChange={(value) => setFieldValue(name, value)}
          className={cn("[&>label>span]:font-medium ", className)}
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

export default FormikTextEditor;
