import React, { useEffect, useState } from 'react'
import './main.css'

import { connect } from 'react-redux'

let Main = (props) => {
   let [post, setPost] = useState('')
   let feedPosts = [] // Arrange these by time, loop to loop!

   
   let callApi = async () => {
     const response = await fetch('/api/hello');
     const body = await response.text();

     if (response.status !== 200) throw Error(body.message);

     return body;
   };
   
   let handleSubmit = async (e) => {
      console.log("handling")
     e.preventDefault();
     const response = await fetch('/api/world', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({ post: post }),
     });
     const body = await response.text();

     props.dispatch({type: 'SET_RESPONSE_TO_POST', payload: body})
   };
   
 
   useEffect( () => {
     callApi()
       .then(res => props.dispatch({type: 'SET_RESPONSE', payload: res}))
       .catch(err => console.log(err))
   }, [])
   
   return (
      <main>
         <p>{props.response}</p>

         <form onSubmit={handleSubmit}>
         <p>
            <strong>Post to Server:</strong>
         </p>
         <input
            type="text"
            value={post}
            onChange={e => setPost( e.target.value )}
         />
         <button type="submit">Submit</button>
         </form>
         <p>{props.responseToPost}</p>
      </main>
   )
}

let mapStateToProps = (state) => {
   return {
      response: state.reducer.response,
      responseToPost: state.reducer.responseToPost
   }
}

export default connect(mapStateToProps)(Main)