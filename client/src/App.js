import React, { useEffect } from 'react';
import './App.css';

import Main from './components/main/main.js'
import Sidebar from './components/sidebar/sidebar.js'


function App() {

   const dataStore = window.localStorage;
   const clientID = 'QEs9hoG6TZuoPw'; //IMPORTANT - THIS NEEDS TO BE YOUR CLIENT ID FROM YOUR APP
   const subreddits = ['android'];

   // from https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
   function getRandomID() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
         let r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
         return v.toString(16);
      });
   }

   // function grabStories() {
   //    if (!validToken()) {
   //       getAccessToken();
   //    } else {
   //       for (const i of subreddits) {
   //          query(i, queryCallback);
   //       }
   //    }
   // }

   function validToken() {
      if (!dataStore.getItem('accessToken')) {
         return false;
      }

      const currentDate = new Date();
      const expires = new Date(dataStore.getItem('expires'));
      const difference = (expires.getTime() - currentDate.getTime());
      const minutesDifference = Math.ceil(difference / (1000 * 60)); // minutes difference
      if (minutesDifference < 5) {
         return false;
      }

      return true;
   }

   
   async function getAccessToken() {
      console.log("Fetch from app.js")
      let token = await fetch('/getRedditAccessToken', {
         method: 'POST',
         headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
         body: JSON.stringify({device_id: dataStore.getItem('deviceID')})
      })
      console.log(token)
      return token;

      // $.ajax({
      //    type: 'post',
      //    url: 'https://www.reddit.com/api/v1/access_token',
      //    dataType: 'json',
      //    headers: {
      //       Authorization: `Basic ${btoa(`${clientID}:` + '')}`,
      //    },
      //    data: { grant_type: 'https://oauth.reddit.com/grants/installed_client', device_id: dataStore.getItem('deviceID') },
      //    success(data) {
      //       if (data.access_token) {
      //          dataStore.setItem('accessToken', data.access_token);
      //          dataStore.setItem('expires', new Date().addHours((data.expires_in) / 3600));
      //          grabStories();
      //       }
      //    },
      //    error(err) {
      //       console.log(err);
      //    },
      // });
   }

   function init() {
      if (!dataStore.getItem('deviceID')) {
         dataStore.setItem('deviceID', getRandomID());
         console.log('Created new deivce ID');
      }
      // grabStories();
   }
   init()
   getAccessToken()

   // let api_url = 'https://www.reddit.com/r'

   // let initObj = {}
   // let payload = {'q': 'warhammer', 'limit': 5}
   // let fetchThings = async () => {
   //   let result = await fetch(api_url + '/subreddits/search', initObj)
   //   console.log(result)
   // }

   // fetchThings()

   // let token = '4ADJqwn21Ml_LTJGjNDSA-g0QCs'

   // let placeholderListings = []

   // let listingTemplate = {
   //    sitename: 'coolsite365',
   //    details: 'this site is the coolest',
   //    baseUrl: 'https://oauth.reddit.com',
   //    headers: {'Authorization': token, 'User-Agent': 'APP-NAME by Important_Quit'}
   // }

   // for (var i = 0; i < 4; i++) {
   //    placeholderListings[i] = listingTemplate
   // }


   // function contactReddit() {
   //    let client_id = 'QEs9hoG6TZuoPw'
   //    let response_type = 'code'
   //    let state = 'randomstring'
   //    let redirect_uri = 'matchesurionredditpage'
   //    let duration = 'temporary'
   //    let scope_string = ''

   //    let url = `https://www.reddit.com/api/v1/authorize?client_id=${client_id}&response_type=${response_type}&
   //    state=${state}&redirect_uri=${redirect_uri}&duration=${duration}&scope=${scope_string}`
   // }




   useEffect(() => {
      //  contactReddit()
   })


   return (
      <div className="App">
         <Sidebar />
         <Main />
      </div>
   );
}

export default App;
