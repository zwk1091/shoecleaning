var http = require('http');
var os = require('os');
function getIPv4(){
    var interfaces = os.networkInterfaces();//获取网络接口列表
    var ipv4s = [];//同一接口可能有不止一个IP4v地址，所以用数组存
    Object.keys(interfaces).forEach(function (key){
        interfaces[key].forEach(function (item){
            //跳过IPv6 和 '127.0.0.1'
            if ( 'IPv4' !== item.family || item.internal !== false ){return false;}
            ipv4s.push(item.address);//可用的ipv4s加入数组
            console.log(key+'--'+item.address);
        })
    });
    return ipv4s[0];//返回一个可用的即可
}

var mysql  = require('mysql');  
 
var connection = mysql.createConnection({     
  host     : 'localhost',       
  user     : 'root',              
  password : '123',       
  port: '3306',                   
  database: 'orders' 
}); 
 
connection.connect();

var sql_select_all = 'SELECT * FROM myorders';
var sql_insert = 'insert into myorders(user_name,user_phone,address,order_date,state) values(?,?,?,?,?);'

var express = require('express');
var app = express();
app.use('/public', express.static('public'));

app.get('/index.html', function (req, res) {
   res.sendFile( __dirname + "/" + "index.html" );
})
//  查询所有订单
app.get('/', function (req, res) {
   console.log("主页 GET 请求");
   // res.send('Hello GET');

   connection.query(sql_select_all,function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
       res.send(result);
});
})

//插入新的订单
app.get('/neworders',function(req,res) {
  console("insert new orders");
   var name=req.query.user_name;
   var phone=req.query.user_phone;
   var address=req.query.address;
   var date=req.query.address;
   var state=req.query.state;

   console.log(name);
   console.log(phone);
  // connection.query(sql_insert,function(err,result) {

  // })
})

//  POST 请求
app.post('/', function (req, res) {
   console.log("主页 POST 请求");
   res.send('Hello POST');
})
 
//  /del_user 页面响应
app.get('/del_user', function (req, res) {
   console.log("/del_user 响应 DELETE 请求");
   res.send('删除页面');
})
 
//  /list_user 页面 GET 请求
app.get('/list_user', function (req, res) {
   console.log("/list_user GET 请求");
   res.send('用户列表页面');
})
 
// 对页面 abcd, abxcd, ab123cd, 等响应 GET 请求
app.get('/ab*cd', function(req, res) {   
   console.log("/ab*cd GET 请求");
   res.send('正则匹配');
})

app.get('/process_get', function (req, res) {
 
   // 输出 JSON 格式
   var response = {
       "first_name":req.query.first_name,
       "last_name":req.query.last_name
   };
   console.log(response);
   res.end(JSON.stringify(response));
})
 
var server = app.listen(3000,getIPv4(), function () {
  var host = server.address().address
  var port = server.address().port
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
 
})

// connection.end();