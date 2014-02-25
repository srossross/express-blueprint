
# Modular Applications with Express Blueprints 


The concept of blueprints for making application components and supporting common patterns within an application or across applications. 
Blueprints can greatly simplify how large applications work and provide a central means for express extensions to register operations on applications. 
A Blueprint object works similarly to a Express application object, but it is not actually an application. 
Rather it is a blueprint of how to construct or extend an application.

### Define a Blueprints

```js
var blueprint = require("express-blueprint");

var pages = blueprint();

pages.configure(function(app){
    // Some Config here!
});

pages.use(some_middleware);

pages.get("/", function(req, res){
    res.send("Hello Blueprints!");
});
```

### Add a blueprint to your app

```
var express = require('express');
var app = express();

pages.register(app);

app.listen(8080);
```

### Installation

    $ npm install express-blueprint
    
### Running Tests

To run the test suite, first invoke the following command within the repo, installing the development dependencies:

    $ npm install

Then run the tests:

    $ npm test
    
    
# API

### `app.configure([env], callback)`

Conditionally invoke callback when `env` matches `app.get('env')`, aka `process.env.NODE_ENV`. 

```js
// all environments
pages.configure(function(app){
  app.set("value', 'I've configured a blueprint!");
})

// development only
app.configure('development', function(){
  app.set("value', 'I've configured a blueprint!");
})

// production only
app.configure('production', function(){
  app.set("value', 'I've configured a blueprint!");
})
```


# License

(The MIT License)



