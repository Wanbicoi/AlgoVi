/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import * as Toolbar from "@radix-ui/react-toolbar";
import { SunIcon, MoonIcon, GlobeIcon } from "@radix-ui/react-icons";
import { toggleDarkMode } from "./Toggle";
import { Text, Switch, Inset, Select } from "@radix-ui/themes";
import { useLanguage } from "./LanguageContext";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const [isLightTheme, setIsLightTheme] = React.useState(
    localStorage.getItem("theme") !== "dark"
  );

  const { language, setLanguage, t } = useLanguage();
  const navigate = useNavigate();

  const handleThemeChange = () => {
    setIsLightTheme((prevTheme) => !prevTheme);
    toggleDarkMode();
  };

  const handleLanguageChange = (value: string) => {
    setLanguage(value as "en" | "vi");
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <Toolbar.Root className="flex justify-between items-center p-4 bg-gray-100 dark:bg-gray-900 border-b border-gray-300 dark:border-gray-700">
      <div
        className="flex items-center"
        onClick={handleLogoClick}
        style={{ cursor: "pointer" }}
      >
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
        </Inset>
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
            onClick={() =>
              handleLanguageChange(language === "vi" ? "en" : "vi")
            }
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 ml-5"
            aria-label="Change language"
          >
            <GlobeIcon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          </button>
        </Toolbar.Button>
        <Select.Root value={language} onValueChange={handleLanguageChange}>
          <Select.Trigger className="p-2 rounded-md">
            {language === "vi" ? "Tiếng Việt" : "English"}
          </Select.Trigger>
          <Select.Content>
            <Select.Item value="vi">Tiếng Việt</Select.Item>
            <Select.Item value="en">English</Select.Item>
          </Select.Content>
        </Select.Root>
      </div>
    </Toolbar.Root>
  );
};

export default Header;
