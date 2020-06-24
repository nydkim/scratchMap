const express = require('express');
const app = express();
const path = require('path');
const db = require('./db/database.js');

app.use(express.json());

app.use('/build', () => {
  console.log('inside build');
  express.static(path.join(__dirname, '../build'));
});

app.post('/login', (req, res) => {
  const sqlQuery = `select _id from people where _id='${req.body.id}' and password='${req.body.pw}';`;
  db.query(sqlQuery, (err, response) => {
    console.log('err', err);
    console.log(response);
  });
  res.json({ login: true });
});

app.post('/signup', (req, res) => {
  console.log('inside signup');
  console.log(req.body);
  // res.redirect(301, '/data');
  const sqlQuery = `INSERT INTO people (_id, name, password) VALUES ('${req.body.id}', '${req.body.name}', '${req.body.pw}');`;
  db.query(sqlQuery, (err, response) => {
    if (err) {
      return res.status(400).json({ login: false });
    }
    res.json({ login: true });
  });
});

// app.get('/data', (req, res) => {
//   res.json();
// });

app.use('*', (req, res) => {
  console.log('inside the *');
  res.sendFile(path.join(__dirname, '../index.html'));
});

app.listen(3000, () => {
  console.log('listetning on 3000');
}); //listens on port 3000 -> http://localhost:3000/
