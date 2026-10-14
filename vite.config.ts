import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  server: {
    watch: {
      ignored: ["**/startupdata/**", "**/*.pdf", "**/node_modules/**", "**/.git/**"],
    },
  },
  plugins: [
    tailwindcss(),
    tanstackStart(),
    viteReact(),
  ],
  // Pre-bundle frequently-used libs so the browser doesn't need multiple waterfall requests
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "@tanstack/react-router",
      "@tanstack/react-query",
      "motion/react",
      "lucide-react",
    ],
  },
  build: {
    // Target modern browsers for smaller output (no IE/legacy polyfills)
    target: "es2020",
    // Inline small assets (<4 KB) directly into CSS/JS
    assetsInlineLimit: 4096,
    rollupOptions: {
      output: {
        // Split vendor chunks so hashes only change when deps change
        manualChunks: (id) => {
          if (id.includes("node_modules")) {
            // Heavy animation library in its own chunk
            if (id.includes("motion")) return "vendor-motion";
            // All Radix UI primitives together
            if (id.includes("@radix-ui")) return "vendor-radix";
            // Lucide icons are large; isolate them
            if (id.includes("lucide-react")) return "vendor-lucide";
            // Recharts / d3 for portal pages
            if (id.includes("recharts") || id.includes("d3-")) return "vendor-charts";
            // TanStack router + query
            if (id.includes("@tanstack")) return "vendor-tanstack";
            // Everything else React-related
            if (id.includes("react")) return "vendor-react";
          }
        },
      },
    },
  },
});
