import React, { useRef } from "react";
import { StandaloneSearchBox, LoadScript } from "@react-google-maps/api";
import clsx from "clsx";
import { ErrorMessage, useFormikContext } from "formik";
import { useField } from "formik";
interface AutoCompleteProps {
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  name: string[];
  label: string;
  handlePlaceChanged?: () => void;
}
const AutocompleteComponent: React.FC<AutoCompleteProps> = ({
  name,
  label,
  disabled = false,
}) => {
  const { setFieldValue } = useFormikContext();
  const inputRef = useRef<any>();
  const [field] = useField(name[0]);
  const [tempPlace, setTempPlace] = React.useState(null);
  const handlePlaceChanged = () => {
    const place =
      inputRef.current &&
      inputRef.current.getPlaces &&
      inputRef.current.getPlaces()[0];
    if (place) {
      // formatted_address
      setFieldValue(name[1], [
        place.geometry.location.lat(),
        place.geometry.location.lng(),
      ]);
      setFieldValue(name[0], place.formatted_address);
      setFieldValue(name[2], place.formatted_address);
      setTempPlace(place.geometry.location.lng());
    }
  };

  return (
    <div className="w-full">
      <label
        className="
      block 
      text-xs 
      font-medium 
      leading-6 
      text-gray-900
      capitalize
      dark:text-gray-300
    "
      >
        {label}
      </label>
      <LoadScript
        googleMapsApiKey={"AIzaSyANJJyJqbFfqURZc_YQgNpGvAmnR0oBplM"}
        libraries={["places"]}
      >
        <StandaloneSearchBox
          onLoad={(ref) => (inputRef.current = ref)}
          onPlacesChanged={handlePlaceChanged}
        >
          <input
            {...field}
            name={name[0]}
            type="text"
            placeholder="Enter Location"
            className={clsx(
              `w-full 
            bg-transparent
            font-normal p-[6px] 
            focus:ring-2
             ring-main-color
             dark:ring-gray-600
             rounded-sm border
              border-gray-300
              dark:border-gray-700
              dark:text-white
              dark:bg-main-dark-bg 
              focus:outline-none ring-0`,
              disabled && "opacity-50 cursor-default"
            )}
          />
        </StandaloneSearchBox>
      </LoadScript>
      <div className="flex items-center gap-1">
        <ErrorMessage
          name={name[0]}
          component="div"
          className={"text-red-500 text-xs"}
        />
        {!tempPlace && (
          <p className="text-red-500 text-xs">Location is required</p>
        )}
      </div>
    </div>
  );
};

export default AutocompleteComponent;
