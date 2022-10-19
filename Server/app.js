global.config = require(process.env.NODE_ENV ? './config-prod.json' : './config-dev.json');
require('./data-access-layer/dal');


const express = require('express');
const cors = require('cors');


const authController = require('./controllers/auth-controller');
const statusController = require('./controllers/status-controller');
const dayController = require('./controllers/day-controller');
const isLoggedIn = require('./middleware/is-logged-in');

const server = express();

server.use(cors());
server.use(express.json());

server.use('/api/auth', authController);
server.use('/api/status',isLoggedIn, statusController);
server.use('/api/work', isLoggedIn, dayController);


const PORT = process.env.PORT || 3001;

server.listen(PORT, () => console.log(`Listening on port: ${PORT}`));

