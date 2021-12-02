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

module.exports = accounts;