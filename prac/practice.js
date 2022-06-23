let dbparams = {
    host: "localhost",
    user: "manoj",
    password: "welcome123",
    database: "dhar",
    port: 3306,
  };
  const mysql = require("mysql2"); //fate
  const con = mysql.createConnection(dbparams); //fate
  //console.log("Db Connected");

const express = require("express");
const app = express();

app.use(express.static("sf"));

app.get("/addEmployee", (req, resp)=>{
    let input = {
        empno :req.query.empno,
        empname : req.query.ename,
        esal : req.query.esal,
    }

    let output = false;
    con.query('insert into emp1(empno, empname, esal) values(?,?,?)',
    [input.empno, input.empname, input.esal],
    (error, success)=>{
        if(error){
            console.log("inside error");
        }
        else if(success.affectedRows>0){
            output = true;
            console.log("inside success");
        }
        resp.send(output);
    });
    

});



app.get("/getEmployee", (req, resp)=>{
    let input = req.query.empno;
        
    

    let output = {status:false, empdetails:{empno:100, empname:"xyz", esal:50}};
    con.query('select * from emp1 where empno=?',
    [input],
    (error, rows)=>{
        console.log("in callback");
        if(error){
            console.log("in error");
        }
        else if (rows.length > 0) {
            output.status = true;
            output.empdetails = rows[0];
            console.log("in if");
          }
        
          resp.send(output);
    });
    

});

app.listen(900, function () {
    console.log("server listening at port 900...");
  });