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
    console.log(code);
    const countries = this.state.countries.slice();
    if (!this.state.countries.includes(code)) {
      countries.push(code);
      this.setState({ ...this.state, countries });
    } else {
      const index = this.state.countries.indexOf(code);
      countries.splice(index, 1);
      this.setState({ ...this.state, countries });
    }
    console.log('state^^', this.state);
  }

  componentDidUpdate() {
    this.state.countries.forEach((code) => {
      document.getElementById('code').className('visited');
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
