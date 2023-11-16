<<<<<<< HEAD
const http = require('http');
const app = require('./app');
const dotenv = require('dotenv');

dotenv.config();

app.set('port', process.env.BACK_PORT);
const server = http.createServer(app);

server.listen(process.env.BACK_PORT, () => {
  console.log(`Server is running on port ${process.env.BACK_PORT}`);
=======
const http = require('http');
const app = require('./app');
const dotenv = require('dotenv');

dotenv.config();

app.set('port', process.env.BACK_PORT);
const server = http.createServer(app);

server.listen(process.env.BACK_PORT, () => {
  console.log(`Server is running on port ${process.env.BACK_PORT}`);
>>>>>>> 20bc8b41fa2f0b59722ac124a08250daff57994c
});