import React, { Component } from 'react';
import './App.css';
import Movies from './components/movies';
import Customers from "./components/customers";
import Navbar from "./components/common/navBar";
import Rentals from "./components/rentals";
import Movie from "./components/movie";
import {Route, Switch, Redirect} from "react-router-dom";
import NotFound from "./components/common/not-found";
import LoginForm from './components/common/loginForm';

class App extends Component {

  render() {
    return (
        <React.Fragment>
            
            <main className="container">
              <Navbar/>
              <Switch>
                <Route path="/movies" component={Movies} />
                <Route path="/customers" component={Customers} />
                <Route path="/rentals" component={Rentals} />
                <Route path="/loginForm" component={LoginForm} />
                <Route path="/movie/:id" component={Movie} />
                <Route path="/not-found" component={NotFound} />
                <Redirect from="/" exact to="/movies" />
                <Redirect to="/not-found" />
              </Switch>
            </main>
        </React.Fragment>
      
    );
  }
}

export default App;
