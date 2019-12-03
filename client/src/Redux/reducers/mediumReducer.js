const initialState = {
   mediumPublications: ['the-launchism', 'free-code-camp'],
   mediumPosts: [],
   hiddenMediumPublications: [],
   fetchingMedium: true,
}

if (localStorage.getItem('mediumPublications')) {
   initialState.mediumPublications = JSON.parse(localStorage.getItem('mediumPublications'))
}

export default function mediumReducer(state = initialState, action) {
   switch (action.type) {
      case ('ADD_PUBLICATION'):
         return {
            ...state,
            mediumPublications: [...state.mediumPublications, action.payload.toLowerCase()]
         }
      case ('REMOVE_MEDIUM_PUBLICATION'):
         let _mediumPublications = [...state.mediumPublications]
         let _mediumPosts = [...state.mediumPosts]

         _mediumPublications = _mediumPublications.filter(pub => pub !== action.payload.toLowerCase())
         _mediumPosts = _mediumPosts.filter(post => post.mediumPublication !== action.payload.toLowerCase())

         return {
            ...state,
            mediumPublications: _mediumPublications,
            mediumPosts: _mediumPosts,
         }

      case ('ADD_MEDIUM_POSTS'):
         // Payload is an array
         let addingPosts = [...state.mediumPosts]

         return {
            ...state,
            mediumPosts: addingPosts.concat(action.payload)
         }
      case ('TOGGLE_HIDDEN_PUBLICATION'):
         let _hidden = [...state.hiddenMediumPublications]
         let index = _hidden.indexOf(action.payload.toLowerCase())

         if (index !== -1) {
            _hidden.splice(index, 1)
         }
         else {
            _hidden.push(action.payload)
         }

         return {
            ...state,
            hiddenMediumPublications: _hidden
         }

      case ('SET_FETCHING_MEDIUM'):
         return {
            ...state,
            fetchingMedium: action.payload
         }

      

      default:
         return state
   }
}