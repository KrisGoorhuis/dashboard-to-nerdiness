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

   function fetchMediumPosts() {
      console.log("before")
      console.log(props.mediumPublications)
      fetch('/getMediumPosts', {
         method: 'POST',
         headers: {'Content-Type': 'application/json'},
         body: JSON.stringify({mediumPublications: props.mediumPublications})
      })
      .then( response => response.json())
      .then( data => {
         console.log(data)
         props.dispatch({type: 'ADD_MEDIUM_POSTS', payload: data})
      })
   }

   function sortAndFilterPosts() {
      // See stickynotes. This looks like it'll run before posts are fetched.
      let _posts = []
      
      // The time property of each of these is different. We're going to add a .formattedTime 
      // tFormReddit
      
      _posts.concat(props.redditPosts)
      _posts.concat(props.mediumPosts)

      // Trues survive. Returned bool logic depends upon what type of post it is.
      _posts.filter( (post) => {
         if (post.subreddit) {
            return props.hiddenSubreddits.indexOf(post.subreddit) === -1
         }
         else if (post.mediumPublication) {
            
         }
      })

      props.dispatch({type: 'SET_PROCESSED_POSTS', payload: _posts})


      // old:
      // Remove posts from hidden subreddits
      _posts = _posts.filter((post) => props.hiddenSubreddits.indexOf(post.subreddit) === -1)
      // Sort by date
      _posts = _posts.sort((a, b) => b.created_utc - a.created_utc)

   }

   // Get all the inital posts
   function init() {
      fetchMediumPosts()
      fetchRedditPosts()

      sortAndFilterPosts()
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
      subreddits: state.redditReducer.subreddits,
      mediumPublications: state.mediumReducer.publications
   }
}

export default connect(mapStateToProps)(App)
