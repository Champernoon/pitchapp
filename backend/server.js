const express = require("express")
const cors = require("cors")
const mongoose = require('mongoose')
// const exhbs=require("express-handlebars")
let path = require('path');

const app = express()
const port = process.env.PORT || 5000;


// app.engine("handlebars", exhbs({
//   defaultLayout: "main"
// }))

app.set("view engine", "handlebars")

app.use("./images", express.static(path.resolve("images")))

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });


app.use(cors())
app.use(express.json()) 
const uri = "mongodb+srv://admin_mathieu:******@cluster0.2urrs.mongodb.net/items"
mongoose.connect(uri, {useCreateIndex: true,});
const connection = mongoose.connection;
connection.once("open", () => [
    console.log("MongoDB database connection established successfully")
])

const pitchRouter = require("./routes/pitchs.js")

app.use("/pitchs", pitchRouter);

app.listen(port, () => {console.log("server ok")
})
