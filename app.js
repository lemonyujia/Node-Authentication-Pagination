var createError  = require('http-errors');
var express      = require('express');
var path         = require('path');
var cookieParser = require('cookie-parser');
var logger       = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');
var LocalStrategy   = require('passport-local').Strategy;
var md5 = require('md5');
var session = require('express-session');
var crypto = require('crypto');
var saltedMd5 = require('salted-md5');
var SaltLength = 5;

//requiring routes
var data = require('./routes/data');
//var loginRoutes = require('./routes/login');

// connect to mysql database
var mysql  = require('mysql');
var con    = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "lemonyujia",
  port: 8889
});

con.connect(function(err){
  if(err){
    console.log("connecting error");
    return;
  } else {
    console.log("connecting success");
  }
});

var app = express();


//app.use(connection(mysql, dbconfig.connection, 'request'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
              secret: 'keyboard cat',
              resave: false,
              saveUninitialized: true,
              cookie: { maxAge: 60000 }
            }))

app.use(function(req,res,next){
  req.con = con;
  next();
});
app.use(cors());

app.use("/", data);
//app.use("/", loginRoutes);


app.get('/', function(req, res, next) {
  res.render('index', { title: 'Pagination'});
});


// LOGIN ROUTE
app.get("/login", function(req, res){
  res.render("login");
});

app.post("/login", function(req, res){
  var salt = 'S@LT!';
  var username=req.body.username;
  var password=req.body.password;
  con.query("SELECT * FROM ilance_users WHERE username = ?",[username], function(err, rows, fileds){
    if(err){
      res.json({
        status: flase,
        message:"there are some error with query"
      });
    } else {
      if(rows.length>0){
        if(rows[0].password == saltedMd5(req.body.password, salt)){
        // res.json({
        //   status:true,
        //   message:"sucessfully authenticated"
        // });
        res.redirect("/data");
        } else {
          res.json({
            status:false,
            message:"username and password does not match"
          });
        }
      } else {
        res.json({
          status:false,
          message:"username dose not exits "
        });
      }
    }
  });
});

// REGISTER ROUTE
app.get("/signup", function(req, res){
	res.render("signup");
});
app.post("/signup", function(req, res){
  var salt = 'S@LT!';
  var users={
    "username": req.body.username,
    "password": saltedMd5(req.body.password, salt),
    "salt": salt
  }
  con.query("INSERT INTO ilance_users SET ?",users,function(err, rows, fileds){
    if(err){
      res.json({
        status: false,
        message: "There are some error with query"
      });
    } else {
        // res.json({
        //   status: true,
        //   data: rows,
        //   message:'user registered sucessfully'
        // });
      res.redirect("/login");
    }
  });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;