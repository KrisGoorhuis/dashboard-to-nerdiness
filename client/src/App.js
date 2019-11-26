import React, { useEffect } from 'react'
import './App.css';
import { connect } from 'react-redux'

import Content from './components/content/content.js'
import Sidebar from './components/sidebar/sidebar.js'

let feeds = ['https://medium.com/feed/the-launchism']


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
      fetch('/getMediumPosts', {
         method: 'POST',
         headers: {'Content-Type': 'application/json'},
         body: JSON.stringify({mediumPublications: props.mediumPublications})
      })
      .then( response => response.json())
      .then( data => {
         console.log(data)
         props.dispatch({type: ''})
      })
      // .then( data => props.dispatch({type: 'ADD_PUBLICATION', payload: }))
   }
   // Get all the inital posts
   function init() {
      
      fetchMediumPosts()
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
      subreddits: state.redditReducer.subreddits,
      mediumPublications: state.mediumReducer.publications
   }
}

export default connect(mapStateToProps)(App)
