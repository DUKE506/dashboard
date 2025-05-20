"use client";

import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { MoonIcon, SunIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface LightDarkToggleProps {
  className?: string;
}

const LightDarkToggle = ({ className }: LightDarkToggleProps) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const savedTheme = Cookies.get("dark-mode");
    if (savedTheme === "true") {
      setIsDarkMode(true);
      document.body.classList.add("dark");
    }
  }, []);

  const handleToggle = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    document.body.classList.toggle("dark", newMode);
    Cookies.set("dark-mode", newMode.toString(), { expires: 365 });
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          className={cn(
            `w-fit border rounded-sm p-2 ${className} hover:cursor-pointer  hover:bg-gray-200/30`
          )}
          onClick={handleToggle}
        >
          {isDarkMode ? (
            <MoonIcon className="w-5 h-5" />
          ) : (
            <SunIcon className="w-5 h-5" />
          )}
        </TooltipTrigger>
        <TooltipContent>{isDarkMode ? "light" : "dark"}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default LightDarkToggle;
