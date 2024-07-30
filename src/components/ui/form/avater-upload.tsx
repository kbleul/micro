"use client";
import React from "react";
import cn from "@/utils/class-names";
import { ErrorMessage, useField, useFormikContext } from "formik";
import Dropzone, { DropzoneOptions } from "react-dropzone";
import UploadIcon from "@/components/shape/upload";
import { Text } from "@/components/ui/text";
import Image from "next/image";
import {
  PiFile,
  PiFileCsv,
  PiFileDoc,
  PiFilePdf,
  PiFileXls,
  PiFileZip,
  PiTrashBold,
} from "react-icons/pi";
import { ActionIcon } from "@/components/ui/action-icon";
export interface Accept {
  [key: string]: string[];
}

interface AvaterPickerProps {
  name: string;
  label: string;
  showImage?: boolean;
  className?: string;
  isDoc?: boolean;
  isMultiple?: boolean;
}

const AvaterPicker: React.FC<AvaterPickerProps> = ({
  name,
  label,
  showImage = true,
  className,
  isDoc = false,
  isMultiple = false,
}) => {
  const { setFieldValue } = useFormikContext();
  const [meta] = useField(name);
  const { value } = meta;
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const handleDrop = React.useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) {
        return;
      }

      const file = acceptedFiles[0];
      setFieldValue(name, file);
    },
    [name, setFieldValue]
  );

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      isMultiple
        ? setFieldValue(name, event.target.files)
        : setFieldValue(name, file);
    }
  };

  const dropzoneOptions: DropzoneOptions = {
    maxSize: 3 * 1024 * 1024, // 30 MB
    onDrop: handleDrop,
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "image/webp": [".webp"], // Add webp file format
      // Add more file types if needed
    },
    onDropRejected() {
      alert("In valid file format");
    },
  };

  const fileType = {
    "text/csv": <PiFileCsv className="h-5 w-5" />,
    "text/plain": <PiFile className="h-5 w-5" />,
    "application/pdf": <PiFilePdf className="h-5 w-5" />,
    "application/xml": <PiFileXls className="h-5 w-5" />,
    "application/zip": <PiFileZip className="h-5 w-5" />,
    "application/gzip": <PiFileZip className="h-5 w-5" />,
    "application/msword": <PiFileDoc className="h-5 w-5" />,
  } as { [key: string]: React.ReactElement };
  return (
    <div
      className={cn(
        "w-full flex flex-col items-start space-y-[6px]",
        className
      )}
    >
      <label className=" block font-medium">{label}</label>

      <Dropzone {...dropzoneOptions}>
        {({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
          <section className="w-full flex flex-col items-start space-y-2">
            <div
              {...getRootProps()}
              onClick={handleClick}
              className={`border ${
                isDragActive
                  ? "border-main-color border-2 bg-main-green-bg"
                  : isDragReject
                  ? "border-red-500"
                  : "bg-zinc-100"
              } w-full p-5 md:ps-10 relative border rounded-xl cursor-pointer duration-75 ease-in-out  `}
            >
              <input
                {...getInputProps()}
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: "none" }}
                accept={isDoc ? ".doc, .docx, .pdf, .zip, .gzip" : "image/*"}
                multiple={isMultiple}
              />
              <div className="flex flex-col items-center justify-center">
                <UploadIcon className="mx-auto h-12 w-12" />
                <Text className="font-medium">Drop or select file</Text>
              </div>
            </div>
          </section>
        )}
      </Dropzone>

      {isMultiple && value && value.length > 0 && (
        <p>{value.length} images selected</p>
      )}

      {value && !isMultiple && (
        <div
          className="flex min-h-[58px] w-full items-center rounded-xl border border-gray-200 px-3 dark:border-gray-300"
          key={value.name}
        >
          <div className="relative flex h-16 w-16 flex-shrink-0 items-center justify-center overflow-hidden rounded-lg border border-gray-200 bg-gray-50 object-cover px-2 py-1.5 dark:bg-transparent">
            {value && value?.type?.includes("image") ? (
              <Image
                src={URL.createObjectURL(value)}
                fill
                className="object-contain"
                priority
                alt={value.name}
                sizes="(max-width: 768px) 100vw"
              />
            ) : //

            value.url ? (
              <Image
                src={value.url}
                fill
                className="object-contain"
                priority
                alt={value.name}
                sizes="(max-width: 768px) 100vw"
              />
            ) : (
              <>{fileType[value.type]}</>
            )}
          </div>
          <div className="truncate px-2.5">{value.name}</div>
          <ActionIcon
            onClick={() => {
              setFieldValue(name, undefined);
            }}
            size="sm"
            variant="flat"
            color="danger"
            className="ms-auto flex-shrink-0 p-0 dark:bg-red-dark/20"
          >
            <PiTrashBold className="w-6" />
          </ActionIcon>
        </div>
      )}
      <ErrorMessage
        name={name}
        component="div"
        className={"text-xs capitalize text-red-500 pt-1 font-medium"}
      />
    </div>
  );
};

export default AvaterPicker;
