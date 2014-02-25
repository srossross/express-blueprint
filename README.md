
# Modular Applications with Express Blueprints 


The concept of blueprints for making application components and supporting common patterns within an application or across applications. 
Blueprints can greatly simplify how large applications work and provide a central means for express extensions to register operations on applications. 
A Blueprint object works similarly to a Express application object, but it is not actually an application. 
Rather it is a blueprint of how to construct or extend an application.

### Express Blueprints

```js
blueprint = require("express-blueprint");

blue = blueprint();

blue.configure(function(app){
    // Some Config here!
});

blue.use(some_middleware);

blue.get("/", function(req, res){
    
    res.send("Hello Blueprints!");
});
```



### Installation

    $ npm install -g express-blueprint
    
### Running Tests

To run the test suite, first invoke the following command within the repo, installing the development dependencies:

    $ npm install

Then run the tests:

    $ npm test
