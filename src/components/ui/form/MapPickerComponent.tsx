import MapPicker from "react-google-map-picker";
import { ErrorMessage, useField, useFormikContext } from "formik";

interface MapProps {
  label: string;
  name: string;
}
const MapPickerComponent = ({ name, label }: MapProps) => {
  const { setFieldValue } = useFormikContext();
  const [meta] = useField(name);
  const { value } = meta;
  function handleChangeLocation(lat: number, lng: number) {
    setFieldValue(name, [lat, lng]);
  }

  return (
    <>
      <label>{label}</label>
      <MapPicker
        defaultLocation={{ lat: value[0] ?? 10, lng: value[1] ?? 106 }}
        zoom={10}
        // mapTypeId="roadmap"
        style={{ height: "300px" }}
        onChangeLocation={handleChangeLocation}
        apiKey={"AIzaSyANJJyJqbFfqURZc_YQgNpGvAmnR0oBplM"}
      />
      <ErrorMessage name={name} component="div" className={"text-red-500"} />
    </>
  );
};

export default MapPickerComponent;
