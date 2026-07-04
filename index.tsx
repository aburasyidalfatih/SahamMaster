import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Automatically reload the page if a chunk fails to load (due to new deployment / PWA cache mismatch)
window.addEventListener('vite:preloadError', (event) => {
  window.location.reload();
});

// Prevent FOUC from Tailwind CDN by hiding loader after a short delay
setTimeout(() => {
  const loader = document.getElementById('initial-loader');
  if (loader) {
    loader.classList.add('hide-loader');
    setTimeout(() => {
      if (loader.parentNode) loader.parentNode.removeChild(loader);
    }, 500);
  }
}, 400);