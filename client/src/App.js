import React, { Component } from 'react';
import { Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import NavBar from "./components/navBar";
import NotFound from "./components/notFound";
import ProtectedRoute from "./components/common/protectedRoute";

import Login from "./components/login";
import Register from "./components/register";
import Logout from "./components/logout";

import Posts from "./components/posts";
import PostsForm from "./components/postsForm";

import auth from './services/authService';

import './App.css';
import Post from "./components/post";

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
                     path="/posts/new"
                     render={props => <PostsForm {...props} user={user} />}
                 />
                 <Route
                     path="/posts" exact
                        render={props => <Posts {...props} user={user} />}
                 />
                 <ProtectedRoute path="/posts/edit/:slug" component={PostsForm} />
                 <Route
                     path="/posts/:slug"
                     render={props => <Post {...props} user={user} />}
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
