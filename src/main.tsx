import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Design-Variante 2 („Das Gartenjahr") wird per Build-Flag aktiviert:
// VITE_THEME=v2 npm run build  →  Tokens/Fonts aus .theme-v2 in index.css
if (import.meta.env.VITE_THEME === "v2") {
  document.documentElement.classList.add("theme-v2");
}

createRoot(document.getElementById("root")!).render(<App />);
