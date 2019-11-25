import React, { useEffect, useState } from 'react'
import './content.css'
import { connect } from 'react-redux'
import RedditPost from './posts/redditPost/redditPost.js'

let Main = (props) => {
   // let [sortedPosts, setSortedPosts] = useState([])
   let test

   let sortAndFilter = (posts) => {
      let _posts = posts
      // Remove posts from hidden subreddits
      _posts = _posts.filter((post) => props.hiddenSubreddits.indexOf(post.subreddit) === -1)
      // Sort by date
      _posts = _posts.sort((a, b) => b.created_utc - a.created_utc)

      return _posts
   }

   let NoPosts = () => {
      return (
         <aside id="no_posts">
            <p>No posts!</p>
            <span>Unhide or add some subreddits</span>
         </aside>
      )
   }

   useEffect(() => {
      // sortAndFilter(props.redditPosts)
      // test = sortAndFilter(props.redditPosts)
      // console.log(test)
   })

   return (
      <article id="content_container">
         <header>
            <h3>Header Text</h3>
         </header>
         <main id="content_main">
            {
               sortAndFilter(props.redditPosts).length > 0 ?
                  // If we have posts after filtering
                  sortAndFilter(props.redditPosts).map((post, index) => {
                     return (
                        <RedditPost post={post} key={index} />
                     )
                  })
                  :
                  // If we don't - fetching or just nothing
                  <aside id="loading_panel">
                     {
                        props.subreddits.length > 0 && props.redditPosts.length < 1 ?
                           "Retrieving..."
                           :
                           <NoPosts />
                     }
                  </aside>
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