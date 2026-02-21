import React, { Suspense, lazy } from "react";
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
import Loading from './components/Loading.jsx';

const App = lazy(() => import("./App"));

import { Provider } from "react-redux";
import { store, persistor } from "./store/index.js"; // updated import
import { PersistGate } from "redux-persist/integration/react";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Suspense fallback={<Loading />}>
          <App />
        </Suspense>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
