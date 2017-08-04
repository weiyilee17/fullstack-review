const request = require('request');
const config = require('../config.js');


let getReposByUsername = (username, callback) => {
  // TODO - Use the request module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out, 
  // but you'll have to fill in the URL
  let options = {
    url: `https://api.github.com/users/${username}/repos`,
    json: true,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  request(options, function(error, response, body) {
    
    if (error) {
      console.log('failed to get from github');
    }

    // console.log('body: ', body);
    // console.log('body.id: ', body.id);
    // console.log('body.name: ', body.name);
    // console.log("body.updated at: ", body.updated_at);

    var repos = [];

    getProperties(['id', 'name', 'updated_at'], body, repos);

    // console.log('repos', repos);
    // console.log('repos length: ', repos.length);

    repos.sort(function(a, b) {
      if (a.updated_at < b.updated_at) {
        return -1;
      } else if ( a.updated_at > b.updated_at) {
        return 1;
      } else {
        return 0;
      }
    });

    var last25 = repos.slice(repos.length - 25);

    // console.log('last 25:', last25);
    // console.log('last 25 length:', last25.length);
    callback(last25);

    // console.log('response in github', response);
  });

}

function getProperties(propertiesArray, body, reposArray){

  for (var i = 0; i < body.length; i++) {
    var repoInfo = {};
    for (var j = 0; j < propertiesArray.length; j++) {
      repoInfo[propertiesArray[j]] = body[i][propertiesArray[j]];
    }
    reposArray.push(repoInfo);
  }
}

module.exports.getReposByUsername = getReposByUsername;