import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import BoardPage from "./components/pages/BoardPage";
import TopPage from "./components/pages/TopPage";


const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/board/:id" component={BoardPage} exact />
        <Route path="/" component={TopPage} exact />
      </Switch>
    </Router>
  );
};
export default App;
