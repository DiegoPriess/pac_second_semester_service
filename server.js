let express = require('express');
const connection = require('./config/connection');
let router = require('./routes/router');
let server = express();
const cors = require('cors');
const corsOptions ={
    origin:'http://localhost:3001', 
    credentials:true,
    optionSuccessStatus:200
}

server.use(cors(corsOptions));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use("/", router);
server.listen(3000, function () {
	console.log('Port 3000')
});

