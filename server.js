const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fetch = require('node-fetch');
const config = require('./config.json')
const snoowrap = require('snoowrap') // Reddit API wrapper
const Feed = require('rss-to-json')

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let r = new snoowrap({
   userAgent: 'amalgamation dashboard thing .1 by /u/Important_Quit',
   clientId: config.client_id,
   clientSecret: config.client_secret,
   username: config.username,
   password: config.password
});

// From https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
// function getRandomID() {
//   return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
//     let r = Math.random() * 16 | 0,
//       v = c == 'x' ? r : (r & 0x3 | 0x8);
//     return v.toString(16);
//   });
// }



// *** Routes ***

app.post('/getHotReddit', async (req, res) => {
   // Will get subreddits from database eventually. 
   // Right now it's called for every sub in the broswer JS's redux store, which draws from localStorage
   
   let fetchPromises = []
   let flattenedResults = []

   let fetchPosts = async (subreddit) => {
      return await r.getSubreddit(subreddit).getHot()
   }

   for (let i = 0; i < req.body.subreddits.length; i++) {
      fetchPromises.push(fetchPosts(req.body.subreddits[i]))
   }
   
   
   Promise.all(fetchPromises).then( (results) => {

      results.forEach( (subredditResults) => {
         subredditResults.forEach( (post) => { flattenedResults.push(post)})
      })
   
      console.log("flattened length")
      console.log(flattenedResults.length)

      res.send(flattenedResults)
   })
   
   
   // let hots = await r.getSubreddit(req.body.subreddit).getHot()
})

app.post('/saveMediumFeed', async (req, res) => {
   // Save to database
})

app.post('/getMediumFeeds', async (req, res) => {
   let feeds = []
   // Will retrieve feed urls from database
   console.log("request body: ")
   console.log(req.body)

   for (let i = 0; i < req.body.mediumFeeds.length; i++) {
      Feed.load(req.body.mediumFeeds[i], (err, rss) => {
         console.log(rss.items.length)
         feeds[i] = rss.items
      })
   }
   console.log("feeds:")
   console.log(feeds)
   res.send(feeds)
})


if (process.env.NODE_ENV === 'production') {
   // Serve any static files
   app.use(express.static(path.join(__dirname, 'client/build')));

   // Handle React routing, return all requests to React app
   app.get('*', function (req, res) {
      res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
   });
}

app.listen(port, () => console.log(`Listening on port ${port}`));