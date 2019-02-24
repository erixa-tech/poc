var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var dbName = "srcdb";

function mongoOpns(collectionName, operation, dataJson, query)
{
	var toRet = "Error in DB Operation:" + operation;
	MongoClient.connect(url, function(err, db) {
	  if (err) throw err;
	  var dbo = db.db(dbName);
	  switch(operation)
	  {
		  case "insert":
			  dbo.collection(collectionName).insertOne(dataJson, function(err, res) {
				if (err) throw err;
				toRet = "1 document inserted";
				db.close();
			  });
			  break;
		  case "update":
			  var newvalues = { $set: dataJson };
			  dbo.collection(collectionName).updateOne(query, newvalues, function(err, res) {
				if (err) throw err;
				toRet = "1 document updated";
				db.close();
			  });
			  break;
		  case "delete":
			dbo.collection(collectionName).deleteOne(myquery, function(err, obj) {
				if (err) throw err;
				toRet = "1 document deleted";
				db.close();
			  });
			  break;
		  default:
			dbo.collection(collectionName).find(query).toArray(function(err, result) {
				if (err) throw err;
				toRet = result;
				db.close();
			  });
			  break;
	  }
	});
	return toRet;
}

module.exports.mongoOpns = mongoOpns;
