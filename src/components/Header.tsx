import React from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import useTheme from "../useTheme";
import Button from "./Button";

export default function Header() {
  const [theme, setTheme] = useTheme();
  return (
    <div className="bg-normal text-normal sticky top-0 py-1 flex items-center px-2 justify-end">
      <Button
        className="aspect-square h-12"
        icon={theme === "dark" ? FaSun : FaMoon}
        onClick={setTheme}
      />
    </div>
  );
}
