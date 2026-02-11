import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import App from "./App.js";
import { Fiber } from "./routes/Fiber";
import { Circles } from "./routes/Circles";
import { Shader } from "./routes/Shader";
import { Card } from "./routes/Card";
import { MazeRoute } from "./routes/MazeRoute";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<App />} />
        <Route path="about" element={<div>about</div>} />
        <Route path="circle" element={<Circles />} />
        <Route path="shader" element={<Shader />} />
        <Route path="fiber" element={<Fiber />} />
        <Route path="card" element={<Card />} />
        <Route path="maze" element={<MazeRoute />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
