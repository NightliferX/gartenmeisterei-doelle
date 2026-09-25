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
import { areaPages, servicePages } from "@/lib/subpages";
import { gartenjahr } from "@/lib/siteContent";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/impressum" element={<Impressum />} />
          <Route path="/datenschutz" element={<Datenschutz />} />
          {servicePages.map((page) => (
            <Route key={page.slug} path={`/${page.slug}`} element={<ServicePage page={page} />} />
          ))}
          {areaPages.map((page) => (
            <Route key={page.slug} path={`/${page.slug}`} element={<AreaPage page={page} />} />
          ))}
          {gartenjahr.map((season) => (
            <Route
              key={season.slug}
              path={`/gartenpflege-${season.slug}-duesseldorf`}
              element={<SeasonPage season={season} />}
            />
          ))}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
