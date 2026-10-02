import { useEffect } from "react";
import RatgeberHub from "./RatgeberHub.tsx";

// /ratgeber ist eine statische Seite (ratgeber-welt/, per scripts/ratgeber-welt.mjs
// nach dist/ratgeber/ kopiert). Client-Navigation dorthin braucht deshalb einen
// echten Seitenaufruf. Steht der Router schon auf /ratgeber/, fehlt die statische
// Datei (z. B. dev-Server) – dann die alte Übersicht zeigen statt im Kreis zu laden.
const RatgeberWeltRedirect = () => {
  const fallback = window.location.pathname.endsWith("/ratgeber/");

  useEffect(() => {
    if (!fallback) window.location.replace(`${import.meta.env.BASE_URL}ratgeber/`);
  }, [fallback]);

  return fallback ? <RatgeberHub /> : null;
};

export default RatgeberWeltRedirect;
