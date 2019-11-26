import React from 'react'
import './redditPost.css'

let RedditPost = (props) => {

   // From https://stackoverflow.com/questions/847185/convert-a-unix-timestamp-to-time-in-javascript
   function timeConverter(UNIX_timestamp){
      var a = new Date(UNIX_timestamp * 1000);
      console.log(a)
      var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      // var year = a.getFullYear();
      var month = months[a.getMonth()];
      var date = a.getDate();
      var hour = a.getHours();
      var min = a.getMinutes() < 10 ? '0' + a.getMinutes() : a.getMinutes()
      // var sec = a.getSeconds() < 10 ? '0' + a.getSeconds() : a.getSeconds();
      // var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
      // year and removed:
      var time = date + ' ' + month + ' ' + ' ' + hour + ':' + min;

      return time;
    }

   return (
      <a 
         className="reddit_post_container" 
         href={'http://www.reddit.com' + props.post.permalink} 
         target="_blank" 
         rel="noopener noreferrer"
      >
         <h5 className="reddit_post_title">{props.post.title}</h5>
         <section className="reddit_post_details">
            <small>r/{props.post.subreddit}</small>
            <small>Score: {props.post.score}</small>
            <small>{timeConverter(props.post.created_utc)}</small>
            <small className="reddit_post_author">{props.post.author}</small>
            {/* <img src={props.post.thumbnail} /> */}
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