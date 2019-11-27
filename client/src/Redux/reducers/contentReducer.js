const initialState = {
   processedPosts: []
}

export default function reducer(state = initialState, action) {
   switch(action.type) {
      case ('SET_PROCESSED_POSTS'):
         return {
            ...state,
            processedPosts: action.payload
         }
      default:
         return state
   }
}