const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fetch = require('node-fetch');
const config = require('./config.json')
const snoowrap = require('snoowrap') // Reddit API wrapper

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

// app.post('/getRedditAccessToken', async (req, res) => {

//   // const r = new snoowrap({
//   //   userAgent: 'amalgamation dashboard thing .1 by /u/Important_Quit',
//   //   clientId: config.client_id,
//   //   clientSecret: config.client_secret,
//   //   username: config.username,
//   //   password: config.password
//   // });

//   r.getHot().map(post => post.created_utc).then(console.log);
// })


// *** Routes ***



app.post('/getHotReddit', async (req, res) => {
   console.log(req.body.subreddit)
   let hots = await r.getSubreddit(req.body.subreddit).getHot()
   res.send(hots)
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