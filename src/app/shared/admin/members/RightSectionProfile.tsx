import { useState } from "react";
import { IoChevronDownOutline } from "react-icons/io5";
import { Title } from "rizzui";
import { memberType } from "types/common_types";

const RightSectionProfile = ({ userData }: { userData: memberType }) => {
  return (
    <article className="col-span-2 px-5 py-8">
      <Title as="h5" className="text-lg text-black font-medium">
        Personal Info
      </Title>

      <section className="grid grid-col-1 md:grid-col-2 xl:grid-cols-3 mt-6 gap-6 capitalize">
        <div>
          <p className="text-xs pl-1 text-black font-medium mb-1">First Name</p>
          <p className="border rounded-lg p-2 px-4 text-sm">
            {userData?.first_name}
          </p>
        </div>

        <div>
          <p className="text-xs pl-1 text-black font-medium mb-1">
            Middle Name
          </p>
          <p className="border rounded-lg p-2 px-4 text-sm">
            {userData?.middle_name}
          </p>
        </div>

        <div>
          <p className="text-xs pl-1 text-black font-medium mb-1">Last Name</p>
          <p className="border rounded-lg p-2 px-4 text-sm">
            {userData?.last_name}
          </p>
        </div>

        <div>
          <p className="text-xs pl-1 text-black font-medium mb-1">Gender</p>
          <p className="border rounded-lg p-2 px-4 text-sm">
            {userData?.gender}
          </p>
        </div>

        <div>
          <p className="text-xs pl-1 text-black font-medium mb-1">Age</p>
          <p className="border rounded-lg p-2 px-4 text-sm">{userData?.age}</p>
        </div>

        <div>
          <p className="text-xs pl-1 text-black font-medium mb-1">
            Marriage Status
          </p>
          <p className="border rounded-lg p-2 px-4 text-sm">
            {userData?.marriage_status}
          </p>
        </div>
      </section>

      <LocationDetails userData={userData} />
      <EmergencyContacts userData={userData} />
      <Heirs userData={userData} />
    </article>
  );
};

const LocationDetails = ({ userData }: { userData: memberType }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <article className={`mt-5 ${isOpen && "border rounded-xl"}  p-3 `}>
      <button
        className={`bg-transparent  ${!isOpen && "border border-gray-200  "}  px-4 py-3 w-full  text-black rounded-lg flex justify-between items-center hover:bg-gray-50 focus:bg-gray-50 ${isOpen && "bg-primary-lighter"}`}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <Title as="h5" className="text-base font-medium">
          Address Details
        </Title>
        <IoChevronDownOutline className={`${isOpen && "rotate-180"}`} />
      </button>

      {isOpen && (
        <section className="grid grid-col-1 md:grid-col-2 xl:grid-cols-3 mt-6 gap-6 capitalize">
          <div>
            <p className="text-xs pl-1 text-black font-medium mb-1">
              Birth Place
            </p>
            <p className="border rounded-lg p-2 px-4 text-sm">
              {userData?.birth_place ?? "Unknown"}
            </p>
          </div>

          <div>
            <p className="text-xs pl-1 text-black font-medium mb-1">
              Birth Region
            </p>
            <p className="border rounded-lg p-2 px-4 text-sm">
              {userData?.birth_region ?? "Unknown"}
            </p>
          </div>

          <div>
            <p className="text-xs pl-1 text-black font-medium mb-1">
              Birth District
            </p>
            <p className="border rounded-lg p-2 px-4 text-sm">
              {userData?.birth_district ?? "Unknown"}
            </p>
          </div>

          <div>
            <p className="text-xs pl-1 text-black font-medium mb-1">
              Birth birth_neighborhood
            </p>
            <p className="border rounded-lg p-2 px-4 text-sm">
              {userData?.birth_district ?? "Unknown"}
            </p>
          </div>

          <div>
            <p className="text-xs pl-1 text-black font-medium mb-1">
              Birth Zone
            </p>
            <p className="birth_zone rounded-lg p-2 px-4 text-sm">
              {userData?.birth_district ?? "Unknown"}
            </p>
          </div>

          <div>
            <p className="text-xs pl-1 text-black font-medium mb-1">
              Birth Sub City
            </p>
            <p className="border rounded-lg p-2 px-4 text-sm">
              {userData?.current_subcity ?? "Unknown"}
            </p>
          </div>

          <div>
            <p className="text-xs pl-1 text-black font-medium mb-1">
              Birth House Number
            </p>
            <p className="border rounded-lg p-2 px-4 text-sm">
              {userData?.current_house_number ?? "Unknown"}
            </p>
          </div>

          <div>
            <p className="text-xs pl-1 text-black font-medium mb-1">
              Current Region
            </p>
            <p className="border rounded-lg p-2 px-4 text-sm">
              {userData?.current_region ?? "Unknown"}
            </p>
          </div>

          <div>
            <p className="text-xs pl-1 text-black font-medium mb-1">
              Current District
            </p>
            <p className="border rounded-lg p-2 px-4 text-sm">
              {userData?.current_district ?? "Unknown"}
            </p>
          </div>

          <div>
            <p className="text-xs pl-1 text-black font-medium mb-1">
              Current current_neighborhood
            </p>
            <p className="border rounded-lg p-2 px-4 text-sm">
              {userData?.current_district ?? "Unknown"}
            </p>
          </div>

          <div>
            <p className="text-xs pl-1 text-black font-medium mb-1">
              Current Zone
            </p>
            <p className="border rounded-lg p-2 px-4 text-sm">
              {userData?.current_district ?? "Unknown"}
            </p>
          </div>

          <div>
            <p className="text-xs pl-1 text-black font-medium mb-1">
              Current Sub City
            </p>
            <p className="border rounded-lg p-2 px-4 text-sm">
              {userData?.current_subcity ?? "Unknown"}
            </p>
          </div>

          <div>
            <p className="text-xs pl-1 text-black font-medium mb-1">
              Current House Number
            </p>
            <p className="border rounded-lg p-2 px-4 text-sm">
              {userData?.current_house_number ?? "Unknown"}
            </p>
          </div>
        </section>
      )}
    </article>
  );
};

const EmergencyContacts = ({ userData }: { userData: memberType }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <article className={`mt-5 ${isOpen && "border rounded-xl"}  p-3 `}>
      <button
        className={`bg-transparent  ${!isOpen && "border border-gray-200  "}  px-4 py-3 w-full  text-black rounded-lg flex justify-between items-center hover:bg-gray-50 focus:bg-gray-50 ${isOpen && "bg-primary-lighter"}`}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <Title as="h5" className="text-base font-medium">
          Emergency Contacts
        </Title>
        <IoChevronDownOutline className={`${isOpen && "rotate-180"}`} />
      </button>

      {isOpen && (
        <section className="grid grid-col-1 md:grid-col-2 xl:grid-cols-3 mt-6 gap-6 capitalize">
          <div>
            <p className="text-xs pl-1 text-black font-medium mb-1">
              Birth Place
            </p>
            <p className="border rounded-lg p-2 px-4 text-sm">
              {userData?.birth_place ?? "Unknown"}
            </p>
          </div>

          <div>
            <p className="text-xs pl-1 text-black font-medium mb-1">
              Birth Region
            </p>
            <p className="border rounded-lg p-2 px-4 text-sm">
              {userData?.birth_region ?? "Unknown"}
            </p>
          </div>

          <div>
            <p className="text-xs pl-1 text-black font-medium mb-1">
              Birth District
            </p>
            <p className="border rounded-lg p-2 px-4 text-sm">
              {userData?.birth_district ?? "Unknown"}
            </p>
          </div>

          <div>
            <p className="text-xs pl-1 text-black font-medium mb-1">
              Birth birth_neighborhood
            </p>
            <p className="border rounded-lg p-2 px-4 text-sm">
              {userData?.birth_district ?? "Unknown"}
            </p>
          </div>

          <div>
            <p className="text-xs pl-1 text-black font-medium mb-1">
              Birth Zone
            </p>
            <p className="birth_zone rounded-lg p-2 px-4 text-sm">
              {userData?.birth_district ?? "Unknown"}
            </p>
          </div>

          <div>
            <p className="text-xs pl-1 text-black font-medium mb-1">
              Birth Sub City
            </p>
            <p className="border rounded-lg p-2 px-4 text-sm">
              {userData?.current_subcity ?? "Unknown"}
            </p>
          </div>

          <div>
            <p className="text-xs pl-1 text-black font-medium mb-1">
              Birth House Number
            </p>
            <p className="border rounded-lg p-2 px-4 text-sm">
              {userData?.current_house_number ?? "Unknown"}
            </p>
          </div>

          <div>
            <p className="text-xs pl-1 text-black font-medium mb-1">
              Current Region
            </p>
            <p className="border rounded-lg p-2 px-4 text-sm">
              {userData?.current_region ?? "Unknown"}
            </p>
          </div>

          <div>
            <p className="text-xs pl-1 text-black font-medium mb-1">
              Current District
            </p>
            <p className="border rounded-lg p-2 px-4 text-sm">
              {userData?.current_district ?? "Unknown"}
            </p>
          </div>

          <div>
            <p className="text-xs pl-1 text-black font-medium mb-1">
              Current current_neighborhood
            </p>
            <p className="border rounded-lg p-2 px-4 text-sm">
              {userData?.current_district ?? "Unknown"}
            </p>
          </div>

          <div>
            <p className="text-xs pl-1 text-black font-medium mb-1">
              Current Zone
            </p>
            <p className="border rounded-lg p-2 px-4 text-sm">
              {userData?.current_district ?? "Unknown"}
            </p>
          </div>

          <div>
            <p className="text-xs pl-1 text-black font-medium mb-1">
              Current Sub City
            </p>
            <p className="border rounded-lg p-2 px-4 text-sm">
              {userData?.current_subcity ?? "Unknown"}
            </p>
          </div>

          <div>
            <p className="text-xs pl-1 text-black font-medium mb-1">
              Current House Number
            </p>
            <p className="border rounded-lg p-2 px-4 text-sm">
              {userData?.current_house_number ?? "Unknown"}
            </p>
          </div>
        </section>
      )}
    </article>
  );
};

const Heirs = ({ userData }: { userData: memberType }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <article className={`mt-5 ${isOpen && "border rounded-xl"}  xl:p-3 `}>
      <button
        className={`bg-transparent  ${!isOpen && "border border-gray-200  "}  px-4 py-3 w-full  text-black rounded-lg flex justify-between items-center hover:bg-gray-50 focus:bg-gray-50 ${isOpen && "bg-primary-lighter"}`}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <Title as="h5" className="text-base font-medium">
          Emergency Contacts
        </Title>
        <IoChevronDownOutline className={`${isOpen && "rotate-180"}`} />
      </button>

      {isOpen && (
        <section className="grid grid-col-1 md:grid-col-2 xl:grid-cols-3 mt-6 gap-6 capitalize">
          <div>
            <p className="text-xs pl-1 text-black font-medium mb-1">
              Birth Place
            </p>
            <p className="border rounded-lg p-2 px-4 text-sm">
              {userData?.birth_place ?? "Unknown"}
            </p>
          </div>

          <div>
            <p className="text-xs pl-1 text-black font-medium mb-1">
              Birth Region
            </p>
            <p className="border rounded-lg p-2 px-4 text-sm">
              {userData?.birth_region ?? "Unknown"}
            </p>
          </div>

          <div>
            <p className="text-xs pl-1 text-black font-medium mb-1">
              Birth District
            </p>
            <p className="border rounded-lg p-2 px-4 text-sm">
              {userData?.birth_district ?? "Unknown"}
            </p>
          </div>

          <div>
            <p className="text-xs pl-1 text-black font-medium mb-1">
              Birth birth_neighborhood
            </p>
            <p className="border rounded-lg p-2 px-4 text-sm">
              {userData?.birth_district ?? "Unknown"}
            </p>
          </div>

          <div>
            <p className="text-xs pl-1 text-black font-medium mb-1">
              Birth Zone
            </p>
            <p className="birth_zone rounded-lg p-2 px-4 text-sm">
              {userData?.birth_district ?? "Unknown"}
            </p>
          </div>

          <div>
            <p className="text-xs pl-1 text-black font-medium mb-1">
              Birth Sub City
            </p>
            <p className="border rounded-lg p-2 px-4 text-sm">
              {userData?.current_subcity ?? "Unknown"}
            </p>
          </div>

          <div>
            <p className="text-xs pl-1 text-black font-medium mb-1">
              Birth House Number
            </p>
            <p className="border rounded-lg p-2 px-4 text-sm">
              {userData?.current_house_number ?? "Unknown"}
            </p>
          </div>

          <div>
            <p className="text-xs pl-1 text-black font-medium mb-1">
              Current Region
            </p>
            <p className="border rounded-lg p-2 px-4 text-sm">
              {userData?.current_region ?? "Unknown"}
            </p>
          </div>

          <div>
            <p className="text-xs pl-1 text-black font-medium mb-1">
              Current District
            </p>
            <p className="border rounded-lg p-2 px-4 text-sm">
              {userData?.current_district ?? "Unknown"}
            </p>
          </div>

          <div>
            <p className="text-xs pl-1 text-black font-medium mb-1">
              Current current_neighborhood
            </p>
            <p className="border rounded-lg p-2 px-4 text-sm">
              {userData?.current_district ?? "Unknown"}
            </p>
          </div>

          <div>
            <p className="text-xs pl-1 text-black font-medium mb-1">
              Current Zone
            </p>
            <p className="border rounded-lg p-2 px-4 text-sm">
              {userData?.current_district ?? "Unknown"}
            </p>
          </div>

          <div>
            <p className="text-xs pl-1 text-black font-medium mb-1">
              Current Sub City
            </p>
            <p className="border rounded-lg p-2 px-4 text-sm">
              {userData?.current_subcity ?? "Unknown"}
            </p>
          </div>

          <div>
            <p className="text-xs pl-1 text-black font-medium mb-1">
              Current House Number
            </p>
            <p className="border rounded-lg p-2 px-4 text-sm">
              {userData?.current_house_number ?? "Unknown"}
            </p>
          </div>
        </section>
      )}
    </article>
  );
};

export default RightSectionProfile;
