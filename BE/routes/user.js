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
console.log(req.param("asset_id"));
var asset= parseInt(req.param("asset_id"));
var user = parseInt(req.param("user_rating"));
var comment = req.param("comment");
console.log(user);
console.log(comment);
var username = "nayangoel@gmail.com"
console.log(req.session.username);
var getasset="select * from asset where asset_id="+asset+";";
                                console.log("Query is:"+getasset);
                                mysql.fetchData(function(err,results){
                                        if(err){
                                                throw err;
                                        }
                                        else
                                        {
                                                if(results.length > 0){
                                                        console.log("select succ");
console.log(results[0].asset_id);
console.log(results[0].user_rating);
                                                        var total = parseInt(results[0].total_number) + 1;
                                                        total = total * 5;
                                                        var user1 = parseInt(results[0].user_rating) + user;
console.log(total);
console.log(user1);
        //write update query.
                                                        var updateasset="UPDATE asset SET `total_number`="+total+", `user_rating`="+user1+" WHERE `asset_id`="+parseInt(results[0].asset_id)+";";
                                                        console.log("Query is:"+updateasset);
                                                        mysql.push(function(err,results){
                                                                if(err){
                                                                        throw err;
                                                                }
                                                        },updateasset);
                                                        var insertUser="INSERT INTO user(`username`, `asset_id`, `user_rating`,`comment`) VALUES ('"+username+"', "+parseInt(results[0].asset_id)+", "+user1+",'"+comment+"');";
                                                        console.log("Query is:"+insertUser);
                                                        mysql.push(function(err,results){
                                                                if(err){
                                                                        throw err;
                                                                }
                                                        },insertUser);
                                                        res.send("New user created.");
                                                        res.end();                                              }
                                                else {

                                                        console.log("No Data.");
                                                }
                                        }
                                },getasset);
                        };

exports.insertAsset = function(req, res){
				var insertAsset="INSERT INTO asset (`asset_name`, `asset_type`, `total_number`, `user_rating`, `location`) VALUES (`"+req.param("asset_name")+"`,`"+req.param("asset_type")+"` , '0', '0', '"+req.param("location")+"');";
				console.log("Query is:"+insertAsset);
				mysql.push(function(err,results){
					if(err){
						throw err;
					}  
				},insertAsset);
				res.send("New Asset created");
				res.end();
			};