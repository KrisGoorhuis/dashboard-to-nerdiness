import React, { useState } from 'react'
import './listings.css'
import { connect } from 'react-redux'


let MediumListing = (props) => {
   let [confirming, setConfirming] = useState(false)

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

   function confirmRemoval() {
      console.log("Dispatching")
      props.dispatch({type: 'REMOVE_MEDIUM_PUBLICATION', payload: props.publication})
   }

   function handleRemove() {
      setConfirming(!confirming)
   }

   let handleChange = (e) => {
      console.log(e.target)
      props.dispatch({type: 'TOGGLE_HIDDEN_PUBLICATION', payload: props.publication})
   }


   return (
      // Child of an <ul>
      <li className="sidebar_listing">
         {/* pointer-events: none CSS for i and h4 - otherwise toggleExpand,
         which deals in parent nodes, can fail to start at our div  */}
         <div className="title_row" onClick={toggleExpand}> 
            <i className="fa fa-bars" aria-hidden="true"></i>
            <h4>{props.publication}</h4>
         </div>
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
      publications: state.mediumReducer.publications
   }
}


export default connect(mapStateToProps)(MediumListing)