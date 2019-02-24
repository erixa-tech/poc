var http = require('http');
var fs = require('fs');
//var MongoClient = require('mongodb').MongoClient;
//var url = "mongodb://localhost:27017/";

var jsdom = require("jsdom");
var testJs = require('./Mongo');
var testJs1 = require('./Mongo1');

http.createServer(function (req, res) {
  fs.readFile('test.html', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(parseData(data));
    res.end();
  });
}).listen(8092);

function parseData(html)
{
	const {JSDOM} = jsdom;
    const dom = new JSDOM(html);
    const $ = (require('jquery'))(dom.window);
	$('#id_testForm').html(testJs.testFn($));
	testJs1.testFn1($);
	var testJson = {"name" : "123"};
	var mongoOpns = require('./mongoQueries');
	mongoOpns.mongoOpns("receipe", "insert", testJson);

	return $('#id_testForm').html();
}



