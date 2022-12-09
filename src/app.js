import { ConnectedRouter } from "connected-react-router";
import { createBrowserHistory } from "history";
import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import configureStore from "./Redux/Reducers/store";
import Routes from "./Routes/routes";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
let history = createBrowserHistory();
let { store, persistor } = configureStore();
export default () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ConnectedRouter history={history}>
          <Routes />
        </ConnectedRouter>
      </PersistGate>
    </Provider>
  );
};
