let db_connect = require('./../config/connection')

let users = {};

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
    let data = req.body;
    let query = `INSERT INTO users (id, name, email, password) VALUES(NULL, '${data.name}', '${data.email}', '${data.password}')`;
    let registerUser = await db_connect.query(query);
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
    let data = req.body;
    let query = `INSERT INTO users (id, name, email, password) VALUES(NULL, '${data.name}', '${data.email}', '${data.password}')`;
    let registerUser = await db_connect.query(query);
    res.send({
      status: 'success',
      result: registerUser
    });
    let query = `DELETE FROM users WHERE email = '${req.params.email}' AND password = '${req.params.password}'`;
    let result = await db_connect.query(query)
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
    let data = req.body;

    let queryGetUserId = `SELECT id FROM users WHERE email = '${data.currentUser.email}' AND password = '${data.currentUser.password}'`;
    let isAuthenticated = await db_connect.query(queryGetUserId);

    let queryUpdateUserData = `UPDATE users SET name = '${data.name}', email = '${data.email}', password = '${data.password}' WHERE id = '${isAuthenticated[0].id}'`;
    let updateUserData = await db_connect.query(queryUpdateUserData);
    res.send({
      status: "success",
      result: isAuthenticated
    });
  } catch (error) {
    res.send({
      error: error
    });
  }
}

module.exports = users;