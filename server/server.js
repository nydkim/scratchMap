const express = require('express');
const app = express();
const path = require('path');
const db = require('./db/database.js');
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cookieParser());

app.use('/build', () => {
  console.log('inside build');
  express.static(path.join(__dirname, '../build'));
});

app.post('/login', (req, res) => {
  const sqlQuery = `select _id, name from people where _id='${req.body.username}' and password='${req.body.password}';`;
  db.query(sqlQuery, (err, response) => {
    console.log(response.rows[0]);
    if (response.rows[0]) res.cookie('id', response.rows[0]._id).json({ login: true });
    else res.status(400).json({ login: false });
  });
});

app.post('/signup', (req, res) => {
  console.log('inside signup');
  const sqlQuery = `INSERT INTO people (_id, name, password) VALUES ('${req.body.id}', '${req.body.name}', '${req.body.pw}');`;
  db.query(sqlQuery, (err, response) => {
    if (err) {
      console.log('in error');
      return res.status(400).json({ login: false });
    }
    console.log('signup response**', response);
    return res.cookie('id', req.body.id).json({ login: true });
  });
});

app.get('/initial', async (req, res) => {
  console.log('in data', req.cookies.id);
  let name;
  await db.query(`select name from people where _id='${req.cookies.id}'`).then((response) => {
    console.log('first response', response.rows[0].name);
    name = response.rows[0].name;
  });
  console.log('name', name);
  const sqlQuery = `SELECT code FROM visited WHERE _id='${req.cookies.id}';`;
  let countries;
  await db.query(sqlQuery).then((response) => {
    console.log('countries response**', response.rows);
    countries = response.rows;
  });
  res.json({ name, countries });
});

app.get('*', (req, res) => {
  console.log('inside the *');
  res.sendFile(path.join(__dirname, '../index.html'));
});

app.listen(3000, () => {
  console.log('listetning on 3000');
}); //listens on port 3000 -> http://localhost:3000/
