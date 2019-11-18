const initialState = {
   subreddits: ['totalwar'], // Text strings
   redditPosts: [],
   hiddenSubreddits: []
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
         return {
            ...state,
            subreddits: [...state.subreddits, action.payload]
         }

      case ('REMOVE_SUBREDDIT'):
         let _subreddits = [...state.subreddits]

         _subreddits.filter( (subreddit) => subreddit !== action.payload)
         
         return {
            ...state,
            subreddits: _subreddits
         }

      case ('TOGGLE_HIDDEN_SUBREDDIT'):
         let _hiddenSubreddits = [...state.hiddenSubreddits]
         
         let index = _hiddenSubreddits.indexOf(action.payload)
         _hiddenSubreddits[index] = !_hiddenSubreddits[index]

         return {
            ...state,
            hiddenSubreddits: _hiddenSubreddits
         }

      default:
         return state
   }
}

// Update user prefs in database outside of reducers. Something something being pure.