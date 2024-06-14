const express = require("express");
const app = express();

const upload = require("express-fileupload")

app.use(upload())//use - It is mostly used to set up middleware for your application. 


app.get("/", (req, res) => {
   // res.send("welcone to the file upload server")
   res.sendFile("/home/ubuntu/workspace/uploader.html")
})

app.post("/upload", (req, res) => {

    if (req.files) {
        let file=req.files.image
        let filename = Date.now()+file.name
        file.mv(`./uploads/${filename}`, (err) => {
            if (err) {
                res.send(err)
            } else {
                res.send("file uploaded successfully")
            }
        })
    }
})

app.listen(3000, () => {
    console.log(`Example app listening on port 3000`)
}) 