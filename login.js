const express = require('express')
const app = express()
const port = 3000

const mysql=require("mysql")
const bodyParser=require("body-parser")

app.use(bodyParser.json())

require("dotenv").config();

var con = mysql.createConnection({
  host:process.env.DATABASE_HOST,
  user:process.env.DATABASE_USER,
  password:process.env.DATABASE_PASSWORD,
  database:process.env.DATABASE_NAME,
})

con.connect((err)=>{
  if(err) throw err;
  console.log("connected successfully")
})

console.log(process.env.DATABASE_NAME)

app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.post("/login",(req,res)=>{
  let sql=`SELECT * FROM chaithanya_emp WHERE password LIKE '${req.body.password}' AND Email LIKE '${req.body.Email}'`
  con.query(sql,(err,result)=>{
    if(err) throw err;

    if(result.length)
    res.send(result[0])
    else
    res.send({message:"Email/password doesnot match."})
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})