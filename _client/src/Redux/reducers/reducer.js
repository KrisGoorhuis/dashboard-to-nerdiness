const initialState = {
   response: 'initial response',
   responseToPost: 'initial',
}

export default function reducer(state = initialState, action) {
   switch(action.type) {
      case ('SET_RESPONSE'):
         return {
            ...state,
            response: action.payload
         }
      case ('SET_RESPONSE_TO_POST'):
         return {
            ...state,
            responseToPost: action.payload
         }
      default:
         return state
   }
}