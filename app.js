const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const listEndpoints = require('express-list-endpoints');
const swaggerUi = require('swagger-ui-express');
const models = Object.values(require('./models').sequelize.models);


const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

models
  .forEach((Model, i) => {
    Model.creatingCustomMethod(app);
    Model.createDefCrud(app);

    if (i + 1 === models.length) {
      app.use('/explorer', swaggerUi.serve, swaggerUi.setup(Model.cmOpenapi))
    }
  });

const corsOptions = {
  origin: 'http://localhost:8080'
}
// app.use(function (req, res, next) {
//   console.log('hereee')
//   res.setHeader('Content-Type', 'application/json');
//   res.setHeader('origin', 'http://localhost:8080');
//   console.log('res: ', res);
//   next()
// })
// app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// app.all('*', (req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, PATCH, OPTIONS');
//   res.header('Access-Control-Allow-Headers', '*');
//   res.header('Access-Control-Allow-Credentials', true);
//   next();
// });


// require('./routes')(app);
// console.log('list', listEndpoints(app))

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

module.exports = app;

// function emptyOpenApi() {
//   swaggerDocument.paths = {}
//   swaggerDocument.components.schemas = {}
//   try { fs.writeFileSync('./openApi.json', JSON.stringify(swaggerDocument, null, 2), 'utf8'); }
//   catch (err) { console.log('err in json', err) }
// }







