import React from 'react'
import './sidebar.css'
import { connect } from 'react-redux'

import SidebarControls from './sidebar_controls/sidebarControls.js'
import Listing from './sidebar_listing/sidebarListing.js'






let Sidebar = (props) => {
   
   console.log(props.subreddits.length)
   return (
      <div id="sidebar_container">
         <main id="sidebar_main">
            <SidebarControls />
            <section>
               <ul id="site_listings">
                  {/* For each item in logged in user's list of feeds or whatevers, .map */}
                  {
                     props.subreddits.map( (subreddit, index) => {
                        return <Listing subreddit={subreddit} key={index} />
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
      subreddits: state.redditReducer.subreddits
   }
}

export default connect(mapStateToProps)(Sidebar)