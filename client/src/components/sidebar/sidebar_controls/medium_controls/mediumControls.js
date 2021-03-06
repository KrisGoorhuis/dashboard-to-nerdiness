import React, { useState } from 'react'
import { connect } from 'react-redux'

import './mediumControls.css'

export let MediumControls = (props) => {
   let [infoMessage, setInfoMessage] = useState('')
   let [mediumText, setMediumText] = useState('')
   let [testState, setTestState] = useState('')

   function handleMediumChange (e) {
      setMediumText(e.target.value)
      setInfoMessage('')
   }

   function test() {
      setTestState('success')
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
            // This receives a JSON object, not an array. So we can't check length as we did in the Reddit controls. Choose a key!
            if (data.generator) {
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
               <form onSubmit={handleMediumSubmit} id="medium_controls_form">
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