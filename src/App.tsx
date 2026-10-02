import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import Impressum from "./pages/Impressum.tsx";
import Datenschutz from "./pages/Datenschutz.tsx";
import ServicePage from "./pages/ServicePage.tsx";
import AreaPage from "./pages/AreaPage.tsx";
import SeasonPage from "./pages/SeasonPage.tsx";
import BeispielPage from "./pages/BeispielPage.tsx";
import RatgeberHub from "./pages/RatgeberHub.tsx";
import RatgeberWeltRedirect from "./pages/RatgeberWeltRedirect.tsx";
import HausverwaltungPage from "./pages/HausverwaltungPage.tsx";
import RatgeberPage from "./pages/RatgeberPage.tsx";
import LeistungenHub from "./pages/LeistungenHub.tsx";
import GartenjahrHub from "./pages/GartenjahrHub.tsx";
import EinsatzgebieteHub from "./pages/EinsatzgebieteHub.tsx";
import ScrollToTop from "./components/ScrollToTop.tsx";
import { areaPages, servicePages } from "@/lib/subpages";
import { gartenjahr } from "@/lib/siteContent";
import { ratgeber } from "@/lib/ratgeber";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, "")}>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/beispiel-1" element={<BeispielPage variant="1" />} />
          <Route path="/beispiel-2" element={<BeispielPage variant="2" />} />
          <Route path="/impressum" element={<Impressum />} />
          <Route path="/datenschutz" element={<Datenschutz />} />
          <Route path="/leistungen" element={<LeistungenHub />} />
          <Route path="/gartenjahr" element={<GartenjahrHub />} />
          <Route path="/einsatzgebiete" element={<EinsatzgebieteHub />} />
          {servicePages.map((page) => (
            <Route key={page.slug} path={`/${page.slug}`} element={<ServicePage page={page} />} />
          ))}
          {areaPages.map((page) => (
            <Route key={page.slug} path={`/${page.slug}`} element={<AreaPage page={page} />} />
          ))}
          {gartenjahr.map((season) => (
            <Route
              key={season.slug}
              path={`/gartenpflege-${season.slug}`}
              element={<SeasonPage season={season} />}
            />
          ))}
          <Route
            path="/ratgeber"
            element={import.meta.env.VITE_RATGEBER_WELT === "1" ? <RatgeberWeltRedirect /> : <RatgeberHub />}
          />
          <Route path="/hausverwaltung" element={<HausverwaltungPage />} />
          {ratgeber.map((post) => (
            <Route
              key={post.slug}
              path={`/ratgeber/${post.slug}`}
              element={<RatgeberPage post={post} />}
            />
          ))}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
