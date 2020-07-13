const app = require('../app');
const debug = require('debug')('express:server');
const http = require('http');
const mysql = require('mysql2');
const sDB = require('../models');
const env = process.env.NODE_ENV || 'development';
const configSqlz = require('../config/config.json')[env];
const { exec } = require("child_process");

const port = normalizePort(process.env.SVR_PORT || '8080');
app.set('port', port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

const con = mysql.createConnection({
  user: configSqlz.username,
  password: configSqlz.password
});
con.connect((err) => {
  if (err) throw err;
  console.log("connect to mysql!");

  con.query('CREATE DATABASE IF NOT EXISTS teacherQuiz;', () => {
    console.log("Database created");

    sDB
      .sequelize
      .query('SET FOREIGN_KEY_CHECKS = 0', { raw: true })
      .then((res) => {
        sDB.sequelize.sync().then(() => {
          server.listen(port, function () {
            debug('Express server listening on port ' + server.address().port);
          });
          server.on('error', onError);
          server.on('listening', onListening);
          console.log(`listening on port ${port}`);
        });
      })
  })
})

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
