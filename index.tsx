import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

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