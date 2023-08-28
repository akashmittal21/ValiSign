import React, { createContext, useContext, useState } from "react";

// stored in table with values
const selectableThemes = {
  blue: {
    backgroundImage: require("../assets/login/background.png"),
    buttonColor: "",
  },
  pink: {
    backgroundImage: require("../assets/login/background-pink.png"),
    buttonColor: "",
  },
};

const ThemeContext = createContext();

export const ThemeProvider = ({ children, defaultTheme }) => {
  const [theme, setTheme] = useState(defaultTheme || "blue");

  const toggleTheme = () => {
    const themeKeys = Object.keys(selectableThemes);
    const currentThemeIndex = themeKeys.indexOf(theme);
    const nextThemeIndex = (currentThemeIndex + 1) % themeKeys.length;
    const nextTheme = themeKeys[nextThemeIndex];
    setTheme(nextTheme);
  };
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeSelect = () => {
  return useContext(ThemeContext);
};

export default selectableThemes;
