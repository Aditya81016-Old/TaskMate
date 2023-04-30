import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import sass from "sass";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: "sass",
      renderChunk: (code) => {
        const { css } = sass.renderSync({ data: code });
        return css.toString();
      },
    },
  ],
});
