const { Pool } = require('pg')
const pool = new Pool()    //we are going to create a new pool so this is actually what is going to conect to our postgres)  
module.exports = {      //and the we are going to export it...
  query: (text, params) => pool.query(text, params),
}