var mysql = require('mysql');

var con = mysql.createConnection({
  host: "rds-mysql-10mintutorial.cswuo5xfikwv.us-east-1.rds.amazonaws.com",
  user: "admin",
  password: "$Rynptr2302",
  database: "db_siperem"
});

con.connect(function (err){
    if(err) throw err;
});

module.exports = con;