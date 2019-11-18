import React from 'react'
import './sidebarListing.css'
import { connect } from 'react-redux'

let SidebarListing = (props) => {
   
   console.log(props)
   let handleChange = (e) => {
      console.log(e.target.checked)
      props.dispatch({type: 'TOGGLE_HIDDEN_SUBREDDIT', payload: props.subreddit})
   }

   return (
      <li className="sidebar_listing">
         <input id="testinput" type="checkbox" onChange={handleChange} />
         <div>
            <details>
               <summary>{props.subreddit}</summary>
               {props.subreddit}
            </details>
         </div>
      </li>
   )
}

let mapStateToProps = (state) => {
   return {
      
   }
}


export default connect(mapStateToProps)(SidebarListing)