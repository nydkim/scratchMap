import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Login extends Component {
  login() {
    console.log('in login');
    const user = document.getElementById('loginId').value;
    const pw = document.getElementById('loginPw').value;
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user, pw }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.login) {
          window.location.href = '/data';
        }
      });
  }
  render() {
    return (
      <div>
        <h1>Welcome to Scratch Map!</h1>
        <input name="username" type="text" placeholder="username"></input>
        <input name="password" type="password" placeholder="password"></input>
        <button onClick={this.login}>Log in</button>
        <br/>
        <Link to="./signup">Sign up</Link>
      </div>
    );
  }
}

export default Login;

//method="POST" action="/login"
