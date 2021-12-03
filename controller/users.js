var db_connect = require('./../config/connection')

var users = {};

users.authentication = async function (req, res) {
  try {
    let query = `SELECT * FROM users WHERE email = '${req.params.email}' AND password = '${req.params.password}'`;
    let isAuthenticated = await db_connect.query(query);
    res.send(isAuthenticated);
  } catch (error) {
    res.send({
      error: error
    });
  }
}

users.register = async function (req, res) {
  try {
    var data = req.body;
    var query = `INSERT INTO users (id, name, email, password) VALUES(NULL, '${data.name}', '${data.email}', '${data.password}')`;
    var registerUser = await db_connect.query(query);
    res.send({
      status: 'success',
      result: registerUser
    });
  } catch (error) {
    res.send({
      error: error
    });
  }
}

users.delete = async function (req, res) {
  try {
    var query = `DELETE FROM users WHERE email = '${req.params.email}' AND password = '${req.params.password}'`;
    var result = await db_connect.query(query)
    res.send({
      status: "success",
      result: result
    });
  } catch (error) {
    res.send({
      error: error
    });
  }
}

users.update = async function (req, res) {
  try {
    var data = req.body;

    let queryGetUserId = `SELECT id FROM users WHERE email = '${data.currentUser.email}' AND password = '${data.currentUser.password}'`;
    let isAuthenticated = await db_connect.query(queryGetUserId);

    var queryUpdateUserData = `UPDATE users SET name = '${data.name}', email = '${data.email}', password = '${data.password}' WHERE id = '${isAuthenticated[0].id}'`;
    var updateUserData = await db_connect.query(queryUpdateUserData);
    res.send({
      status: "success",
      result: updateUserData
    });
  } catch (error) {
    res.send({
      error: error
    });
  }
}

module.exports = users;