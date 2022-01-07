const cors = require("cors");
var url = require("url"),
    querystring = require("querystring");
var fs = require('fs');
var path = require('path'),
    express = require('express')

var app = express();


var bodyParser = require("body-parser");
var methodOverride = require("method-override");

app.use(methodOverride());
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
// simple route
app.get("/", (req, res) => {
  res.redirect("index.html")
});

require("./server/app/routes/incidents.routes")(app);
require("./server/app/routes/devices.routes")(app);


app.use(express.static(path.join(__dirname, 'client/build')));
// DO NOT DO app.listen() unless we're testing this directly
if (require.main === module) { app.listen(8080); }
// Instead do export the app:
else{ module.exports = app; }


