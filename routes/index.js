module.exports = {
  listSysTables : function(ibmdb,connString) {
    return function(req, res) {
      ibmdb.open(connString, function(err, conn) {
  		    if (err ) {
  			      res.send("error occurred " + err.message);
  			  }
  			  else {
  				    conn.query("SELECT FIRST_NAME, LAST_NAME, EMAIL, WORK_PHONE from GOSALESHR.employee FETCH FIRST 10 ROWS ONLY", function(err, tables, moreResultSets) {
  				        if ( !err ) {
  					          res.render('tablelist', {
  						                   "tablelist" : tables,
  						                   "tableName" : "10 rows from the GOSALESHR.EMPLOYEE table",
  						                   "message": "Congratulations. Your connection to dashDB is successful."
  					          });
          				} else {
          				   res.send("error occurred " + err.message);
          				}
          				/*
          					Close the connection to the database
          					param 1: The callback function to execute on completion of close function.
          				*/
          				conn.close(function(){
          					console.log("Connection Closed");
          				});
  			      });
  			  }
  		});
  	}
  },
  apicall : function(ibmdb, connString, query){
    return function(req, res, next){
        ibmdb.open(connString, function(err, conn){
            if(err){
                console.error("Error: ", err);
                return;
            }else{
                //var query = "SELECT CUSTOMER, COUNT(*) AS TOTAL FROM DASH14467.BLADE_DAMAGE GROUP BY CUSTOMER";
                conn.query(query, function(err, rows){
                    if(err){
                        console.log("Error: ", err);
                        return;
                    }else {
                        res.send(rows);
                        conn.close(function(){
                            console.log("Connection closed successfully");
                        });
                    }
                });
            }
        });
    }
  }
}

/*
exports.listSysTables = function(ibmdb,connString) {
    return function(req, res) {


       ibmdb.open(connString, function(err, conn) {
			if (err ) {
			 res.send("error occurred " + err.message);
			}
			else {
				conn.query("SELECT FIRST_NAME, LAST_NAME, EMAIL, WORK_PHONE from GOSALESHR.employee FETCH FIRST 10 ROWS ONLY", function(err, tables, moreResultSets) {


				if ( !err ) {
					res.render('tablelist', {
						"tablelist" : tables,
						"tableName" : "10 rows from the GOSALESHR.EMPLOYEE table",
						"message": "Congratulations. Your connection to dashDB is successful."

					 });


				} else {
				   res.send("error occurred " + err.message);
				}
				conn.close(function(){
					console.log("Connection Closed");
					});
				});
			}
		} );

	}
	}
  */
