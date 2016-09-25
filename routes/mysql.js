var ejs= require('ejs');
var mysql = require('mysql');
var pool =  mysql.createPool({
	host     : 'localhost',
    user     : 'root',
    password : 'admin',
    database : 'hackathon',
    port	 : 3306
  });	
function push(callback,sqlQuery){
	console.log("\nSQL Query::"+sqlQuery);
	pool.getConnection(function(err, connection){
		  connection.query( sqlQuery,  function(err, rows){
		  	if(err)	{
		  		console.log("ERROR: " + err.message);
		  	}
		  });
		  connection.release();
	});
}
exports.push=push;

function fetchData(callback,sqlQuery){
	console.log("\nSQL Query::"+sqlQuery);
	pool.getConnection(function(err, connection){
	connection.query(sqlQuery, function(err, rows, fields) {
		if(err){
			console.log("ERROR: " + err.message);
		}
		else 
		{	
			console.log("DB Results:"+rows);
			callback(err, rows);
		}
	});
	console.log("\nConnection closed..");
	connection.release();
	});
}
exports.fetchData=fetchData;