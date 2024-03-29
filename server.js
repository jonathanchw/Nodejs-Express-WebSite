let express = require('express');
let app = express();
let sqlite3 = require('sqlite3');
let db = new sqlite3.Database('db/comments.db');
let bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/comments', function (request, response) {
  console.log('GET request received at /comments');
  db.all('SELECT * FROM comments', function (err, rows) {
    if (err) {
      console.log("Error: " + err);
    } else {
      response.send(rows);
    }
  });

});

app.post('/comments', function (request, response) {
  console.log('POST request received at /comments');
  db.run('INSERT INTO comments VALUES (?,?)', [request.body.name, request.body.comment], function (err) {
    if (err) {
      console.log("Error: " + err);
    } else {
      response.status(200).redirect('index.html');
    }
  });
});


app.listen(3000, function () {
  console.log("Server is running on port 3000");
});


