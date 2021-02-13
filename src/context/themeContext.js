// themeContext.js

// Context file to handle the theme value

const defaultContextData = {
    dark: false,
    toggle: () => { },
};

const ThemeContext = React.createContext(defaultContextData);
const useTheme = () => React.useContext(ThemeContext);

// ThemeProvider code goes here

export { useTheme };