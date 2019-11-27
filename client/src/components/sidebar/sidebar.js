import React from 'react'
import './sidebar.css'
import { connect } from 'react-redux'

import SidebarControls from './sidebar_controls/sidebarControls.js'
import RedditListing from './sidebar_listings/redditListing/redditListing.js'
import MediumListing from './sidebar_listings/mediumListing/mediumListing.js'





let Sidebar = (props) => {
      return (
      <div id="sidebar_container">
         <main id="sidebar_main">
            
            <SidebarControls />

            <header>Reddit</header>
            <section>
               <ul id="site_listings">
                  {/* For each item in logged in user's list of feeds or whatevers, .map */}
                  {
                     props.subreddits.map( (subreddit, index) => {
                        return <RedditListing subreddit={subreddit} key={index} />
                     })
                  }
               </ul>
            </section>
            
            <header>Medium</header>
            <section>
               <ul className="site_listings">
                  {
                     props.mediumPublications.map( (publication, index) => {
                        return <MediumListing publication={publication} key={index} />
                     })
                  }
               </ul>
            </section>

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