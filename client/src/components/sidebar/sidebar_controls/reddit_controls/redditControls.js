import React, { useState } from 'react'
import { connect } from 'react-redux'
import './redditControls.css'

let RedditControls = (props) => {
   let [redditText, setRedditText] = useState('')
   let [infoMessage, setInfoMessage] = useState('')
   
   function handleRedditChange (e) {
      setRedditText(e.target.value)
      setInfoMessage('')
   }

   function handleRedditSubmit (e) {
      e.preventDefault();
      setInfoMessage('Verifying subreddit exists...')

      fetch('/checkSubreddit', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ "subreddit": redditText })
      })
         .then(response => response.json())
         .then(data => {
            console.log(data)
            // Result length means we got a bunch of reddit posts back.
            if (props.subreddits.indexOf(redditText) !== -1) {
               setInfoMessage('Subreddit already listed.')
            }
            else if (data.length > 0) {
               setInfoMessage('')
               setRedditText('')
               props.dispatch({ type: 'ADD_SUBREDDIT', payload: redditText })
               props.dispatch({ type: 'ADD_REDDIT_POSTS', payload: data })
            }
            else {
               setInfoMessage('Invalid subreddit. Did the text match exactly?')
            }
         })
         .catch((error) => {
            console.log(error)
         })
   }

   // function setFocus() {
   //    console.log("focusing?")
   //    document.querySelector('#reddit_input').focus()
   // }

   return (
      <details className="controls_details_inner">
         <summary className="controls_summary_inner">New</summary>  
            <fieldset id="controls_fieldset">
               <legend>Add a new subreddit</legend>
               <form onSubmit={handleRedditSubmit}>
                  <input
                     type="text"
                     placeholder="subreddit"
                     onChange={handleRedditChange}
                     value={redditText}
                     id="reddit_input"
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
      subreddits: state.redditReducer.subreddits
   }
}

export default connect(mapStateToProps)(RedditControls)