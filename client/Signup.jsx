import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
    };

    this.signup = this.signup.bind(this);
  }

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
        console.log('data back', data);
        if (data.login) {
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
        <h1>Sign up to save your scratch map!</h1>
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
