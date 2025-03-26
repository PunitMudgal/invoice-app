import Link from "next/link";
import { Button } from "@/components/ui/button";
import DarkModeBtn from "./DarkModeBtn";
import Logo from "./Logo";

interface NavbarProps {
  userId: string | null;
}

const Navbar = ({ userId }: NavbarProps) => {
  return (
    <div className="flex items-center justify-between py-5">
      <Link href="/" className="flex items-center gap-2">
        <Logo />
      </Link>
      <div className="space-x-2 flex items-center">
        <Link href={userId ? "/dashboard" : "/sign-in"}>
          <Button variant="secondary">
            {userId ? "Dashboard" : "Get Started"}
          </Button>
        </Link>
        {/* Dark Mode btn */}

        <DarkModeBtn />
      </div>
    </div>
  );
};

export default Navbar;
