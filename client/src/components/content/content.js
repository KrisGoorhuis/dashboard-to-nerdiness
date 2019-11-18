import React, { useEffect, useState } from 'react'
import './content.css'

import { connect } from 'react-redux'
import RedditPost from './posts/redditPost/redditPost.js'

let Main = (props) => {
   // let [sortedPosts, setSortedPosts] = useState([])


   let sortAndFilter = (posts) => {
      let _posts = posts
      // Remove posts from hidden subreddits
      _posts = _posts.filter( (post) => props.hiddenSubreddits.indexOf(post.subreddit) === -1)
      // Sort by date
      _posts = _posts.sort( (a, b) => b.created_utc - a.created_utc)

      return _posts
   }


   useEffect( () => {
      // sortAndFilter(props.redditPosts)
   }, )


   return (
      <article id="content_container">
         <main id="content_main">
            {
               props.redditPosts.length > 0 ? 
               sortAndFilter(props.redditPosts).map( (post, index) => {
                  return (
                     <RedditPost post={post} key={index} />
                  )
               })
               :
               <aside id="loading_panel">{props.subreddits.length > 0 ? "Retrieving..." : "No subreddits chosen!"}</aside>
            }
         </main>
      </article>
   )
}

let mapStateToProps = (state) => {
   return {
      redditPosts: state.redditReducer.redditPosts,
      subreddits: state.redditReducer.subreddits,
      hiddenSubreddits: state.redditReducer.hiddenSubreddits
   }
}

export default connect(mapStateToProps)(Main)