let express = require('express');
const connection = require('./config/connection');
let router = require('./routes/router');
let server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use("/", router);
server.listen(3000, function () {
	console.log('port 3000')
});

