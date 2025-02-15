"use client";

import { dashboardLinks } from "../utils/constants";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const DashboardLinks = () => {
  const pathname = usePathname();

  return (
    <>
      {dashboardLinks.map((link) => (
        <Link
          className={cn(
            pathname === link.href
              ? "text-primary bg-primary/10"
              : "text-muted-foreground hover:text-foreground",
            "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary"
          )}
          href={link.href}
          key={link.name}
        >
          <link.icon className="size-4" />
          {link.name}
        </Link>
      ))}
    </>
  );
};

export default DashboardLinks;
