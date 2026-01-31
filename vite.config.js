import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import netlifyReactRouter from "@netlify/vite-plugin-react-router";
import netlify from "@netlify/vite-plugin";

export default defineConfig({
  plugins: [react(), netlifyReactRouter(), netlify()],
});
