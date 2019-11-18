const initialState = {
   redditFetchers: []
}

export default function reducer(state = initialState, action) {
   switch(action.type) {
      case ('ADD_REDDIT_FETCHER'):
         // let newFetchers = 

         return {
            ...state,
            redditFetchers: state.redditFetchers
         }
      default:
         return state
   }
}