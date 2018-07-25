var express = require("express");
var router  = express.Router();
var saltedMd5 = require('salted-md5');

// LOGIN ROUTE
router.get("/login", function(req, res){
	res.render("login");
});

router.post("/login", function(req, res){
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

module.exports = router;