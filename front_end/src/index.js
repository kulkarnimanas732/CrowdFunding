import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store, { persistor } from './ReducerSetUp/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { AppProvider } from './ReducerSetUp/AppContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppProvider>
          <App />
        </AppProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
