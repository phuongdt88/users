var pg = require('pg');
var postgresDB = {
    host: 'localhost',
    user: 'postgres',
    password: '123456',
    database: 'users',
    port: '5432'
};

function PGDB(){
    "use strict";
};

PGDB.conString = "postgres://" + postgresDB.user + ":" + postgresDB.password + "@" + postgresDB.host + ":" + postgresDB.port + "/" + postgresDB.database;
PGDB.pg = pg;

module.exports = PGDB;