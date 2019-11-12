const initialState = {
   searchTerm: ''
}

export default function redditReducer(state = initialState, action) {

   switch (action.type) {
      case ('SET_SEARCH_SEARCH'):
         return {
            ...state
         }
   }
}

// Update user prefs in database outside of reducers. Something something being pure.