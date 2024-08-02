

import Link from "next/link";
import React from "react";
import { Button } from "rizzui";

const AddBtnContainer = ({
  items,
  actionName,
  route_address,
  onClick,
  btntext
}: {
  items: any[];
  actionName: string;
  route_address?: string;
  onClick?: () => void;
  btntext?: string;
}) => {
  return (
    <>
      {items.length === 0 && (
        <div className="my-10 flex flex-col gap-y-5 items-center justify-center text-lg mt-[20vh]">
          <p>No {actionName} added yet.</p>

          <Button
            size="lg"
            color="primary"
            className="text-white bg-primary-dark capitalize"
            onClick={onClick}
          >
            {!onClick && route_address ? (
              <Link className="w-full h-full capitalize" href={route_address}>
                Add {btntext ? btntext : actionName}
              </Link>
            ) : (
              <p>{btntext ? btntext : actionName}</p>
            )}
          </Button>
        </div>
      )}

      {items.length > 0 && !route_address && (
        <div className="flex justify-end mb-6">
          <Button
            size="lg"
            color="primary"
            className="text-white bg-primary-dark capitalize"
            onClick={onClick}
          >
            {!onClick && route_address ? (
              <Link className="w-full h-full capitalize" href={route_address}>
                Add {btntext ? btntext : actionName}
              </Link>
            ) : (
              <p>{btntext ? btntext : actionName}</p>
            )}
          </Button>
        </div>
      )}
    </>
  );
};

export default AddBtnContainer;
