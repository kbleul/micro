import React from "react";
import { SlCalender } from "react-icons/sl";
import { memberType } from "./ViewMember";

const ClientInfo = ({ userData }: { userData: memberType }) => {
  return (
    <article>
      <section className="grid grid-cols-3 gap-16">
        <div className="">
          <p className=" font-medium text-base mb-1">First Name</p>
          <p className="border rounded-md border-black p-3 capitalize font-medium">
            {userData.first_name}
          </p>
        </div>
        <div className="">
          <p className=" font-medium text-base mb-1">Last Name</p>
          <p className="border rounded-md border-black p-3 capitalize font-medium">
            {userData.middle_name}
          </p>
        </div>
        <div className="">
          <p className=" font-medium text-base mb-1">Last Name</p>
          <p className="border rounded-md border-black p-3 capitalize font-medium">
            {userData.last_name}
          </p>
        </div>
      </section>

      <section className="grid grid-cols-2 gap-x-16 w-4/5 mt-10">

        <div className="">
          <p className=" font-medium text-base mb-1">Gender</p>
          <p className="border rounded-md border-black p-3 capitalize font-medium">
            {userData.gender}
          </p>
        </div>
        <div className="">
          <p className=" font-medium text-base mb-1">Birthdate</p>
          <div className="border rounded-md border-black p-3 capitalize font-medium flex justify-between items-center">
            <p>{userData.birth_date}</p>
            <SlCalender />
          </div>
        </div>

        <div className="my-6">
          <p className=" font-medium text-base mb-1">Marriage Status</p>
          <div className="border rounded-md border-black p-3 capitalize font-medium flex justify-between items-center">
            <p>{userData.marriage_status}</p>
          </div>
        </div>
        
      <div className="my-6">
        <p className=" font-medium text-base mb-1">Phone Number</p>
        <p className="border rounded-md border-black p-3 capitalize font-medium">
          {userData.phone_number}
        </p>
      </div>

      <div className="my-2">
        <p className=" font-medium text-base mb-1">Account Number</p>
        <p className="border rounded-md border-black p-3 capitalize font-medium">
          {userData.account.number}
        </p>
      </div>

      <div className="my-2">
        <p className=" font-medium text-base mb-1">Account Status</p>
        <p className="border rounded-md border-black p-3 capitalize font-medium">
          {userData.account.status}
        </p>
      </div>

     </section>
    </article>
  );
};

export default ClientInfo;
