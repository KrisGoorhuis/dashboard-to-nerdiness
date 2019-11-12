import React from 'react'
import './sidebarListing.css'

let SidebarListing = (props) => {
   
   return (
      <li className="sidebar_listing">
         <input type="checkbox"></input>
         <div>
            <details>
               <summary>{props.data.sitename}</summary>
               {props.data.details}
            </details>
         </div>
      </li>
   )
}

export default SidebarListing