import React from "react";
import App from "./App";
import { render } from "react-dom";
import { Provider } from "react-redux";
import configureStore from "../../src/stateManagement/store";

render(
  <Provider store={configureStore()}>
    <App />
  </Provider>,
  document.querySelector("#demo")
);
