let mysql = require('mysql2');
const { exit } = require('process');
let util = require('util');

let connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'db_geld'
  })


  connection.connect((error) => {
    if (error) {
      console.log("Connection faild")
      exit()
    }
    console.log("Connection successful")
  })

connection.query = util.promisify(connection.query);

module.exports = connection;