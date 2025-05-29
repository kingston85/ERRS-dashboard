import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// EPA Liberia ERRS Dashboard - Main Entry Point
console.log('🏛️ EPA Liberia ERRS Dashboard - Initializing...');

// Create root element
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the EPA Dashboard App
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Performance monitoring for EPA dashboard
// This helps track the performance of the environmental monitoring system
reportWebVitals((metric) => {
  // Log performance metrics for government systems
  if (process.env.REACT_APP_DEBUG === 'true') {
    console.log('EPA Dashboard Performance Metric:', metric);
  }
  
  // Send performance data to monitoring service if configured
  if (process.env.REACT_APP_PERFORMANCE_MONITORING === 'true') {
    // Example: Send to analytics service
    // analytics.track('performance', metric);
  }
});

// Service Worker registration for offline capabilities
// Important for remote monitoring stations with poor connectivity
if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('🔄 EPA Dashboard: Service Worker registered successfully');
      })
      .catch((error) => {
        console.log('❌ EPA Dashboard: Service Worker registration failed');
      });
  });
}

// Global error handling for EPA dashboard
window.addEventListener('error', (event) => {
  console.error('🚨 EPA Dashboard Global Error:', event.error);
  
  // Report critical errors to monitoring system
  if (process.env.REACT_APP_ENVIRONMENT === 'production') {
    // Example: Send error to Sentry or logging service
    // errorReporting.captureException(event.error);
  }
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
  console.error('🚨 EPA Dashboard Unhandled Promise Rejection:', event.reason);
  
  // Report promise rejections
  if (process.env.REACT_APP_ENVIRONMENT === 'production') {
    // Example: Send to error tracking service
    // errorReporting.captureException(event.reason);
  }
});

console.log('✅ EPA Liberia ERRS Dashboard - Initialized Successfully');
