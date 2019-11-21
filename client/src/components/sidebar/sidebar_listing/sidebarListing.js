import React, { useState } from 'react'
import './sidebarListing.css'
import { connect } from 'react-redux'

import confirm from 'assets/confirm.svg'
import cancel from 'assets/cancel.svg'




let SidebarListing = (props) => {
   let [confirming, setConfirming] = useState(false)

   let ConfirmationBox = () => {
      // The parent reverts to checkboxes beign shown, so the cancel button here has no onClick
      return (
         <div>
            <i class="far fa-check-circle" onClick={confirmRemoval}></i>
            <i class="far fa-times-circle"></i> 
         </div>
      )
   }

   function toggleExpand(e) {
      console.log("toggling")
      if (e.target.parentNode.classList.contains('expanded')) {
         e.target.parentNode.classList.remove('expanded')
         setTimeout( () => {
            setConfirming(false)
         }, 200) // Same as CSS transition time
      }
      else {
         e.target.parentNode.classList.add('expanded')
      }
   }

   function confirmRemoval() {
      console.log("Dispatching")
      props.dispatch({type: 'REMOVE_SUBREDDIT', payload: props.subreddit})
   }

   function handleRemove() {
      setConfirming(!confirming)
   }

   let handleChange = (e) => {
      console.log(e.target)
      props.dispatch({type: 'TOGGLE_HIDDEN_SUBREDDIT', payload: props.subreddit})
   }


   return (
      // Child of an <ul>
      <li className="sidebar_listing" > 
         <h3 onClick={toggleExpand}>{props.subreddit}</h3>
         <menu className="popdown_controls">
            <label>
               Hide
               <input 
                  className="listing_checkbox"
                  name="checkerbox" 
                  type="checkbox" 
                  onChange={handleChange} 
               />
            </label>
            <div className="remove_listing" onClick={handleRemove}>
               {
                  confirming ? <ConfirmationBox props={props} /> : 'Remove'
               }
            </div>
         </menu>
      </li>
   )
}

let mapStateToProps = (state) => {
   return {
      subreddits: state.redditReducer.subreddits
   }
}


export default connect(mapStateToProps)(SidebarListing)