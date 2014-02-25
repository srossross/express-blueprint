require("chai").should();
var expect = require("chai").expect;
var assert = require("chai").assert;
var blueprint = require("../index.js");
var express = require("express");
var fs = require('fs');
var request = require("supertest");

describe('blueprint', function() {
    describe('#configure()', function() {
        it('should run configure', function() {

            
            var bp = blueprint();

            var confiure_called = false;

            bp.configure(function(app){
                confiure_called = true;   
            });
            
            var app = express();
            bp.register(app);

            assert(confiure_called, "Configure was not called");

        });

        it('should not run configure for non-matching env', function() {

            
            var bp = blueprint();

            var confiure_called = false;

            bp.configure("production", function(app){
                confiure_called = true;   
            });
            
            var app = express();
            bp.register(app);

            assert(!confiure_called, "Configure was called");

        });
        
        it('should run configure for matching env', function() {

            
            var bp = blueprint();

            var confiure_called = false;

            bp.configure("production", function(app){
                confiure_called = true;   
            });
            
            var app = express();
            app.set("env", "production");
            bp.register(app);

            assert(confiure_called, "Configure was not called");

        });

    });
    // END describe configure

    describe('#get()', function() {
        it('should route get requests', function(done) {

            var app = express();
            var bp = blueprint();

            bp.get("/", function(req, res) {
                res.send("hello");
            });

            bp.register(app);
            request(app).get('/').end(function(err, res) {
                if (err) {
                    done(err);
                }
                res.statusCode.should.equal(200);
                done();
            });
        });

        it('should prepend a urlPrefix 1', function(done) {

            var app = express();
            var bp = blueprint({
                urlPrefix : "/hello"
            });

            var use_called = false;

            bp.get("/", function(req, res) {
                res.send("prefix");
            });

            bp.register(app);

            request(app).get('/').end(function(err, res) {
                if (err) {
                    done(err);
                }
                res.statusCode.should.equal(404);
                done();
            });

        });

        it('should prepend a urlPrefix 2', function(done) {

            var app = express();
            var bp = blueprint({
                urlPrefix : "/hello"
            });

            var use_called = false;

            bp.get("/", function(req, res) {
                res.send("prefix");
            });

            bp.register(app);

            request(app).get('/hello').end(function(err, res) {
                if (err) {
                    done(err);
                }
                res.statusCode.should.equal(200);
                done();
            });

        });
        it('should prepend a urlPrefix 3', function(done) {

            var app = express();
            var bp = blueprint({
                urlPrefix : "/hello"
            });

            var use_called = false;

            bp.get("/there", function(req, res) {
                res.send("prefix");
            });

            bp.register(app);

            request(app).get('/hello/there').end(function(err, res) {
                if (err) {
                    done(err);
                }
                res.statusCode.should.equal(200);
                done();
            });

        });

    });
    describe('#use()', function() {

        it('should handle use statements', function(done) {

            var app = express();
            var bp = blueprint();

            var use_called = false;
            bp.use(function(req, res, next) {
                use_called = true;
                next();
            });

            bp.get("/", function(req, res) {
                res.send("hello");
            });

            bp.register(app);
            request(app).get('/').end(function(err, res) {
                if (err) {
                    done(err);
                }
                res.statusCode.should.equal(200);
                assert(use_called, "Use statement was not called");
                done();
            });
        });

        it('should handle error use statements', function(done) {

            var app = express();
            var bp = blueprint();

            var use_called = false;
            bp.use(function(err, req, res, next) {
                res.status(400).send("caught error");
            });

            bp.get("/", function(req, res) {
                throw new Error("Test that app catches error");
            });

            bp.register(app);
            request(app).get('/').end(function(err, res) {
                if (err) {
                    done(err);
                }
                res.statusCode.should.equal(400);
                res.text.should.equal("caught error");
                done();
            });
        });

    });
    //END describe #get()
});
//END describe

