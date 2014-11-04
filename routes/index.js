var express = require('express');
var router = express.Router();
var users = require('../models/login')

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

/* Get login page */
router.get('/login', function(req, res){
    res.render('login', {title: 'Login Page'});
});

/* login process */

router.post('/loginProcess', function(req, res){
    var username = req.body.username;
    var password = req.body.password;
    users.checkLogin(username, password, function(result){
        if (result.rowCount > 0) {
        var userID = result.rows[0].userID;
        res.redirect('../userinfo/'+userID);
        } 
        else {
            console.log('not exist');
            res.redirect('../login');
        }
    });
});

/* get profile page */

//router.get('/userinfo/:userID', function(req, res){
//    var userID = req.params.userID;
//    users.getUserInfo(userID, function(result){
//        res.render('profile', {
//            title: 'Profile Page',
//            data: result.rows[0]
//        });
//    });
//});

/* get register page */

router.get('/register', function(req, res){
    res.render('register', {title: 'Register Page'});
}); 

/* register act */

router.post('/registerAct', function(req, res){
    var username = req.body.username;
    var password = req.body.password;
    var fullname = req.body.fullname;
    var address = req.body.address;
    var description = req.body.description;
    users.checkExists(username, function(restult){
        if (restult.rowCount == 0){
        users.register(username, password, fullname, address, description);
        users.getUserbyUsername(username, function(result){
          var userID = result.rows[0].userID;
            res.redirect('../userinfo/'+userID);
        })
        }
        else {
            res.redirect('../register');
            console.log('existed');
        }
    });
});

router.get('/userinfo/:userID', function(req, res){
    var userID = req.params.userID;
    users.getUserInfo(userID, function(result){
        res.render('info', {
            title: 'User Information',
            data: result.rows[0]
        });
    });
});


module.exports = router;


