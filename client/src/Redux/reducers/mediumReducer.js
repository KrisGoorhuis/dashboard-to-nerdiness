const initialState = {
   mediumPublications: [],
   mediumPosts: [],
   hiddenMediumPublications: [],
   fetchingMedium: true,
}

if (localStorage.getItem('mediumPublications')) {
   initialState.mediumPublications = JSON.parse(localStorage.getItem('mediumPublications'))
   // console.log(initialState)
}

if (localStorage.getItem('hiddenMediumPublications')) {
   initialState.hiddenMediumPublications = JSON.parse(localStorage.getItem('hiddenMediumPublications'))
}

export default function mediumReducer(state = initialState, action) {
   switch (action.type) {
      case ('ADD_PUBLICATION'):
         localStorage.setItem('mediumPublications', JSON.stringify([...state.mediumPublications, action.payload.toLowerCase()]))

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

         localStorage.setItem('hiddenMediumPublications', JSON.stringify(_hidden))

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