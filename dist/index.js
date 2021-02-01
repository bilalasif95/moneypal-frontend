import React from "react";
import App from "./App";
import { render } from "react-dom";
import { Provider } from "react-redux";
import configureStore from "./components/stateManagement/store";
render( /*#__PURE__*/React.createElement(Provider, {
  store: configureStore()
}, /*#__PURE__*/React.createElement(App, null)), document.querySelector("#demo"));