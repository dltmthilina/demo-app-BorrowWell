import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from "react-router";
import { BorrowerProvider } from "./context/BorrowerContext.tsx";
import { NotificationProvider } from "./context/NotificationContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <NotificationProvider>
        <BorrowerProvider>
          <App />
        </BorrowerProvider>
      </NotificationProvider>
    </BrowserRouter>
  </StrictMode>
);
