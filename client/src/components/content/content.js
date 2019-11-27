import React, { useEffect } from 'react'
import './content.css'
import { connect } from 'react-redux'
import RedditPost from './posts/redditPost/redditPost.js'
import MediumPost from './posts/mediumPost/mediumPost.js'

let Main = (props) => {

   let NoPosts = () => {
      return (
         <aside id="no_posts">
            <p>No posts!</p>
            <span>Unhide or add some subreddits</span>
         </aside>
      )
   }

   useEffect(() => {
      // sortAndFilter()
   })

   return (
      <article id="content_container">
         <header>
            <h3>Header Text</h3>
         </header>
         <main id="content_main">
            {
              // If we have posts to display after processing
               props.processedPosts.length > 0 ? 
                  props.processedPosts.map((post, index) => {

                     // Determine which type of post component to use
                     if (post.subreddit) {
                        return <RedditPost post={post} key={index} />
                     }
                     else if (post.mediumPublication) {
                        return <MediumPost post={post} />
                     }
                     else return <React.Fragment></React.Fragment> // Placeholder to get rid of a warning until this is finished. TODO.
                  })
                  :
                  // If we don't have posts - either because we are currently fetching or because they were all processed out
                  <aside id="loading_panel">
                     {
                        props.subreddits.length > 0 && props.processedPosts.length < 1 ?
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
      hiddenSubreddits: state.redditReducer.hiddenSubreddits,

      mediumPosts: state.mediumReducer.mediumPosts,
      mediumPublications: state.mediumReducer.mediumPosts,
      hiddenMediumPublications: state.mediumReducer.hiddenMediumPublications,

      processedPosts: state.contentReducer.processedPosts
   }
}

export default connect(mapStateToProps)(Main)