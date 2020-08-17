const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const swaggerUi = require('swagger-ui-express');
const models = require('./models').sequelize.modelManager.models;
const init = require('./initServer');
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.options('*', function (req, res) {
  console.log('in option op')
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.end();
});

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('origin', 'http://localhost:3000');
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Connection', 'Keep-Alive')
  next();
});



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// let cmOpenapi = init(app)
app.use('/explorer', swaggerUi.serve, swaggerUi.setup(init(app)))
// console.log('endpoints',listEndpoints(app))
// models
//   .forEach((Model, i) => {
//     createDefCrud.call(Model, app);
//     creatingCustomMethod.call(Model, app);

//     if (i + 1 === models.length) {
//       app.use('/explorer', swaggerUi.serve, swaggerUi.setup(cmOpenapi))
//     }
//   });

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// app.get('/questionnaires/hello', () => {
//   console.log('this workedd')
// })

module.exports = app;







