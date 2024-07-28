// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import removeConsole from "vite-plugin-remove-console";

// // https://vitejs.dev/config/
// export default defineConfig(({ mode }) => ({
//   plugins: [react(), mode === "production" && removeConsole()].filter(Boolean),
//   server: {
//     host: true,
//     strictPort: true,
//     port: 8080,
//     proxy: {
//       "/api/v1": {
//         target:"https://davincitsolutions-expense-api.onrender.com",
//         changeOrigin: true,
//       },
//     },
//   },
// }));











import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/v1': {
        target: 'https://davincitsolutions-expense-api.onrender.com/api/v1', // Cible du proxy
        changeOrigin: true, // Change l'origine de l'hôte pour la requête
        rewrite: (path) => path.replace(/^\/api\/v1/, ''), // Réécrit le chemin de la requête
      },
    },
  },
});




