module.exports = (function() {
    return {
        connectInfo : {
            host     : 'localhost',
            user     : 'root',
            password : '1q2w3e4r!2',
            port     : 3306,
            database : 'gitcrawling'
        }
    }
})();
// connection.connect();

// connection.query('SELECT * from post', function(err, rows, fields) {
//  if (!err)   
//    console.log('The solution is: ', rows);
//  else
//    console.log('Error while performing Query.', err);
// });
// connection.end();
