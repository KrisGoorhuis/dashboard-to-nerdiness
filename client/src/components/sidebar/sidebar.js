import React from 'react'
import './sidebar.css'
import { connect } from 'react-redux'

import SidebarControls from './sidebar_controls/sidebarControls.js'
import Listing from './sidebar_listing/sidebarListing.js'

let Sidebar = (props) => {

   return (
      <div id="sidebar_container">
         <main id="sidebar_main">
            <SidebarControls />
            <section>
               <ul id="site_listings">
                  {/* For each item i  n logged in user's list of feeds or whatevers, .map */}
                  {
                     props.subreddits.map( (subreddit, index) => {
                        return <Listing subreddit={subreddit} key={index} />
                     })
                  }
               </ul>
            </section>
         </main>
         <div id="sidebar_spacer">
            ->
         </div>
      </div>
   )
}

let mapStateToProps = (state) => {
   return {
      subreddits: state.redditReducer.subreddits
   }
}

export default connect(mapStateToProps)(Sidebar)