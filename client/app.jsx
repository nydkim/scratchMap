import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Map from './Map.jsx';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import Data from './Data.jsx';
import './styles.scss';

class App extends Component {
  constructor() {
    super();
    this.state = { name: '', id: '', countries: [] };
    this.clickHandle = this.clickHandle.bind(this);
    this.loggedIn = this.loggedIn.bind(this);
  }

  clickHandle(code) {
    const countries = this.state.countries.slice();
    if (!this.state.countries.includes(code)) {
      countries.push(code);
      this.setState({ ...this.state, countries });
      document.getElementById(`${code}`).setAttribute('class', 'visited');
      if (this.state.id) {
        fetch('/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: this.state.id, code }),
        });
      }
    } else {
      const index = this.state.countries.indexOf(code);
      countries.splice(index, 1);
      this.setState({ ...this.state, countries });
      document.getElementById(`${code}`).classList.remove('visited');
      if (this.state.id) {
        fetch('/del', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: this.state.id, code }),
        });
      }
    }
  }

  loggedIn(data) {
    console.log(data);
    this.setState({ ...this.state, ...data });
  }

  componentDidUpdate() {
    console.log('updated!', this.state);
    this.state.countries.forEach((code) => {
      document.getElementById(`${code}`).setAttribute('class', 'visited');
    });
  }

  componentDidUpdate() {
    this.state.countries.forEach((code) => {
      console.log('update', `${code}`);
      document.getElementById(`${code}`).setAttribute('class', 'visited');
    });
  }

  render() {
    return (
      <div>
        <div id="topBar">
          <img src="/asset/logo.JPG" />
          <Router>
            <Switch>
              <Route exact path="/signup" component={Signup} />
              <Route
                exact
                path="/data"
                render={(props) => (
                  <Data loggedIn={this.loggedIn} name={this.state.name} state={this.state} />
                )}
              />
              <Route exact path="/" component={Login} />
            </Switch>
          </Router>
        </div>
        <Map clickHandle={this.clickHandle} />
      </div>
    );
  }
}

export default App;

//render={(props) => <Signup loggedIn={this.loggedIn} />}
