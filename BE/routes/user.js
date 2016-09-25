
/*
 * GET users listing.
 */
var ejs = require("ejs");
	var mysql = require('./mysql');

	
exports.getasset = function(req, res){
var getasset="select * from asset";
		console.log("Query is:"+getasset);
		mysql.fetchData(function(err,results){
			if(err){
				throw err;
			}
			else 
			{
				if(results.length > 0){
					console.log("User Info Fetched");				
					res.send(results);
				}
				else {    
					
					console.log("No Data.");
				}
			}  
		},getasset);
	};
	

	exports.getuser = function(req, res){
		var getUser="select * from user";
				console.log("Query is:"+getUser);
				mysql.fetchData(function(err,results){
					if(err){
						throw err;
					}
					else 
					{
						if(results.length > 0){
							console.log("User Info Fetched");				
							res.send(results);
						}
						else {    
							
							console.log("No Data.");
						}
					}  
				},getUser);
			};

			exports.insertUser = function(req, res){
				var getasset="select * from asset where asset_id="+req.param("asset_id")+";";
				console.log("Query is:"+getasset);
				mysql.fetchData(function(err,results){
					if(err){
						throw err;
					}
					else 
					{
						if(results.length > 0){
							console.log("User Info Fetched");				
							var total = results.total_number + 1;
							total = total * 5;
							var user = results.user_rating + req.param("user_rating");
							//write update query.
							var updateasset="UPDATE asset SET `total_number`="+total+", `user_rating`="+user+" WHERE `asset_id`="+results.asset_id+";";
							console.log("Query is:"+updateasset);
							mysql.push(function(err,results){
								if(err){
									throw err;
								}  
							},updateasset);
							var insertUser="INSERT INTO user(`username`, `asset_id`, `user_rating`) VALUES ("+req.session.username+", "+results.asset_id+", "+user+");";
							console.log("Query is:"+insertUser);
							mysql.push(function(err,results){
								if(err){
									throw err;
								}  
							},insertUser);
							res.send("New user created.");
							res.end();						}
						else {    
							
							console.log("No Data.");
						}
					}  
				},getasset);
			};
			exports.insertAsset = function(req, res){
				var insertAsset="INSERT INTO asset (`asset_id`, `asset_name`, `asset_type`, `total_number`, `user_rating`, `location`) VALUES ('1', 'Market St', 'l', '0', '0', 'hhasfdb');";
				console.log("Query is:"+insertAsset);
				mysql.push(function(err,results){
					if(err){
						throw err;
					}  
				},insertAsset);
				res.send("New Asset created");
				res.end();
			};