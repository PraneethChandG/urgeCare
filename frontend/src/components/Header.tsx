import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import logo from "../images/light_1.png";
import darkModeLogo from "../images/dark_1.png";
const img = logo;
const darkModeImg = darkModeLogo
const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
      <header className="py-4 px-5 sm:px-6 lg:px-10">
          <div className="container mx-auto flex justify-between items-center">
              <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                  <img
                      src={theme === "light" ? img : darkModeImg}
                      alt="Urge Care"
                      className="h-16 w-auto sm:h-20 lg:h-24"
                  />
              </div>

              <button
                  onClick={toggleTheme}
                  className="p-2 rounded-full transition-colors hover:bg-gray-200 dark:hover:bg-gray-700"
                  aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
              >
                  {theme === "light" ? <Moon className="h-5 w-5 text-gray-800" /> : <Sun className="h-5 w-5 text-gray-200" />}
              </button>
          </div>
      </header>
  );
};

export default Header;