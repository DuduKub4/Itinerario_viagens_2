import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/css/index.css"; // Importação de estilos globais
import "bootstrap-icons/font/bootstrap-icons.css"; // Ícones Bootstrap (se necessário)
import App from "./components/App"; // Importação do componente principal

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
