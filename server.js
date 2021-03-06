// server.js
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

/* Create App */
var app = express();

/* Setup Views */
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

/* panggil css js dll via path di src*/
app.use(express.static(path.join(__dirname, 'src')));

//load mongoose
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

//hubungkan ke Mongodb
mongoose.connect('mongodb://localhost/mo_purwokertojs')
  .then(() => console.log('Berhasil terhubung dengan MongoDB'))
  .catch((err) => console.error(err));


//Buat route pada app.js
var home = require('./routes/index');
var about = require('./routes/about');
var meetup = require('./routes/meetup');
var register = require('./routes/register');
var test = require('./routes/test');

//Routes buat admin dashboard
var dashboard = require('./routes/administrator/dashboard');

//pasang routes
app.use('/', home);
app.use('/abouts', about);
app.use('/meetup', meetup);
app.use('/register', register);
app.use('/test', test);

//pasang routes backend admin
app.use('/administrator/dashboard', dashboard);


/* Create Server */
var port = 3000;
app.listen(port, function(){
  console.log('listening on port: '+ port)
});

