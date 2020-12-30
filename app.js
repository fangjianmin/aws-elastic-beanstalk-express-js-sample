const express = require('express');
const app = express();
const port = 8080;

var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var routes = require('./routes/index');
var reg = require('./routes/reg');
var login = require('./routes/login');
var logout = require('./routes/logout');

//这里传入了一个密钥加session id
app.use(cookieParser('Wilson'));
//使用靠就这个中间件
app.use(session({ secret: 'wilson'}));

app.use('/', routes);
app.use('/reg', reg);
app.use('/login', login);
app.use('/logout', logout);


app.get('/', (req, res) => res.send('Hello World! <br/> Hello AWS! <br/> Hello DevOps!'));

app.listen(port);
console.log(`App running on http://localhost:${port}`);
