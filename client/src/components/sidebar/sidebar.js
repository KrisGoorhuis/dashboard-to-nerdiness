import React, { useState } from 'react'
import './sidebar.css'
import { connect } from 'react-redux'

import SidebarControls from './sidebar_controls/sidebarControls.js'
import Listing from './sidebar_listing/sidebarListing.js'

import confirm from 'assets/confirm.svg'
import cancel from 'assets/cancel.svg'


let ConfirmationBox = () => {

   function removeSubreddit() {
      // props.dispatch('')
   }

   return (
      <div>
         <div>{confirm}</div>
         <div>{cancel}</div>
      </div>
   )
}

let Sidebar = (props) => {
   let [confirming, setConfirming] = useState(false)

   function handleRemove() {
      setConfirming(!confirming)
   }

   return (
      <div id="sidebar_container">
         <main id="sidebar_main">
            <SidebarControls />
            {/* <legend>
               <div id="legend_hide">Hide</div>
               <div id="legend_label">Label</div>

            </legend> */}
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
            <div onClick={handleRemove}>
               {
                  confirming ? <ConfirmationBox /> : 'Remove'
               }
            </div>
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