const mysql = require('mysql')
const Promise = require('bluebird')


db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'badmovies'
})

global.db = Promise.promisifyAll(db);

db.connect((err) => {
  if (err) console.log(err)
  console.log("connected!")
})

db.query(`
  CREATE TABLE IF NOT EXISTS favorites (
    id int(11) not null auto_increment primary key,
    poster_path varchar(255),
    original_title varchar(255),
    release_date varchar(255),
    vote_average double,
    unique(poster_path)
  );
`)

let store = (item) => {
  db.queryAsync(`
    insert into favorites 
    (poster_path, original_title, release_date, vote_average) 
    values(?, ?, ?, ?)
`, [item.poster_path, item.original_title, item.release_date, item.vote_average])
}


let retrieve = () => {
  return db.queryAsync(`
    Select * from favorites
  `)
}

let remove = (item) => {
  return db.queryAsync(`
    delete from favorites  
    where poster_path = ? 
  `, [item.poster_path])
}


module.exports.store = store
module.exports.retrieve = retrieve
module.exports.remove = remove


// db.query(`
//     insert into favorites 
//     (poster_path, original_title)
//     values(?,?)
// `, ['abc.com', 'alan movie'])