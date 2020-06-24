import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
    };
    this.login = this.login.bind(this);
  }

  login() {
    const username = document.getElementById('loginId').value;
    const password = document.getElementById('loginPw').value;
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.login === true) {
          return this.setState({
            isLoggedIn: true,
          });
        }
      });
  }

  render() {
    if (this.state.isLoggedIn) {
      console.log('redirecting to data');
      return <Redirect to="/data" />;
    }
    return (
      <div>
        <h1>Welcome to Scratch Map!</h1>
        <input id="loginId" name="username" type="text" placeholder="username"></input>
        <input id="loginPw" name="password" type="password" placeholder="password"></input>
        <button onClick={this.login}>Log in</button>
        <br />
        <Link to="./signup">Sign up</Link>
      </div>
    );
  }
}

export default Login;
