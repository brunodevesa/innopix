import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

//Pages
import ShowComponent from "../components/ShowComponent/showComponent";
import DetailsComponent from "../components/DetailsComponent/DetailsComponent";
import ErrorPage from "../components/ErrorPage";

export default function Routes() {
  return (
    <Switch>
      {<Redirect exact from="/" to="/shows" />}
      <Route exact path="/error" component={ErrorPage} />
      <Route exact path="/shows" component={ShowComponent} />
      <Route exact path="/shows/:id1/season/:id2/episode/:id3" component={DetailsComponent} />
      {/* more routes here  */}

      <Redirect to="/error" />
    </Switch>
  );
}
