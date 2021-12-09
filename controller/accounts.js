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
    let queryGetUserId = `SELECT id FROM users WHERE email = '${req.params.email}' AND password = '${req.params.password}'`;
    let user = await db_connect.query(queryGetUserId);

    let query = `DELETE FROM accounts WHERE id = '${req.params.id} AND id_users = ${user[0].id}'`;
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

accounts.update = async function (req, res) {
  try {
    let data = req.body;

    let queryGetUserId = `SELECT id FROM users WHERE email = '${data.currentUser.email}' AND password = '${data.currentUser.password}'`;
    let user = await db_connect.query(queryGetUserId);

    let queryUpdateAccountData = `UPDATE accounts SET description = '${data.description}', date = '${data.date}', price = '${data.price}', type = '${data.type}', status = '${data.status}' WHERE id = '${data.id_account}' and id_users = '${user[0].id}'`;
    let updateAccountData = await db_connect.query(queryUpdateAccountData);
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
    let data = req.body;
    let queryUpdateAccountData = `UPDATE accounts SET status = '${data.status}' WHERE id = '${data.id_account}'`;
    let updateAccountData = await db_connect.query(queryUpdateAccountData);
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

    let querySelectAccountsData = `SELECT * FROM accounts WHERE id_users = '${isAuthenticated[0].id}' AND type = '${req.params.type}' ORDER BY date ASC`;
    let doAccountSelect = await db_connect.query(querySelectAccountsData);
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

    let querySelectAccountsData = `SELECT * FROM accounts WHERE id_users = '${isAuthenticated[0].id}' AND status = '${req.params.status}' ORDER BY date ASC`;
    let doAccountSelect = await db_connect.query(querySelectAccountsData);
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

    let querySelectAccountData = `SELECT * FROM accounts WHERE id = '${req.params.id}' AND id_users = '${isAuthenticated[0].id}' ORDER BY date ASC`;
    let doAccountSelect = await db_connect.query(querySelectAccountData);
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

accounts.search = async function (req, res) {
  try {
    let queryGetUserId = `SELECT id FROM users WHERE email = '${req.params.email}' AND password = '${req.params.password}'`;
    let isAuthenticated = await db_connect.query(queryGetUserId);

    let querySelectAccountsData = `SELECT * FROM accounts WHERE description LIKE '%${req.params.searchContent}%' AND id_users = '${isAuthenticated[0].id}' ORDER BY date ASC`;
    let doAccountSelect = await db_connect.query(querySelectAccountsData);
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

accounts.monthlySummary = async function (req, res) {
  try {
    const FIVE_DAYS_MILLISECONDS = 2592000000;
    let queryGetUserId = `SELECT id FROM users WHERE email = '${req.params.email}' AND password = '${req.params.password}'`;
    let isAuthenticated = await db_connect.query(queryGetUserId);

    let date = new Date();
    date = date.getTime() - FIVE_DAYS_MILLISECONDS; 
    date = new Date(date);

    let year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
    let month = new Intl.DateTimeFormat('en', { month: 'numeric' }).format(date);
    let day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);

    date = `${year}-${month}-${day}`;

    let querySelectPositiveAccountsData = `SELECT count(id) AS accountsAmount, Sum(price) AS priceAmount FROM accounts WHERE date >= '${date}' AND type = 'positive' AND id_users = '${isAuthenticated[0].id}' ORDER BY date ASC`;
    let doAccountPositiveSelect = await db_connect.query(querySelectPositiveAccountsData);

    let querySelectNegativeAccountsData = `SELECT count(id) AS accountsAmount, Sum(price) AS priceAmount FROM accounts WHERE date >= '${date}' AND type = 'negative' AND id_users = '${isAuthenticated[0].id}' ORDER BY date ASC`;
    let doAccountNegativeSelect = await db_connect.query(querySelectNegativeAccountsData);

    let inf = {
      'positiveAccountsAmount': doAccountPositiveSelect[0].accountsAmount,
      'negativeAccountsAmount': doAccountNegativeSelect[0].accountsAmount,
      'positiveAccountsPriceAmount': doAccountPositiveSelect[0].priceAmount,
      'negativeAccountsPriceAmount': doAccountNegativeSelect[0].priceAmount
    } 
    
    res.send({
      status: "success",
      result: inf
    });
  } catch (error) {
    res.send({
      error: error
    });
  }
}

module.exports = accounts;