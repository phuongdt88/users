var config = require('./postgresConfig')
var pg = config.pg;
var conString = config.conString;

function users(){
    "use strict";
}

users.checkLogin = function(username, password, callback){
    pg.connect(conString, function(err, client, done){
        var queryStr = 'SELECT * FROM login WHERE username =\'' + username + '\' and password =\'' + password + '\'';
        console.log(queryStr);
        client.query(queryStr, function(err, result){
            done();
            callback(result);
            });
        if (err) {
        return console.error('error running query', err);
        }
    });
};

users.getUser = function(userID, callback){
    pg.connect(conString, function(err, client, done){
        var queryStr = 'SELECT * FROM login WHERE \"userID\" =\'' + userID +'\'';
        console.log(queryStr);
        client.query(queryStr, function(err, result){
            done();
            callback(result);
            });
        if (err) {
            return console.error('error running query', err);
        }
    });
};

users.register = function(username, password, fullname, address, description){
    pg.connect(conString, function(err, client, done){
        var queryStr = 'INSERT INTO profile(fullname, address, description) VALUES (\''+ fullname + '\',\'' + address + '\',\'' + description + '\' ); INSERT INTO login(username, password) VALUES (\'' +username + '\',\'' + password + '\')';
        console.log(queryStr);
        client.query(queryStr, function(err){
            done();
        });
    });
};

users.getUserbyUsername = function(username, callback){
    pg.connect(conString, function(err, client, done){
        var queryStr = 'SELECT * FROM login WHERE username =\'' + username +'\'';
        console.log(queryStr);
        client.query(queryStr, function(err, result){
            done();
            callback(result);
            });
        if (err) {
            return console.error('error running query', err);
        }
    });
};

users.getUserInfo = function(userID, callback){
    pg.connect(conString, function(err, client, done){
        var queryStr = 'SELECT * FROM profile WHERE \"userID\" =\'' + userID +'\'';
        console.log(queryStr);
        client.query(queryStr, function(err, result){
            done();
            callback(result);
            });
        if (err) {
            return console.error('error running query', err);
        }
    });
};

users.checkExists = function(username, callback){
    pg.connect(conString, function(err, client, done){
        var queryStr = 'SELECT * FROM login WHERE username =\'' + username +'\'';
        console.log(queryStr);
        client.query(queryStr, function(err, result){
            done();
            callback(result);
            });
        if (err) {
            return console.error('error running query', err);
        }
    });
};

module.exports = users;
