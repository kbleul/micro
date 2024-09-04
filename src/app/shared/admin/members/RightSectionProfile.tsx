import { useState } from "react";
import { IoChevronDownOutline } from "react-icons/io5";
import { Title } from "rizzui";
import { memberType } from "types/common_types";

const RightSectionProfile = ({ userData }: { userData: memberType }) => {
  return (
    <article className="col-span-2 px-5 py-8 hover:overflow-y-scroll">
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
        {userData?.marriage_status === "" && userData?.spouse_name && (
          <div>
            <p className="text-xs pl-1 text-black font-medium mb-1">
              Marriage Status
            </p>
            <p className="border rounded-lg p-2 px-4 text-sm">
              {userData?.spouse_name === "" ? "Unknown" : userData?.spouse_name}
            </p>
          </div>
        )}
      </section>

      <LocationDetails userData={userData} />
      {userData?.children && <ChildrenList userData={userData} />}
      {userData?.emergency_contacts && (
        <EmergencyContacts userData={userData} />
      )}
      {userData?.heirs && <Heirs userData={userData} />}
    </article>
  );
};

const LocationDetails = ({ userData }: { userData: memberType }) => {
  const [isOpen, setIsOpen] = useState(true);

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

const ChildrenList = ({ userData }: { userData: memberType }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <article className={`mt-5 ${isOpen && "border rounded-xl"}  xl:p-3 `}>
      <button
        className={`bg-transparent  ${!isOpen && "border border-gray-200  "}  px-4 py-3 w-full  text-black rounded-lg flex justify-between items-center hover:bg-gray-50 focus:bg-gray-50 ${isOpen && "bg-primary-lighter"}`}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <Title as="h5" className="text-base font-medium">
          Children
        </Title>
        <IoChevronDownOutline className={`${isOpen && "rotate-180"}`} />
      </button>

      {isOpen &&
        userData.children &&
        userData?.children.map((child, index) => (
          <section
            key={child.age + index + " " + index + child.gender}
            className="grid grid-col-1 md:grid-col-2 xl:grid-cols-3 mt-6 gap-6 capitalize"
          >
            <div>
              <p className="text-xs pl-1 text-black font-medium mb-1">Age</p>
              <p className="border rounded-lg p-2 px-4 text-sm">
                {child.age ?? "Unknown"}
              </p>
            </div>

            <div>
              <p className="text-xs pl-1 text-black font-medium mb-1">Gender</p>
              <p className="border rounded-lg p-2 px-4 text-sm">
                {child.gender ?? "Unknown"}
              </p>
            </div>
          </section>
        ))}
    </article>
  );
};

const EmergencyContacts = ({ userData }: { userData: memberType }) => {
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

      {isOpen &&
        userData.emergency_contacts &&
        userData?.emergency_contacts.map((contact, index) => (
          <section
            key={contact.first_name + " " + index + contact.last_name}
            className="grid grid-col-1 md:grid-col-2 xl:grid-cols-3 mt-6 gap-6 capitalize"
          >
            <div>
              <p className="text-xs pl-1 text-black font-medium mb-1">
                Full Name
              </p>
              <p className="border rounded-lg p-2 px-4 text-sm">
                {contact.first_name + " " + contact.last_name ?? "Unknown"}
              </p>
            </div>

            <div>
              <p className="text-xs pl-1 text-black font-medium mb-1">
                Occupation
              </p>
              <p className="border rounded-lg p-2 px-4 text-sm">
                {contact.occupation ?? "Unknown"}
              </p>
            </div>

            <div>
              <p className="text-xs pl-1 text-black font-medium mb-1">
                Maritial Status
              </p>
              <p className="border rounded-lg p-2 px-4 text-sm">
                {contact.relationship ?? "Unknown"}
              </p>
            </div>

            <div>
              <p className="text-xs pl-1 text-black font-medium mb-1">City</p>
              <p className="border rounded-lg p-2 px-4 text-sm">
                {contact.city ?? "Unknown"}
              </p>
            </div>

            <div>
              <p className="text-xs pl-1 text-black font-medium mb-1">
                Sub City
              </p>
              <p className="border rounded-lg p-2 px-4 text-sm">
                {contact?.subcity ?? "Unknown"}
              </p>
            </div>

            <div>
              <p className="text-xs pl-1 text-black font-medium mb-1">Woreda</p>
              <p className="birth_zone rounded-lg p-2 px-4 text-sm">
                {contact?.woreda ?? "Unknown"}
              </p>
            </div>

            <div>
              <p className="text-xs pl-1 text-black font-medium mb-1">Zone</p>
              <p className="border rounded-lg p-2 px-4 text-sm">
                {contact?.zone ?? "Unknown"}
              </p>
            </div>

            <div>
              <p className="text-xs pl-1 text-black font-medium mb-1">
                House Number
              </p>
              <p className="border rounded-lg p-2 px-4 text-sm">
                {contact?.house_number ?? "Unknown"}
              </p>
            </div>

            <div>
              <p className="text-xs pl-1 text-black font-medium mb-1">
                Specific Address
              </p>
              <p className="border rounded-lg p-2 px-4 text-sm">
                {contact?.address ?? "Unknown"}
              </p>
            </div>
          </section>
        ))}
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
          Heirs
        </Title>
        <IoChevronDownOutline className={`${isOpen && "rotate-180"}`} />
      </button>

      {isOpen &&
        userData.heirs &&
        userData?.heirs.map((heir, index) => (
          <section
            key={heir.first_name + " " + index + heir.last_name}
            className="grid grid-col-1 md:grid-col-2 xl:grid-cols-3 mt-6 gap-6 capitalize"
          >
            <div>
              <p className="text-xs pl-1 text-black font-medium mb-1">
                Full Name
              </p>
              <p className="border rounded-lg p-2 px-4 text-sm">
                {heir.first_name + " " + heir.last_name ?? "Unknown"}
              </p>
            </div>

            <div>
              <p className="text-xs pl-1 text-black font-medium mb-1">
                Occupation
              </p>
              <p className="border rounded-lg p-2 px-4 text-sm">
                {heir.occupation ?? "Unknown"}
              </p>
            </div>

            <div>
              <p className="text-xs pl-1 text-black font-medium mb-1">
                Maritial Status
              </p>
              <p className="border rounded-lg p-2 px-4 text-sm">
                {heir.relationship ?? "Unknown"}
              </p>
            </div>

            <div>
              <p className="text-xs pl-1 text-black font-medium mb-1">City</p>
              <p className="border rounded-lg p-2 px-4 text-sm">
                {heir.city ?? "Unknown"}
              </p>
            </div>

            <div>
              <p className="text-xs pl-1 text-black font-medium mb-1">
                Sub City
              </p>
              <p className="border rounded-lg p-2 px-4 text-sm">
                {heir?.subcity ?? "Unknown"}
              </p>
            </div>

            <div>
              <p className="text-xs pl-1 text-black font-medium mb-1">Woreda</p>
              <p className="birth_zone rounded-lg p-2 px-4 text-sm">
                {heir?.woreda ?? "Unknown"}
              </p>
            </div>

            <div>
              <p className="text-xs pl-1 text-black font-medium mb-1">Zone</p>
              <p className="border rounded-lg p-2 px-4 text-sm">
                {heir?.zone ?? "Unknown"}
              </p>
            </div>

            <div>
              <p className="text-xs pl-1 text-black font-medium mb-1">
                House Number
              </p>
              <p className="border rounded-lg p-2 px-4 text-sm">
                {heir?.house_number ?? "Unknown"}
              </p>
            </div>

            <div>
              <p className="text-xs pl-1 text-black font-medium mb-1">
                Specific Address
              </p>
              <p className="border rounded-lg p-2 px-4 text-sm">
                {heir?.address ?? "Unknown"}
              </p>
            </div>
          </section>
        ))}
    </article>
  );
};

export default RightSectionProfile;
