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
import Demo from './components/demo';
import Logout from './components/logout';
import auth from './services/authService';

class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({user});
  }

  render() {
    return (
        <React.Fragment>
            <ToastContainer />
            <main className="container">
              <Navbar user={this.state.user}/>
              <Switch>
                <Route path="/movies" render={props => <Movies {...props} user={this.state.user} /> }/>
                <Route path="/demo" component={Demo} />
                <Route path="/customers" component={Customers} />
                <Route path="/rentals" component={Rentals} />
                <Route path="/login" component={LoginForm} />
                <Route path="/logout" component={Logout} />
                <Route path="/register" component={Register} />
                {/* <Route path="/movie/new" component={MovieForm} /> */}
                <Route 
                  path="/movie/:id" 
                  render={props => {
                    if(!this.state.user) return <Redirect to ="/login" />;
                    return <MovieForm {...props} />
                  }} 
                />
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
