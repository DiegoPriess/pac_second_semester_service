var express = require('express');
var router = express.Router()
var users = require('../controller/users');

router.post('/user/register', users.register);
router.post('/user/update', users.update);
router.get('/user/authentication/:email/:password', users.authentication);
router.get('/user/delete/:email/:password', users.delete);

module.exports = router;

