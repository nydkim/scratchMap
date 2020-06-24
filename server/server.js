const express = require('express');
const app = express();
const path = require('path');
const db = require('./db/database.js');


app.use(express.json());


app.use('/build', () => {
  console.log('inside build');
  express.static(path.join(__dirname, '../build'));
});

app.post('/signup', (req, res) => {
  console.log('inside signup');
  console.log(req.body);
  res.redirect(301, '/data');
});


app.get('data', (res, req) => {
  res.json()
})

app.use('*', (req, res) => {
  console.log('inside the *');
  res.sendFile(path.join(__dirname, '../index.html'));
});

app.listen(3000, () => {
  console.log('listetning on 3000');
}); //listens on port 3000 -> http://localhost:3000/
