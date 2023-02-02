import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { setupStore } from './app/store';
import { App } from './App';
import './index.css';

const main = () => {
  const root = document.getElementById('root');
  if (!root) return;

  const store = setupStore({});

  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  );
};

main();
