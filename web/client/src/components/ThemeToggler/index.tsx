import React from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { ThemeContext } from '../../ThemeContext';

export default function ThemeToggler(): JSX.Element {
  const { theme, setTheme } = React.useContext(ThemeContext);
  return (
    <div tw="absolute right-4 top-4 transition duration-500 ease-in-out rounded-full cursor-pointer">
      {theme === 'dark' ? (
        <FaSun
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          tw="text-gray-500 dark:text-gray-400 text-lg md:text-base cursor-pointer"
        />
      ) : (
        <FaMoon
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          tw="text-gray-500 dark:text-gray-400 text-lg md:text-base cursor-pointer"
        />
      )}
    </div>
  );
};
