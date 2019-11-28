import React, { useState } from 'react'
import './sidebarControls.css'
import { connect } from 'react-redux'


let SidebarControls = (props) => {
   let [text, setText] = useState('')
   let [infoMessage, setInfoMessage] = useState('')

   let handleChange = (e) => {
      setText(e.target.value)
      setInfoMessage('')
   }

   let handleSubmit = (e) => {
      e.preventDefault();
      setInfoMessage('Verifying subreddit exists...')
      
      fetch('/checkSubreddit', {
         method: 'POST',
         headers: {'Content-Type': 'application/json'},
         body: JSON.stringify({"subreddit": text})
      })
      .then( response => response.json())
      .then( data => {
         console.log(data)
         // Result length means we got a bunch of reddit posts back.
         if (props.subreddits.indexOf(text) !== -1) {
            setInfoMessage('Subreddit already listed.')
         }
         else if (data.length > 0) { 
            setInfoMessage('')
            props.dispatch({type: 'ADD_SUBREDDIT', payload: text})
            props.dispatch({type: 'ADD_REDDIT_POSTS', payload: data})
         }
         else {
            setInfoMessage('Invalid subreddit. Did the text match exactly?')
         }
      })
      .catch( (error) => {
         console.log(error)
      })
   }

   return (
      <fieldset id="controls_fieldset">
         <legend>Add a new subreddit</legend>
         <form onSubmit={handleSubmit}>
            <input 
               type="text" 
               placeholder="subreddit" 
               onChange={handleChange}
               value={text}
            />
            <input id="add_button" type="submit" value="Add" />
         </form>
         <p id="info_message">
            {infoMessage}
         </p>
      </fieldset>
   )
}

let mapStateToProps = (state) => {
   return {
      subreddits: state.redditReducer.subreddits
   }
}

export default connect(mapStateToProps)(SidebarControls)


// Progression when other sites become involved:
// + button turns into:
// choose your site to add one of 
// in reddit's case, choose subreddit. Appropriate such thing for other sites? 