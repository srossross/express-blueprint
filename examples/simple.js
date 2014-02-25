
blueprint = require("../index.js");
express = require("express");

blue = blueprint();

blue.use(express.bodyParser());


blue.get("/", function(req, res){
    res.send("Hello blue");
});

app = express();

blue.register(app);

console.log("Listening on port 8080");
app.listen(8080);
