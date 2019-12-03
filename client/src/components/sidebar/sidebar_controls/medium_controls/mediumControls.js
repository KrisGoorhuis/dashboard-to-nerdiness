import React, { useState } from 'react'
import { connect } from 'react-redux'

import './mediumControls.css'

let MediumControls = (props) => {
   let [infoMessage, setInfoMessage] = useState('')
   let [mediumText, setMediumText] = useState('')

   function handleMediumChange (e) {
      setMediumText(e.target.value)
      setInfoMessage('')
   }

   function handleMediumSubmit (e) {
      e.preventDefault();
      setInfoMessage('Verifying publication exists...')

      if (props.mediumPublications.indexOf(mediumText) !== -1) {
         setInfoMessage('Publication already listed.')
         return
      }

      fetch('/checkMediumPublication', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ "publication": mediumText })
      })
         .then(response => response.json())
         .then(data => {
            console.log(data)
            // Result length means we got a bunch of reddit posts back.
            
            if (data.length > 0) {
               setInfoMessage('')
               setMediumText('')
               props.dispatch({ type: 'ADD_PUBLICATION', payload: mediumText })
               props.dispatch({ type: 'ADD_MEDIUM_POSTS', payload: data })
            }
            else {
               setInfoMessage('Invalid publication. Did the text match exactly?')
            }
         })
         .catch((error) => {
            console.log(error)
         })
   }

   return (
      <details className="controls_details_inner">
         <summary className="controls_summary_inner">New</summary>
            <fieldset id="controls_fieldset">
               <legend>Add a new Medium publication</legend>
               <form onSubmit={handleMediumSubmit}>
                  <input
                     type="text"
                     placeholder="publication-name"
                     onChange={handleMediumChange}
                     value={mediumText}
                  />
                  <input id="add_button" type="submit" value="Add" />
               </form>
               <p id="info_message">
                  {infoMessage}
               </p>
            </fieldset>
      </details>
   )
}

let mapStateToProps = (state) => {
   return {
      mediumPublications: state.mediumReducer.mediumPublications,
   }
}

export default connect(mapStateToProps)(MediumControls)