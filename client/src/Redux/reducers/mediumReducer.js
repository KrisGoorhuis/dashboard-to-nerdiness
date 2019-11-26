const initialState = {
   publications: ['the-launchism', 'free-code-camp'],
   mediumPosts: [],
   hiddenPublications: [],
}

if (localStorage.getItem('mediumPublications')) {
   initialState.publications = JSON.parse(localStorage.getItem('mediumPublications'))
}

export default function mediumReducer(state = initialState, action) {
   switch (action.type) {
      case ('ADD_PUBLICATION'):


         return {
            ...state,
            publications: [...state.publications, action.payload]
         }
      case ('REMOVE_PUBLICATION'):
         let _publications = [...state]

         return {
            ...state,
            publications: _publications.filter( pub => pub !== action.payload)
         }

      case ('ADD_MEDIUM_POSTS'):
         // Payload is an array
         var _posts = [...state.mediumPosts]

         return {
            ...state,
            mediumPosts: _posts.concat(action.payload)
         }

      case ('REMOVE_MEDIUM_POSTS'):
         var _posts = [...state.mediumPosts]
         

         return {
            ...state,
            // mediumPosts: _posts.filter(post)
         }

      default:
         return state
   }
}