import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import { App } from './App';

let storeMock = {
  subreddits: ['test'], // Text strings
   redditPosts: [],
   hiddenSubreddits: [],
   fetchingReddit: true,
   mediumPublications: ['the-launchism', 'free-code-camp'],
   mediumPosts: [],
   hiddenMediumPublications: [],
   fetchingMedium: true,
   processedPosts: []
}

// import store from './Redux/store.js'
// import { Provider } from 'react-redux'

// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   shallow(<Provider store={store}><App /></Provider>, div);
//   ReactDOM.unmountComponentAtNode(div);
// });



it('renders without crashing', () => {
  const div = document.createElement('div');
  shallow(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});


describe('App', () => {
  describe('fetchRedditPosts', () => {

  })
})