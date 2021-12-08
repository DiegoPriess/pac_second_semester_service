let db_connect = require('./../config/connection')

let accounts = {};

accounts.register = async function (req, res) {
  try {
    let data = req.body;

    let queryGetUserId = `SELECT id FROM users WHERE email = '${data.currentUser.email}' AND password = '${data.currentUser.password}'`;
    let user = await db_connect.query(queryGetUserId);

    let query = `INSERT INTO accounts (id, description, date, price, type, status, id_users) VALUES (NULL, '${data.description}', '${data.date}', '${data.price}', '${data.type}', '${data.status}', '${user[0].id}')`;
    let registerAccount = await db_connect.query(query);
  
    res.send({
      status: 'success',
      result: registerAccount
    });
  } catch (error) {
    res.send({
      error: error
    });
  }
}

accounts.delete = async function (req, res) {
  try {
    var query = `DELETE FROM accounts WHERE id = '${req.params.id}'`;
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

accounts.update = async function (req, res) {
  try {
    var data = req.body;

    let queryGetUserId = `SELECT id FROM users WHERE email = '${data.currentUser.email}' AND password = '${data.currentUser.password}'`;
    let user = await db_connect.query(queryGetUserId);

    var queryUpdateAccountData = `UPDATE accounts SET description = '${data.description}', date = '${data.date}', price = '${data.price}', type = '${data.type}', status = '${data.status}' WHERE id = '${data.id_account}' and id_users = '${user[0].id}'`;
    var updateAccountData = await db_connect.query(queryUpdateAccountData);
    res.send({
      status: "success",
      result: updateAccountData
    });
  } catch (error) {
    res.send({
      error: error
    });
  }
}

accounts.changeStatus = async function (req, res) {
  try {
    var data = req.body;
    var queryUpdateAccountData = `UPDATE accounts SET status = '${data.status}' WHERE id = '${data.id_account}'`;
    var updateAccountData = await db_connect.query(queryUpdateAccountData);
    res.send({
      status: "success",
      result: updateAccountData
    });
  } catch (error) {
    res.send({
      error: error
    });
  }
}

accounts.getByType = async function (req, res) {
  try {
    let queryGetUserId = `SELECT id FROM users WHERE email = '${req.params.email}' AND password = '${req.params.password}'`;
    let isAuthenticated = await db_connect.query(queryGetUserId);

    var querySelectAccountsData = `SELECT * FROM accounts WHERE id_users = '${isAuthenticated[0].id}' AND type = '${req.params.type}'`;
    var doAccountSelect = await db_connect.query(querySelectAccountsData);
    res.send({
      status: "success",
      result: doAccountSelect
    });
  } catch (error) {
    res.send({
      error: error
    });
  }
}

accounts.getByStatus = async function (req, res) {
  try {
    let queryGetUserId = `SELECT id FROM users WHERE email = '${req.params.email}' AND password = '${req.params.password}'`;
    let isAuthenticated = await db_connect.query(queryGetUserId);

    var querySelectAccountsData = `SELECT * FROM accounts WHERE id_users = '${isAuthenticated[0].id}' AND status = '${req.params.status}'`;
    var doAccountSelect = await db_connect.query(querySelectAccountsData);
    res.send({
      status: "success",
      result: doAccountSelect
    });
  } catch (error) {
    res.send({
      error: error
    });
  }
}

accounts.getById = async function (req, res) {
  try {
    let queryGetUserId = `SELECT id FROM users WHERE email = '${req.params.email}' AND password = '${req.params.password}'`;
    let isAuthenticated = await db_connect.query(queryGetUserId);

    var querySelectAccountData = `SELECT * FROM accounts WHERE id = '${req.params.id}' AND id_users = '${isAuthenticated[0].id}'`;
    var doAccountSelect = await db_connect.query(querySelectAccountData);
    res.send({
      status: "success",
      result: doAccountSelect
    });
  } catch (error) {
    res.send({
      error: error
    });
  }
}

module.exports = accounts;