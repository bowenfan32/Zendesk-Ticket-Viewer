const assert = require('chai').assert;
var request = require('request');
var expect = require('chai').expect;
const app = require('../app');

describe('GET /', function() {
	it('should return 200', function (done) {
  		request.get('http://localhost:3000', function (err, res, body){
    	expect(res.statusCode).to.equal(200);
    	done();
  		});
	});
});

describe('GET Invalid page', function() {
	it('should return 404', function (done) {
  		request.get('http://localhost:3000/test', function (err, res, body){
    	expect(res.statusCode).to.equal(404);
    	done();
  		});
	});
});