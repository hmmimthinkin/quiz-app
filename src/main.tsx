import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

import "@fontsource/press-start-2p/index.css";
import "@fontsource/pixelify-sans/index.css";
import "./styles/global.scss";


ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);