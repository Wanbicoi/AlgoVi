import React, { useState } from "react";
import * as Toolbar from "@radix-ui/react-toolbar";
import { SunIcon, MoonIcon, GlobeIcon } from "@radix-ui/react-icons";
import { toggleDarkMode } from "./Toggle";
import { Text, Switch, Inset } from "@radix-ui/themes";

const Header: React.FC = () => {
  // State to keep track of the theme
  const [isLightTheme, setIsLightTheme] = useState(
    localStorage.getItem("theme") !== "dark"
  );

  const handleThemeChange = () => {
    // Toggle theme
    setIsLightTheme((prevTheme) => !prevTheme);
    toggleDarkMode();
    console.log("Theme change clicked");
  };

  const handleLanguageChange = () => {
    // Handle language change
    console.log("Language change clicked");
  };

  return (
    <Toolbar.Root className="flex justify-between items-center p-4 bg-gray-100 dark:bg-gray-900 border-b border-gray-300 dark:border-gray-700">
      <div className="flex items-center">
        <Inset clip="padding-box" side="top" pb="current" className="ml-4">
          <img
            src="logo.png"
            alt="Bold typography"
            style={{
              display: "block",
              objectFit: "cover",
              width: "100%",
              height: 40,
            }}
          />
        </Inset>{" "}
        <Text size="7" className="font-majorMono">
          Algo-Vi
        </Text>
      </div>
      <div className="flex items-center">
        <Switch checked={!isLightTheme} onCheckedChange={handleThemeChange} />
        <Toolbar.Button asChild>
          <button
            onClick={handleThemeChange}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 ml-1"
            aria-label="Toggle theme"
          >
            {isLightTheme ? (
              <SunIcon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            ) : (
              <MoonIcon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            )}
          </button>
        </Toolbar.Button>

        <Toolbar.Button asChild>
          <button
            onClick={handleLanguageChange}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 ml-5"
            aria-label="Change language"
          >
            <GlobeIcon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          </button>
        </Toolbar.Button>
      </div>
    </Toolbar.Root>
  );
};

export default Header;
