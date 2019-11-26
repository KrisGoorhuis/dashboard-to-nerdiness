const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
// const fetch = require('node-fetch');
const config = require('./config.json')
const snoowrap = require('snoowrap') // Reddit API wrapper
const Parser = require('rss-parser')

const RSSParser = new Parser()
const app = express()
const port = process.env.PORT || 5000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

let tempData = {
   subreddits: ['totalwar', 'games'],
   mediumFeeds: [],
}

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

   let fetchPosts = async (subreddit) => {
      return await r.getSubreddit(subreddit).getHot()
   }

   for (let i = 0; i < req.body.subreddits.length; i++) {
      fetchPromises.push(fetchPosts(req.body.subreddits[i]))
   }

   Promise.all(fetchPromises).then((results) => {
      let flattenedResults = []

      results.forEach((subredditResults) => {
         subredditResults.forEach((post) => { flattenedResults.push(post) })
      })

      res.send(flattenedResults)
   })
})

app.post('/saveMediumFeed', async (req, res) => {
   // Save to database
})

app.post('/getMediumPosts', async (req, res) => {
   let publications = []
   // Will retrieve feed urls from database in the future

   function createUrl(feedString) {
      let baseUrl = 'https://medium.com/feed/'
      return baseUrl + feedString
   }

   for (let i = 0; i < req.body.mediumPublications.length; i++) {
      let pubStub = req.body.mediumPublications[i]

      publications[i] = RSSParser.parseURL(createUrl(pubStub))
   }

   Promise.all(publications).then((results) => {
      let flattenedPosts = []
      // console.log(results)

      results.forEach(publicationResults => {

         // Not every site sends back the string used to find it. 
         // Eg, entering 'totalwar' as a subreddit to add returns objects that contain a subreddit property containing 'totalwar'
         // So we're extracting it from a url object instead and adding a new property ourselves.


         let str = publicationResults.feedUrl
         let publicationString = str.match(/(?<=feed\/).*$/)[0]
       
         

         publicationResults.items.forEach( post => { 
            post.publication = publicationString
            flattenedPosts.push(post) 
         })
      })

      res.send(flattenedPosts)
   })
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