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

### `bluprint(options)`

Create a blueprint

```
var blueprint = require("express-blueprint");
var pages = blueprint();
```

This blueprint accepts the following options:

*   `urlPrefix`: Mounte the blueprint at a different location. see [this example](https://github.com/srossross/express-blueprint/blob/master/examples/urlPrefix.js) for more details.

### `pages.register(app [,options])`

Register your blueprint like this:
```
blueprint = require("./index.js");
express = require("express");

pages = blueprint({urlPrefix: "/pages"});

pages.get("/page1", function(req, res){
    res.send("Hello blue1");
});
pages.get("/page2", function(req, res){
    res.send("Hello blue1");
});

app = express();
pages.register(app);
```

If you check the rules registered on the application, you will find these:

```
console.log(app.routes);
{ get: 
   [ { path: '/pages/page1',
       method: 'get',
       callbacks: [Object],
       keys: [],
       regexp: /^\/pages\/page1\/?$/i },
     { path: '/pages/page2',
       method: 'get',
       callbacks: [Object],
       keys: [],
       regexp: /^\/pages\/page2\/?$/i } ] }
```

### `pages.configure([env], callback)`

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

### `pages.use(function)`

Use the given middleware function.

```js
var blueprint = require('express-blueprint');
var pages = blueprint();

// simple logger
pages.use(function(req, res, next){
  console.log('%s %s', req.method, req.url);
  next();
});

// respond
pages.use(function(req, res, next){
  res.send('Hello World');
});

```

### `pages.VERB(path, [callback...], callback)`

See [express api for more details](http://expressjs.com/api.html#app.VERB)
 
```js
pages.get('/', function(req, res){
  res.send('hello world');
});

```

### `pages.locals`

Bluprint local variables are provided to all templates rendered within the blueprint. 
This is useful for providing helper functions to templates, as well as app-level data.

```js
pages.locals.title = 'My App';
pages.locals.strftime = require('strftime');
```

# License

(The MIT License)



