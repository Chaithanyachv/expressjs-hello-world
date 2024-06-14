const express = require('express')
const app = express()
const cors=require('cors')
var bodyParser = require("body-parser")
const upload = require("express-fileupload")
const mysql = require("mysql")

let connection = mysql.createConnection({
  host: "mysql.razs.me",
  user: 'twitter_db_user',
  password: 'swEqodl2aP_PrUrU0AkA',
  database: 'angular_twitter'
})
connection.connect((err) => {
  if (err) throw err;
  console.log("db connected")
})


const port = 3000

 app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(upload())
app.use(cors())

// //-------------------------get method-------------------------------------

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/chaithanya_emp', (require, response) => {
  console.log(require.query)

  let sql = `SELECT * FROM chaithanya_emp WHERE Emp_Id `
  connection.query(sql, (err, result) => {
    console.log(err);
    console.log(result);
    response.send(result)
  })

})

// //============================get method==================================

app.get("/users/:id", (req, res) => {
  console.log(req.params.id);
  let users = [
    { id: 1, name: "chaithanys", qualification: "b.tech" },
    { id: 2, name: "kumar", qualification: "MBA" },
    { id: 3, name: "sai", qualification: "mca" },
  ];
  let selectedUser = users.filter((user) => user.id == req.params.id);
  res.send(selectedUser);
});

// //-------------------------------post method-----------------------------------

app.post("/chaithanya_emp", (req, res) => {
  console.log(req.query)

  let sql = "INSERT INTO `chaithanya_emp`(`Emp_Id`, `Emp_Name`, `Emp_Designation`, `Emp_Department`, `Email`, `Mobile_Number`) VALUES('4860', 'JAMES', 'TRAINEE', 'DESIGN', 'JAMES@GMAIL.COM', '9988776600')"
  connection.query(sql, (err, result) => {
    console.log(err);
    console.log(result);
    res.send(result)
  })
  // console.log(req.body)
  // res.send({ id: 34512, message: "user data send successfully", data: req.body })
})

// //=================================post method used for admin======================

app.post("/postAdmin", (req, res) => {
  let data = req.body;
  if (data.email === "admin" && data.password === "Admin$2024")
    res.send({ meaasge: "your login is successfull" });
  else res.send({ meaasge: "invalid username or password" });
});

// //-----------------------------patch method--------------------------------------------

app.patch("/chaithanya_emp", (req, res) => {
  console.log(req.query)

  let sql = "UPDATE `chaithanya_emp` SET `Emp_Id`='4001',`Emp_Name`='james 2',`Emp_Designation`='trainee',`Emp_Department`='design',`Email`='james@gmail.com',`Mobile_Number`='6303461098' WHERE Emp_Id=4001"
  connection.query(sql, (err, result) => {
    console.log(err);
    console.log(result);
    res.send(result)
  })
  console.log(req.params.id);
  res.send({ message: "data updated successfully", id: req.params.id });
});

// //----------------------------------delete method----------------------------------------

app.delete("/chaithanya_emp", (req, res) => {
  console.log(req.result)
  let sql =`DELETE FROM chaithanya_emp WHERE Emp_Id=4860`
  connection.query(sql, (err, result) => {
    console.log(err);
    console.log(result);
    res.send(result)
  })
  console.log(req.params.id);
   res.send({ message: "data deleted  successfully", id: req.params.id});
});

// //---------------------------------------------------------------------------------------------
app.listen(port, () => {
 console.log(`Example app listening on port ${port}`)
})
