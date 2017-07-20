const assert = require('chai').assert;
var request = require('request');
var expect = require('chai').expect;
const app = require('../app');
var zendesk = require('node-zendesk');



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

var client = zendesk.createClient({
  username:  process.env.EMAIL,
  password:  process.env.PASSWORD,
  remoteUri: process.env.URL
});

describe('Return 200 with correct auth', function() {
  this.timeout(15000);
  it('should return 200', function(done) {
    client.tickets.list(function (err, response, body) {
      console.log(response[0]);
      expect(response[0]).to.equal(200);
        done();
    });
  })
})


var client1 = zendesk.createClient({
  username:  process.env.EMAIL,
  password:  "process.env.PASSWORD",
  remoteUri: process.env.URL
});

describe('Return err with incorrect auth', function() {
  this.timeout(15000);
  it('should return 401', function(done) {
    client1.tickets.list(function (err, response, body) {
      expect(err)
        done();
    });
  })
})