import React from 'react'
import './redditPost.css'

let RedditPost = (props) => {
   let thumbnail
   if (props.post.thumbnail && props.post.thumbnail !== "self") {
      thumbnail = props.post.thumbnail
   } 

   // Modified from https://stackoverflow.com/questions/847185/convert-a-unix-timestamp-to-time-in-javascript
   function timeConverter(UNIX_timestamp) {
      var a = new Date(UNIX_timestamp * 1000);
      var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      // var year = a.getFullYear();
      var month = months[a.getMonth()];
      var date = a.getDate();
      var hour = a.getHours();
      var min = a.getMinutes() < 10 ? '0' + a.getMinutes() : a.getMinutes()
      // var sec = a.getSeconds() < 10 ? '0' + a.getSeconds() : a.getSeconds();
      // var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
      // year and removed:
      // var time = date + ' ' + month + ' ' + ' ' + hour + ':' + min;
      var time = `${date} ${month} ${hour}:${min}`

      return time;
   }

   return (
      <a
         className="reddit_post_container"
         href={'http://www.reddit.com' + props.post.permalink}
         target="_blank"
         rel="noopener noreferrer"
      >

         {
            props.post.thumbnail ?
               <div className="reddit_with_image">
                  <img className="reddit_thumbnail" src={thumbnail} />
                  <div>
                     <h5 className="reddit_post_title">{props.post.title}</h5>
                     <section className="reddit_post_details">
                        <small>r/{props.post.subreddit}</small>
                        <small>Score: {props.post.score}</small>
                        <small>{timeConverter(props.post.created_utc)}</small>
                        <small className="reddit_post_author">{props.post.author}</small>
                        {/* <img src={props.post.thumbnail} /> */}
                     </section>
                  </div>
               </div>
               :
               <div>
                  <h5 className="reddit_post_title">{props.post.title}</h5>
                  <section className="reddit_post_details">
                     <small>r/{props.post.subreddit}</small>
                     <small>Score: {props.post.score}</small>
                     <small>{timeConverter(props.post.created_utc)}</small>
                     <small className="reddit_post_author">{props.post.author}</small>
                     {/* <img src={props.post.thumbnail} /> */}
                  </section>
               </div>
         }




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