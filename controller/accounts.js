let db_connect = require('./../config/connection')

let accounts = {};

accounts.register = async function (req, res) {
  try {
    let data = req.body;
    let query = `INSERT INTO accounts (id, description, month, year, price, type, status, id_users) VALUES(NULL, '${data.description}', '${data.month}', '${data.year}', '${data.price}', '${data.type}', '${data.status}', '${data.id_users}')`;
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
    var queryUpdateAccountData = `UPDATE accounts SET description = '${data.description}', month = '${data.month}', year = '${data.year}', price = '${data.price}', type = '${data.type}', status = '${data.status}' WHERE id = '${data.id_account}'`;
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



module.exports = accounts;