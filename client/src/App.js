import React, { useEffect } from 'react'
import './App.css';
import { connect } from 'react-redux'

import Content from './components/content/content.js'
import Sidebar from './components/sidebar/sidebar.js'


function App(props) {

   function fetchRedditPosts() {
      fetch('/getHotReddit', {
         method: 'POST',
         headers: {'Content-Type': 'application/json'},
         body: JSON.stringify({subreddits: props.subreddits})
      })
      .then( response => response.json())
      .then( data => props.dispatch({type: 'ADD_REDDIT_POSTS', payload: data}))
   }

   // Get all the inital posts
   function init() {
      fetch('/getMediumFeeds', {
         method: 'POST',
         headers: {'Content-Type': 'application/json'},
         body: JSON.stringify({mediumFeeds: ['https://medium.com/feed/the-launchism']})
      })
      .then( response => { console.log(response.json()) })

      fetchRedditPosts()
   }

   useEffect(() => {
      init()
   }, [])

   return (
      <div className="App">
         <Sidebar />
         <Content />
      </div>
   );
}

let mapStateToProps = (state) => {
   return {
      subreddits: state.redditReducer.subreddits
   }
}

export default connect(mapStateToProps)(App)
