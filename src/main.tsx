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

// Deep-Links auf GitHub Pages: Für unbekannte Pfade liefert Pages IMMER die
// 404.html im Wurzelverzeichnis aus — auch für /v8/gartenpflege-duesseldorf.
// Dort läuft dann der V1-Build mit falschem basename und zeigt die 404-Seite.
// Deshalb: erkannte Varianten-Pfade auf den Varianten-Index umleiten und die
// eigentliche Route als ?p= mitgeben, die der Varianten-Build zurückschreibt.
const fixDeepLink = () => {
  const base = import.meta.env.BASE_URL;
  const { pathname, search, hash } = window.location;

  if (pathname.startsWith(base)) {
    const variant = pathname.slice(base.length).match(/^(v\d+)\/(.+)$/);
    if (variant) {
      const rest = search ? `&${search.slice(1)}` : "";
      window.location.replace(
        `${base}${variant[1]}/?p=${encodeURIComponent(`/${variant[2]}`)}${rest}${hash}`,
      );
      return false;
    }
  }

  const params = new URLSearchParams(search);
  const route = params.get("p");
  if (route) {
    params.delete("p");
    const rest = params.toString();
    window.history.replaceState(
      null,
      "",
      `${base.replace(/\/$/, "")}${route}${rest ? `?${rest}` : ""}${hash}`,
    );
  }
  return true;
};

if (fixDeepLink()) {
  createRoot(document.getElementById("root")!).render(<App />);
}
