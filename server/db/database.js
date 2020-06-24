const { Pool } = require('pg');
const password = 'nakyoung';
const connectionString = `postgressql:postgres:${password}@localhost:5432/scratchmap`;

const pool = new Pool({
  connectionString: connectionString,
});

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};
