const initialState = {
   subreddits: [], // Text strings
   redditPosts: [],
   hiddenSubreddits: [],
   fetchingReddit: true
}

// If this computer has used the site before, initialState will be updated before it's used. Same for other source sites (see other reducers)
// localStorage.removeItem('subreddits')
if (localStorage.getItem('subreddits')) { 
   initialState.subreddits = JSON.parse(localStorage.getItem('subreddits'))
}

if (localStorage.getItem('hiddenSubreddits')) {
   initialState.hiddenSubreddits = JSON.parse(localStorage.getItem('hiddenSubreddits'))
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
         localStorage.setItem('subreddits', JSON.stringify([...state.subreddits, action.payload.toLowerCase()]))

         return {
            ...state,
            subreddits: [...state.subreddits, action.payload.toLowerCase()]
         }

      case ('REMOVE_SUBREDDIT'):
         let _subreddits = [...state.subreddits]
         let _redditPosts = [...state.redditPosts]
         console.log("We just removed one?")
         
         _subreddits = _subreddits.filter( subreddit => subreddit !== action.payload)
         _redditPosts = _redditPosts.filter( post => post.subreddit.toLowerCase() !== action.payload.toLowerCase())
         
         
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

         localStorage.setItem('hiddenSubreddits', JSON.stringify(_hidden))

         return {
            ...state,
            hiddenSubreddits: _hidden
         }
         
      case ('SET_FETCHING_REDDIT'):
         return {
            ...state,
            fetchingReddit: action.payload
         }

      case ('FILTER_SUBREDDIT'):
         let newFiltered = [...state.redditPosts]
         newFiltered = newFiltered.filter((post) => {
            console.log(post.subreddit + "  " + action.payload)
            console.log(post.subreddit !== action.payload)
            // subreddits that do not match are filtered out
            return post.subreddit !== action.payload
         })

         return {
            ...state,
            redditPosts: newFiltered
         }

      default:
         return state
   }
}

// Update user prefs in database outside of reducers. Something something being pure.