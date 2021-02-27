const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const dbConn=require('./model/dbConn');
app.use('/',dbConn);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const initRoutes = require("./routes/web");

app.use(express.urlencoded({ extended: true }));
initRoutes(app);

let port = 3000;
app.listen(port, () => {
  console.log(`Running at localhost:${port}`);
});
module.exports= app.listen(4000);