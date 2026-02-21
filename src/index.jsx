import React, { Suspense, lazy } from "react";
import ReactDOM from 'react-dom/client';
import './index.css';
import Loading from './components/Loading.jsx';

const App = lazy(() =>
  Promise.all([
    import("./App"),
    new Promise(resolve => setTimeout(resolve, 2500))
  ]).then(([moduleExports]) => moduleExports)
);

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
