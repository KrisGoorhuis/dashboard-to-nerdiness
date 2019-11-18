import React, { useEffect } from 'react'
import './App.css';
import { connect } from 'react-redux'

import Content from './components/content/content.js'
import Sidebar from './components/sidebar/sidebar.js'


function App(props) {

   function fetchRedditPosts() {
      let fetchPosts = async (subreddit) => {
         return fetch('/getHotReddit', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({subreddit: subreddit})
         })
         .then( response => { return response.json() })
      }

      let fetchPromises = []
      for (let i = 0; i < props.subreddits.length; i++) {
         fetchPromises.push(fetchPosts(props.subreddits[i]))
      }
      
      Promise.all(fetchPromises).then( (results) => {
         let flattenedResults = []
         results.forEach( (subredditResults) => {
            subredditResults.forEach( (post) => { flattenedResults.push(post)})
         })

         console.log(flattenedResults)
         props.dispatch({type: 'ADD_REDDIT_POSTS', payload: flattenedResults})
      })
   }

   // Get all the inital posts
   function init() {
      

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
