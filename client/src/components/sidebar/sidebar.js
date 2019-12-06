import React from 'react'
import './sidebar.css'
import { connect } from 'react-redux'

// import SidebarControls from './sidebar_controls/sidebarControls.js'
import RedditControls from './sidebar_controls/reddit_controls/redditControls.js'
import MediumControls from './sidebar_controls/medium_controls/mediumControls.js'

import RedditListing from './sidebar_listings/listings/redditListing.js'
import MediumListing from './sidebar_listings/listings/mediumListing.js'


export let Sidebar = (props) => {


   console.log(props)
      return (
      <div id="sidebar_container">
         <header id="sidebar_header">
            <h2>Dashboard.</h2>
            <div id="underscore"></div>
         </header>
         <main id="sidebar_main">

            <section className="source_container">
               <header className="site_header"><i className="fa fa-reddit" aria-hidden="true"></i>Reddit</header>
               <ul className="site_listings">
                  {/* For each item in logged in user's list of feeds or whatevers, .map */}
                  {
                     props.subreddits.map( (subreddit, index) => {
                        return <RedditListing subreddit={subreddit} key={index} />
                     })
                  }
               </ul>
               <RedditControls />
            </section>
            
            <section className="source_container">
               <header className="site_header"><i className="fa fa-medium" aria-hidden="true"></i>Medium</header>
               <ul className="site_listings">
                  {
                     props.mediumPublications.map( (publication, index) => {
                        return <MediumListing publication={publication} key={index} />
                     })
                  }
               </ul>
               <MediumControls />
            </section>

            {/* <SidebarControls /> */}

         </main>
      </div>
   )
}

let mapStateToProps = (state) => {
   return {
      subreddits: state.redditReducer.subreddits,
      mediumPublications: state.mediumReducer.mediumPublications
   }
}

export default connect(mapStateToProps)(Sidebar)