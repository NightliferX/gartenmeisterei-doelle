import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Design-Varianten werden per Build-Flag aktiviert:
// VITE_THEME=v2 („Das Gartenjahr"), v3 („Der Unterschied ist Handwerk"), v4 („Cinematic")
// → Tokens/Overrides aus .theme-v2 / .theme-v3 in index.css
const theme = import.meta.env.VITE_THEME;
if (theme === "v2" || theme === "v3" || theme === "v4") {
  document.documentElement.classList.add(`theme-${theme}`);
}

createRoot(document.getElementById("root")!).render(<App />);
