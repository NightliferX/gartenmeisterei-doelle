import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Index from "@/pages/Index";
import Impressum from "@/pages/Impressum";
import Footer from "@/components/Footer";

describe("site shell", () => {
  it("renders key homepage sections", () => {
    render(
      <MemoryRouter>
        <Index />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("heading", {
        name: /ihr gärtnermeister für gepflegte gärten/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: /kostenlose beratung anfragen/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(/für düsseldorf und die region/i)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: /häufige fragen zur gartenpflege/i,
      }),
    ).toBeInTheDocument();
  });

  it("links footer legal pages to real routes", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    );

    expect(screen.getByRole("link", { name: /impressum/i })).toHaveAttribute(
      "href",
      "/impressum",
    );
    expect(screen.getByRole("link", { name: /datenschutz/i })).toHaveAttribute(
      "href",
      "/datenschutz",
    );
  });

  it("renders the legal notice page", () => {
    render(
      <MemoryRouter>
        <Impressum />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("heading", {
        name: /impressum/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(/angaben gemäß/i)).toBeInTheDocument();
  });
});
