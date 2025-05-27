import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { CookiesProvider } from "react-cookie";
import { HeroUIProvider } from "@heroui/react";

createRoot(document.getElementById("root")).render(
  <StrictMode>
 <CookiesProvider>

      <HeroUIProvider>
        <App />
      </HeroUIProvider>

  </CookiesProvider>
  </StrictMode>
);
