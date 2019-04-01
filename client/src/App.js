import React, { Component } from 'react';
import { Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import NavBar from "./components/navBar";
import NotFound from "./components/notFound";
import Posts from "./components/posts";
import Login from "./components/login";
import Register from "./components/register";
import Logout from "./components/logout";
import auth from './services/authService';

import './App.css';

class App extends Component {
    state = {};

    componentDidMount(){
        const user  = auth.getCurrentUser();
        this.setState({user});

       }
  render() {
        const {user} = this.state;
    return (
     <React.Fragment>
        <ToastContainer/>
         <NavBar user={user} />
         <main className="container">
             <Switch>
                 <Route path="/register" component={Register} />
                 <Route path="/login" component={Login} />
                 <Route path="/logout" component={Logout} />
                 <Route
                     path="/posts"
                     render={props => <Posts {...props} user={this.state.user} />}
                 />
                 <Route path="/not-found" component={NotFound} />
                 <Redirect from="/" exact to="/posts" />
                 <Redirect to="/not-found" />
             </Switch>
         </main>
     </React.Fragment>
    );
  }
}

export default App;
