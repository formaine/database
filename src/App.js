import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navigation, /*Footer,*/ Home, MillSites, DataHighlights } from "./components";
function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />
        <Switch>
          <Route path="/" exact component={() => <Home />} />

          <Route path="/DataHighlights" exact component={() => <DataHighlights />} />
        </Switch>
      </Router>
    </div>
  );
}


export default App;
