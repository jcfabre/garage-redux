import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware } from "redux";
import reduxPromise from "redux-promise";
import logger from "redux-logger";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createHistory as history } from "history";
import { reducer as formReducer } from "redux-form";

import carsReducer from "./reducers/carsReducer";
import garageReducer from "./reducers/garageReducer";
import CarsIndex from "./containers/CarsIndex";
import CarsNew from "./containers/CarsNew";
import CarsShow from "./containers/CarsShow";

import "../assets/stylesheets/application.scss";

const reducers = combineReducers({
  cars: carsReducer,
  garageName: garageReducer,
  form: formReducer
});

const initialState = {
  cars: [],
  garageName: prompt("Garage name?")
};

const middlewares = applyMiddleware(reduxPromise, logger);

ReactDOM.render(
  <Provider store={createStore(reducers, initialState, middlewares)}>
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={CarsIndex} />
        <Route path="/cars/new" exact component={CarsNew} />
        <Route path="/cars/:id" component={CarsShow} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);
