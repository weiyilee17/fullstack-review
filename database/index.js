const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

var db = mongoose.connection;
db.once('open', function() {
  console.log('data base is connected');
});

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  id: Number,
  name: String,
  updated_at: String
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repoProperties) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB

  // check for duplicate

  
  if (db.repos) { // if db.repos exist, check for duplicats
    if (db.repos.find({'id':repoProperties.id})) {

    } else {
      var repo = new Repo(repoProperties);

      repo.save();
    }
  } else {  // put into database
    var repo = new Repo(repoProperties);

    repo.save();
  }


  
}

module.exports.save = save;
module.exports.Repo = Repo;