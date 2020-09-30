import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Router from "./Router";
import * as serviceWorker from "./serviceWorker";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import Provider from "./context";

ReactDOM.render(
  <Provider>
    <Router />
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
