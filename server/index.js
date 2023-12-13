require('dotenv').config();

const http = require('http');
const app = require('./src/app');

const server = http.createServer(app);

const PORT = process.env.PORT || 3000;

server.listen(PORT, function () {
  console.log('Server has started on port ' + PORT);
});
