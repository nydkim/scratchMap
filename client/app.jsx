import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Map from './Map.jsx';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import Data from './Data.jsx';
import './styles.scss';

class App extends Component {
  constructor() {
    super();
    this.state = { name: '', countries: [] };
  }

  login(e) {
    console.log(e);
  }

  clickHandle(code) {
    const countries = this.state.countries.slice();
    if (!this.state.countries.includes(code)) {
      countries.push(code);
      this.setState({ ...this.state, countries });
      document.getElementById(`${code}`).setAttribute('class', 'visited');
    } else {
      const index = this.state.countries.indexOf(code);
      countries.splice(index, 1);
      this.setState({ ...this.state, countries });
      document.getElementById(`${code}`).classList.remove('visited');
    }
  }

  //send the updated list to the database

  componentDidMount() {
    //get the list from the database
    this.state.countries.forEach((code) => {
      console.log('update', `${code}`);
      document.getElementById(`${code}`).setAttribute('class', 'visited');
    });
  }

  render() {
    this.clickHandle = this.clickHandle.bind(this);
    this.login = this.login.bind(this);
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/data" component={Data} />
            <Route exact path="/" render={(props) => <Login login={this.login} />} />
          </Switch>

          <Map clickHandle={this.clickHandle} />
        </Router>
      </div>
    );
  }
}

export default App;
