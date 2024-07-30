import React from "react";
import { useFormikContext } from "formik";
import Dropzone, { DropzoneOptions } from "react-dropzone";
import { FaFileExcel } from "react-icons/fa";
import { read, utils } from "xlsx";
import { areArrayLengthEqual } from "@/utils/array-func";
interface ReusableDropzoneProps {
  name: string;
  maxFiles?: number;
  columnHeaders: string[];
}

type Transaction = {
  currency_id: string;
  buying: number | undefined;
  selling: number | undefined;
};
export interface ITransactionForm {
  date: string;
  transaction_exchange: Transaction[] | Array<any>;
  actionId?: string;
}

const ReusableDropzone: React.FC<ReusableDropzoneProps> = ({
  name,
  maxFiles = 1,
  columnHeaders,
}) => {
  const { setFieldValue } = useFormikContext();
  const [files, setFiles] = React.useState<FileList | File[] | null>([]);
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const handleDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) {
      return;
    }

    const file = acceptedFiles[0];
    setFieldValue(name, file);
    setFiles([...acceptedFiles]);
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file: FileList | null = event.target.files && event.target.files;
    if (file) {
      const f = file[0];
      const reader = new FileReader();

      setFiles(file);

      reader.onload = function (e) {
        const data = e.target?.result;
        if (data) {
          const excelData = read(data, { type: "binary" });
          const wsName = excelData.SheetNames[0];
          const ws = excelData.Sheets[wsName];

          /* Convert array to json*/
          const dataParse: string[][] = utils.sheet_to_json(ws, {
            header: 1,
            raw: false,
            dateNF: 'dd"."mm"."yyyy',
          });
          console.log("---->", dataParse);

          if (!areArrayLengthEqual(columnHeaders, dataParse[0])) {
            alert("Invalid column type");
            return;
          }

          setFieldValue(name, dataParse);
        }
      };
      reader.readAsBinaryString(f);
      // setFiles(file);
    }
  };

  const dropzoneOptions: DropzoneOptions = {
    maxFiles,
    onDrop: handleDrop,
    accept: {
      "text/csv": [".csv"],
      "application/vnd.ms-excel": [".xls", ".xlsx"],
    },
    onDropRejected() {
      alert("Invalid file format");
    },
  };

  return (
    <Dropzone {...dropzoneOptions}>
      {({ getRootProps, getInputProps }) => (
        <section className="w-full flex flex-col items-start space-y-2">
          <div
            {...getRootProps()}
            className="border border-gray-400 border-dashed rounded-md cursor-pointer w-full p-12 flex items-center space-x-3 justify-center bg-white "
            onClick={handleClick}
          >
            <input
              {...getInputProps()}
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
            {files ? (
              <h2 className="font-medium text-gray-color  ">File Upload</h2>
            ) : (
              <FaFileExcel size={50} className="text-main-color" />
            )}
            {!files && (
              <div>
                <h2 className="font-medium text-gray-color  ">
                  Drop or Select file
                </h2>
              </div>
            )}
          </div>

          {files && files.length === 0 ? (
            <p className="text-sm text-red-600">* File not uploaded yet!</p>
          ) : (
            <div>
              <p className="text-sm text-green-600">* File uploaded!</p>
              <p>{files && files[0]?.name}</p>
            </div>
          )}
        </section>
      )}
    </Dropzone>
  );
};

export default ReusableDropzone;
