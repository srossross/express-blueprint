
blueprint = require("../index.js");
express = require("express");

// Blueprint 1
blue1 = blueprint({urlPrefix: "/hello"});

blue1.get("/", function(req, res){
    res.send("Hello blue1");
});

// Blueprint 2
blue2 = blueprint({urlPrefix: "/world"});

blue2.get("/", function(req, res){
    res.send("Hello blue2");
});

// App
app = express();

app.get("/", function(req, res){
    res.send('<a href="/hello">blue1</a> <a href="/world">blue2</a>');
});

blue1.register(app);
blue2.register(app);
console.log("Listening on port 8080");
app.listen(8080);
