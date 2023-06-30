import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import "./i18n/i18n";
import { ContextProvider } from "./context/SumProductContext.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
   <React.StrictMode>
      <HashRouter>
         <ContextProvider>
            <App />
         </ContextProvider>
      </HashRouter>
   </React.StrictMode>
);
