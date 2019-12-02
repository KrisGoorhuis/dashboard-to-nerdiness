
export function sortAndFilterPosts() {
   let _posts = []
         
   _posts = _posts.concat(redditPosts)
   _posts = _posts.concat(mediumPosts)

   // Trues survive. Returned bool logic depends upon what type of post it is.
   console.log(_posts)
   _posts.filter( (post) => {
      if (post.subreddit) {
         return props.hiddenSubreddits.indexOf(post.subreddit) === -1 // True if post subreddit is not in list of hidden subreddits. Survives.
      }
      else if (post.mediumPublication) {
         console.log(post.mediumPublication)
         return props.hiddenMediumPublications.indexOf(post.mediumPublication) === -1
      }
   })

   
   // This is how we compare time values from differently formatted data
   _posts = _posts.sort( (a, b) => {

      // console.log(`${b.subreddit} || ${b.mediumPublication} vs ${a.subreddit} || ${a.mediumPublication}`)
      if (a.subreddit) {
         a = a.created_utc // .parsing these (ex: 1574895636) gives us NaN. Are they the same format
      }
      else if (a.mediumPublication) {
         a = Date.parse(a.isoDate) / 1000 // .parse also seems to add three zeroes to the end of everything?

         // a = Date.parse(a.isoDate).toString().substring(0, a.isoDate.length - 4) // .parse also seems to add three zeroes to the end of everything?
      }
      else {
         a = isFinite(a) ? -1 : 1;
      }
      
      if (b.subreddit) {
         b = b.created_utc
      }
      else if (b.mediumPublication) {
         b = Date.parse(b.isoDate) / 1000
         // b = Date.parse(b.isoDate).toString().substring(0, b.isoDate.length - 4)
      }
      else {
         b = isFinite(b) ? -1 : 1;
      }

      // console.log(`${b} vs ${a}`)
      // console.log(b - a)
      // console.log("-----")
      // // console.log(b-a)
      return b - a
   })
   
   console.log(_posts)
   props.dispatch({type: 'SET_PROCESSED_POSTS', payload: _posts})
} 