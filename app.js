const bodyParser = require("body-parser");
const express = require("express");
const app  = express();
const configRoutes = require("./routes");
const static = express.static(__dirname + "/public");
const exphbs = require("express-handlebars");

app.use("/public", static);
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


configRoutes(app);

app.listen(3000, () => {
    console.log("Your server is now listening on port 3000! Navigate to http://localhost:3000 to access it");
});
