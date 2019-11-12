const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fetch = require('node-fetch');
const config = require('./config.json')

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


  // From https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
function getRandomID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    let r = Math.random() * 16 | 0,
      v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}



app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.post('/api/world', (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
});


app.post('/getRedditAccessToken', async (req, res) => {
  console.log("request body:")
  console.log(req.body)

  const params = new URLSearchParams()
  params.append('grant_type', 'https://oauth.reddit.com/grants/installed_client')
  params.append('device_id', 'DO_NOT_TRACK_THIS_DEVICE')
  

  let results = await fetch('https://www.reddit.com/api/v1/access_token', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      // Authorization: Basic `${client_credentials.user_id}:${client_credentials.client_secret}`
      'Authorization': `Basic ${Buffer.from(`${config.client_id}:`).toString('base64')}`
    },
    // data: {
    //    grant_type: 'https://oauth.reddit.com/grants/installed_client',
    //   // grant_type: client_credentials,
    //   // grant_type: `password&username=${username}&password=${password}`,
    //   device_id: req.body.device_id
    // }
    body: params
  })
    .then((response) => {
      return response.json()
    })
    .then(data => data)

  console.log("from server results")
  console.log(results)
  res.send(results)

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