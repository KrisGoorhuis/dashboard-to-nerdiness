import React from 'react'
import './redditPost.css'

let RedditPost = (props) => {

   // From https://stackoverflow.com/questions/847185/convert-a-unix-timestamp-to-time-in-javascript
   function timeConverter(UNIX_timestamp){
      var a = new Date(UNIX_timestamp * 1000);
      var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      // var year = a.getFullYear();
      var month = months[a.getMonth()];
      var date = a.getDate();
      var hour = a.getHours();
      var min = a.getMinutes() < 10 ? '0' + a.getMinutes() : a.getMinutes()
      var sec = a.getSeconds() < 10 ? '0' + a.getSeconds() : a.getSeconds();
      // var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
      // year removed:
      var time = date + ' ' + month + ' ' + ' ' + hour + ':' + min + ':' + sec ;

      return time;
    }

   return (
      <a 
         className="reddit_post_container" 
         href={'http://www.reddit.com' + props.post.permalink} 
         target="_blank" 
         rel="noopener noreferrer"
      >
         <h4 className="reddit_post_title">{props.post.title}</h4>
         <section className="reddit_post_details">
            <small>In '{props.post.subreddit}'</small>
            <div>
               <small>{props.post.score}</small>
            </div>
            <small>On {timeConverter(props.post.created_utc)}</small>
            <small className="reddit_post_author">By {props.post.author}</small>
         </section>
      </a>
   )
}

export default RedditPost

// Useful properties:
// created_utc
// title
// permalink
// author
// comments (array)
// subreddit
// ups
// downs
// score