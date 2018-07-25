var express = require('express');
var router = express.Router();

router.get('/data', function(req, res, next) {
    var result=[{project_title:"", username:"",category_name:""}];
    res.render('data/index', {result});
});

router.get('/data/get', function(req, res, next) {
    var db = req.con;
    var orderBy = req.query.orderBy;
    console.log(req.query.orderBy);
    var query = "";

    if(orderBy){
        query = "SELECT p.project_title, u.username, c.category_name FROM ilance_projects p JOIN ilance_users u ON u.user_id = p.user_id LEFT JOIN ilance_categories c ON c.cid = p.cid ORDER BY " + orderBy + " ASC"// LIMIT " + start_index + "," + items_per_page;
    } else {
        query = "SELECT p.project_title, u.username, c.category_name FROM ilance_projects p JOIN ilance_users u ON u.user_id = p.user_id LEFT JOIN ilance_categories c ON c.cid = p.cid"// LIMIT " + start_index + "," + items_per_page;
    }

    db.query(query, function(err, result, fileds){
        if(err){
            console.log(err);
        }
        //var result=JSON.stringify(result);
        //var result=JSON.parse(string);
        res.json(result);
    });
});

module.exports = router;