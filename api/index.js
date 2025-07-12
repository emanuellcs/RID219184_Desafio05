const serverless = require('serverless-http');
const app = require('../src/server/server.js');

module.exports.handler = serverless(app);