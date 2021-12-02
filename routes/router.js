let express = require('express');
let router = express.Router()
let users = require('../controller/users');
let accounts = require('../controller/accounts');

router.post('/user/register', users.register);
router.post('/user/update', users.update);
router.get('/user/authentication/:email/:password', users.authentication);
router.get('/user/delete/:email/:password', users.delete);

router.post('/account/register', accounts.register);

module.exports = router;

