import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import './fonts/fonts.css'; // Import the fonts CSS

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);