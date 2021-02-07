import React from "react";
import { Route, Switch } from "react-router-dom";
import BoardPage from "./components/pages/BoardPage";
import TopPage from "./components/pages/TopPage";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={TopPage} />
        <Route path="/b/:id" component={BoardPage} />
        {/* <Route component={NotFound} /> */}
      </Switch>
    </div>
  );
}

export default App;
