const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

const params = process.argv.slice('2');
console.log(params[0]);

 const queryString = `
 SELECT students.id, students.name as name, cohorts.name as cohort
 FROM students
 JOIN cohorts ON students.cohort_id = cohorts.id
 WHERE cohorts.name LIKE $1
 LIMIT $2;
 `;
 const cohortName = params[0];
 const limit = params[1];

 const values = [`%${cohortName}%`, limit];


pool.query(queryString, values)
.then(res => {
  res.rows.forEach(user => {
    console.log(`${user.name} has an id of ${user.id} and was in the ${user.cohort} cohort`);
  })})
.catch(err => console.error('query error', err.stack));
