import React, { useEffect } from 'react'
import './sidebar.css'

import SidebarControls from './sidebar_controls/sidebarControls.js'
import Listing from './sidebar_listing/sidebarListing.js'

let Sidebar = () => {

   
   // console.log(placeholderListings[2])
   return (
      <main id="sidebar_main">
         <SidebarControls />
         <section>
            <ul id="site_listings">
               {/* For each item in logged in user's list of feeds or whatevers, .map */}
               {
                  // placeholderListings.map( (listingData, index) => {
                  //    return <Listing data={listingData} key={index} />
                  // })
               }
               
            </ul>
         </section>
      </main>
   )
}

export default Sidebar