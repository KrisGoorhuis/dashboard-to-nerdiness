import React, { useEffect } from 'react'
import './content.css'
import { connect } from 'react-redux'
import RedditPost from './posts/redditPost/redditPost.js'
import MediumPost from './posts/mediumPost/mediumPost.js'

let Main = (props) => {
   let processedPosts = []


   let NoPosts = () => {
      return (
         <aside id="no_posts">
            <p>No posts!</p>
            <span>Unhide or add some sources on the left.</span>
         </aside>
      )
   }

   function orderPosts() {
      let _posts = []
      console.log("props")
      console.log(props)
      _posts = _posts.concat(props.redditPosts)
      _posts = _posts.concat(props.mediumPosts)

      // Trues survive. Returned bool logic depends upon what type of post it is.
      console.log(_posts)
      // _posts.filter( (post) => {
      //    if (post.subreddit) {
      //       return props.hiddenSubreddits.indexOf(post.subreddit) === -1 // True if post subreddit is not in list of hidden subreddits. Survives.
      //    }
      //    else if (post.mediumPublication) {
      //       console.log(post.mediumPublication)
      //       return props.hiddenMediumPublications.indexOf(post.mediumPublication) === -1
      //    }
      // })

      
      // This is how we compare time values from differently formatted data
      _posts = _posts.sort( (a, b) => {

         // console.log(`${b.subreddit} || ${b.mediumPublication} vs ${a.subreddit} || ${a.mediumPublication}`)
         if (a.subreddit) {
            a = a.created_utc // .parsing these (ex: 1574895636) gives us NaN. Are they the same format
         }
         else if (a.mediumPublication) {
            a = Date.parse(a.isoDate) / 1000 // .parse also seems to add three zeroes to the end of everything?

            // a = Date.parse(a.isoDate).toString().substring(0, a.isoDate.length - 4) // .parse also seems to add three zeroes to the end of everything?
         }
         else {
            a = isFinite(a) ? -1 : 1;
         }
         
         if (b.subreddit) {
            b = b.created_utc
         }
         else if (b.mediumPublication) {
            b = Date.parse(b.isoDate) / 1000
            // b = Date.parse(b.isoDate).toString().substring(0, b.isoDate.length - 4)
         }
         else {
            b = isFinite(b) ? -1 : 1;
         }

         // console.log(`${b} vs ${a}`)
         // console.log(b - a)
         // console.log("-----")
         // // console.log(b-a)
         return b - a
      })
      
      console.log("Setting processed to")
      console.log(_posts)
      processedPosts = _posts
      // props.dispatch({type: 'SET_PROCESSED_POSTS', payload: _posts})
   }

   useEffect(() => {
      // orderPosts()
   })

   return (
      <article id="content_container">
         <header>
            <h2>Header Text</h2>
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
                        return <MediumPost post={post} key={index} />
                     }
                     else return <React.Fragment></React.Fragment> // Placeholder to get rid of a warning until this is finished. TODO.
                  })
                  :
                  // If we don't have posts - either because we are currently fetching or because they were all processed out
                  <aside id="loading_panel">
                     {
                        props.fetchingReddit || props.fetchingMedium ?
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
      fetchingReddit: state.redditReducer.fetchingReddit,

      fetchingMedium: state.mediumReducer.fetchingMedium,

      processedPosts: state.contentReducer.processedPosts
   }
}

export default connect(mapStateToProps)(Main)