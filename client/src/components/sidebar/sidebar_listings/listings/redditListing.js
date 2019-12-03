import React, { useState, useEffect, useRef } from 'react'
import './listings.css'
import { connect } from 'react-redux'


let RedditListing = (props) => {
   let [confirming, setConfirming] = useState(false)
   let [checked, setChecked] = useState(false)
   // let checkbox = useRef(null)


   let ConfirmationBox = () => {
      // The parent reverts to checkboxes being shown, so the cancel button here has no onClick
      return (
         <div>
            <i className="fa fa-check-circle" onClick={confirmRemoval}></i>
            <i className="fa fa-times-circle"></i>
         </div>
      )
   }

   function toggleExpand(e) {
      if (e.target.parentNode.classList.contains('expanded')) {
         e.target.parentNode.classList.remove('expanded')
         setTimeout(() => {
            setConfirming(false)
         }, 200) // Same as CSS transition time
      }
      else {
         e.target.parentNode.classList.add('expanded')
      }
   }

   function confirmRemoval() {
      props.dispatch({ type: 'REMOVE_SUBREDDIT', payload: props.subreddit })
   }

   function handleRemove() {
      setConfirming(!confirming)
   }

   function handleChange(e) {
      setChecked(!checked)
      console.log("Set checked to" + !checked)
      props.dispatch({ type: 'TOGGLE_HIDDEN_SUBREDDIT', payload: props.subreddit })
   }

   function toggleExpand(e) {
      console.log("toggling")
      console.log(e.target)
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

   return (
      // Child of an <ul>
      <li className="sidebar_listing" >
         <div className="title_row" onClick={toggleExpand}>
            <i className="fa fa-bars" aria-hidden="true"></i>
            <h4 onClick={toggleExpand}>r/{props.subreddit}</h4>
         </div>
         <menu className="popdown_controls">
            <label>
               Hide
               <input
                  className="listing_checkbox"
                  name="checkerbox"
                  type="checkbox"
                  onChange={handleChange}
               // ref="checkbox"
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
      hiddenSubreddits: state.redditReducer.hiddenSubreddits
   }
}


export default connect(mapStateToProps)(RedditListing)