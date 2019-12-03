// import React, { useState } from 'react'
// import './sidebarControls.css'
// import { connect } from 'react-redux'


// let SidebarControls = (props) => {
//    let [redditText, setRedditText] = useState('')
//    let [infoMessage, setInfoMessage] = useState('')
   
//    let [mediumText, setMediumText] = useState('')

//    function handleRedditChange (e) {
//       setRedditText(e.target.value)
//       setInfoMessage('')
//    }

//    function handleRedditSubmit (e) {
//       e.preventDefault();
//       setInfoMessage('Verifying subreddit exists...')

//       fetch('/checkSubreddit', {
//          method: 'POST',
//          headers: { 'Content-Type': 'application/json' },
//          body: JSON.stringify({ "subreddit": redditText })
//       })
//          .then(response => response.json())
//          .then(data => {
//             console.log(data)
//             // Result length means we got a bunch of reddit posts back.
//             if (props.subreddits.indexOf(redditText) !== -1) {
//                setInfoMessage('Subreddit already listed.')
//             }
//             else if (data.length > 0) {
//                setInfoMessage('')
//                setRedditText('')
//                props.dispatch({ type: 'ADD_SUBREDDIT', payload: redditText })
//                props.dispatch({ type: 'ADD_REDDIT_POSTS', payload: data })
//             }
//             else {
//                setInfoMessage('Invalid subreddit. Did the text match exactly?')
//             }
//          })
//          .catch((error) => {
//             console.log(error)
//          })
//    }


//    function handleMediumChange (e) {
//       setMediumText(e.target.value)
//       setInfoMessage('')
//    }

//    function handleMediumSubmit (e) {
//       e.preventDefault();
//       setInfoMessage('Verifying publication exists...')

//       fetch('/checkMediumPublication', {
//          method: 'POST',
//          headers: { 'Content-Type': 'application/json' },
//          body: JSON.stringify({ "publication": mediumText })
//       })
//          .then(response => response.json())
//          .then(data => {
//             console.log(data)
//             // Result length means we got a bunch of reddit posts back.
//             if (props.mediumPublications.indexOf(mediumText) !== -1) {
//                setInfoMessage('Publication already listed.')
//             }
//             else if (data.length > 0) {
//                setInfoMessage('')
//                setRedditText('')
//                props.dispatch({ type: 'ADD_PUBLICATION', payload: mediumText })
//                props.dispatch({ type: 'ADD_MEDIUM_POSTS', payload: data })
//             }
//             else {
//                setInfoMessage('Invalid publication. Did the text match exactly?')
//             }
//          })
//          .catch((error) => {
//             console.log(error)
//          })
//    }


//    return (
//       <details id="controls_details_outer">
//          <summary id="controls_summary_outer" >Add</summary>

//          <details className="controls_details_inner">
//             <summary className="controls_summary_inner">New Subreddit</summary>
        
//                <fieldset id="controls_fieldset">
//                   <legend>Add a new subreddit</legend>
//                   <form onSubmit={handleRedditSubmit}>
//                      <input
//                         type="text"
//                         placeholder="subreddit"
//                         onChange={handleRedditChange}
//                         value={redditText}
//                      />
//                      <input id="add_button" type="submit" value="Add" />
//                   </form>
//                   <p id="info_message">
//                      {infoMessage}
//                   </p>
//                </fieldset>
//          </details>

//          <details className="controls_details_inner">
//             <summary className="controls_summary_inner">Medium</summary>
//                <fieldset id="controls_fieldset">
//                   <legend>Add a new Medium publication</legend>
//                   <form onSubmit={handleMediumSubmit}>
//                      <input
//                         type="text"
//                         placeholder="publication-name"
//                         onChange={handleMediumChange}
//                         value={mediumText}
//                      />
//                      <input id="add_button" type="submit" value="Add" />
//                   </form>
//                   <p id="info_message">
//                      {infoMessage}
//                   </p>
//                </fieldset>
//          </details>

//       </details>
//    )
// }

// let mapStateToProps = (state) => {
//    return {
//       subreddits: state.redditReducer.subreddits,

//       mediumPublications: state.mediumReducer.mediumPublications
//    }
// }

// export default connect(mapStateToProps)(SidebarControls)


// // Progression when other sites become involved:
// // + button turns into:
// // choose your site to add one of 
// // in reddit's case, choose subreddit. Appropriate such thing for other sites? 