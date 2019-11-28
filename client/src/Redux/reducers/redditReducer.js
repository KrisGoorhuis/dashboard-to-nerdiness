const initialState = {
   subreddits: ['test'], // Text strings
   redditPosts: [],
   hiddenSubreddits: [],
   fetchingReddit: true
}

// If this computer has used the site before, initialState will be updated before it's used. Same for other source sites (see other reducers)
// localStorage.removeItem('subreddits')
if (localStorage.getItem('subreddits')) {
   initialState.subreddits = JSON.parse(localStorage.getItem('subreddits'))
}

export default function redditReducer(state = initialState, action) {

   switch (action.type) {
      case ('ADD_REDDIT_POSTS'):
         // Payload is an array
         let addingPosts = [...state.redditPosts]

         return {
            ...state,
            redditPosts: addingPosts.concat(action.payload)
         }
      
      case ('REMOVE_REDDIT_POSTS'):
         let removingPosts = [...state.redditPosts]

         return {
            ...state,
            redditPosts: removingPosts.filter( post => post.subreddit !== action.payload.subreddit)
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

         _subreddits = _subreddits.filter( subreddit => subreddit !== action.payload)
         _redditPosts = _redditPosts.filter( post => post.subreddit !== action.payload)
         
         
         localStorage.setItem('subreddits', JSON.stringify(_subreddits))

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
         
      case ('SET_FETCHING_REDDIT'):
         return {
            ...state,
            fetchingReddit: action.payload
         }

      default:
         return state
   }
}

// Update user prefs in database outside of reducers. Something something being pure.