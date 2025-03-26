import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import DashboardLinks from "./DashboardLinks";
import { useTheme } from "next-themes";
import DarkModeBtn from "./DarkModeBtn";

const Header = () => {
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden">
            <Menu className="size-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-2 mt-10">
            <DashboardLinks />
          </nav>
        </SheetContent>
      </Sheet>

      <div className="scale-125 ml-auto flex gap-2 items-center">
        <UserButton showName />

        {/* Dark Mode btn */}
        <DarkModeBtn />
      </div>
    </header>
  );
};

export default Header;
