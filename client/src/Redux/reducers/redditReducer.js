const initialState = {
   subreddits: ['totalwar'], // Text strings
   redditPosts: [],
   hiddenSubreddits: []
}

// localStorage.removeItem('subreddits')
if (localStorage.getItem('subreddits')) {
   console.log(localStorage.getItem('subreddits'))
   initialState.subreddits = JSON.parse(localStorage.getItem('subreddits'))
}

export default function redditReducer(state = initialState, action) {

   switch (action.type) {
      case ('ADD_REDDIT_POSTS'):
         // Payload is an array
         let _posts = [...state.redditPosts]

         _posts = _posts.concat(action.payload)

         return {
            ...state,
            redditPosts: _posts
         }

      case ('ADD_SUBREDDIT'):
         localStorage.setItem('subreddits', JSON.stringify([...state.subreddits, action.payload]))

         return {
            ...state,
            subreddits: [...state.subreddits, action.payload]
         }

      case ('REMOVE_SUBREDDIT'):
         let _subreddits = [...state.subreddits]
         let _redditPosts = [...state.redditPosts]

         localStorage.setItem('subreddits', JSON.stringify([...state.subreddits, action.payload]))

         _subreddits = _subreddits.filter( subreddit => subreddit !== action.payload)
         _redditPosts = _redditPosts.filter( post => post.subreddit !== action.payload)

         return {
            ...state,
            subreddits: _subreddits,
            redditPosts: _redditPosts,
         }

      case ('TOGGLE_HIDDEN_SUBREDDIT'):
         let _hidden = [...state.hiddenSubreddits]
         let index = _hidden.indexOf(action.payload)
         
         if (index !== -1) {
            _hidden.splice(index, 1)
         } 
         else {
            _hidden.push(action.payload)
         }

         return {
            ...state,
            hiddenSubreddits: _hidden
         }
         

      default:
         return state
   }
}

// Update user prefs in database outside of reducers. Something something being pure.