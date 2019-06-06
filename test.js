var mysql  = require('mysql');  
 
var connection = mysql.createConnection({     
  host     : 'localhost',       
  user     : 'root',              
  password : '123',       
  port: '3306',                   
  database: 'orders' 
}); 
 
connection.connect();
console.log("hehehaha");
var  sql = 'SELECT * FROM myorders';

connection.query(sql,function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
 
       console.log('--------------------------SELECT----------------------------');
       console.log(result);
       console.log('------------------------------------------------------------\n\n');  
});

connection.end();