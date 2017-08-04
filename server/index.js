const express = require('express');
let app = express();
var getReposByUsername = require('../helpers/github').getReposByUsername;
var Repo = require('../database/index').Repo;
var Promise = require('bluebird');
var save = require('../database/index').save;


var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(__dirname + '/../client/dist'));


app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  // console.log('res:', res);
  // console.log('req.body.username:', req.body.username );



  var username = req.body.username;
  getReposByUsername(username, function(reposArray) {
    for (var i = 0; i < reposArray.length; i++) {
      console.log(reposArray[i]);
      save(reposArray[i]);
    }
  });

  // res.status(200).send({user: "Lee"});
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos

  var username = req.body.username;

  var cursor = db.collection('repos').find().limit(25);

  cursor.each(function(err, doc) {
    if (doc !== null) {
      console.dir(doc);
    } else {

    }
  });

  console.log('req in get:', req);
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

