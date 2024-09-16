// index.htmlのrootクラスをAppコンポーネントでマウント（コンポーネントがDOMに追加され、ブラウザに表示されるプロセス）される
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
