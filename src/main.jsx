// Importation des polyfills pour la compatibilité des navigateurs plus anciens
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { NextUIProvider } from '@nextui-org/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Analytics } from '@vercel/analytics/react';
import store from './app/store';
import { ThemeProvider } from './context/ThemeContext'; // Assurez-vous que le chemin est correct

import App from './App';
import './index.css'; // Import des styles globaux
import './styles/themes.css'; // Import des styles des thèmes

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <NextUIProvider>
          <ThemeProvider> {/* Utilisation du ThemeProvider */}
            <SpeedInsights />
            <Analytics />
            <App />
          </ThemeProvider>
        </NextUIProvider>
      </Provider>
    </Router>
  </React.StrictMode>
);
