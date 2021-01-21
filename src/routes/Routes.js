import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

//Pages
import ShowComponent from "../components/ShowComponent/showComponent";
import ErrorPage from "../components/ErrorPage";

export default function Routes() {
  return (
    <Switch>
      {<Redirect exact from="/" to="/shows" />}
      <Route exact path="/error" component={ErrorPage} />
      <Route exact path="/shows" component={ShowComponent} />

      <Redirect to="/error" />
    </Switch>
  );
}
