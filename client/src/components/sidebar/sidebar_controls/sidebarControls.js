import React, { useState } from 'react'
import './sidebarControls.css'
import { connect } from 'react-redux'


let SidebarControls = (props) => {
   let [text, setText] = useState('')
   let [checkingSubreddit, setCheckingSubreddit] = useState(false)
   let [invalidSubreddit, setInvalidSubreddit] = useState(false)

   let handleChange = (e) => {
      setText(e.target.value)

      if (invalidSubreddit) {
         setInvalidSubreddit(false)
      }
   }

   let handleSubmit = (e) => {
      e.preventDefault();
      setCheckingSubreddit(true)

      
      fetch('/getHotReddit', {
         method: 'POST',
         headers: {'Content-Type': 'application/json'},
         body: JSON.stringify({"subreddit": text})
      })
      .then( response => response.json())
      .then( json => {
         // Result length means we got a bunch of reddit posts back.
         if (json.length > 0) { 
            setCheckingSubreddit(false)
            props.dispatch({type: 'ADD_SUBREDDIT', payload: text})
            props.dispatch({type: 'ADD_REDDIT_POSTS', payload: json})
         }
         else {
            setCheckingSubreddit(false)
            setInvalidSubreddit(true)
         }
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
         {
            checkingSubreddit &&
            <aside>Verifying subreddit exists...</aside>
         }
         {
            invalidSubreddit &&
            <aside>Invalid subreddit. Did the text match exactly?</aside>
         }
      </fieldset>
   )
}

let mapStateToProps = (state) => {
   return {

   }
}

export default connect(mapStateToProps)(SidebarControls)


// Progression when other sites become involved:
// + button turns into:
// choose your site to add one of 
// in reddit's case, choose subreddit. Appropriate such thing for other sites? 