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
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/api/v1': {
        target: 'https://davincitsolutions-expense-api.onrender.com',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});



