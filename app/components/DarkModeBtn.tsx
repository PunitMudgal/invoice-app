"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const DarkModeBtn = () => {
  const { theme, setTheme } = useTheme();
  return (
    <div>
      {theme === "dark" ? (
        <Sun
          onClick={() => setTheme("light")}
          className=" h-[27px] w-[27px]  "
        />
      ) : (
        <Moon
          onClick={() => setTheme("dark")}
          className=" h-[27px] w-[27px]  "
        />
      )}
    </div>
  );
};

export default DarkModeBtn;
