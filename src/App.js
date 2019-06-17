import React, { Component } from 'react';
import './App.css';
import Movies from './components/movies';
import Customers from "./components/customers";
import Navbar from "./components/common/navBar";
import Rentals from "./components/rentals";
import MovieForm from "./components/movieForm";
import {Route, Switch, Redirect} from "react-router-dom";
import NotFound from "./components/common/not-found";
import LoginForm from './components/loginForm';
import Register from './components/registerForm';
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class App extends Component {

  render() {
    return (
        <React.Fragment>
            <ToastContainer />
            <main className="container">
              <Navbar/>
              <Switch>
                <Route path="/movies" component={Movies} />
                <Route path="/customers" component={Customers} />
                <Route path="/rentals" component={Rentals} />
                <Route path="/login" component={LoginForm} />
                <Route path="/register" component={Register} />
                {/* <Route path="/movie/new" component={MovieForm} /> */}
                <Route path="/movie/:id" component={MovieForm} />
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
