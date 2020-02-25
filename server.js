// server.js

// init project
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
app.use(bodyParser.json());


// Special piece for running with webpack dev server
if (process.env.NODE_ENV === "development") {
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const config = require('./webpack.dev.config.js');
  const compiler = webpack(config);

  // Tell express to use the webpack-dev-middleware and use the webpack.config.js
  // configuration file as a base.
  app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
  }));
}

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(request, response) {
  response.sendFile(__dirname + '/app/index.html');
});


app.get('/counter', async (req, res) => {
  //get the collection
  const collection = await dbclient.collection("siteinfo");

  //get the document you want
  const item = await collection.findOne( {} );

  //get the data out of the item
  const pageviews = item ? item.pageviews+1 : 1; 

  //save this back to database
  await collection.updateOne({}, {
    $set: {
      pageviews: pageviews
    },
    upsert: true
  });

  res.send(`This page has been visited ${pageviews} times.`);
});




//use for mongodb
const mongo = require("mongodb").MongoClient;
const mongouri = process.env.MONGODB_URI || "mongodb://localhost:27017";
var dbClient;


//listen for requests
mongo.connect(mongouri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
  //call this function with the results as the client 
}).then((client) => {
  dbClient = client.db();
})


app.get('/api/tweets', async (req, res) => {
  const tweetsCollection = await dbClient.collection("tweets");
  const tweets = tweetsCollection.find({});
  res.json(await tweets.toArray());
});

app.get('/user/:id', async (req, res) => {
  const id = req.params.id;
  const tweetsCollection = await dbClient.collection("tweets");
  const tweets = tweetsCollection.find({'user': id});
  res.json(await tweets.toArray());
});

app.post('/api/tweets', async (req, res) => {
  const body = req.body;
  const user = body.user;
  const message = body.message;
  if (!user || !message) {
    res.status(400).send("Missing user or message");
  } else {
    const tweetsCollection = await dbClient.collection("tweets");
    tweetsCollection.insertOne({user, message});
    res.sendStatus(200);
  }
});

app.delete('/user', async (req, res) => {
  const body = req.body;
  const user = body.user;
  const message = body.message;
  if (!user || !message) {
    res.status(400).send("Missing user or message");
  } else {
    const tweetsCollection = await dbClient.collection("tweets");
    tweetsCollection.deleteOne({'user': user, 'message': message});
    res.sendStatus(200);
  }  
})



// listen for requests :)
const listener = app.listen(port, function () {
  console.log('Your app is listening on port ' + port);
});
