import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Design-Varianten werden per Build-Flag aktiviert:
// VITE_THEME=v2 („Das Gartenjahr"), v4 („Cinematic"), v5 („Aus Wildwuchs wird Garten"), v6 (Apple-Produktseite), v7 (Best-of)
// → Tokens/Overrides aus .theme-vX in index.css
const theme = import.meta.env.VITE_THEME;
if (theme === "v2" || theme === "v4" || theme === "v5" || theme === "v6" || theme === "v7" || theme === "v8") {
  document.documentElement.classList.add(`theme-${theme}`);
}

createRoot(document.getElementById("root")!).render(<App />);
