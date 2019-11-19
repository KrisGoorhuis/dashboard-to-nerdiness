import React from 'react'
import './sidebarListing.css'
import { connect } from 'react-redux'

let SidebarListing = (props) => {
   
   let handleChange = (e) => {
      console.log(e.target)
      props.dispatch({type: 'TOGGLE_HIDDEN_SUBREDDIT', payload: props.subreddit})
   }


   return (
      <li className="sidebar_listing">
         <input 
            className="listing_checkbox"
            name="checkerbox" 
            type="checkbox" 
            onChange={handleChange} 
         />
         <p className="listing_details">{props.subreddit}</p>
         {/* <details className="listing_details">
            <summary>{props.subreddit}</summary>
            {props.subreddit}
         </details> */}
      </li>
   )
}

let mapStateToProps = (state) => {
   return {
      
   }
}


export default connect(mapStateToProps)(SidebarListing)