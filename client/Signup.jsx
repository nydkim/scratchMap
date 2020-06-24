import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Signup extends Component {
  signup() {
    console.log('in signup');
    const name = document.getElementById('signupName').value;
    const id = document.getElementById('signupId').value;
    const pw = document.getElementById('signupPw').value;
    fetch('/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, id, pw }),
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
        <input id="signupName" name="name" type="text" placeholder="name"></input>
        <input id="signupId" name="username" type="text" placeholder="username"></input>
        <input id="signupPw" name="password" type="password" placeholder="password"></input>
        <button onClick={this.signup}>Sign Up</button>
        <br />
        <Link to="./">Back to log in</Link>
      </div>
    );
  }
}

export default Signup;

//method="POST" action="/signup"
