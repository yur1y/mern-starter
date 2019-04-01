import React, { Component } from 'react';
import auth from './services/authService';

import './App.css';

class App extends Component {
    state = {};

    componentDidMount(){
        const user  = auth.getCurrentUser();
        this.setState({user});
    }
  render() {
        console.log(this.state)
    return (
     <React.Fragment>

     </React.Fragment>
    );
  }
}

export default App;
