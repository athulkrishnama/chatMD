import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { WrappedPage } from './components/WrappedPage';
import './styles.css';

// Declare window types for injected data
declare global {
  interface Window {
    __WRAP_DATA__?: any;
  }
}

const data = window.__WRAP_DATA__;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {data ? (
      <WrappedPage data={data} />
    ) : (
      <div className="flex h-full items-center justify-center text-neutral-500">
        No Wrap Data Found
      </div>
    )}
  </StrictMode>
);
