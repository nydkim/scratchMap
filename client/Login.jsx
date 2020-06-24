import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Login extends Component {
  login() {
    console.log('in login');
    const id = document.getElementById('loginId').value;
    const pw = document.getElementById('loginPw').value;
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, pw }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.login) {
          console.log('why in??');
          window.location.href = '/data';
        }
      });
  }
  render() {
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

//method="POST" action="/login"
