import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import NotFound from "./components/404/NotFound.js";
import LayoutApp from "./components/LayoutApp";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Brief from "./Pages/Brief";
import ShowPoIs from "./Pages/ShowPoIs";
import PoiDetail from "./Pages/PoiDetail";
import NewPoi from "./Pages/NewPoi";
import Collabs from "./Pages/Collabs";
import Scan from "./Pages/Scan";
import Settings from "./Pages/Settings";
import showQrCode from "./Pages/showQrCode";

const Router = () => (
  <BrowserRouter>
    <LayoutApp>
      <Switch>
        <Route exact path="/" component={Brief} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/scan" component={Scan} />
        <Route exact path="/settings" component={Settings} />
        <Route exact path="/collabs" component={Collabs} />
        <Route exact path="/pois" component={ShowPoIs} />
        <Route exact path="/pois/new" component={NewPoi} />
        <Route exact path="/pois/:poiId" component={PoiDetail} />
        <Route exact path="/pois/:poiId/qrcode" component={showQrCode} />
        <Route component={NotFound} />
      </Switch>
    </LayoutApp>
  </BrowserRouter>
);

export default Router;
