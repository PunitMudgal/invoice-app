"use client";

import Image from "next/image";
import logo from "../../public/icons/logo-black.png";
import { useTheme } from "next-themes";

const Logo = () => {
  const { theme } = useTheme();
  return (
    <Image
      src={logo}
      alt="Logo"
      className={`h-auto w-52  ${theme === "dark" ? "invert" : ""}`}
    />
  );
};

export default Logo;
