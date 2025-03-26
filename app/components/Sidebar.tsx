// import Image from "next/image";
import Link from "next/link";
import React from "react";
import DashboardLinks from "./DashboardLinks";
// import logo from "../../public/icons/logo-black.png";
// import { useTheme } from "next-themes";
import Logo from "./Logo";

const Sidebar = () => {
  // const { theme } = useTheme();

  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex flex-col max-h-screen h-full gap-2">
        <div className="h-14 flex items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2">
            <Logo />
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            <DashboardLinks />
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
