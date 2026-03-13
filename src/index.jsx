import React, { Suspense, lazy } from "react";
import ReactDOM from 'react-dom/client';
import './index.css';
import Loading from './components/Loading.jsx';
import { pingHealth } from "./services/modules/generalService";

window.__serverReady = false;
const healthPromise = pingHealth()
  .then((e) => { window.__serverReady = true; console.log("Health check successful", e); })
  .catch(() => { window.__serverReady = true; console.log("DB connection failed!"); }); // treat failure as done too as server may still work even if DB is not ready

const App = lazy(() =>
  Promise.all([
    import("./App"),
    healthPromise,
  ]).then(([moduleExports]) => moduleExports)
);

import { Provider } from "react-redux";
import { store, persistor } from "./store/index.js";
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
