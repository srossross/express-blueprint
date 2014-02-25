var _extend = require('util')._extend;

var blueprint = module.exports = function(options) {

    if (!(this instanceof blueprint)) {
        return new blueprint(options);
    }

    this.options = options || {};
    this.locals = {};
    this.records = [];
    this.configure_records = [];
    this.uses = [];
    this.error_uses = [];
};

blueprint.prototype.configure = function(env, callback){
    var _this = this;
    this.configure_records.push(function(app){
        if (callback === undefined){
            callback = env;
            callback.call(_this, app);
        } else if (app.get('env') == env){
            callback.call(_this, app);
        }
    });
};

blueprint.prototype.use = function(use) {
    if (use.length == 4) {
        this.error_uses.push(use);
    } else {
        this.uses.push(use);
    }
};

blueprint.prototype.error_stack = function(err, req, res) {
    var _this = this;
    
    var uses = _this.error_uses.slice(0);
    
    var nextuse = function(err) {
        if (uses.length == 0) {
            throw err;
        } else {
            var use = uses.shift();
            use(err, req, res, nextuse);
        }
    };

    nextuse(err);
  
};

blueprint.prototype._wrapper = function(func) {
    var _this = this;
    
    
    return function(req, res) {
        req.blueprint = this;
        _extend(req.locals, this.locals);

        try {
            func(req, res);
        } catch (err) {
            return _this.error_stack(err, req, res);
        }
    };
};

blueprint.prototype._record = function(method, path, callbacks, callback){
    var _this = this; 
    this.records.push(function(app){
        var app_method = app[method];
        var args;
        
        if (_this.options.urlPrefix){
            if (path == '/'){path = '';}
            args = [_this.options.urlPrefix + path];
        } else {
            args = [path];
        }
        
        if (_this.uses.length){
            
            var _callbacks;
            
            if (callback){
                if (callbacks instanceof Array){
                    _callbacks = _this.uses.concat(callbacks);
                } else {
                    _callbacks = _this.uses.concat([callbacks]);
                }
            } else {
                _callbacks = _this.uses;
                callback = callbacks;
            }
            
            args.push(_callbacks);
            args.push(_this._wrapper(callback));
            
        } else if (callback){
            args.push(callbacks);
            args.push(_this._wrapper(callback));
        } else {
            args.push(_this._wrapper(callbacks));
        }
        
        app_method.apply(app, args);
    });
};

['all', 'get', 'post', 'patch', 'delete', 'put', 'options', 'head', 'trace'].forEach(function(verb){
    blueprint.prototype[verb] = function(path, callbacks, callback) {
        this._record(verb, path, callbacks, callback);
    };
});



blueprint.prototype.register = function(app, options) {
    
    if (options){
        _extend(this.options, options); 
    }
    
    this.configure_records.forEach(function(callback){
        callback(app);
    });

    this.records.forEach(function(callback){
        callback(app);
    });
};

