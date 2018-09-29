var mysql = require('mysql');
var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser')
var faker = require('faker')
var path = require('path')
app.use(express.static('./'));
app.use(bodyParser.urlencoded({ extended: true }));

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "backend"
}
);

// for (let i = 0; i < 100; i++){
//   let address = "" + faker.address.streetAddress()+ " " + faker.address.state()+ "";
//   var q = "insert into employees (firstName,lastName,email,address,phoneNumber) values ('"+faker.name.firstName()+"','"+ faker.name.lastName()+"','" + faker.internet.email() + "','" + address + "','"+faker.phone.phoneNumberFormat() +"');";
//   var test = connection.query(q, function (error, result, fields) {
//      if (error) throw error;
//   });
// }
// app.get('/', (req,res) => {
//   res.sendfile('index');
// })
app.post('/register', (req,res) => {

    var q = "insert into employees (firstName,lastName,email,address,phoneNumber) values ('"  + req.body.firstName + "','"  + req.body.lastName + "', '"  + req.body.email + "','"  + req.body.address + "','"  + req.body.phoneNumber + "');";
    var test = connection.query(q, function (error, results, fields) {
       if (error) {
         res.send(error)
       }
    });
    res.redirect('/')
})

app.post('/delete', (req,res) => {
  let test = (Object.keys(req.body)[0].split(","));
  test.pop();
  for (let i in test){
    q = "DELETE from employees where concat(firstName,' ',lastName) = '" + test[i] + "';"
  var test1 = connection.query(q, function(error,result,fields){
    if (error) throw error;
  })};
})

app.post('/update2', (req, res) => {
    let test = (Object.keys(req.body)[0].split(","))[0]; //number of button pressed
    var q = "select firstName,lastName,address,email,phoneNumber from employees as test limit " + (test -1)*5 + ",5 ;"
    connection.query(q, function (error, result, fields) {
        if (error) throw error;

        let answer = ""
        answer += "<table class='table'>"
        for (var item in result) {
            answer += "<div class='row'>"
            answer += "<div style='display: inline-block;'>"
            answer += "<input type='checkbox' class='peasant table'></input>"
            answer += "</div>"
            answer += "<div class='block'>"
            answer += "" + result[item].firstName + " " + result[item].lastName + ""
            answer += "</div>"
            answer += "<div class='block'>"
            answer += "" + result[item].address + ""
            answer += "</div>"
            answer += "<div class='block'>"
            answer += "" + result[item].email + ""
            answer += "</div>"
            answer += "<div class='phone'>"
            answer += "" + result[item].phoneNumber + ""
            answer += "</div>"
            answer += "<div class='small'>"
            answer += "<button onclick='edit(this)'>Edit</button>"
            answer += "</div>"
            answer += "</div>"
        }
        answer += "</table>"
        res.send(answer)
    })

})

app.post('/update', (req,res) => {
  q = "UPDATE employees SET firstName = '" + req.body.firstName + "', lastName = '" + req.body.lastName + "', address = '" + req.body.email + "', phoneNumber = '" + req.body.phoneNumber + "'  where concat(firstName,' ',lastName) = '" + req.body.oldata + "' ;"
  connection.query(q, function(error,result,fields){
    if (error) throw error;
  })
  res.redirect('/')
})

app.post('/pingserver', (req,res)=>{
  var q = "select firstName,lastName,address,email,phoneNumber from employees as test limit 10;"
  connection.query(q, function(error,result,fields){
  if (error) throw error;
        
    
  let answer = ""
      answer += "<table class='table'>"
      for (var item in result) {
      answer += "<div class='row'>"
      answer += "<div style='display: inline-block;'>"
      answer += "<input type='checkbox' class='peasant table'></input>"
      answer += "</div>"
      answer += "<div class='block'>"
      answer += "" + result[item].firstName + " " + result[item].lastName + ""
      answer += "</div>"
      answer += "<div class='block'>"
      answer += "" + result[item].address + ""
      answer += "</div>"
      answer += "<div class='block'>"
      answer += "" + result[item].email + ""
      answer += "</div>"
      answer += "<div class='phone'>"
      answer += "" + result[item].phoneNumber + ""
      answer += "</div>"
      answer += "<div class='small'>"
      answer += "<button onclick='edit(this)'>Edit</button>"
      answer += "</div>"
      answer += "</div>"
                }
      answer += "</table>"
  res.send(answer)
})
})

app.listen(8080, () => console.log('listening on port 8080!'))
