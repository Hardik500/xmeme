//navbar.js

/** 
 * This is a navbar component which handles the toggle theme functionality to switch b/w dark and light theme
 * And also presents a button to display the form where the user can submit new memes
*/


import sunIcon from "../assets/icons/sun.svg";
import moonIcon from "../assets/icons/moon.svg";

export default function Navbar({ theme, toggleForm, toggleTheme }) {
  return (
    <div className="navbar">
      <div className="header">XMeme</div>
      <button className="add-meme-btn cstm-btn" onClick={toggleForm}>
        <div>Add a Meme</div>
      </button>
      <button className="btn-none theme-btn" onClick={toggleTheme}>
        <img
          width={24}
          height={24}
          className="theme-img"
          src={theme === "light" ? moonIcon : sunIcon}
          alt={theme}
        />
      </button>
    </div>
  );
}
