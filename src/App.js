import React, { Component } from "react";
import { Route, Switch, Router } from "react-router-dom";
import NewForm from "./form";
import Home from "./Home";
import Chatbot from "./Chatbot";
import history from './history';
import DataForm from "./DataForm";

class App extends Component {
  render() {
    return (
      <div>
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={Chatbot} />
            <Route path="/home" component={Home} />
            <Route path="/form" component={NewForm} />
            <Route path="/dataform" component={DataForm} />
          </Switch>
        </Router>
      </div>
    );
  }
}


export default App;
