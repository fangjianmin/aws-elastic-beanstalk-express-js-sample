const port = 8080;
const express = require('express');
const path = require('path');
const favicon = require('static-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const ejs = require('ejs');

const routes = require('./routes/index');
const reg = require('./routes/reg');
const login = require('./routes/login');
const logout = require('./routes/logout');
// const test = require('./routes/test');
//const main = require('./routes/main');


const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('.html', ejs.__express);
// app.set('view engine', 'html');


app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));

//这里传入了一个密钥加session id
app.use(cookieParser('Wilson'));
//使用靠就这个中间件
app.use(session({secret: 'wilson'}));

app.use('/', routes);
app.use('/reg', reg);
app.use('/login', login);
app.use('/logout', logout);
// app.use('/test', test);
// app.use('/upload', upload);

/// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.listen(port, function () {
    console.log(`App running on http://localhost:${port}`);
});

module.exports = app;

//app.get('/', (req, res) => res.send('Hello World! <br/> Hello AWS! <br/> Hello DevOps!'));
//app.listen(port);
//console.log(`App running on http://localhost:${port}`);
