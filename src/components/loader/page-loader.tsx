"use client";
import Image from "next/image";
import Logo from "@public/logo.png";
import BarLoader from "react-spinners/BarLoader";
const PageLoader = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center space-y-5">
      <Image
        src={Logo}
        alt="Placeholder Logo"
        className="h-24 object-contain"
      />
      <BarLoader
        color={"#1D6C8B"}
        loading={true}
        aria-label="Loading Spinner"
        data-testid="loader"
        width={150}
      />
    </div>
  );
};

export default PageLoader;
