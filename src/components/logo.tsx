import LogoImage from "@public/logo.png";
import Image from "next/image";
import cn from "@/utils/class-names";

export default function Logo({ className }: { className?: string }) {
  return (
    <Image
      src={LogoImage}
      alt="logo"
      className={cn("h-12 object-contain w-full", className)}
    />
  );
}
